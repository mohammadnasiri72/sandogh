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
  Slide,
  TextField,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import DatePicker from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  setIsLoading,
  setListCooperative,
} from "../../redux/slice/cooperative";
import { mainDomain } from "../../utils/mainDomain";
import { IoMdReturnLeft } from "react-icons/io";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

ModalAddCooperative.propTypes = { getCooperativeList: PropTypes.func };

export default function ModalAddCooperative({ getCooperativeList }) {
  const listProvince = useSelector((store) => store.cooperative.listProvince);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [open, setOpen] = useState(false);
  const [valProvince, setValProvince] = useState(listProvince[0]);
  const [errValProvince, setErrValProvince] = useState(false);
  const [title, setTitle] = useState("");
  const [errTitle, setErrTitle] = useState(false);
  const [dateRemember, setDateRemember] = useState(new Date());
  const [memberDateFa, setMemberDateFa] = useState(
    new Date().toLocaleDateString("fa-IR")
  );
  const [errMemberDateFa, setErrMemberDateFa] = useState(false);

  const [dateRegister, setDateRegister] = useState(new Date());
  const [registerDateFa, setRegisterDateFa] = useState(
    new Date().toLocaleDateString("fa-IR")
  );
  const [errRegisterDateFa, setErrRegisterDateFa] = useState(false);

  const [valStatusCooperative, setValStatusCooperative] = useState(1);
  const [registerPlace, setRegisterPlace] = useState("");
  const [errRegisterPlace, setErrRegisterPlace] = useState(false);
  const [priority, setPriority] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [errRegisterNumber, setErrRegisterNumber] = useState(false);
  const [nationalId, setNationalId] = useState("");
  const [errNationalId, setErrNationalId] = useState(false);
  const [economicCode, setEconomicCode] = useState("");
  const [errEconomicCode, setErrEconomicCode] = useState(false);
  const [tel, setTel] = useState("");
  const [errTel, setErrTel] = useState(false);
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState(false);
  const [mobile, setMobile] = useState("");
  const [errMobile, setErrMobile] = useState(false);
  const [address, setAddress] = useState("");
  const [errAddress, setErrAddress] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [errPostalCode, setErrPostalCode] = useState(false);
  const [description, setDescription] = useState("");
  const [textStatus, setTextStatus] = useState("");
  const [shareholderCode, setShareholderCode] = useState("");
  const [errShareholderCode, setErrShareholderCode] = useState(false);

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const paternMobile = /^09[0|1|2|3|9][0-9]{8}$/;
  const paternEmail = /[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,3}/;

  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.cooperative.isLoading);

  const resetState = () => {
    setValProvince(listProvince[0]);
    setTitle("");
    setErrTitle(false);
    setDateRemember(new Date());
    setMemberDateFa(new Date().toLocaleDateString("fa-IR"));
    setErrMemberDateFa(false);
    setDateRegister(new Date());
    setRegisterDateFa(new Date().toLocaleDateString("fa-IR"));
    setErrRegisterDateFa(false);
    setValStatusCooperative(1);
    setRegisterPlace("");
    setErrRegisterPlace(false);
    setRegisterNumber("");
    setErrRegisterNumber(false);
    setNationalId("");
    setErrNationalId(false);
    setEconomicCode("");
    setErrEconomicCode(false);
    setTel("");
    setErrTel(false);
    setFax("");
    setEmail("");
    setMobile("");
    setAddress("");
    setErrAddress(false);
    setPostalCode("");
    setErrPostalCode(false);
    setErrShareholderCode(false);
    setDescription("");
    setTextStatus("");
  };

  useEffect(() => {
    if (open) {
      axios
        .get(mainDomain + "/api/Cooperative", {
          params: {
            statusId: 0,
            provinceId: 0,
            find: "",
            sortFilter: 0,
            pageSize: 1,
            page: 1,
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setPriority(res.data[0].priority + 1);
        });
    }
  }, [open]);

  const listStatusCooperative = [
    {
      id: 1,
      name: "سهامدار",
    },
    {
      id: 2,
      name: "غیر سهامدار",
    },
    {
      id: 3,
      name: "بخش دولتی",
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  const submitFormHandler = () => {
    if (!valProvince?.provinceId) {
      setErrValProvince(true);
    }
    if (!title) {
      setErrTitle(true);
    }

    if (!memberDateFa) {
      setErrMemberDateFa(true);
    }
    if (!registerDateFa) {
      setErrRegisterDateFa(true);
    }
    if (!registerNumber) {
      setErrRegisterNumber(true);
    }
    if (!registerPlace) {
      setErrRegisterPlace(true);
    }
    if (!nationalId || String(nationalId).length !== 11) {
      setErrNationalId(true);
    }
    if (!economicCode || String(economicCode).length !== 12) {
      setErrEconomicCode(true);
    }
    if (!tel) {
      setErrTel(true);
    }
    if (!address) {
      setErrAddress(true);
    }
    if (postalCode.length !== 10) {
      setErrPostalCode(true);
    }
    if (!email.match(paternEmail) && email.length > 0) {
      setErrEmail(true);
    }
    if (!mobile.match(paternMobile) && mobile.length > 0) {
      setErrMobile(true);
    }
    if (!shareholderCode) {
      setErrShareholderCode(true);
    }
    if (
      valProvince?.provinceId &&
      title &&
      memberDateFa &&
      registerDateFa &&
      registerNumber &&
      registerPlace &&
      String(nationalId).length === 11 &&
      String(economicCode).length === 12 &&
      tel &&
      (mobile.match(paternMobile) || mobile.length === 0) &&
      (email.match(paternEmail) || email.length === 0) &&
      address &&
      String(postalCode).length === 10 &&
      shareholderCode
    ) {
      const data = {
        id: 0,
        provinceId: Number(valProvince?.provinceId),
        priority,
        statusId: valStatusCooperative,
        title,
        userName: String(nationalId),
        memberDateFa,
        registerDateFa,
        registerNumber: String(registerNumber),
        registerPlace,
        nationalId: String(nationalId),
        economicCode: String(economicCode),
        tel,
        fax,
        email,
        mobile,
        address,
        postalCode: String(postalCode),
        status: textStatus,
        description,
        shareholderCode: Number(shareholderCode),
      };
      dispatch(setIsLoading(true));
      axios
        .post(mainDomain + "/api/Cooperative", data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          dispatch(setIsLoading(false));
          dispatch(setListCooperative([]));
          getCooperativeList();
          handleClose();
          Toast.fire({
            icon: "success",
            text: "تعاونی جدید با موفقیت ثبت شد",
            customClass: {
              container: "toast-modal",
            },
          });
        })
        .catch((err) => {
          dispatch(setIsLoading(false));
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
          label="تاریخ عضویت*"
          name="name"
          FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
          helperText={errMemberDateFa ? "لطفا تاریخ عضویت را وارد کنید" : ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errMemberDateFa ? "red" : "",
              },
              "&:hover fieldset": {
                borderColor: errMemberDateFa ? "red" : "",
              },
              "&.Mui-focused fieldset": {
                borderColor: errMemberDateFa ? "red" : "",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: errMemberDateFa ? "red" : "",
              "&.Mui-focused": { color: errMemberDateFa ? "red" : "" },
            },
          }}
        />
        {value && (
          <AiOutlineClose
            onClick={() => {
              setDateRemember("");
              setMemberDateFa("");
              setErrMemberDateFa(true);
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
              setDateRegister("");
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
      <div>
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
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          sx: { background: themeMode === "dark" ? "rgb(15 23 42)" : "#fff" },
        }}
      >
        <div
          style={{ background: themeColor.bgColor, color: themeColor.color }}
          className={
            themeMode === "dark"
              ? "flex justify-between items-center px-4 py-2 shadow-lg"
              : "flex justify-between items-center px-4 py-2 shadow-lg"
          }
        >
          <span className="font-semibold text-lg">افزودن اطلاعات پایه</span>
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
        <div className="mt-7 px-3 flex flex-wrap items-start">
          <div className="sm:w-1/4 md:w-1/6 w-full px-2">
            <FormControl size="small" color="primary" className="w-full">
              <InputLabel
                color="primary"
                className="px-2"
                id="demo-simple-select-label"
              >
                نوع تعاونی
              </InputLabel>
              <Select
                size="small"
                className="w-full"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valStatusCooperative}
                label="نوع تعاونی"
                color="primary"
                onChange={(e) => {
                  setValStatusCooperative(e.target.value);
                }}
              >
                {listStatusCooperative.map((e) => (
                  <MenuItem sx={{ fontSize: "12px" }} key={e.id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="sm:w-1/4 md:w-1/6 w-full px-2 sm:mt-0 mt-5">
            <Autocomplete
              size="small"
              disabled={listProvince.length === 0}
              className="w-full"
              value={valProvince}
              options={
                listProvince.length > 0
                  ? listProvince
                  : [{ title: "لطفا منتظر بمانید", id: 0 }]
              }
              getOptionLabel={(option) => (option.title ? option.title : "")}
              onChange={(event, newValue) => {
                if (newValue) {
                  setValProvince(newValue);
                  setErrValProvince(false);
                }
                if (!newValue) {
                  setValProvince({});
                  setErrValProvince(true);
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
                  label={"لیست استان ها*"}
                  {...params}
                  FormHelperTextProps={{
                    sx: { color: "red", fontSize: "10px" },
                  }}
                  helperText={errValProvince ? "لطفا استان را انتخاب کنید" : ""}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: errValProvince ? "red" : "",
                      },
                      "&:hover fieldset": {
                        borderColor: errValProvince ? "red" : "",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errValProvince ? "red" : "",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: errValProvince ? "red" : "",
                      "&.Mui-focused": { color: errValProvince ? "red" : "" },
                    },
                  }}
                />
              )}
            />
          </div>
          <div className="sm:w-1/2 md:w-1/3 w-full px-2 sm:mt-0 mt-5">
            <TextField
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="عنوان تعاونی*"
              name="name"
              onChange={(e) => {
                setTitle(e.target.value);
                setErrTitle(false);
                if (e.target.value === "") {
                  setErrTitle(true);
                }
              }}
              value={title}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errTitle ? "لطفا عنوان را وارد کنید" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errTitle ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errTitle ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errTitle ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errTitle ? "red" : "",
                  "&.Mui-focused": { color: errTitle ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="sm:w-1/4 md:w-1/6 relative w-full px-2 md:mt-0 mt-5">
            <DatePicker
              // className={themeMode === 'dark' ? 'bg-dark rmdp-mobile' : 'rmdp-mobile'}
              format="DD MMMM YYYY"
              render={<CustomMultipleInput />}
              calendarPosition="bottom-right"
              containerStyle={{
                width: "100%",
              }}
              inputClass="outline-none border rounded-lg w-full h-10 px-3 mt-5"
              locale={persianFa}
              calendar={persian}
              value={dateRemember}
              onChange={(event) => {
                setDateRemember(event);
                setMemberDateFa(event.format("YYYY/MM/DD"));
                setErrMemberDateFa(false);
              }}
            />
          </div>
          <div className="sm:w-1/4 md:w-1/6 relative w-full px-2 md:mt-0 mt-5">
            <DatePicker
              // className={themeMode === 'dark' ? 'bg-dark rmdp-mobile' : 'rmdp-mobile'}
              format="DD MMMM YYYY"
              render={<CustomMultipleInput2 />}
              calendarPosition="bottom-right"
              containerStyle={{
                width: "100%",
              }}
              inputClass="outline-none border rounded-lg w-full h-10 px-3 mt-5"
              locale={persianFa}
              calendar={persian}
              value={dateRegister}
              onChange={(event) => {
                setDateRegister(event);
                setRegisterDateFa(event.format("YYYY/MM/DD"));
                setErrRegisterDateFa(false);
              }}
            />
          </div>
          <div className="flex relative sm:w-1/4 md:w-1/6 w-full px-2 mt-5">
            <TextField
              size="small"
              label=" شماره ثبت*"
              className="border rounded-lg w-full px-3"
              value={registerNumber}
              type="number"
              placeholder=" شماره ثبت..."
              onChange={(e) => {
                if (e.target.value * 1) {
                  setRegisterNumber(e.target.value * 1);
                  setErrRegisterNumber(false);
                }
              }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
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
                  "&.Mui-focused": { color: errRegisterNumber ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="flex relative sm:w-1/4 md:w-1/6 w-full px-2 mt-5">
            <TextField
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="محل ثبت*"
              name="name"
              onChange={(e) => {
                setRegisterPlace(e.target.value);
                setErrRegisterPlace(false);
                if (e.target.value === "") {
                  setErrRegisterPlace(true);
                }
              }}
              value={registerPlace}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errRegisterPlace ? "لطفا محل ثبت را وارد کنید" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errRegisterPlace ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errRegisterPlace ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errRegisterPlace ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errRegisterPlace ? "red" : "",
                  "&.Mui-focused": { color: errRegisterPlace ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="flex relative sm:w-1/4 md:w-1/6 w-full px-2 mt-5">
            <TextField
              // disabled={isVacant}

              size="small"
              label="شناسه ملی*"
              className="border rounded-lg w-full px-3"
              value={nationalId}
              type="number"
              placeholder="شناسه ملی..."
              onChange={(e) => {
                if (e.target.value * 1) {
                  setNationalId(e.target.value * 1);
                  setErrNationalId(false);
                }
              }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={
                errNationalId && nationalId.length === 0
                  ? "لطفا شناسه ملی را وارد کنید"
                  : errNationalId && String(nationalId).length !== 11
                  ? "شناسه ملی درست نیست"
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
          <div className="flex relative sm:w-1/4 md:w-1/6 w-full px-2 mt-5">
            <TextField
              // disabled={isVacant}

              size="small"
              label="کد اقتصادی*"
              className="border rounded-lg w-full px-3"
              value={economicCode}
              type="number"
              placeholder="کد اقتصادی..."
              onChange={(e) => {
                if (e.target.value * 1) {
                  setEconomicCode(e.target.value * 1);
                  setErrEconomicCode(false);
                }
              }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              // helperText={errEconomicCode ? "لطفا کد اقتصادی را وارد کنید" : ""}
              helperText={
                errEconomicCode && economicCode.length === 0
                  ? "لطفا کد اقتصادی را وارد کنید"
                  : errEconomicCode && String(economicCode).length !== 12
                  ? "کد اقتصادی درست نیست"
                  : ""
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errEconomicCode ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errEconomicCode ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errEconomicCode ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errEconomicCode ? "red" : "",
                  "&.Mui-focused": {
                    color: errEconomicCode ? "red" : "",
                  },
                },
              }}
            />
          </div>
          <div className="flex relative sm:w-1/4 md:w-1/6 w-full px-2 mt-5">
            <TextField
              // color={errNameFamily ? 'error' : 'primary'}
              // focused={errNameFamily}
              size="small"
              type="tel"
              className="w-full"
              id="outlined-multiline-flexible"
              label="شماره ثابت*"
              name="name"
              onChange={(e) => {
                setTel(e.target.value);
                setErrTel(false);
                if (e.target.value === "") {
                  setErrTel(true);
                }
              }}
              value={tel}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errTel ? "لطفا شماره ثابت را وارد کنید" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errTel ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errTel ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errTel ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errTel ? "red" : "",
                  "&.Mui-focused": { color: errTel ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="flex relative sm:w-1/4 md:w-1/6 w-full px-2 mt-5">
            <TextField
              // color={errNameFamily ? 'error' : 'primary'}
              // focused={errNameFamily}
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="شماره فکس"
              name="name"
              onChange={(e) => {
                setFax(e.target.value);
              }}
              value={fax}
            />
          </div>
          <div className="flex relative sm:w-1/4 md:w-1/6 w-full px-2 mt-5">
            <TextField
              size="small"
              label=" شماره همراه"
              className="border rounded-lg w-full px-3"
              value={mobile}
              type="tel"
              onChange={(e) => {
                setMobile(e.target.value);
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
          <div className="flex relative sm:w-1/4 md:w-1/6 w-full px-2 mt-5">
            <TextField
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="ایمیل"
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
          <div className="flex relative sm:w-1/4 md:w-1/6 w-full px-2 mt-5">
            <TextField
              size="small"
              label="کد پستی*"
              className="border rounded-lg w-full px-3"
              value={postalCode}
              type="number"
              placeholder="کد پستی..."
              onChange={(e) => {
                if (e.target.value * 1) {
                  setPostalCode(e.target.value * 1);
                  setErrPostalCode(false);
                }
              }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={
                errPostalCode && String(postalCode).length === 0
                  ? "لطفا کد پستی را وارد کنید"
                  : errPostalCode && String(postalCode).length !== 10
                  ? "کد پستی درست نیست"
                  : ""
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor:
                      errPostalCode && String(postalCode).length !== 10
                        ? "red"
                        : "",
                  },
                  "&:hover fieldset": {
                    borderColor:
                      errPostalCode && String(postalCode).length !== 10
                        ? "red"
                        : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor:
                      errPostalCode && String(postalCode).length !== 10
                        ? "red"
                        : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color:
                    errPostalCode && String(postalCode).length !== 10
                      ? "red"
                      : "",
                  "&.Mui-focused": {
                    color:
                      errPostalCode && String(postalCode).length !== 10
                        ? "red"
                        : "",
                  },
                },
              }}
            />
          </div>
          <div className="flex relative sm:w-1/4 md:w-1/6 w-full px-2 mt-5">
            <TextField
              // color={errNameFamily ? 'error' : 'primary'}
              // focused={errNameFamily}
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="وضعیت"
              name="name"
              onChange={(e) => {
                setTextStatus(e.target.value);
              }}
              value={textStatus}
            />
          </div>
          <div className="flex relative sm:w-1/4 md:w-1/6 w-full px-2 mt-5">
            <TextField
              // disabled={isVacant}

              size="small"
              label="اولویت نمایش"
              className="border rounded-lg w-full px-3"
              value={priority}
              type="number"
              placeholder="اولویت نمایش..."
              onChange={(e) => {
                if (e.target.value * 1) {
                  setPriority(e.target.value * 1);
                }
              }}
            />
          </div>
          <div className="flex relative sm:w-1/4 md:w-1/6 w-full px-2 mt-5">
            <TextField
              size="small"
              label="کد سهامدار"
              className="border rounded-lg w-full px-3"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={shareholderCode}
              placeholder="کد سهامدار..."
              onChange={(e) => {
                const newValue = e.target.value.replace(/,/g, "");
                if (/^\d*$/.test(newValue)) {
                  setShareholderCode(newValue);
                  setErrShareholderCode(false);
                }
              }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={
                errShareholderCode ? "لطفا کد سهام دار را وارد کنید" : ""
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errShareholderCode ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errShareholderCode ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errShareholderCode ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errShareholderCode ? "red" : "",
                  "&.Mui-focused": { color: errShareholderCode ? "red" : "" },
                },
              }}
            />
          </div>
        </div>

        <div className="mt-5 px-3 pb-3">
          <div className="flex relative sm:w-2/3 w-full px-2">
            <TextField
              // disabled={isVacant}
              multiline
              minRows={2}
              size="small"
              label="آدرس*"
              className="border rounded-lg w-full px-3"
              value={address}
              type="text"
              placeholder="آدرس..."
              onChange={(e) => {
                setAddress(e.target.value);
                setErrAddress(false);
                if (e.target.value === "") {
                  setErrAddress(true);
                }
              }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errAddress ? "لطفا آدرس را وارد کنید" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errAddress ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errAddress ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errAddress ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errAddress ? "red" : "",
                  "&.Mui-focused": { color: errAddress ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="flex relative sm:w-2/3 w-full px-2 mt-5">
            <TextField
              // disabled={isVacant}
              size="small"
              label="توضیحات"
              className="border rounded-lg w-full px-3"
              value={description}
              type="text"
              placeholder="توضیحات..."
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-center">
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
                    <CircularProgress sx={{ color: "#fff" }} />
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
