/* eslint-disable react/prop-types */

import {
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
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

ModalAddShareHolder.propTypes = {
  getShareHolderList: PropTypes.func,
};
export default function ModalAddShareHolder({ getShareHolderList }) {
  const cooperativeId = useSelector((store) => store.cooperative.cooperativeId);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  //   real
  const [name, setName] = React.useState("");
  const [errName, setErrName] = React.useState(false);
  const [family, setFamily] = React.useState("");
  const [errFamily, setErrFamily] = React.useState(false);
  const [fatherName, setFatherName] = React.useState("");
  const [errFatherName, setErrFatherName] = React.useState(false);
  const [placeBrith, setPlaceBrith] = React.useState("");
  const [errPlaceBrith, setErrPlaceBrith] = React.useState(false);
  const [nationalCode, setNationalCode] = React.useState("");
  const [errNationalCode, setErrNationalCode] = React.useState(false);
  const [shSh, setShSh] = React.useState("");
  const [errShSh, setErrShSh] = React.useState(false);
  const [dateFaBirth, setDateFaBirth] = React.useState(new Date());
  const [brithDateFa, setBrithDateFa] = React.useState(
    new Date().toLocaleDateString("fa-IR")
  );
  const [errBrithDateFa, setErrBrithDateFa] = React.useState(false);
  const [mobile, setMobile] = React.useState("");
  const [errMobile, setErrMobile] = React.useState(false);
  //   legal
  const [companyName, setCompanyName] = React.useState("");
  const [errCompanyName, setErrCompanyName] = React.useState(false);
  const [registerNumber, setRegisterNumber] = React.useState("");
  const [errRegisterNumber, setErrRegisterNumber] = React.useState(false);
  const [nationalId, setNationalId] = React.useState("");
  const [errNationalId, setErrNationalId] = React.useState(false);
  const [dateFaregister, setDateFaregister] = React.useState(new Date());
  const [registerDateFa, setRegisterDateFa] = React.useState(
    new Date().toLocaleDateString("fa-IR")
  );
  const [errRegisterDateFa, setErrRegisterDateFa] = React.useState(false);
  const [tel, setTel] = React.useState("");
  const [errTel, setErrTel] = React.useState(false);

  const [isLegal, setIsLegal] = React.useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const paternMobile = /^09[0|1|2|3|9][0-9]{8}$/;

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
    setName("");
    setFamily("");
    setFatherName("");
    setPlaceBrith("");
    setNationalCode("");
    setShSh("");
    setErrName(false);
    setErrFamily(false);
    setErrFatherName(false);
    setErrPlaceBrith(false);
    setErrMobile(false);
    setErrNationalCode(false);
    setErrShSh(false);
    setDateFaBirth(new Date());
    setRegisterDateFa(new Date().toLocaleDateString("fa-IR"));
    setErrRegisterDateFa(false);
    setTel("");
    setErrTel(false);
    setIsLegal(false);
    setCompanyName("");
    setRegisterNumber("");
    setNationalId("");
    setErrCompanyName(false);
    setErrRegisterNumber(false);
    setErrNationalId(false);
    setDateFaregister(new Date());
    setRegisterDateFa(new Date().toLocaleDateString("fa-IR"));
    setErrRegisterDateFa(false);
    setMobile('')
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  const submitFormHandler = () => {
    if (!isLegal) {
      if (!name) {
        setErrName(true);
      }
      if (!family) {
        setErrFamily(true);
      }
      if (!fatherName) {
        setErrFatherName(true);
      }
      if (!placeBrith) {
        setErrPlaceBrith(true);
      }
      if (nationalCode.length !==10) {
        setErrNationalCode(true);
      }
      if (!shSh) {
        setErrShSh(true);
      }
      if (!brithDateFa) {
        setErrBrithDateFa(true);
      }
      if (!mobile.match(paternMobile) && mobile.length > 0) {
        setErrMobile(true);
      }
      if (
        name &&
        family &&
        fatherName &&
        placeBrith &&
        nationalCode.length ===10 &&
        shSh &&
        brithDateFa &&
        (mobile.match(paternMobile) || !mobile)
      ) {
        const data = {
          id: 0,
          cooperativeId: Number(cooperativeId),
          name,
          family,
          fatherName,
          placeBrith,
          nationalCode,
          shSh,
          mobile,
          brithDateFa,
          education: "",
        };
        setIsLoading(true);
        axios
          .post(mainDomain + `/api/Cooperative/ShareHolder/Real`, data, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then(() => {
            setIsLoading(false);
            handleClose();
            getShareHolderList();
            Toast.fire({
              icon: "success",
              text: "سهامدار جدید با موفقیت افزوده شد",
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
    if (isLegal) {
      if (!companyName) {
        setErrCompanyName(true);
      }
      if (!registerNumber) {
        setErrRegisterNumber(true);
      }
      if (!nationalId) {
        setErrNationalId(true);
      }
      if (!registerDateFa) {
        setErrRegisterDateFa(true);
      }
      if (!tel.match(paternMobile) && tel.length > 0) {
        setErrTel(true);
      }
      if (
        companyName &&
        registerNumber &&
        nationalId &&
        registerDateFa &&
        (tel.match(paternMobile) || !tel)
      ) {
        const data = {
          id: 0,
          cooperativeId: Number(cooperativeId),
          companyName,
          registerNumber,
          nationalId,
          mobile: tel,
          registerDateFa,
        };
        setIsLoading(true);
        axios
          .post(mainDomain + `/api/Cooperative/ShareHolder/Legal`, data, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then(() => {
            setIsLoading(false);
            handleClose();
            getShareHolderList();
            Toast.fire({
              icon: "success",
              text: "سهامدار جدید با موفقیت افزوده شد",
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
          label="تاریخ تولد*"
          name="name"
          FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
          helperText={errBrithDateFa ? "لطفا تاریخ تولد را وارد کنید" : ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errBrithDateFa ? "red" : "",
              },
              "&:hover fieldset": {
                borderColor: errBrithDateFa ? "red" : "",
              },
              "&.Mui-focused fieldset": {
                borderColor: errBrithDateFa ? "red" : "",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: errBrithDateFa ? "red" : "",
              "&.Mui-focused": { color: errBrithDateFa ? "red" : "" },
            },
          }}
        />
        {value && (
          <AiOutlineClose
            onClick={() => {
              setDateFaBirth("");
              setBrithDateFa("");
              setErrBrithDateFa(true);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
          />
        )}
      </div>
    );
  }

  CustomMultipleInput2.propTypes = {
    onFocus: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };
  function CustomMultipleInput2({ onFocus, value, onChange }) {
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
              setDateFaregister("");
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
      <div className="w-full flex justify-start items-center">
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
          <span className="text-xl">افزودن سهامدار</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        <div className=" flex flex-wrap items-start pb-4">
          <div className="w-full">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="real"
              name="radio-buttons-group"
              sx={{ width: "100%" }}
              onChange={(e) => {
                if (e.target.value === "real") {
                  setIsLegal(false);
                }
                if (e.target.value === "legal") {
                  setIsLegal(true);
                }
              }}
            >
              <div className="flex justify-center w-full">
                <FormControlLabel
                  value="real"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
                        },
                      }}
                    />
                  }
                  label="حقیقی"
                />
                <FormControlLabel
                  value="legal"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
                        },
                      }}
                    />
                  }
                  label="حقوقی"
                />
              </div>
            </RadioGroup>
          </div>
          {!isLegal && (
            <div className="flex w-full flex-wrap">
              <div className="sm:w-1/3 w-full px-2 mt-5">
                <TextField
                  size="small"
                  type="text"
                  className="w-full"
                  id="outlined-multiline-flexible"
                  label="نام*"
                  name="name"
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrName(false);
                    if (e.target.value === "") {
                      setErrName(true);
                    }
                  }}
                  value={name}
                  FormHelperTextProps={{
                    sx: { color: "red", fontSize: "10px" },
                  }}
                  helperText={errName ? "لطفا نام را وارد کنید" : ""}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errName ? "red" : "",
                      },
                      "&:hover fieldset": {
                        borderColor: errName ? "red" : "",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errName ? "red" : "",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: errName ? "red" : "",
                      "&.Mui-focused": { color: errName ? "red" : "" },
                    },
                  }}
                />
              </div>
              <div className="sm:w-1/3 w-full px-2 mt-5">
                <TextField
                  size="small"
                  type="text"
                  className="w-full"
                  id="outlined-multiline-flexible"
                  label="نام خانوادگی*"
                  name="name"
                  onChange={(e) => {
                    setFamily(e.target.value);
                    setErrFamily(false);
                    if (e.target.value === "") {
                      setErrFamily(true);
                    }
                  }}
                  value={family}
                  FormHelperTextProps={{
                    sx: { color: "red", fontSize: "10px" },
                  }}
                  helperText={errFamily ? "لطفا نام خانوادگی را وارد کنید" : ""}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errFamily ? "red" : "",
                      },
                      "&:hover fieldset": {
                        borderColor: errFamily ? "red" : "",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errFamily ? "red" : "",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: errFamily ? "red" : "",
                      "&.Mui-focused": { color: errFamily ? "red" : "" },
                    },
                  }}
                />
              </div>
              <div className="sm:w-1/3 w-full px-2 mt-5">
                <TextField
                  size="small"
                  type="text"
                  className="w-full"
                  id="outlined-multiline-flexible"
                  label="نام پدر*"
                  name="name"
                  onChange={(e) => {
                    setFatherName(e.target.value);
                    setErrFatherName(false);
                    if (e.target.value === "") {
                      setErrFatherName(true);
                    }
                  }}
                  value={fatherName}
                  FormHelperTextProps={{
                    sx: { color: "red", fontSize: "10px" },
                  }}
                  helperText={errFatherName ? "لطفا نام پدر را وارد کنید" : ""}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errFatherName ? "red" : "",
                      },
                      "&:hover fieldset": {
                        borderColor: errFatherName ? "red" : "",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errFatherName ? "red" : "",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: errFatherName ? "red" : "",
                      "&.Mui-focused": { color: errFatherName ? "red" : "" },
                    },
                  }}
                />
              </div>
              <div className="sm:w-1/3 w-full px-2 mt-5">
                <TextField
                  size="small"
                  type="text"
                  className="w-full"
                  id="outlined-multiline-flexible"
                  label="محل تولد*"
                  name="name"
                  onChange={(e) => {
                    setPlaceBrith(e.target.value);
                    setErrPlaceBrith(false);
                    if (e.target.value === "") {
                      setErrPlaceBrith(true);
                    }
                  }}
                  value={placeBrith}
                  FormHelperTextProps={{
                    sx: { color: "red", fontSize: "10px" },
                  }}
                  helperText={errPlaceBrith ? "لطفا محل تولد را وارد کنید" : ""}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errPlaceBrith ? "red" : "",
                      },
                      "&:hover fieldset": {
                        borderColor: errPlaceBrith ? "red" : "",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errPlaceBrith ? "red" : "",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: errPlaceBrith ? "red" : "",
                      "&.Mui-focused": { color: errPlaceBrith ? "red" : "" },
                    },
                  }}
                />
              </div>
              <div className="sm:w-1/3 w-full px-2 mt-5">
                <TextField
                  size="small"
                  type="tel"
                  className="w-full"
                  id="outlined-multiline-flexible"
                  label="کد ملی*"
                  name="name"
                  onChange={(e) => {
                    setNationalCode(e.target.value);
                    setErrNationalCode(false);
                    if (e.target.value === "") {
                      setErrNationalCode(true);
                    }
                  }}
                  value={nationalCode}
                  FormHelperTextProps={{
                    sx: { color: "red", fontSize: "10px" },
                  }}
                  helperText={errNationalCode ? "کد ملی صحیح نیست" : ""}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errNationalCode ? "red" : "",
                      },
                      "&:hover fieldset": {
                        borderColor: errNationalCode ? "red" : "",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errNationalCode ? "red" : "",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: errNationalCode ? "red" : "",
                      "&.Mui-focused": {
                        color: errNationalCode ? "red" : "",
                      },
                    },
                  }}
                />
              </div>
              <div className="sm:w-1/3 w-full px-2 mt-5">
                <TextField
                  size="small"
                  type="tel"
                  className="w-full"
                  id="outlined-multiline-flexible"
                  label="شماره شناسنامه*"
                  name="name"
                  onChange={(e) => {
                    setShSh(e.target.value);
                    setErrShSh(false);
                    if (e.target.value === "") {
                      setErrShSh(true);
                    }
                  }}
                  value={shSh}
                  FormHelperTextProps={{
                    sx: { color: "red", fontSize: "10px" },
                  }}
                  helperText={errShSh ? "شماره شناسنامه صحیح نیست" : ""}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errShSh ? "red" : "",
                      },
                      "&:hover fieldset": {
                        borderColor: errShSh ? "red" : "",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errShSh ? "red" : "",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: errShSh ? "red" : "",
                      "&.Mui-focused": { color: errShSh ? "red" : "" },
                    },
                  }}
                />
              </div>
              <div className="flex relative sm:w-1/3 w-full px-2 mt-5">
                <TextField
                  size="small"
                  label=" شماره همراه"
                  className="border rounded-lg w-full px-3"
                  value={mobile}
                  type="tel"
                  onChange={(e) => {
                    setMobile(e.target.value);
                    setErrMobile(false);
                  }}
                  FormHelperTextProps={{
                    sx: { color: "red", fontSize: "10px" },
                  }}
                  helperText={
                    errMobile &&
                    !mobile.match(paternMobile) &&
                    mobile.length > 0
                      ? "شماره همراه درست نیست"
                      : ""
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor:
                          errMobile &&
                          !mobile.match(paternMobile) &&
                          mobile.length > 0
                            ? "red"
                            : "",
                      },
                      "&:hover fieldset": {
                        borderColor:
                          errMobile &&
                          !mobile.match(paternMobile) &&
                          mobile.length > 0
                            ? "red"
                            : "",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor:
                          errMobile &&
                          !mobile.match(paternMobile) &&
                          mobile.length > 0
                            ? "red"
                            : "",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color:
                        errMobile &&
                        !mobile.match(paternMobile) &&
                        mobile.length > 0
                          ? "red"
                          : "",
                      "&.Mui-focused": {
                        color:
                          errMobile &&
                          !mobile.match(paternMobile) &&
                          mobile.length > 0
                            ? "red"
                            : "",
                      },
                    },
                  }}
                />
              </div>
              <div className="sm:w-2/3 w-full px-2 mt-5">
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
                  value={dateFaBirth}
                  onChange={(event) => {
                    setDateFaBirth(event);
                    setBrithDateFa(event.format("YYYY/MM/DD"));
                    setErrBrithDateFa(false);
                  }}
                />
              </div>
            </div>
          )}
          {isLegal && (
            <div className="flex w-full flex-wrap">
              <div className="sm:w-1/3 w-full px-2 mt-5">
                <TextField
                  size="small"
                  type="text"
                  className="w-full"
                  id="outlined-multiline-flexible"
                  label="نام شرکت*"
                  name="name"
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    setErrCompanyName(false);
                    if (e.target.value === "") {
                      setErrCompanyName(true);
                    }
                  }}
                  value={companyName}
                  FormHelperTextProps={{
                    sx: { color: "red", fontSize: "10px" },
                  }}
                  helperText={
                    errCompanyName ? "لطفا نام شرکت را وارد کنید" : ""
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errCompanyName ? "red" : "",
                      },
                      "&:hover fieldset": {
                        borderColor: errCompanyName ? "red" : "",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errCompanyName ? "red" : "",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: errCompanyName ? "red" : "",
                      "&.Mui-focused": { color: errCompanyName ? "red" : "" },
                    },
                  }}
                />
              </div>
              <div className="sm:w-1/3 w-full px-2 mt-5">
                <TextField
                  size="small"
                  type="text"
                  className="w-full"
                  id="outlined-multiline-flexible"
                  label="شماره ثبت*"
                  name="name"
                  onChange={(e) => {
                    setRegisterNumber(e.target.value);
                    setErrRegisterNumber(false);
                    if (e.target.value === "") {
                      setErrRegisterNumber(true);
                    }
                  }}
                  value={registerNumber}
                  FormHelperTextProps={{
                    sx: { color: "red", fontSize: "10px" },
                  }}
                  helperText={
                    errRegisterNumber ? "لطفا شماره ثبت را وارد کنید" : ""
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errRegisterNumber ? "red" : "",
                      },
                      "&:hover fieldset": {
                        borderColor: errRegisterNumber ? "red" : "",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errRegisterNumber ? "red" : "",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: errRegisterNumber ? "red" : "",
                      "&.Mui-focused": {
                        color: errRegisterNumber ? "red" : "",
                      },
                    },
                  }}
                />
              </div>
              <div className="sm:w-1/3 w-full px-2 mt-5">
                <TextField
                  size="small"
                  type="text"
                  className="w-full"
                  id="outlined-multiline-flexible"
                  label="شناسه ملی*"
                  name="name"
                  onChange={(e) => {
                    if (e.target.value.length < 12) {
                      setNationalId(e.target.value);
                      setErrNationalId(false);
                    }
                    if (e.target.value === "") {
                      setErrNationalId(true);
                    }
                  }}
                  value={nationalId}
                  FormHelperTextProps={{
                    sx: { color: "red", fontSize: "10px" },
                  }}
                  helperText={
                    errNationalId ? "لطفا شناسه ملی را وارد کنید" : ""
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errNationalId ? "red" : "",
                      },
                      "&:hover fieldset": {
                        borderColor: errNationalId ? "red" : "",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errNationalId ? "red" : "",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: errNationalId ? "red" : "",
                      "&.Mui-focused": { color: errNationalId ? "red" : "" },
                    },
                  }}
                />
              </div>
              <div className="sm:w-1/3 w-full px-2 mt-5">
                <DatePicker
                  className={
                    themeMode === "dark" ? "rmdp-mobile bg-dark" : "rmdp-mobile"
                  }
                  containerStyle={{
                    width: "100%",
                    margin: "auto",
                  }}
                  format="DD MMMM YYYY"
                  render={<CustomMultipleInput2 />}
                  calendarPosition="bottom-right"
                  locale={persianFa}
                  calendar={persian}
                  value={dateFaregister}
                  onChange={(event) => {
                    setDateFaregister(event);
                    setRegisterDateFa(event.format("YYYY/MM/DD"));
                    setErrRegisterDateFa(false);
                  }}
                />
              </div>
              <div className="flex relative sm:w-1/3 w-full px-2 mt-5">
                <TextField
                  // disabled={isVacant}

                  size="small"
                  label=" شماره همراه نماینده"
                  className="border rounded-lg w-full px-3"
                  value={tel}
                  type="tel"
                  onChange={(e) => {
                    setTel(e.target.value);
                    setErrTel(false);
                  }}
                  FormHelperTextProps={{
                    sx: { color: "red", fontSize: "10px" },
                  }}
                  helperText={
                    errTel && !tel.match(paternMobile) && tel.length > 0
                      ? "شماره همراه درست نیست"
                      : ""
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor:
                          errTel && !tel.match(paternMobile) && tel.length > 0
                            ? "red"
                            : "",
                      },
                      "&:hover fieldset": {
                        borderColor:
                          errTel && !tel.match(paternMobile) && tel.length > 0
                            ? "red"
                            : "",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor:
                          errTel && !tel.match(paternMobile) && tel.length > 0
                            ? "red"
                            : "",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color:
                        errTel && !tel.match(paternMobile) && tel.length > 0
                          ? "red"
                          : "",
                      "&.Mui-focused": {
                        color:
                          errTel && !tel.match(paternMobile) && tel.length > 0
                            ? "red"
                            : "",
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
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
