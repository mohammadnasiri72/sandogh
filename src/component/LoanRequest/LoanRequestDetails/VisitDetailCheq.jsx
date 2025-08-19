import {
  Dialog,
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
import Num2persian from "num2persian";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import { CgClose } from "react-icons/cg";
import DatePicker from "react-multi-date-picker";
import { useSelector } from "react-redux";
import { mainDomain } from "../../../utils/mainDomain";
import moment from "jalali-moment";
import { MdOutlineAttachFile } from "react-icons/md";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

VisitDetailCheq.propTypes = {
  loanDocs: PropTypes.object,
};
export default function VisitDetailCheq({ loanDocs }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const [number2, setNumber2] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [dateCheq, setDateCheq] = useState("");
  const [desc, setDesc] = useState("");

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
      setTitle(loanDocs.checkInfo.title);
      setDateCheq(gregorianDate);
      setNumber(loanDocs.checkInfo.number);
      setNumber2(loanDocs.checkInfo.number2);
      setBankName(loanDocs.checkInfo.bankName);
      setBankBranch(loanDocs.checkInfo.bankBranch);
      setBankAccount(loanDocs.checkInfo.bankAccount);
      setAmount(String(loanDocs.checkInfo.amount));
      setDesc(loanDocs.fileDesc);
    }
  }, [loanDocs]);

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
          label="تاریخ چک"
          name="name"
        />
      </div>
    );
  }
  return (
    <>
      <div className="px-1">
        <Tooltip title="جزئیات چک">
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
          <span className="text-xl">
            <span>اطلاعات</span>
            <span>{' '} { title }</span>
          </span>

          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        {loanDocs.checkInfo?.typeId === 1 && (
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
                disabled
              />
            </div>
            <div className="flex relative sm:w-1/2 w-full px-2 mt-3">
              <TextField
                disabled
                size="small"
                label="شماره چک *"
                className="border rounded-lg w-full px-3"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                value={number}
                placeholder="شماره چک..."
              />
            </div>
            <div className="flex relative sm:w-1/2 w-full px-2 mt-3">
              <TextField
                disabled
                size="small"
                label="شماره صیاد *"
                className="border rounded-lg w-full px-3"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                value={number2}
                placeholder="شماره صیاد..."
              />
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
            <div className="sm:w-1/2 w-full px-2 mt-3">
              <TextField
                disabled
                size="small"
                type="text"
                className="w-full"
                id="outlined-multiline-flexible"
                label="نام شعبه*"
                name="name"
                value={bankBranch}
              />
            </div>
            <div className="flex relative sm:w-1/2 w-full px-2 mt-3">
              <TextField
                disabled
                size="small"
                label="شماره حساب *"
                className="border rounded-lg w-full px-3"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                value={bankAccount}
                placeholder="شماره حساب..."
              />
            </div>
            <div className="sm:w-1/2 w-full px-2 mt-3">
              <TextField
                disabled
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
              />
              {amount && (
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
        {loanDocs.checkInfo?.typeId === 2 && (
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
                disabled
                size="small"
                label="شماره سفته *"
                className="border rounded-lg w-full px-3"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                value={number}
                placeholder="شماره سفته..."
              />
            </div>
            <div className="sm:w-1/2 w-full px-2 mt-3">
              <TextField
                disabled
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
      </Dialog>
    </>
  );
}
