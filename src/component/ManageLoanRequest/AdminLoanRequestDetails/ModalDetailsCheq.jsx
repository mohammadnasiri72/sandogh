import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "jalali-moment";
import Num2persian from "num2persian";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import { CgClose } from "react-icons/cg";
import { MdOutlineAttachFile, MdOutlineDone } from "react-icons/md";
import DatePicker from "react-multi-date-picker";
import { useSelector } from "react-redux";
import { mainDomain } from "../../../utils/mainDomain";
import { IoMdReturnLeft } from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineClose } from "react-icons/ai";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

ModalDetailsCheq.propTypes = {
  loanDocs: PropTypes.object,
  setFlag: PropTypes.func,
};
export default function ModalDetailsCheq({ loanDocs, setFlag }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const [errNumber, setErrNumber] = useState(false);
  const [number2, setNumber2] = useState("");
  const [errNumber2, setErrNumber2] = useState(false);
  const [bankName, setBankName] = useState("");
  const [errBankName, setErrBankName] = useState(false);
  const [bankBranch, setBankBranch] = useState("");
  const [errBankBranch, setErrBankBranch] = useState(false);
  const [bankAccount, setBankAccount] = useState("");
  const [errBankAccount, setErrBankAccount] = useState(false);
  const [amount, setAmount] = useState("");
  const [errAmount, setErrAmount] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [dateCheq, setDateCheq] = useState("");
  const [errDateCheq, setErrDateCheq] = useState(false);
  const [cheqDate, setCheqDate] = useState("");
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  // تابع تبدیل اعداد فارسی به انگلیسی
  const convertToEnglishNumbers = (str) => {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return str.replace(
      /[۰-۹]/g,
      (char) => englishNumbers[persianNumbers.indexOf(char)]
    );
  };

  const getGregorianDate = (jalaliDate) => {
    const englishDate = convertToEnglishNumbers(jalaliDate);
    const momentDate = moment
      .from(englishDate, "fa", "YYYY/MM/DD")
      .locale("en");
    return momentDate.toDate();
  };

  useEffect(() => {
    if (loanDocs.checkInfo) {
      let gregorianDate = "";
      if (loanDocs.checkInfo.dueDate) {
        gregorianDate = getGregorianDate(loanDocs.checkInfo.dueDate);
      }
      setCheqDate(loanDocs.checkInfo.dueDate);
      setTitle(loanDocs.checkInfo.title);
      setDateCheq(gregorianDate);
      setNumber(loanDocs.checkInfo.number);
      setNumber2(loanDocs.checkInfo.number2);
      setBankName(loanDocs.checkInfo.bankName);
      setBankBranch(loanDocs.checkInfo.bankBranch);
      setBankAccount(loanDocs.checkInfo.bankAccount);
      setDesc(loanDocs.fileDesc);
      setAmount(String(loanDocs.checkInfo.amount));
    }
  }, [loanDocs, open]);

  const handleView = (fileUrl) => {
    window.open(mainDomain + fileUrl, "_blank");
  };

  const formatNumber = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };
  const resetState = () => {
    setErrNumber(false);
    setErrNumber2(false);
    setErrBankName(false);
    setErrBankBranch(false);
    setErrBankAccount(false);
    setErrAmount(false);
    setShowLetter(false);
    setErrDateCheq(false);
  };

  const submitFormHandler = () => {
    const isCheck = loanDocs.checkInfo?.typeId === 1;

    if (!number) {
      setErrNumber(true);
    }
    if (!number2 && isCheck) {
      setErrNumber2(true);
    }
    if (!bankName) {
      setErrBankName(true);
    }
    if (!bankBranch && isCheck) {
      setErrBankBranch(true);
    }
    if (!bankAccount && isCheck) {
      setErrBankAccount(true);
    }
    if (!amount) {
      setErrAmount(true);
    }
    if (!dateCheq && isCheck) {
      setErrDateCheq(true);
    }

    if (
      title &&
      number &&
      bankName &&
      amount &&
      ((bankAccount && bankBranch && number2 && dateCheq && isCheck) ||
        !isCheck)
    ) {
      setIsLoading(true);
      let data = {};
      if (isCheck) {
        data = {
          id: loanDocs.id,
          checkInfo: {
            typeId: isCheck ? 1 : 2,
            title,
            number,
            number2,
            bankName,
            bankBranch,
            bankAccount,
            amount: Number(amount),
            dueDate: cheqDate,
          },
        };
      } else {
        data = {
          id: loanDocs.id,
          checkInfo: {
            typeId: isCheck ? 1 : 2,
            title,
            number,
            number2: "0",
            bankName,
            bankBranch: "بانک ملی",
            bankAccount: "بانک ملی",
            amount: Number(amount),
          },
        };
      }

      axios
        .put(mainDomain + "/api/LoanRequest/Doc/Info", data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          setIsLoading(false);
          handleClose();
          setFlag((e) => !e);
          Toast.fire({
            icon: "success",
            text: isCheck
              ? "چک با موفقیت ویرایش شد"
              : "سفته با موفقیت ویرایش شد",
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

  CustomMultipleInput.propTypes = {
    onFocus: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };
  function CustomMultipleInput({ onFocus, value, onChange }) {
    return (
      <div className="relative">
        <TextField
          onFocus={onFocus}
          value={value}
          onChange={onChange}
          size="small"
          type="text"
          className="w-full"
          id="outlined-multiline-flexible"
          label="تاریخ چک"
          name="name"
          FormHelperTextProps={{ sx: { color: "red" } }}
          helperText={errDateCheq ? "لطفا تاریخ چک را وارد کنید" : ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errDateCheq ? "red" : "",
              },
              "&:hover fieldset": {
                borderColor: errDateCheq ? "red" : "",
              },
              "&.Mui-focused fieldset": {
                borderColor: errDateCheq ? "red" : "",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: errDateCheq ? "red" : "",
              "&.Mui-focused": { color: errDateCheq ? "red" : "" },
            },
          }}
        />
        {value && (
          <AiOutlineClose
            onClick={() => {
              setDateCheq("");
              setCheqDate("");
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
          />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="px-1">
        {/* <Tooltip title="جزئیات چک">
          <IconButton
            onClick={handleClickOpen}
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M21.25 9.06449C18.94 5.46842 15.56 3.39795 12 3.39795C10.22 3.39795 8.49 3.91309 6.91 4.87402C5.33 5.84487 3.91 7.2615 2.75 9.06449C1.75 10.6198 1.75 13.146 2.75 14.7013C5.06 18.3073 8.44 20.3679 12 20.3679C13.78 20.3679 15.51 19.8527 17.09 18.8918C18.67 17.9209 20.09 16.5043 21.25 14.7013C22.25 13.1559 22.25 10.6198 21.25 9.06449ZM12 15.8901C9.76 15.8901 7.96 14.097 7.96 11.8879C7.96 9.6787 9.76 7.88561 12 7.88561C14.24 7.88561 16.04 9.6787 16.04 11.8879C16.04 14.097 14.24 15.8901 12 15.8901Z"
                fill="#1787B0"
              />
              <path
                d="M12 9.05457C10.43 9.05457 9.15002 10.3226 9.15002 11.8878C9.15002 13.4432 10.43 14.7112 12 14.7112C13.57 14.7112 14.86 13.4432 14.86 11.8878C14.86 10.3325 13.57 9.05457 12 9.05457Z"
                fill="#1787B0"
              />
            </svg>
          </IconButton>
        </Tooltip> */}
        <Tooltip
          title={loanDocs.checkInfo?.typeId === 1 ? "جزئیات چک" : "جزئیات سفته"}
        >
          <IconButton
            onClick={handleClickOpen}
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M16.24 3.65002H7.76C5.29 3.65002 3.29 5.66002 3.29 8.12002V17.53C3.29 19.99 5.3 22 7.76 22H16.23C18.7 22 20.7 19.99 20.7 17.53V8.12002C20.71 5.65002 18.7 3.65002 16.24 3.65002Z"
                fill={themeColor.color}
              />
              <path
                d="M14.35 2H9.65C8.61 2 7.76 2.84 7.76 3.88V4.82C7.76 5.86 8.6 6.7 9.64 6.7H14.35C15.39 6.7 16.23 5.86 16.23 4.82V3.88C16.24 2.84 15.39 2 14.35 2Z"
                fill={themeColor.color}
              />
              <path
                d="M15 12.95H8C7.59 12.95 7.25 12.61 7.25 12.2C7.25 11.79 7.59 11.45 8 11.45H15C15.41 11.45 15.75 11.79 15.75 12.2C15.75 12.61 15.41 12.95 15 12.95Z"
                fill={themeColor.color}
              />
              <path
                d="M12.38 16.95H8C7.59 16.95 7.25 16.61 7.25 16.2C7.25 15.79 7.59 15.45 8 15.45H12.38C12.79 15.45 13.13 15.79 13.13 16.2C13.13 16.61 12.79 16.95 12.38 16.95Z"
                fill={themeColor.color}
              />
            </svg>
          </IconButton>
        </Tooltip>
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
          <span className="text-xl">
            <span>اطلاعات</span>
            <span> {title} </span>
          </span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        {loanDocs.checkInfo?.typeId === 1 && (
          <div className="flex flex-wrap">
            <div className="w-full flex justify-start p-1">
              <span
                className="flex cursor-pointer items-center text-teal-500"
                onClick={() => {
                  handleView(loanDocs.fileUrl);
                }}
              >
                <MdOutlineAttachFile />
                <span>مشاهده فایل</span>
              </span>
            </div>
            <div className="sm:w-1/2 w-full px-2 mt-3">
              {/* <TextField
                disabled
                size="small"
                type="text"
                className="w-full"
                id="outlined-multiline-flexible"
                label="عنوان چک*"
                name="name"
                value={title}
              /> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">چک / سفته</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={loanDocs.checkInfo?.typeId === 2 ? false : true}
                  label="چک / سفته"
                  disabled
                >
                  <MenuItem value={true}>چک</MenuItem>
                  <MenuItem value={false}>سفته</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="sm:w-1/2 relative w-full px-2 mt-3">
              <DatePicker
                className={
                  themeMode === "dark" ? "bg-dark rmdp-mobile" : "rmdp-mobile"
                }
                format="DD MMMM YYYY"
                render={<CustomMultipleInput />}
                calendarPosition="bottom-right"
                containerStyle={{
                  width: "100%",
                }}
                inputClass="outline-none border rounded-lg w-full h-10 px-3 mt-3"
                locale={persianFa}
                calendar={persian}
                value={dateCheq}
                onChange={(event) => {
                  setDateCheq(event);
                  setCheqDate(event.format("YYYY/MM/DD"));
                  setErrDateCheq(false);
                }}
              />
            </div>
            <div className="flex relative sm:w-1/2 w-full px-2 mt-3">
              <TextField
                size="small"
                label="شماره چک *"
                className="border rounded-lg w-full px-3"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                value={number}
                placeholder="شماره چک..."
                onChange={(e) => {
                  const newValue = e.target.value;
                  setNumber(newValue);
                  setErrNumber(false);
                }}
                FormHelperTextProps={{ sx: { color: "red" } }}
                helperText={errNumber ? "لطفا شماره چک را وارد کنید" : ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errNumber ? "red" : "",
                    },
                    "&:hover fieldset": {
                      borderColor: errNumber ? "red" : "",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errNumber ? "red" : "",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: errNumber ? "red" : "",
                    "&.Mui-focused": { color: errNumber ? "red" : "" },
                  },
                }}
              />
            </div>
            <div className="flex relative sm:w-1/2 w-full px-2 mt-3">
              <TextField
                size="small"
                label="شماره صیاد *"
                className="border rounded-lg w-full px-3"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                value={number2}
                placeholder="شماره صیاد..."
                onChange={(e) => {
                  const newValue = e.target.value;
                  setNumber2(newValue);
                  setErrNumber2(false);
                }}
                FormHelperTextProps={{ sx: { color: "red" } }}
                helperText={errNumber2 ? "لطفا شماره صیاد را وارد کنید" : ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errNumber2 ? "red" : "",
                    },
                    "&:hover fieldset": {
                      borderColor: errNumber2 ? "red" : "",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errNumber2 ? "red" : "",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: errNumber2 ? "red" : "",
                    "&.Mui-focused": { color: errNumber2 ? "red" : "" },
                  },
                }}
              />
            </div>
            <div className="sm:w-1/2 w-full px-2 mt-3">
              <TextField
                size="small"
                type="text"
                className="w-full"
                id="outlined-multiline-flexible"
                label="نام بانک*"
                name="name"
                onChange={(e) => {
                  setBankName(e.target.value);
                  setErrBankName(false);
                  if (e.target.value === "") {
                    setErrBankName(true);
                  }
                }}
                value={bankName}
                FormHelperTextProps={{ sx: { color: "red" } }}
                helperText={errBankName ? "لطفا نام بانک را وارد کنید" : ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errBankName ? "red" : "",
                    },
                    "&:hover fieldset": {
                      borderColor: errBankName ? "red" : "",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errBankName ? "red" : "",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: errBankName ? "red" : "",
                    "&.Mui-focused": { color: errBankName ? "red" : "" },
                  },
                }}
              />
            </div>
            <div className="sm:w-1/2 w-full px-2 mt-3">
              <TextField
                size="small"
                type="text"
                className="w-full"
                id="outlined-multiline-flexible"
                label="نام شعبه*"
                name="name"
                value={bankBranch}
                onChange={(e) => {
                  setBankBranch(e.target.value);
                  setErrBankBranch(false);
                  if (e.target.value === "") {
                    setErrBankBranch(true);
                  }
                }}
                FormHelperTextProps={{ sx: { color: "red" } }}
                helperText={errBankBranch ? "لطفا نام شعبه را وارد کنید" : ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errBankBranch ? "red" : "",
                    },
                    "&:hover fieldset": {
                      borderColor: errBankBranch ? "red" : "",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errBankBranch ? "red" : "",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: errBankBranch ? "red" : "",
                    "&.Mui-focused": { color: errBankBranch ? "red" : "" },
                  },
                }}
              />
            </div>
            <div className="flex relative sm:w-1/2 w-full px-2 mt-3">
              <TextField
                size="small"
                label="شماره حساب *"
                className="border rounded-lg w-full px-3"
                value={bankAccount}
                placeholder="شماره حساب..."
                onChange={(e) => {
                  const newValue = e.target.value;
                  setBankAccount(newValue);
                  setErrBankAccount(false);
                }}
                FormHelperTextProps={{ sx: { color: "red" } }}
                helperText={
                  errBankAccount ? "لطفا شماره حساب را وارد کنید" : ""
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errBankAccount ? "red" : "",
                    },
                    "&:hover fieldset": {
                      borderColor: errBankAccount ? "red" : "",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errBankAccount ? "red" : "",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: errBankAccount ? "red" : "",
                    "&.Mui-focused": { color: errBankAccount ? "red" : "" },
                  },
                }}
              />
            </div>
            <div className="sm:w-1/2 w-full px-2 mt-3">
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
                label="مبلغ چک*"
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
                helperText={errAmount ? "لطفا مبلغ چک را وارد کنید" : ""}
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
              {amount && (
                <span className="flex justify-start text-xs ">
                  {Num2persian(Number(amount))} ریال{" "}
                </span>
              )}
            </div>
            <div className="flex relative w-full px-2 mt-3">
              <TextField
                multiline
                minRows={1}
                size="small"
                label="توضیحات فایل"
                className="border rounded-lg w-full px-3"
                value={desc}
                placeholder="توضیحات..."
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </div>
          </div>
        )}
        {loanDocs.checkInfo?.typeId === 2 && (
          <div className="flex flex-wrap">
            <div className="w-full flex justify-start p-1">
              <span
                className="flex cursor-pointer items-center text-teal-500"
                onClick={() => {
                  handleView(loanDocs.fileUrl);
                }}
              >
                <MdOutlineAttachFile />
                <span>مشاهده فایل</span>
              </span>
            </div>
            <div className="sm:w-1/2 w-full px-2 mt-3">
              {/* <TextField
                disabled
                size="small"
                type="text"
                className="w-full"
                id="outlined-multiline-flexible"
                label="عنوان سفته*"
                name="name"
                value={title}
              /> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">چک / سفته</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={loanDocs.checkInfo?.typeId === 2 ? false : true}
                  label="چک / سفته"
                  disabled
                >
                  <MenuItem value={true}>چک</MenuItem>
                  <MenuItem value={false}>سفته</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="sm:w-1/2 w-full px-2 mt-3">
              <TextField
                disabled
                size="small"
                type="text"
                className="w-full"
                id="outlined-multiline-flexible"
                label="نام بانک*"
                name="name"
                value={bankName}
              />
            </div>
            <div className="flex relative sm:w-1/2 w-full px-2 mt-3">
              <TextField
                size="small"
                label="شماره سفته *"
                className="border rounded-lg w-full px-3"
                value={number}
                placeholder="شماره سفته..."
                onChange={(e) => {
                  const newValue = e.target.value;
                  setNumber(newValue);
                  setErrNumber(false);
                }}
                FormHelperTextProps={{ sx: { color: "red" } }}
                helperText={errNumber ? "لطفا شماره سفته را وارد کنید" : ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: errNumber ? "red" : "",
                    },
                    "&:hover fieldset": {
                      borderColor: errNumber ? "red" : "",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: errNumber ? "red" : "",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: errNumber ? "red" : "",
                    "&.Mui-focused": { color: errNumber ? "red" : "" },
                  },
                }}
              />
            </div>
            {/* <div className="sm:w-1/2 w-full px-2 mt-3">
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
                label="مبلغ سفته*"
                variant="outlined"
                type="text"
                value={formatNumber(amount)}
              />
              {amount && (
                <span className="flex justify-start text-xs ">
                  {Num2persian(Number(amount))} ریال{" "}
                </span>
              )}
            </div> */}
            <div className="sm:w-1/2 w-full px-2 mt-3">
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
                label="مبلغ سفته*"
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
                helperText={errAmount ? "لطفا مبلغ سفته را وارد کنید" : ""}
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
            <div className="flex relative w-full px-2 mt-3">
              <TextField
                disabled
                multiline
                minRows={1}
                size="small"
                label="توضیحات فایل"
                className="border rounded-lg w-full px-3"
                value={desc}
                placeholder="توضیحات..."
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </div>
          </div>
        )}

        <div className="pt-2">
          <Divider className="w-full" />
        </div>
        <DialogActions>
          <div className="flex w-full justify-center">
            <div className="px-1">
              <Button
                size="large"
                onClick={submitFormHandler}
                disabled={isLoading}
                className="bg-slate-800"
                sx={{
                  fontSize: "12px",
                  transition: "0.6s",
                  color: "#fff",
                  backgroundColor: "#556ee6",
                  "&:hover": {
                    backgroundColor: "#485ec4",
                  },
                  boxShadow: "none",
                }}
              >
                {!isLoading && (
                  <div className="flex items-center">
                    <MdOutlineDone />
                    <span className="px-1">ویرایش</span>
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
            <div className="px-1">
              <Button
                size="large"
                onClick={handleClose}
                disabled={isLoading}
                sx={{
                  fontSize: "12px",
                  transition: "0.6s",
                  color: "#fff",
                  backgroundColor: "#74788d",
                  "&:hover": {
                    backgroundColor: "#636678",
                  },
                  boxShadow: "none",
                }}
              >
                <div className="flex items-center">
                  <IoMdReturnLeft />
                  <span className="px-1">انصراف</span>
                </div>
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
