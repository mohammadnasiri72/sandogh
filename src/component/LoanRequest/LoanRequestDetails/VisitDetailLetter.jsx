import {
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "jalali-moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import { CgClose } from "react-icons/cg";
import DatePicker from "react-multi-date-picker";
import { useSelector } from "react-redux";
import { mainDomain } from "../../../utils/mainDomain";
import { MdOutlineAttachFile } from "react-icons/md";

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

VisitDetailLetter.propTypes = {
  loanDocs: PropTypes.object,
  activeStep: PropTypes.number,
  setFlag: PropTypes.func,
};
export default function VisitDetailLetter({ loanDocs }) {
  const themeMode = useSelector((store) => store.setting.themeMode);

  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [errNumber, setErrNumber] = useState(false);
  const [date, setDate] = useState("");
  const [errDate, setErrDate] = useState(false);
  const [desc, setDesc] = useState(false);
  const [letterSubject, setLetterSubject] = useState("خرید جو");

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
    if (loanDocs.letterInfo?.letterDate) {
      const gregorianDate = getGregorianDate(loanDocs.letterInfo?.letterDate);
      setDate(gregorianDate);
      setNumber(loanDocs.letterInfo?.letterNumber);
      setDesc(loanDocs.fileDesc);
      setLetterSubject(loanDocs.letterInfo?.letterSubject);
    }
  }, [loanDocs, open]);

  // const formatNumber = (num) => {
  //   return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // };
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleView = (fileUrl) => {
    window.open(mainDomain + fileUrl, "_blank");
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
          disabled
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
      </div>
    );
  }
  return (
    <>
      <div className="px-1">
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
                d="M21.25 9.06449C18.94 5.46842 15.56 3.39795 12 3.39795C10.22 3.39795 8.49 3.91309 6.91 4.87402C5.33 5.84487 3.91 7.2615 2.75 9.06449C1.75 10.6198 1.75 13.146 2.75 14.7013C5.06 18.3073 8.44 20.3679 12 20.3679C13.78 20.3679 15.51 19.8527 17.09 18.8918C18.67 17.9209 20.09 16.5043 21.25 14.7013C22.25 13.1559 22.25 10.6198 21.25 9.06449ZM12 15.8901C9.76 15.8901 7.96 14.097 7.96 11.8879C7.96 9.6787 9.76 7.88561 12 7.88561C14.24 7.88561 16.04 9.6787 16.04 11.8879C16.04 14.097 14.24 15.8901 12 15.8901Z"
                fill="#1787B0"
              />
              <path
                d="M12 9.05457C10.43 9.05457 9.15002 10.3226 9.15002 11.8878C9.15002 13.4432 10.43 14.7112 12 14.7112C13.57 14.7112 14.86 13.4432 14.86 11.8878C14.86 10.3325 13.57 9.05457 12 9.05457Z"
                fill="#1787B0"
              />
            </svg>
          </IconButton>
        </Tooltip>
      </div>
      <Dialog
        PaperProps={{
          className: classes.animatedDialog,
          sx: { width: "600px", maxWidth: "none", pb: 2 },
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
          <span className="text-xl">جزئیات نامه درخواست</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full flex justify-start p-1">
            {/* <img
              onClick={() => {
                handleView(loanDocs.fileUrl);
              }}
              className="w-20 h-20 object-contain rounded-full border cursor-pointer"
              src={mainDomain + loanDocs.fileUrl}
              alt=""
            /> */}
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
            <FormControl fullWidth disabled>
              <InputLabel disabled id="demo-simple-select-label">
                موضوع درخواست
              </InputLabel>
              <Select
                disabled
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={letterSubject}
                label="موضوع درخواست"
                // onChange={(e) => {
                //   setLetterSubject(e.target.value);
                // }}
              >
                <MenuItem value={"خرید جو"}>خرید جو</MenuItem>
                <MenuItem value={"خرید کنسانتره"}>خرید کنسانتره</MenuItem>
                <MenuItem value={"خرید علوفه"}>خرید علوفه</MenuItem>
                <MenuItem value={"خرید سبوس"}>خرید سبوس</MenuItem>
                <MenuItem value={"خرید ذرت"}>خرید ذرت</MenuItem>
                <MenuItem value={"خرید سویا"}>خرید سویا</MenuItem>
                <MenuItem value={"خرید خرما"}>خرید خرما</MenuItem>
                <MenuItem value={"سایر"}>سایر</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="flex relative sm:w-1/3 w-full px-2 mt-3">
            <TextField
              disabled
              size="small"
              label="شماره نامه *"
              className="border rounded-lg w-full px-3"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={number}
              placeholder="شماره نامه..."
              onChange={(e) => {
                const newValue = e.target.value.replace(/[^\d]/g, "");
                setNumber(newValue.replace(/,/g, ""));
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
      </Dialog>
    </>
  );
}
