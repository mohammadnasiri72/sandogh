import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoMdReturnLeft } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { useSelector } from "react-redux";
import { mainDomain } from "../../utils/mainDomain";
import Swal from "sweetalert2";

ModalAddSpervisor.propTypes = {
  listProvince: PropTypes.array,
  setflag: PropTypes.func,
};
export default function ModalAddSpervisor({ listProvince, setflag }) {
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [valProvince, setValProvince] = useState({});
  const [errValProvince, setErrValProvince] = useState(false);
  const [mobile, setMobile] = useState("");
  const [errMobile, setErrMobile] = useState(false);
  const [name, setName] = useState("");
  const [errName, setErrName] = useState(false);
  const [family, setFamily] = useState("");
  const [errFamily, setErrFamily] = useState(false);
  const [email, setEmail] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [errNationalId, setErrNationalId] = useState(false);
  const [bankAccount, setBankAccount] = useState("");
  const [bankName, setBankName] = useState("");
  const [statusSupervisor, setStatusSupervisor] = useState(1);

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const paternMobile = /^09[0|1|2|3|9][0-9]{8}$/;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  const resetState = () => {
    setValProvince({});
    setErrValProvince(false);
    setErrMobile(false);
    setErrName(false);
    setErrFamily(false);
    setErrNationalId(false);
    setMobile("");
    setName("");
    setFamily("");
    setEmail("");
    setNationalId("");
  };

  const submitFormHandler = () => {
    if (nationalId.length !== 10) {
      setErrNationalId(true);
    }
    if (!name) {
      setErrName(true);
    }
    if (!family) {
      setErrFamily(true);
    }
    if (!mobile.match(paternMobile)) {
      setErrMobile(true);
    }

    if (!valProvince.provinceId && statusSupervisor === 1) {
      setErrValProvince(true);
    }

    if (
      nationalId.length === 10 &&
      name &&
      family &&
      mobile.match(paternMobile) &&
      (valProvince.provinceId || statusSupervisor === 2)
    ) {
      setIsLoading(true);
      const data = {
        provinceId:
          statusSupervisor === 1 ? Number(valProvince.provinceId) : -1,
        nationalId,
        name,
        family,
        mobile,
        email,
        statusId: statusSupervisor,
        bankName,
        bankAccountInfo: bankAccount,
        description: "",
      };
      axios
        .post(mainDomain + "/api/Supervisor", data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          setIsLoading(false);
          handleClose();
          setflag((e) => !e);
          Toast.fire({
            icon: "success",
            text: "ناظر با موفقیت ثبت شد",
            customClass: {
              container: "toast-modal",
            },
          });
        })
        .catch((err) => {
          setIsLoading(false);
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
  return (
    <>
      <div className="px-2">
        <Button
          onClick={handleClickOpen}
          sx={{
            fontSize: "12px",
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
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: { width: "500px", maxWidth: "none" },
          className: open
            ? "animate__animated animate__custom-fadeInUpDel"
            : "",
        }}
      >
        <div
          //   style={{ background: themeColor.bgColor, color: themeColor.color }}
          className={
            themeMode === "dark"
              ? "flex justify-between items-center px-4 py-2"
              : "flex justify-between items-center px-4 py-2"
          }
        >
          <span className="font-semibold text-lg">ناظر جدید</span>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <IoCloseSharp />
          </IconButton>
        </div>
        <Divider />
        <div className="flex flex-wrap mt-5">
          <div className="sm:w-1/2 w-full px-1 ">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">انتخاب ناظر</InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={statusSupervisor}
                label="انتخاب ناظر"
                onChange={(e) => {
                  setStatusSupervisor(e.target.value);
                  setValProvince({});
                  setErrValProvince(false);
                }}
              >
                <MenuItem value={1}>ناظر</MenuItem>
                <MenuItem value={2}>ناظر کل</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="sm:w-1/2 w-full px-1 sm:mt-0 mt-5">
            <Autocomplete
              size="small"
              disabled={listProvince.length === 0 || statusSupervisor === 2}
              className="w-full"
              value={valProvince}
              options={listProvince.length > 0 ? listProvince : [{}]}
              getOptionLabel={(option) => (option.title ? option.title : "")}
              onChange={(event, newValue) => {
                if (newValue) {
                  setValProvince(newValue);
                  setErrValProvince(false);
                  // getCooperativeList({ provinceId: newValue.provinceId, page: 1 });
                  // setNumPages(1);
                }
                if (!newValue) {
                  setValProvince({});
                  // getCooperativeList({ provinceId: 0, page: 1 });
                  // setNumPages(1);
                }
              }}
              freeSolo
              renderOption={(props, option) => (
                <Box
                  key={option.id}
                  sx={{ fontSize: 12 }}
                  component="li"
                  {...props}
                >
                  {option.title ? option.title : ""}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"انتخاب استان*"}
                  FormHelperTextProps={{
                    sx: { color: "red", fontSize: "10px" },
                  }}
                  helperText={errValProvince ? "لطفا استان را انتخاب کنید" : ""}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errValProvince ? "red" : "", // تغییر رنگ Border
                      },
                      "&:hover fieldset": {
                        borderColor: errValProvince ? "red" : "", // تغییر رنگ Border هنگام هاور
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errValProvince ? "red" : "", // تغییر رنگ Border هنگام فوکوس
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: errValProvince ? "red" : "", // تغییر رنگ Label
                    },
                  }}
                />
              )}
            />
          </div>

          <div className="flex relative sm:w-1/2 w-full px-1 mt-5">
            <TextField
              size="small"
              label="کد ملی*"
              className="border rounded-lg w-full px-3"
              value={nationalId}
              //   type="number"
              placeholder="کد ملی..."
              onChange={(e) => {
                setNationalId(e.target.value);
                setErrNationalId(false);
              }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={
                errNationalId && nationalId.length === 0
                  ? "لطفا کد ملی را وارد کنید"
                  : errNationalId && String(nationalId).length !== 10
                  ? "کد ملی درست نیست"
                  : ""
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
                  "&.Mui-focused": {
                    color: errNationalId ? "red" : "",
                  },
                },
              }}
            />
          </div>
          <div className="flex relative sm:w-1/2 w-full px-1 mt-5">
            <TextField
              size="small"
              label="شماره همراه*"
              className="border rounded-lg w-full px-3"
              value={mobile}
              type="tel"
              onChange={(e) => {
                setMobile(e.target.value);
                setErrMobile(false);
              }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={
                errMobile && !mobile.match(paternMobile)
                  ? "شماره همراه درست نیست"
                  : ""
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor:
                      errMobile && !mobile.match(paternMobile) ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor:
                      errMobile && !mobile.match(paternMobile) ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor:
                      errMobile && !mobile.match(paternMobile) ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errMobile && !mobile.match(paternMobile) ? "red" : "",
                  "&.Mui-focused": {
                    color:
                      errMobile && !mobile.match(paternMobile) ? "red" : "",
                  },
                },
              }}
            />
          </div>
          <div className="sm:w-1/2 w-full px-1 mt-5">
            <TextField
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="نام *"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
                setErrName(false);
                if (e.target.value === "") {
                  setErrName(true);
                }
              }}
              value={name}
              FormHelperTextProps={{ sx: { color: "red" } }}
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
          <div className="sm:w-1/2 w-full px-1 mt-5">
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
              FormHelperTextProps={{ sx: { color: "red" } }}
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
          <div className="sm:w-1/2 w-full px-1 mt-5">
            <TextField
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="نام بانک"
              name="name"
              onChange={(e) => {
                setBankName(e.target.value);
              }}
              value={bankName}
            />
          </div>
          <div className="sm:w-1/2 w-full px-1 mt-5">
            <TextField
              size="small"
              label="شماره حساب / شبا"
              className="border rounded-lg w-full px-3"
              value={bankAccount}
              placeholder="شماره حساب / شبا..."
              onChange={(e) => {
                const newValue = e.target.value;
                setBankAccount(newValue);
              }}
            />
          </div>
          {/* <div className="flex relative w-full px-1 mt-5">
            <TextField
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label=" ایمیل ( اختیاری )"
              name="name"
              onChange={(e) => {
                setEmail(e.target.value);
                setErrEmail(false);
              }}
              value={email}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={
                errEmail && !email.match(paternEmail) && email.length > 0
                  ? "ایمیل وارد شده درست نیست"
                  : ""
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor:
                      errEmail && !email.match(paternEmail) && email.length > 0
                        ? "red"
                        : "",
                  },
                  "&:hover fieldset": {
                    borderColor:
                      errEmail && !email.match(paternEmail) && email.length > 0
                        ? "red"
                        : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor:
                      errEmail && !email.match(paternEmail) && email.length > 0
                        ? "red"
                        : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color:
                    errEmail && !email.match(paternEmail) && email.length > 0
                      ? "red"
                      : "",
                  "&.Mui-focused": {
                    color:
                      errEmail && !email.match(paternEmail) && email.length > 0
                        ? "red"
                        : "",
                  },
                },
              }}
            />
          </div> */}
        </div>
        <div className="flex justify-center mb-2 mt-5">
          <div className="px-2">
            <Button
              size="large"
              onClick={submitFormHandler}
              disabled={isLoading}
              className="bg-slate-800"
              sx={{
                fontSize: "12px",
                transition: "0.6s",
                background: themeColor.bgColor,
                color: themeColor.color,
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
                    <CircularProgress sx={{ color: themeColor.color }} />
                  </div>
                </div>
              )}
            </Button>
          </div>
          <div className="px-2">
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
      </Dialog>
    </>
  );
}
