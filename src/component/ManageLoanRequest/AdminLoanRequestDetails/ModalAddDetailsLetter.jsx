import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
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
import UploadImgDoc from "../../LoanRequest/LoanRequestDetails/UploadImgDoc";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

ModalAddDetailsLetter.propTypes = {
  setFlag: PropTypes.func,
  activeStep: PropTypes.number,
  loanDocs: PropTypes.array,
  item: PropTypes.number,
};
export default function ModalAddDetailsLetter({
  setFlag,
  activeStep,
  loanDocs,
  item,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const loanRequestData = useSelector(
    (store) => store.adminLoanRequest.loanRequestData
  );
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [number, setNumber] = useState("");
  const [errNumber, setErrNumber] = useState(false);

  const [date, setDate] = useState("");
  const [errDate, setErrDate] = useState(false);
  const [dateFa, setDateFa] = useState("");
  const [fileName, setFileName] = useState("");
  const [desc, setDesc] = useState("");
  const [letterSubject, setLetterSubject] = useState("0");
  const [errLetterSubject, setErrLetterSubject] = useState(false);

  //   const formatNumber = (num) => {
  //     return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   };

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
    setFileName("");
    setErrNumber(false);
    setErrLetterSubject(false);
    setErrDate(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

      if (!date) {
        setErrDate(true);
      }
      if (letterSubject === "0") {
        setErrLetterSubject(true);
      }

      if (number && date && letterSubject !== "0") {
        setIsLoading(true);
        let data = {
          requestId: loanRequestData.loanRequestDto.id,
          itemId: loanRequestData.loanRequestItems[activeStep].id,
          isFromAvailableFiles: false,
          fileName,
          desc,
          letterInfo: {
            letterSubject,
            letterNumber: number,
            letterDate: dateFa,
          },
        };

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
              text: "نامه درخواست با موفقیت ارسال شد",
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
          label="تاریخ نامه*"
          name="name"
          FormHelperTextProps={{ sx: { color: "red" } }}
          helperText={errDate ? "لطفا تاریخ نامه را وارد کنید" : ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errDate ? "red" : "",
              },
              "&:hover fieldset": {
                borderColor: errDate ? "red" : "",
              },
              "&.Mui-focused fieldset": {
                borderColor: errDate ? "red" : "",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: errDate ? "red" : "",
              "&.Mui-focused": { color: errDate ? "red" : "" },
            },
          }}
        />
        {value && (
          <AiOutlineClose
            onClick={() => {
              setDate("");
              setDateFa("");
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
          {loanRequestData.cooperativeLoanDocs.filter(
            (e) => e.itemId === item.id
          ).length > 0 && (
            <Tooltip title="فقط یک فایل مجاز است">
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
                      افزودن نامه درخواست
                    </span>
                  </div>
                </Button>
              </span>
            </Tooltip>
          )}
          {loanRequestData.cooperativeLoanDocs.filter(
            (e) => e.itemId === item.id
          ).length === 0 && (
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
                <span className="px-1 whitespace-nowrap">
                  افزودن نامه درخواست
                </span>
              </div>
            </Button>
          )}
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
                    افزودن نامه درخواست
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
            افزودن نامه درخواست
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
          <div className="w-full flex justify-start px-2">
            <UploadImgDoc setFileName={setFileName} />
          </div>
          <div className="sm:w-1/3 w-full px-2 mt-3 relative">
            <FormControl fullWidth error={errLetterSubject}>
              <InputLabel id="demo-simple-select-label">
                موضوع درخواست
              </InputLabel>
              <Select
                sx={{
                  color: errLetterSubject ? "red" : "",
                }}
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={letterSubject}
                label="موضوع درخواست"
                onChange={(e) => {
                  setLetterSubject(e.target.value);
                  setErrLetterSubject(false);
                }}
              >
                <MenuItem disabled sx={{ display: "none" }} value={"0"}>
                  <em>انتخاب کنید</em>
                </MenuItem>
                <MenuItem value={"خرید جو"}>خرید جو</MenuItem>
                <MenuItem value={"خرید کنسانتره"}>خرید کنسانتره</MenuItem>
                <MenuItem value={"خرید علوفه"}>خرید علوفه</MenuItem>
                <MenuItem value={"خرید سبوس"}>خرید سبوس</MenuItem>
                <MenuItem value={"خرید ذرت"}>خرید ذرت</MenuItem>
                <MenuItem value={"خرید سویا"}>خرید سویا</MenuItem>
                <MenuItem value={"خرید خرما"}>خرید خرما</MenuItem>
                <MenuItem value={"سایر"}>سایر</MenuItem>
              </Select>
              {errLetterSubject && (
                <FormHelperText
                  sx={{ color: "red", fontWeight: "500", whiteSpace: "nowrap" }}
                >
                  لطفا موضوع درخواست را انتخاب کنید
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className="flex relative sm:w-1/3 w-full px-2 mt-3">
            <TextField
              size="small"
              label="شماره نامه *"
              className="border rounded-lg w-full px-3"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={number}
              placeholder="شماره نامه..."
              onChange={(e) => {
                const newValue = e.target.value;
                setNumber(newValue);
                setErrNumber(false);
              }}
              FormHelperTextProps={{ sx: { color: "red" } }}
              helperText={errNumber ? "لطفا شماره نامه را وارد کنید" : ""}
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
          <div className="sm:w-1/3 relative w-full px-2 mt-3">
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
              value={date}
              onChange={(event) => {
                setDate(event);
                setDateFa(event.format("YYYY/MM/DD"));
                setErrDate(false);
              }}
            />
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

        <div className="py-2">
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
