/* eslint-disable react/prop-types */

import {
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { makeStyles } from "@mui/styles";
import "animate.css";
import axios from "axios";
import Num2persian from "num2persian";
import PropTypes from "prop-types";
import * as React from "react";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import { AiOutlineClose } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
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

ModalAddCapital.propTypes = {
  setFlag: PropTypes.func,
  level: PropTypes.number,
};
export default function ModalAddCapital({ setFlag, level }) {
  const cooperativeId = useSelector((store) => store.cooperative.cooperativeId);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [capital, setCapital] = React.useState("");
  const [errCapital, setErrCapital] = React.useState(false);
  const [sharesNumber, setSharesNumber] = React.useState("");
  const [errSharesNumber, setErrSharesNumber] = React.useState(false);
  const [fi, setFi] = React.useState("10000");
  const [errFi, setErrFi] = React.useState(false);
  const [totalShares, setTotalShares] = React.useState("");
  const [percentage, setPercentage] = React.useState("");
  const [showLetter, setShowLetter] = React.useState(false);
  const [showLetter2, setShowLetter2] = React.useState(false);
  const [showLetter3, setShowLetter3] = React.useState(false);

  const [dateFaRegister, setDateFaRegister] = React.useState(new Date());
  const [registerDateFa, setRegisterDateFa] = React.useState(
    new Date().toLocaleDateString("fa-IR")
  );
  const [errRegisterDateFa, setErrRegisterDateFa] = React.useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

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
    setCapital("");
    setSharesNumber("");
    setFi("");
    setTotalShares("");
    setPercentage("");
    setErrCapital(false);
    setErrSharesNumber(false);
    setErrFi(false);
    setDateFaRegister(new Date());
    setErrRegisterDateFa(false);
    setRegisterDateFa(new Date().toLocaleDateString("fa-IR"));
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  const formatNumber = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const handleChangeCapital = (event) => {
    if (event.target.value.length < 20) {
      setErrCapital(false);
      const rawValue = event.target.value.replace(/,/g, "");
      if (/^\d*$/.test(rawValue)) {
        setCapital(rawValue);
      }
    }
  };
  const handleChangeSharesNumber = (event) => {
    if (event.target.value.length < 20) {
      setErrSharesNumber(false);
      const rawValue = event.target.value.replace(/,/g, "");
      if (/^\d*$/.test(rawValue)) {
        setSharesNumber(rawValue);
      }
    }
  };
  const handleChangeFi = (event) => {
    if (event.target.value.length < 20) {
      setErrFi(false);
      const rawValue = event.target.value.replace(/,/g, "");
      if (/^\d*$/.test(rawValue)) {
        setFi(rawValue);
      }
    }
  };

  React.useEffect(() => {
    if (sharesNumber && fi) {
      setTotalShares(String(Number(sharesNumber) * Number(fi)));
    }
    if (!sharesNumber || !fi) {
      setTotalShares("");
    }
  }, [sharesNumber, fi]);

  React.useEffect(() => {
    if (totalShares && capital) {
      setPercentage((Number(totalShares) / Number(capital)*100).toFixed(3));
    }
    if (!totalShares || !capital) {
      setPercentage("");
    }
  }, [totalShares, capital]);

  const submitFormHandler = () => {
    if (!capital) {
      setErrCapital(true);
    }
    if (!registerDateFa) {
      setErrRegisterDateFa(true);
    }
    if (!sharesNumber) {
      setErrSharesNumber(true);
    }
    if (!fi) {
      setErrFi(true);
    }
    if (capital && registerDateFa && sharesNumber && fi) {
      const data = {
        id: 0,
        cooperativeId: Number(cooperativeId),
        step: level,
        capital: Number(capital),
        sharesNumber: Number(sharesNumber),
        fi: Number(fi),
        registerDateFa,
      };
      setIsLoading(true);
      axios
        .post(mainDomain + `/api/Capital/Save`, data, {
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
            text: "سرمایه جدید با موفقیت ثبت شد",
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
          label="تاریخ ثبت*"
          name="name"
          FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
          helperText={errRegisterDateFa ? "لطفا تاریخ ثبت را وارد کنید" : ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errRegisterDateFa ? "red" : "",
              },
              "&:hover fieldset": {
                borderColor: errRegisterDateFa ? "red" : "",
              },
              "&.Mui-focused fieldset": {
                borderColor: errRegisterDateFa ? "red" : "",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: errRegisterDateFa ? "red" : "",
              "&.Mui-focused": { color: errRegisterDateFa ? "red" : "" },
            },
          }}
        />
        {value && (
          <AiOutlineClose
            onClick={() => {
              setDateFaRegister("");
              setRegisterDateFa("");
              setErrRegisterDateFa(true);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
          />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-start items-center">
        <Button
          onClick={handleClickOpen}
          sx={{
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
            <span className="px-1">افزودن</span>
          </div>
        </Button>
      </div>
      <Dialog
        scroll={"paper"}
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
          <span className="text-xl">افزایش سرمایه</span>

          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        <div className="mt-2">
          <Chip label={`مرحله ${level}`} />
        </div>
        <div className=" flex flex-wrap items-start  pb-4">
          <div className="sm:w-1/2 w-full px-2 mt-5">
            <TextField
              className="w-full"
              size="small"
              label="سرمایه صندوق"
              variant="outlined"
              type="text"
              value={formatNumber(capital)}
              onChange={handleChangeCapital}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errCapital ? "سرمایه صندوق را وارد کنید" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errCapital ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errCapital ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errCapital ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errCapital ? "red" : "",
                  "&.Mui-focused": { color: errCapital ? "red" : "" },
                },
              }}
              onFocus={() => {
                setShowLetter(true);
              }}
              onBlur={() => {
                setShowLetter(false);
              }}
            />
            {capital && showLetter && (
              <span className="flex justify-start text-xs ">
                {Num2persian(Number(capital))} تومان{" "}
              </span>
            )}
          </div>
          <div className="sm:w-1/2 w-full px-2 mt-5">
            <DatePicker
              className={
                themeMode === "dark" ? "rmdp-mobile bg-dark" : "rmdp-mobile"
              }
              containerStyle={{
                width: "100%",
                margin: "auto",
              }}
              format="DD MMMM YYYY"
              render={<CustomMultipleInput />}
              calendarPosition="bottom-right"
              locale={persianFa}
              calendar={persian}
              value={dateFaRegister}
              onChange={(event) => {
                setDateFaRegister(event);
                setRegisterDateFa(event.format("YYYY/MM/DD"));
                setErrRegisterDateFa(false);
              }}
            />
          </div>
          <div className="sm:w-1/4 w-full px-2 mt-5">
            <TextField
              className="w-full"
              size="small"
              label="تعداد سهم"
              variant="outlined"
              type="text"
              value={formatNumber(sharesNumber)}
              onChange={handleChangeSharesNumber}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errSharesNumber ? "تعداد سهم را وارد کنید" : ""}
              sx={{
                "& .MuiInputLabel-root": { fontSize: "12px" },
                "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled":
                  { fontSize: "1rem" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errSharesNumber ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errSharesNumber ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errSharesNumber ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errSharesNumber ? "red" : "",
                  "&.Mui-focused": { color: errSharesNumber ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="sm:w-1/4 w-full px-2 mt-5">
            <TextField
              className="w-full"
              size="small"
              label="قیمت هر سهم"
              variant="outlined"
              type="text"
              value={formatNumber(fi)}
              onChange={handleChangeFi}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errFi ? "قیمت سهم را وارد کنید" : ""}
              sx={{
                "& .MuiInputLabel-root": { fontSize: "12px" },
                "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled":
                  { fontSize: "1rem" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errFi ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errFi ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errFi ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errFi ? "red" : "",
                  "&.Mui-focused": { color: errFi ? "red" : "" },
                },
              }}
              onFocus={() => {
                setShowLetter2(true);
              }}
              onBlur={() => {
                setShowLetter2(false);
              }}
            />
            {fi && showLetter2 && (
              <span className="flex justify-start text-xs ">
                {Num2persian(Number(fi))} تومان{" "}
              </span>
            )}
          </div>
          <div className="sm:w-1/4 w-full px-2 mt-5">
            <TextField
              sx={{
                "& .MuiInputLabel-root": { fontSize: "12px" },
                "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled":
                  { fontSize: "1rem" },
              }}
              disabled
              className="w-full"
              size="small"
              label="مبلغ کل سهام"
              variant="outlined"
              type="text"
              value={formatNumber(totalShares)}
              onFocus={() => {
                setShowLetter3(true);
              }}
              onBlur={() => {
                setShowLetter3(false);
              }}
            />
            {totalShares && showLetter3 && (
              <span
                className={
                  themeMode === "dark"
                    ? "flex justify-start text-xs text-[#fff5]"
                    : "flex justify-start text-xs text-[#0005]"
                }
              >
                {Num2persian(Number(totalShares))} تومان{" "}
              </span>
            )}
          </div>
          <div className="sm:w-1/4 w-full px-2 mt-5">
            <TextField
              sx={{
                "& .MuiInputLabel-root": { fontSize: "12px" },
                "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled":
                  { fontSize: "1rem" },
              }}
              disabled
              className="w-full"
              size="small"
              label="درصد سهم از کل سهام"
              variant="outlined"
              type="text"
              value={percentage}
            />
          </div>
        </div>
        <div className="flex justify-center px-2">
          <Divider className="w-full" />
        </div>
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
