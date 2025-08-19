/* eslint-disable react/prop-types */

import {
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
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
import Switch from "react-switch";
import Swal from "sweetalert2";
import { mainDomain } from "../../../utils/mainDomain";
import Loader from "../../loader";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

ModalAddMember.propTypes = {
  setFlag: PropTypes.func,
};
export default function ModalAddMember({ setFlag }) {
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
  const [dateFaRegister, setDateFaRegister] = React.useState(new Date());
  const [registerDateFa, setRegisterDateFa] = React.useState(
    new Date().toLocaleDateString("fa-IR")
  );

  const [dateFaValidity, setDateFaValidity] = React.useState(new Date());
  const [validityDateFa, setValidityDateFa] = React.useState(
    new Date().toLocaleDateString("fa-IR")
  );
  const [mobile, setMobile] = React.useState("");
  const [errMobile, setErrMobile] = React.useState(false);
  const [education, setEducation] = React.useState("");
  const [listposition, setListposition] = React.useState([]);
  const [valposition, setValposition] = React.useState([]);
  const [errValposition, setErrValposition] = React.useState(false);
  const [signedRight, setSignedRight] = React.useState(true);

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
    setErrNationalCode(false);
    setErrShSh(false);
    setDateFaBirth(new Date());
    setDateFaRegister(new Date());
    setDateFaValidity(new Date());
    setBrithDateFa(new Date().toLocaleDateString("fa-IR"));
    setRegisterDateFa(new Date().toLocaleDateString("fa-IR"));
    setValidityDateFa(new Date().toLocaleDateString("fa-IR"));
    setErrBrithDateFa(false);
    setMobile("");
    setErrMobile(false);
    setEducation("");
    setValposition([]);
    setErrValposition(false);
    setSignedRight(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };
  const handleChange = (event) => {
    setErrValposition(false);
    const {
      target: { value },
    } = event;
    setValposition(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  React.useEffect(() => {
    if (open) {
      setLoader(true);
      axios
        .get(mainDomain + `/api/BasicInfo/Position`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setLoader(false);
          setListposition(res.data);
          setValposition(res.data.length > 0 ? [res.data[0]] : "");
        })
        .catch(() => {
          setLoader(false);
        });
    }
  }, [open]);

  const submitFormHandler = () => {
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
    if (nationalCode.length !== 10) {
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
    if (valposition.length === 0) {
      setErrValposition(true);
    }
    if (
      name &&
      family &&
      fatherName &&
      placeBrith &&
      nationalCode.length === 10 &&
      shSh &&
      brithDateFa &&
      (mobile.match(paternMobile) || !mobile) &&
      valposition.length > 0
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
        education,
        tel: "",
        mobile,
        email: "",
        address: "",
        postalCode: "",
        status: "",
        signedRight,
        brithDateFa,
        registerDateFa,
        appoinmentDateFa: "",
        validityDateFa,
        postionsId: valposition.map((item) => item.id),
      };
      setIsLoading(true);
      axios
        .post(mainDomain + `/api/Cooperative/Member`, data, {
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
            text: "عضو جدید با موفقیت ثبت شد",
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
          label="تاریخ انتساب"
          name="name"
        />
        {value && (
          <AiOutlineClose
            onClick={() => {
              setDateFaRegister("");
              setRegisterDateFa("");
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
          />
        )}
      </div>
    );
  }

  CustomMultipleInput3.propTypes = {
    onFocus: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };
  function CustomMultipleInput3({ onFocus, value, onChange }) {
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
          label="تاریخ اعتبار"
          name="name"
        />
        {value && (
          <AiOutlineClose
            onClick={() => {
              setDateFaValidity("");
              setValidityDateFa("");
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
          <span className="text-xl">عضو جدید</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        <div className=" flex flex-wrap items-start mt-5">
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
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
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
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
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
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
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
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
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
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
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
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
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
              value={dateFaRegister}
              onChange={(event) => {
                setDateFaRegister(event);
                setRegisterDateFa(event.format("YYYY/MM/DD"));
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
              render={<CustomMultipleInput3 />}
              calendarPosition="bottom-right"
              locale={persianFa}
              calendar={persian}
              value={dateFaValidity}
              onChange={(event) => {
                setDateFaValidity(event);
                setValidityDateFa(event.format("YYYY/MM/DD"));
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
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={
                errMobile && !mobile.match(paternMobile) && mobile.length > 0
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
          <div className="sm:w-1/3 w-full px-2 mt-5">
            <TextField
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="تحصیلات"
              name="name"
              onChange={(e) => {
                setEducation(e.target.value);
              }}
              value={education}
            />
          </div>
          <div className="sm:w-1/3 w-full px-2 mt-5">
            <FormControl size="small" color="primary" className="w-full">
              <InputLabel
                sx={{
                  color: errValposition ? "red" : "",
                  "&.Mui-focused": { color: errValposition ? "red" : "" },
                }}
                className="px-2"
                id="demo-simple-select-label"
              >
                سمت
              </InputLabel>
              <Select
                onChange={handleChange}
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: errValposition ? "red" : "",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: errValposition ? "red" : "",
                  },
                  "&.Mui-focused .MuiInputLabel-root": {
                    color: errValposition ? "red" : "",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: errValposition ? "red" : "",
                  },
                }}
                size="small"
                className="w-full"
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={valposition}
                input={<OutlinedInput label="سمت" />}
                renderValue={(selected) => (
                  <div className="flex flex-wrap truncate gap-1">
                    {selected.map((value) => {
                      const { title, id } = value;
                      return (
                        <div key={id}>
                          <Chip size="small" label={title} />
                        </div>
                      );
                    })}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {listposition.map((e) => (
                  <MenuItem sx={{ fontSize: "12px" }} key={e.id} value={e}>
                    <Checkbox checked={valposition.includes(e)} />
                    <ListItemText primary={e.title} />
                  </MenuItem>
                ))}
              </Select>
              {errValposition && (
                <FormHelperText sx={{ color: "red" }}>
                  لطفا سمت را انتخاب کنید
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className=" px-2 w-full flex justify-start">
            <div className="flex items-center py-2">
              <span className="-mt-2">حق امضا :</span>
              <Switch
                uncheckedIcon={<span className="text-xs text-white">خیر</span>}
                checkedIcon={
                  <span style={{ color: themeColor.color }} className="text-xs px-2">بله</span>
                }
                className="me-1 mb-sm-8 mb-2"
                onColor={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                onChange={() => {
                  setSignedRight((e) => !e);
                }}
                checked={signedRight}
              />
            </div>
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
      {loader && <Loader />}
    </>
  );
}
