import {
  Button,
  CircularProgress,
  Dialog,
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
import moment from "jalali-moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import { AiOutlineClose } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { IoMdReturnLeft } from "react-icons/io";
import { MdOutlineAttachFile, MdOutlineDone } from "react-icons/md";
import DatePicker from "react-multi-date-picker";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../../utils/mainDomain";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

ModalDetailsLetter.propTypes = {
  loanDocs: PropTypes.object,
  setFlag: PropTypes.func,
  id: PropTypes.number,
};
export default function ModalDetailsLetter({ loanDocs, setFlag, id }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);

  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [errNumber, setErrNumber] = useState(false);
  const [date, setDate] = useState("");
  const [dateFa, setDateFa] = useState("");
  const [errDate, setErrDate] = useState(false);
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [letterSubject, setLetterSubject] = useState("0");
  const [errLetterSubject, setErrLetterSubject] = useState(false);

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
    if (loanDocs.letterInfo?.letterDate && open) {
      const gregorianDate = getGregorianDate(loanDocs.letterInfo?.letterDate);
      setDate(gregorianDate);
      setDateFa(loanDocs.letterInfo?.letterDate);
      setNumber(loanDocs.letterInfo?.letterNumber);
      setLetterSubject(loanDocs.letterInfo?.letterSubject);
      setDesc(loanDocs.fileDesc);
    }
  }, [loanDocs, open]);
  

  // const formatNumber = (num) => {
  //   return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // };
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const resetState = () => {
    setErrNumber(false);
    setErrLetterSubject(false);
    setErrDate(false);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  const handleView = (fileUrl) => {
    window.open(mainDomain + fileUrl, "_blank");
  };

  const submitFormHandler = () => {
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
        id,
        letterInfo: {
          letterSubject,
          letterNumber: number,
          letterDate: dateFa,
        },
      };

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
            text: "نامه درخواست با موفقیت ویرایش شد",
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
      <div className="px-1">
        {/* <Tooltip title="جزئیات نامه درخواست">
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
        <Tooltip title="جزئیات نامه درخواست">
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
          sx: { width: "600px", maxWidth: "none", pb: 1 },
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
          <span className="text-xl">ویرایش نامه درخواست</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>

        <div className="flex flex-wrap">
          {/* <div className="w-full flex justify-start p-1">
           
            <span
              className="flex cursor-pointer items-center text-teal-500"
              onClick={() => {
                handleView(loanDocs.fileUrl);
              }}
            >
              <MdOutlineAttachFile />
              <span>مشاهده فایل</span>
            </span>
          </div> */}
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
        <div className="py-2">
          <Divider className="w-full" />
        </div>
        <div>
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
        </div>
      </Dialog>
    </>
  );
}
