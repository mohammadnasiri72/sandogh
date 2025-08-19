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
  Tooltip,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoMdReturnLeft } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";

ModalEditSpervisor.propTypes = {
  listProvince: PropTypes.array,
  supervisor: PropTypes.object,
  setflag: PropTypes.func,
  openEdit: PropTypes.bool,
};
export default function ModalEditSpervisor({
  listProvince,
  supervisor,
  setflag,
  openEdit,
}) {
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
  const [errEmail, setErrEmail] = useState(false);
  const [nationalId, setNationalId] = useState("");
  const [errNationalId, setErrNationalId] = useState(false);
  const [statusSupervisor, setStatusSupervisor] = useState(0);
  const [bankAccount, setBankAccount] = useState("");
  const [errBankAccount, setErrBankAccount] = useState(false);
  const [bankName, setBankName] = useState("");
  const [errBankName, setErrBankName] = useState(false);

  useEffect(() => {
    if (openEdit) {
      setOpen(true);
    }
  }, [openEdit]);

  useEffect(() => {
    if (supervisor.id) {
      setMobile(supervisor.mobile);
      setName(supervisor.name);
      setFamily(supervisor.family);
      setNationalId(supervisor.nationalId);
      setEmail(supervisor.email);
      setStatusSupervisor(supervisor.statusId);
      setBankName(supervisor.bankName);
      setBankAccount(supervisor.bankAccountInfo);
      setValProvince(
        listProvince.find(
          (e) => Number(e.provinceId) === Number(supervisor.provinceId)
        )
      );
    }
  }, [supervisor, open]);

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
  const paternEmail = /[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,3}/;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrValProvince(false);
    setErrMobile(false);
    setErrName(false);
    setErrFamily(false);
    setErrEmail(false);
    setErrNationalId(false);
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
    if (!email.match(paternEmail) && email) {
      setErrEmail(true);
    }
    if (!valProvince?.provinceId && statusSupervisor === 1) {
      setErrValProvince(true);
    }
    if (!bankName) {
      setErrBankName(true);
    }
    if (!bankAccount) {
      setErrBankAccount(true);
    }
    if (
      nationalId.length === 10 &&
      name &&
      family &&
      bankName &&
      bankAccount &&
      (!email || email.match(paternEmail)) &&
      mobile.match(paternMobile) &&
      (valProvince?.provinceId|| statusSupervisor === 2)
    ) {
      setIsLoading(true);
      const data = {
        id: supervisor.id,
        provinceId:
          statusSupervisor === 1 ? Number(valProvince?.provinceId) : -1,
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
        .put(mainDomain + "/api/Supervisor", data, {
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
            text: "ناظر با موفقیت ویرایش شد",
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
      {/* <div className="px-2">
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
        </div> */}
      <div className="px-1 sm:block hidden">
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
      <div className="sm:hidden block">
        <div
          className={
            themeMode === "dark"
              ? "text-[#fff8] flex items-center "
              : "text-[#0008] flex items-center "
          }
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
          <span className="text-xs px-1 text-[#1787B0]">ویرایش</span>
        </div>
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
          <span className="font-semibold text-lg">ویرایش ناظر</span>
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
                disabled
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
              disabled
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
              disabled
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
          <div className="sm:w-1/2 w-full px-1 mt-5">
            <TextField
              size="small"
              label="شماره حساب *"
              className="border rounded-lg w-full px-3"
              value={bankAccount}
              placeholder="شماره حساب..."
              onChange={(e) => {
                const newValue = e.target.value;
                setBankAccount(newValue);
                setErrBankAccount(false);
              }}
              FormHelperTextProps={{ sx: { color: "red" } }}
              helperText={errBankAccount ? "لطفا شماره حساب را وارد کنید" : ""}
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
          <div className="flex relative w-full px-1 mt-5">
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
          </div>
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
                  <span className="px-1">ویرایش</span>
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
