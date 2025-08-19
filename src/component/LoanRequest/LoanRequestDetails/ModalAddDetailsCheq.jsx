import {
  Alert,
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
import axios from "axios";
import Num2persian from "num2persian";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import { AiOutlineClose } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { IoMdReturnLeft } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import DatePicker from "react-multi-date-picker";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../../utils/mainDomain";
import UploadImgDoc from "./UploadImgDoc";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

ModalAddDetailsCheq.propTypes = {
  setFlag: PropTypes.func,
  activeStep: PropTypes.number,
  loanDocs: PropTypes.array,
};
export default function ModalAddDetailsCheq({ setFlag, activeStep, loanDocs }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const loanRequestData = useSelector(
    (store) => store.loanRequest.loanRequestData
  );
  const loanId = useSelector((store) => store.loanRequest.loanId);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);
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
  const [fileName, setFileName] = useState("");
  const [desc, setDesc] = useState("");
  const [isCheck, setIsCheck] = useState(true);

  useEffect(() => {
    if (!isCheck) {
      setBankName(" بانک ملی");
    }
  }, [isCheck]);

  useEffect(() => {
    setTitle(loanRequestData.loanRequestItems[activeStep].title);
  }, [open]);

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

  const resetState = () => {
    setNumber("");
    setNumber2("");
    setBankName("");
    setBankBranch("");
    setBankAccount("");
    setAmount("");
    setDateCheq("");
    setCheqDate("");
    setErrNumber(false);
    setErrNumber2(false);
    setErrBankName(false);
    setErrBankBranch(false);
    setErrBankAccount(false);
    setErrAmount(false);
    setShowLetter(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsCheck(true);
    resetState();
  };

  const submitFormHandler = () => {
    if (!fileName) {
      Toast.fire({
        icon: "error",
        text: "لطفا ابتدا فایل را بارگذاری کنید",
        customClass: {
          container: "toast-modal",
        },
      });
    }
    if (fileName) {
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
        number &&
        bankName &&
        amount &&
        fileName &&
        ((bankAccount && bankBranch && number2 && dateCheq && isCheck) ||
          !isCheck)
      ) {
        setIsLoading(true);
        let data = {};
        if (isCheck) {
          data = {
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
            requestId: loanId,
            itemId: loanRequestData.loanRequestItems[activeStep].id,
            isFromAvailableFiles: false,
            fileName,
            desc,
          };
        } else {
          data = {
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
            requestId: loanId,
            itemId: loanRequestData.loanRequestItems[activeStep].id,
            isFromAvailableFiles: false,
            fileName,
            desc,
          };
        }

        axios
          .post(mainDomain + "/api/LoanRequest/Doc", data, {
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
                ? "افزودن چک با موفقیت انجام شد"
                : "افزودن سفته با موفقیت انجام شد",
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
      {loanDocs.length === 0 && (
        <div className="px-1">
          <Button
            onClick={handleClickOpen}
            sx={{
              fontSize: "12px",
              width: "100%",
              transition: "0.6s",
              color: "#fff",
              backgroundColor: "#556ee6",
              "&:hover": {
                backgroundColor: "#485ec4",
              },
              boxShadow: "none",
            }}
          >
            <div className="flex items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M18.27 3.35C17.8 3.28 17.26 3.25 16.5 3.25H7.5C6.75 3.25 6.2 3.28 5.76 3.34C2.41 3.71 1.75 5.7 1.75 9V15C1.75 18.3 2.41 20.29 5.73 20.65C6.2 20.72 6.74 20.75 7.5 20.75H16.5C17.25 20.75 17.8 20.72 18.24 20.66C21.59 20.29 22.25 18.31 22.25 15V9C22.25 5.7 21.59 3.71 18.27 3.35Z"
                  fill="#fff"
                />
                <path
                  d="M17 10.75H13.5C13.09 10.75 12.75 10.41 12.75 10C12.75 9.59 13.09 9.25 13.5 9.25H17C17.41 9.25 17.75 9.59 17.75 10C17.75 10.41 17.41 10.75 17 10.75Z"
                  fill="#fff"
                />
                <path
                  d="M10.1 11C9.54998 11 9.09998 10.55 9.09998 10C9.09998 9.45 9.53998 9 10.1 9H10.11C10.66 9 11.11 9.45 11.11 10C11.11 10.55 10.66 11 10.1 11Z"
                  fill="#fff"
                />
                <path
                  d="M7.09998 11C6.54998 11 6.09998 10.55 6.09998 10C6.09998 9.45 6.53998 9 7.09998 9C7.64998 9 8.09998 9.45 8.09998 10C8.09998 10.55 7.65998 11 7.09998 11Z"
                  fill="#fff"
                />
                <path
                  d="M17 16.25H7.02001C6.61001 16.25 6.26001 15.91 6.26001 15.5C6.26001 15.09 6.59001 14.75 7.00001 14.75H17C17.41 14.75 17.75 15.09 17.75 15.5C17.75 15.91 17.41 16.25 17 16.25Z"
                  fill="#fff"
                />
              </svg>
              <span className="px-1 whitespace-nowrap">افزودن چک / سفته</span>
            </div>
          </Button>
        </div>
      )}
      {loanDocs.length > 0 && (
        <div className="px-1">
          <Tooltip title="فقط یک فایل میتوانید ارسال کنید!!!">
            <span>
              <Button
                disabled
                onClick={handleClickOpen}
                sx={{
                  fontSize: "12px",
                  width: "100%",
                  transition: "0.6s",
                  color: "#fff",
                  backgroundColor: "#556ee6",
                  "&:hover": {
                    backgroundColor: "#485ec4",
                  },
                  boxShadow: "none",
                }}
              >
                <div className="flex items-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.4"
                      d="M18.27 3.35C17.8 3.28 17.26 3.25 16.5 3.25H7.5C6.75 3.25 6.2 3.28 5.76 3.34C2.41 3.71 1.75 5.7 1.75 9V15C1.75 18.3 2.41 20.29 5.73 20.65C6.2 20.72 6.74 20.75 7.5 20.75H16.5C17.25 20.75 17.8 20.72 18.24 20.66C21.59 20.29 22.25 18.31 22.25 15V9C22.25 5.7 21.59 3.71 18.27 3.35Z"
                      fill="#fff"
                    />
                    <path
                      d="M17 10.75H13.5C13.09 10.75 12.75 10.41 12.75 10C12.75 9.59 13.09 9.25 13.5 9.25H17C17.41 9.25 17.75 9.59 17.75 10C17.75 10.41 17.41 10.75 17 10.75Z"
                      fill="#fff"
                    />
                    <path
                      d="M10.1 11C9.54998 11 9.09998 10.55 9.09998 10C9.09998 9.45 9.53998 9 10.1 9H10.11C10.66 9 11.11 9.45 11.11 10C11.11 10.55 10.66 11 10.1 11Z"
                      fill="#fff"
                    />
                    <path
                      d="M7.09998 11C6.54998 11 6.09998 10.55 6.09998 10C6.09998 9.45 6.53998 9 7.09998 9C7.64998 9 8.09998 9.45 8.09998 10C8.09998 10.55 7.65998 11 7.09998 11Z"
                      fill="#fff"
                    />
                    <path
                      d="M17 16.25H7.02001C6.61001 16.25 6.26001 15.91 6.26001 15.5C6.26001 15.09 6.59001 14.75 7.00001 14.75H17C17.41 14.75 17.75 15.09 17.75 15.5C17.75 15.91 17.41 16.25 17 16.25Z"
                      fill="#fff"
                    />
                  </svg>
                  <span className="px-1 whitespace-nowrap">
                    افزودن چک / سفته
                  </span>
                </div>
              </Button>
            </span>
          </Tooltip>
        </div>
      )}
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
          <span className="text-xl text-start flex justify-start items-center">
          افزودن{" "}
            {/* <Switch
              onChange={(e) => {
                setIsCheck(e);
                resetState();
              }}
              className="custom-switch mt-1"
              checkedChildren=" چک"
              unCheckedChildren=" سفته"
              defaultChecked
            /> */}
            <span className="px-1">
              
              {loanRequestData.loanRequestItems[activeStep].title}{" "}
            </span>
          </span>

          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        <div className="px-2">
          <Alert severity="error">
            {loanRequestData.loanRequestItems && (
              <div
                dangerouslySetInnerHTML={{
                  __html: loanRequestData.loanRequestItems[activeStep].body,
                }}
              />
            )}
          </Alert>
        </div>
        <div className="flex flex-wrap">
          {/* <div className=" w-full px-2 mt-3 flex justify-between">
            {!fileName && (
              <div>
                {!loading && (
                  <Button
                    sx={{
                      fontSize: "12px",
                      minWidth: "35px",
                      transition: "0.6s",
                      color: "#fff",
                      backgroundColor: "#556ee6",
                      whiteSpace: "nowrap",
                      "&:hover": {
                        backgroundColor: "#485ec4",
                      },
                      boxShadow: "none",
                    }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    {isCheck ? "بارگذاری تصویر چک" : "بارگذاری تصویر سفته"}

                    <VisuallyHiddenInput
                      type="file"
                      onChange={viewImgHandler}
                      multiple
                    />
                  </Button>
                )}
                {loading && (
                  <div className="flex justify-center items-center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleCancelUpload}
                    >
                      لغو آپلود
                    </Button>
                    <Box sx={{ marginX: 2 }}>
                      {loading && (
                        <Box
                          sx={{ position: "relative", display: "inline-flex" }}
                        >
                          <CircularProgress
                            size={30}
                            variant="determinate"
                            value={uploadProgress}
                          />
                          <Box
                            sx={{
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              variant="caption"
                              component="div"
                              sx={{ color: "text.secondary" }}
                            >
                              {`${Math.round(uploadProgress)}%`}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </div>
                )}
              </div>
            )}
            {fileName && (
              <div>
                <Chip
                  label={fileName}
                  variant="outlined"
                  onDelete={handleDeleteChip}
                />
              </div>
            )}
          </div> */}
          <div className="w-full flex justify-start px-2">
            <UploadImgDoc setFileName={setFileName} activeStep={activeStep} />
          </div>
          <div className="px-6 text-xs mt-2 w-full flex justify-start">
            <span>فرمت های قابل بارگذاری : </span>
            <span className="px-2">
              {loanRequestData.loanRequestItems[activeStep].fileExt}
            </span>
          </div>
          <div className="sm:w-1/2 w-full px-2 mt-3">
           
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">چک / سفته</InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={isCheck}
                label="چک / سفته"
                onChange={(e) => {
                  setIsCheck(e.target.value);
                  resetState();
                }}
              >
                <MenuItem value={true}>چک</MenuItem>
                <MenuItem value={false}>سفته</MenuItem>
              </Select>
            </FormControl>
          </div>
          {isCheck && (
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
          )}
          {!isCheck && (
            <div className="sm:w-1/2 w-full px-2 mt-3">
              <TextField
                disabled
                size="small"
                type="text"
                className="w-full"
                id="outlined-multiline-flexible"
                label="نام بانک*"
                name="name"
                value={"بانک ملی"}
              />
            </div>
          )}
          <div className="flex relative sm:w-1/2 w-full px-2 mt-3">
            <TextField
              size="small"
              label={isCheck ? "شماره چک *" : "شماره سفته *"}
              className="border rounded-lg w-full px-3"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={number}
              placeholder={isCheck ? "شماره چک..." : "شماره سفته..."}
              onChange={(e) => {
                const newValue = e.target.value;
                setNumber(newValue);
                setErrNumber(false);
              }}
              FormHelperTextProps={{ sx: { color: "red" } }}
              helperText={
                errNumber
                  ? isCheck
                    ? "لطفا شماره چک را وارد کنید"
                    : "لطفا شماره سفته را وارد کنید"
                  : ""
              }
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
          {isCheck && (
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
          )}
          {isCheck && (
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
          )}

          {isCheck && (
            <div className="sm:w-1/2 w-full px-2 mt-3">
              <TextField
                size="small"
                type="text"
                className="w-full"
                id="outlined-multiline-flexible"
                label="نام شعبه*"
                name="name"
                onChange={(e) => {
                  setBankBranch(e.target.value);
                  setErrBankBranch(false);
                  if (e.target.value === "") {
                    setErrBankBranch(true);
                  }
                }}
                value={bankBranch}
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
          )}
          {isCheck && (
            <div className="flex relative sm:w-1/2 w-full px-2 mt-3">
              <TextField
                size="small"
                label="شماره حساب *"
                className="border rounded-lg w-full px-3"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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
          )}
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
              label={isCheck ? "مبلغ چک*" : "مبلغ سفته*"}
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
              helperText={
                errAmount
                  ? isCheck
                    ? "لطفا مبلغ چک را وارد کنید"
                    : "لطفا مبلغ سفته را وارد کنید"
                  : ""
              }
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

        <Divider className="w-full" />
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
                    <span className="px-1">ارسال</span>
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
