import {
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { makeStyles } from "@mui/styles";
import "animate.css";
import axios from "axios";
import PropTypes from "prop-types";
import * as React from "react";
import { CgClose } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";
import Num2persian from "num2persian";
import { useDispatch } from "react-redux";
import { setValuetabs } from "../../redux/slice/loanRequest";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

ModalAddLoanRequest.propTypes = {
  getLoanRequestList: PropTypes.func,
};
export default function ModalAddLoanRequest({
  getLoanRequestList,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [planSummary, setPlanSummary] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [errTitle, setErrTitle] = React.useState(false);
  const [inputType, setInputType] = React.useState("");
  const [errInputType, setErrInputType] = React.useState(false);
  const [volume, setVolume] = React.useState("");
  const [errVolume, setErrVolume] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [errAmount, setErrAmount] = React.useState(false);
  const [showLetter, setShowLetter] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const themeColor = useSelector((store) => store.setting.themeColor);

  const disPatch = useDispatch();
  const formatNumber = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

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

  const handleClose = () => {
    setOpen(false);
    resetState();
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

    if (title && inputType && volume && amount) {
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
          setIsLoading(false);
          handleClose();
          disPatch(setValuetabs(0));
          getLoanRequestList({ statusId: 1, page: 1 });

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
          handleClose();
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

  return (
    <>
      <div className="w-full flex justify-start items-center h-full px-2">
        <Button
          onClick={handleClickOpen}
          sx={{
            height: "100%",
            fontSize: "12px",
            minWidth: "35px",
            transition: "0.6s",
            color: themeColor.color,
            background: themeColor.bgColor,
            boxShadow: "none",
          }}
        >
          <div className="flex items-center">
            <FaPlus />
            <span className="px-1">ثبت درخواست تسهیلات</span>
          </div>
        </Button>
      </div>
      <Dialog
        PaperProps={{
          className: classes.animatedDialog,
          sx: { width: "600px", maxWidth: "none" },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div
          className={
            themeMode === "dark"
              ? "flex justify-between px-5 items-center py-2 bg-slate-700"
              : "flex justify-between px-5 items-center py-2 bg-slate-50"
          }
        >
          <span className="text-xl">ثبت درخواست تسهیلات</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
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
              label="خلاصه طرح"
              name="name"
              onChange={(e) => {
                setPlanSummary(e.target.value);
              }}
              value={planSummary}
            />
          </div>
        </div>
        <Divider className="w-full" />

        <DialogActions>
          <div className="flex w-full justify-center">
            <Button
              size="large"
              onClick={submitFormHandler}
              disabled={isLoading}
              className="bg-slate-800"
              sx={{
                fontSize: "12px",
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
        </DialogActions>
      </Dialog>
    </>
  );
}
