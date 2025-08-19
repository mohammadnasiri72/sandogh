/* eslint-disable react/prop-types */

import {
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { makeStyles } from "@mui/styles";
import "animate.css";
import axios from "axios";
import moment from "jalali-moment";
import PropTypes from "prop-types";
import * as React from "react";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import { AiOutlineClose } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { MdModeEdit } from "react-icons/md";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../../utils/mainDomain";
import Loader from "../../loader";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

EditeShareHolder.propTypes = {
  getShareHolderList: PropTypes.func,
  id: PropTypes.number,
  legal: PropTypes.bool,
};
export default function EditeShareHolder({ getShareHolderList, id, legal }) {
  const cooperativeId = useSelector((store) => store.cooperative.cooperativeId);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
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
  const [isLegal, setIsLegal] = React.useState(legal);
  const [shareHolderEdited, setShareHolderEdited] = React.useState({});
  // legal
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

  const resetState = () => {};

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  React.useEffect(() => {
    if (open) {
      setLoader(true);
      axios
        .get(mainDomain + `/api/Cooperative/ShareHolder/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setShareHolderEdited(res.data);
          setLoader(false);
        })
        .catch(() => {
          setLoader(false);
        });
    }
  }, [open]);
  

  React.useEffect(() => {
    if (shareHolderEdited.id && !legal) {
      setName(shareHolderEdited.name);
      setFamily(shareHolderEdited.family);
      setFatherName(shareHolderEdited.fatherName);
      setPlaceBrith(shareHolderEdited.placeBrith);
      setNationalCode(shareHolderEdited.nationalCode);
      setShSh(shareHolderEdited.shSh);
      setBrithDateFa(shareHolderEdited.brithDateFa);
      setMobile(shareHolderEdited.mobile);
      setIsLegal(shareHolderEdited.isLegal);
      setDateFaBirth(
        shareHolderEdited.brithDateFa
          ? new Date(
              moment(shareHolderEdited.brithDateFa, "jYYYY/jMM/jDD").format(
                "YYYY-MM-DD"
              )
            )
          : ""
      );
    }
    if (shareHolderEdited.id && legal) {
      setCompanyName(shareHolderEdited.companyName);
      setRegisterNumber(shareHolderEdited.registerNumber);
      setNationalId(shareHolderEdited.nationalId);
      setRegisterDateFa(shareHolderEdited.registerDateFa);
      setRegisterDateFa(shareHolderEdited.registerDateFa);
      setMobile(shareHolderEdited.mobile ? shareHolderEdited.mobile : "");

      setDateFaregister(
        shareHolderEdited.registerDateFa
          ? new Date(
              moment(shareHolderEdited.registerDateFa, "jYYYY/jMM/jDD").format(
                "YYYY-MM-DD"
              )
            )
          : ""
      );
    }
  }, [shareHolderEdited]);

  const submitFormHandler = () => {
    if (!legal) {
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
      if (!nationalCode) {
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
        nationalCode &&
        shSh &&
        brithDateFa &&
        (mobile.match(paternMobile) || !mobile)
      ) {
        const data = {
          id,
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
              text: "سهامدار با موفقیت ویرایش شد",
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
      if (!mobile.match(paternMobile) && mobile.length > 0) {
        setErrMobile(true);
      }
      if (
        companyName &&
        registerNumber &&
        nationalId &&
        registerDateFa &&
        (mobile.match(paternMobile) || !mobile)
      ) {
        const data = {
          id,
          cooperativeId: Number(cooperativeId),
          companyName,
          registerNumber,
          nationalId,
          mobile,
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
              text: "سهامدار جدید با موفقیت ویرایش شد",
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
      <div className="px-1">
        <Tooltip title="ویرایش">
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
                d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z"
                fill="#1787B0"
              />
              <path
                opacity="0.4"
                d="M19.02 3.47997C17.08 1.53997 15.18 1.48997 13.19 3.47997L11.98 4.68997C11.88 4.78997 11.84 4.94997 11.88 5.08997C12.64 7.73997 14.76 9.85997 17.41 10.62C17.45 10.63 17.49 10.64 17.53 10.64C17.64 10.64 17.74 10.6 17.82 10.52L19.02 9.30997C20.01 8.32997 20.49 7.37997 20.49 6.41997C20.5 5.42997 20.02 4.46997 19.02 3.47997Z"
                fill="#1787B0"
              />
              <path
                d="M15.61 11.53C15.32 11.39 15.04 11.25 14.77 11.09C14.55 10.96 14.34 10.82 14.13 10.67C13.96 10.56 13.76 10.4 13.57 10.24C13.55 10.23 13.48 10.17 13.4 10.09C13.07 9.80999 12.7 9.44999 12.37 9.04999C12.34 9.02999 12.29 8.95999 12.22 8.86999C12.12 8.74999 11.95 8.54999 11.8 8.31999C11.68 8.16999 11.54 7.94999 11.41 7.72999C11.25 7.45999 11.11 7.18999 10.97 6.90999C10.83 6.60999 10.72 6.31999 10.62 6.04999L4.34001 12.33C4.21001 12.46 4.09001 12.71 4.06001 12.88L3.52001 16.71C3.42001 17.39 3.61001 18.03 4.03001 18.46C4.39001 18.81 4.89001 19 5.43001 19C5.55001 19 5.67001 18.99 5.79001 18.97L9.63001 18.43C9.81001 18.4 10.06 18.28 10.18 18.15L16.46 11.87C16.18 11.77 15.91 11.66 15.61 11.53Z"
                fill="#1787B0"
              />
            </svg>
          </IconButton>
        </Tooltip>
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
          <span className="text-xl">ویرایش سهامدار</span>
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
              value={isLegal ? "legal" : "real"}
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
                  control={<Radio disabled />}
                  label="حقیقی"
                />
                <FormControlLabel
                  value="legal"
                  control={<Radio disabled />}
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
                  // disabled={isVacant}

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
                    setNationalId(e.target.value);
                    setErrNationalId(false);
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
                    errMobile && !mobile.match(paternMobile) && mobile.length > 0
                      ? "شماره همراه درست نیست"
                      : ""
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor:
                          errMobile && !mobile.match(paternMobile) && mobile.length > 0
                            ? "red"
                            : "",
                      },
                      "&:hover fieldset": {
                        borderColor:
                          errMobile && !mobile.match(paternMobile) && mobile.length > 0
                            ? "red"
                            : "",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor:
                          errMobile && !mobile.match(paternMobile) && mobile.length > 0
                            ? "red"
                            : "",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color:
                        errMobile && !mobile.match(paternMobile) && mobile.length > 0
                          ? "red"
                          : "",
                      "&.Mui-focused": {
                        color:
                          errMobile && !mobile.match(paternMobile) && mobile.length > 0
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
                  <MdModeEdit />
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
        </DialogActions>
        {loader && <Loader />}
      </Dialog>
    </>
  );
}
