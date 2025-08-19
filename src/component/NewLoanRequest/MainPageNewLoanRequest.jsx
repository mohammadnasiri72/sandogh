import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios from "axios";
import Num2persian from "num2persian";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";
import { SyncLoader } from "react-spinners";

export default function MainPageNewLoanRequest() {
  const mainPageState = useSelector((store) => store.resetState.mainPageState);
  const [isLoading, setIsLoading] = useState(true);
  const [planSummary, setPlanSummary] = useState("");
  const [errPlanSummary, setErrPlanSummary] = useState(false);
  const [title, setTitle] = useState("");
  const [errTitle, setErrTitle] = useState(false);
  const [inputType, setInputType] = useState("");
  const [errInputType, setErrInputType] = useState(false);
  const [volume, setVolume] = useState("");
  const [errVolume, setErrVolume] = useState(false);
  const [amount, setAmount] = useState("");
  const [errAmount, setErrAmount] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [flag, setFlag] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);

  const formatNumber = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

 

  const Navigate = useNavigate();

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get(mainDomain + `/api/LoanRequest`, {
  //       params: {
  //         userName: "",
  //         find: "",
  //         statusId: 1,
  //         sortId: 1,
  //         pageSize: 1,
  //         page: 1,
  //       },
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setIsLoading(false);
  //       if (res.data.length > 0) {
  //         Navigate(`/profile/NewLoanRequest/${res.data[0].id}`);
  //       }

  //     })
  //     .catch(() => {
  //       setIsLoading(false);
  //     });

  // }, [flag]);

  useEffect(() => {
    setIsLoading(true);
    // Promise.all([
    //   axios.get(`${mainDomain}/api/LoanRequest`, {
    //     params: {
    //       userName: "",
    //       find: "",
    //       statusId: 1,
    //       sortId: 1,
    //       pageSize: 1,
    //       page: 1,
    //     },
    //     headers: {
    //       Authorization: `Bearer ${user.token}`,
    //     },
    //   }),
    //   axios.get(`${mainDomain}/api/LoanRequest`, {
    //     params: {
    //       userName: "",
    //       find: "",
    //       statusId: 2,
    //       sortId: 1,
    //       pageSize: 1,
    //       page: 1,
    //     },
    //     headers: {
    //       Authorization: `Bearer ${user.token}`,
    //     },
    //   }),
    // ])
    axios.get(`${mainDomain}/api/LoanRequest`, {
      params: {
        userName: "",
        find: "",
        statusId: 1,
        sortId: 1,
        pageSize: 1,
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        
        setIsLoading(false);
        if (res?.data[0]?.id) {
          Navigate(`/profile/NewLoanRequest/${res.data[0].id}`);
        }
        // else if (res[1]?.data[0]?.id) {
        //   Navigate(`/profile/NewLoanRequest/${res[1].data[0].id}`);
        // }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [flag , mainPageState]);

  const resetState = () => {
    setTitle("");
    setErrTitle(false);
    setPlanSummary("");
    setInputType("");
    setVolume("");
    setAmount("");
    setErrInputType(false);
    setErrVolume(false);
    setErrAmount(false);
    setShowLetter(false);
  };

  const submitFormHandler = () => {
    if (!title) {
      setErrTitle(true);
    }
    if (!inputType) {
      setErrInputType(true);
    }
    if (!volume) {
      setErrVolume(true);
    }
    if (!amount) {
      setErrAmount(true);
    }
    if (!planSummary) {
      setErrPlanSummary(true);
    }

    if (title && inputType && volume && amount && planSummary) {
      const data = {
        requestId: 0,
        title,
        amount: Number(amount),
        inputType,
        volume: Number(volume),
        planSummary,
      };

      setIsLoading(true);
      axios
        .post(mainDomain + `/api/LoanRequest`, data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          resetState();
          setFlag((e) => !e);
          Toast.fire({
            icon: "success",
            text: "درخواست تسهیلات با موفقیت ثبت شد",
            customClass: {
              container: "toast-modal",
            },
          });
        })
        .catch((err) => {
          setIsLoading(false);
          Toast.fire({
            icon: "error",
            text: err.response ? err.response.data : "خطای شبکه",
            customClass: {
              container: "toast-modal",
            },
          });
        });
    }
  };

  const goToLoanRequest = () => {
    Navigate(`/profile/LoanList`);
  };

  return (
    <>
      {!isLoading && (
        <div className="mt-10">
          <div className="flex w-full px-2">
            <Button
              size="large"
              onClick={goToLoanRequest}
              disabled={isLoading}
              className="bg-slate-800"
              sx={{
                transition: "0.6s",
                color: themeColor.color,
                background: themeColor.bgColor,

                boxShadow: "none",
              }}
            >
              <div className="flex items-center">
                <FaArrowLeftLong />
                <span className="px-1">کارتابل درخواست ها</span>
              </div>
            </Button>
          </div>
          <div className="flex flex-wrap">
            <div className="sm:w-1/2 w-full px-2 mt-5">
              <TextField
                size="small"
                type="text"
                className="w-full"
                id="outlined-multiline-flexible"
                label="عنوان درخواست*"
                name="name"
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrTitle(false);
                  if (e.target.value === "") {
                    setErrTitle(true);
                  }
                }}
                value={title}
                FormHelperTextProps={{ sx: { color: "red" } }}
                helperText={errTitle ? "لطفا عنوان درخواست را وارد کنید" : ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errTitle ? "red" : "",
                    },
                    "&:hover fieldset": {
                      borderColor: errTitle ? "red" : "",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errTitle ? "red" : "",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: errTitle ? "red" : "",
                    "&.Mui-focused": { color: errTitle ? "red" : "" },
                  },
                }}
              />
            </div>
            <div className="sm:w-1/2 w-full px-2 mt-5">
              <TextField
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">ریال</InputAdornment>
                    ),
                  },
                }}
                className="w-full"
                size="small"
                label="مبلغ*"
                variant="outlined"
                type="text"
                value={formatNumber(amount)}
                onChange={(event) => {
                  if (event.target.value.length < 20) {
                    setErrAmount(false);
                    const rawValue = event.target.value.replace(/,/g, "");
                    if (/^\d*$/.test(rawValue)) {
                      setAmount(rawValue);
                    }
                  }
                }}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                FormHelperTextProps={{ sx: { color: "red" } }}
                helperText={errAmount ? "لطفا مبلغ را وارد کنید" : ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errAmount ? "red" : "",
                    },
                    "&:hover fieldset": {
                      borderColor: errAmount ? "red" : "",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errAmount ? "red" : "",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: errAmount ? "red" : "",
                    "&.Mui-focused": { color: errAmount ? "red" : "" },
                  },
                }}
                onFocus={() => {
                  setShowLetter(true);
                }}
                onBlur={() => {
                  setShowLetter(false);
                }}
              />
              {amount && showLetter && (
                <span className="flex justify-start text-xs ">
                  {Num2persian(Number(amount))} ریال{" "}
                </span>
              )}
            </div>
            <div className="sm:w-1/2 w-full px-2 mt-5">
              <TextField
                size="small"
                type="text"
                className="w-full"
                id="outlined-multiline-flexible"
                label="نوع نهاده*"
                name="name"
                onChange={(e) => {
                  setInputType(e.target.value);
                  setErrInputType(false);
                  if (e.target.value === "") {
                    setErrInputType(true);
                  }
                }}
                value={inputType}
                FormHelperTextProps={{ sx: { color: "red" } }}
                helperText={errInputType ? "لطفا نوع نهاده را وارد کنید" : ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errInputType ? "red" : "",
                    },
                    "&:hover fieldset": {
                      borderColor: errInputType ? "red" : "",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errInputType ? "red" : "",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: errInputType ? "red" : "",
                    "&.Mui-focused": { color: errInputType ? "red" : "" },
                  },
                }}
              />
            </div>
            <div className="flex relative sm:w-1/2 w-full px-2 mt-5">
              <TextField
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">kg</InputAdornment>
                    ),
                  },
                }}
                size="small"
                label="مقدار محصول*"
                className="border rounded-lg w-full px-3"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                value={formatNumber(volume)}
                placeholder="مقدار محصول..."
                onChange={(e) => {
                  const newValue = e.target.value.replace(/[^\d]/g, "");
                  setVolume(newValue.replace(/,/g, ""));
                  setErrVolume(false);
                }}
                FormHelperTextProps={{ sx: { color: "red" } }}
                helperText={errVolume ? "لطفا مقدار محصول را وارد کنید" : ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errVolume ? "red" : "",
                    },
                    "&:hover fieldset": {
                      borderColor: errVolume ? "red" : "",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errVolume ? "red" : "",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: errVolume ? "red" : "",
                    "&.Mui-focused": { color: errVolume ? "red" : "" },
                  },
                }}
              />
            </div>
            <div className="w-full px-2 my-5">
              <TextField
                size="small"
                multiline
                minRows={4}
                type="text"
                className="w-full"
                id="outlined-multiline-flexible"
                label="خلاصه طرح*"
                name="name"
                onChange={(e) => {
                  setPlanSummary(e.target.value);
                  setErrPlanSummary(false);
                }}
                value={planSummary}
                FormHelperTextProps={{ sx: { color: "red" } }}
                helperText={errPlanSummary ? "لطفا خلاصه طرح را وارد کنید" : ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errPlanSummary ? "red" : "",
                    },
                    "&:hover fieldset": {
                      borderColor: errPlanSummary ? "red" : "",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errPlanSummary ? "red" : "",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: errPlanSummary ? "red" : "",
                    "&.Mui-focused": { color: errPlanSummary ? "red" : "" },
                  },
                }}
              />
            </div>
          </div>

          <div className="flex w-full px-2">
            <Button
              size="large"
              onClick={submitFormHandler}
              disabled={isLoading}
              className="bg-slate-800"
              sx={{
                transition: "0.6s",
                color: themeColor.color,
                background: themeColor.bgColor,

                boxShadow: "none",
              }}
            >
              {!isLoading && (
                <div className="flex items-center">
                  <MdOutlineDone />
                  <span className="px-1">تایید</span>
                </div>
              )}
              {isLoading && (
                <div className="flex justify-center items-center">
                  <div className="scale-50 w-10 h-6  text-white">
                    <CircularProgress sx={{ color: "#fff" }} />
                  </div>
                </div>
              )}
            </Button>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center items-center w-full h-96">
          <SyncLoader color={themeMode === "dark" ? "#fff" : "#1787B0"} />
        </div>
      )}
    </>
  );
}
