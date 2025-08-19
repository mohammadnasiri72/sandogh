import {
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
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
import { CgClose } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useSelector } from "react-redux";
import Switch from "react-switch";
import Swal from "sweetalert2";
import { mainDomain } from "../../../utils/mainDomain";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

ModalAddBank.propTypes = {
  setFlag: PropTypes.func,
};
export default function ModalAddBank({ setFlag }) {
  const cooperativeId = useSelector((store) => store.cooperative.cooperativeId);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [errName, setErrName] = React.useState(false);
  const [branchId, setBranchId] = React.useState("");
  const [errBranchId, setErrBranchId] = React.useState(false);
  const [accountNumber, setAccountNumber] = React.useState("");
  const [errAccountNumber, setErrAccountNumber] = React.useState(false);
  const [shebaNumber, setShebaNumber] = React.useState("");
  const [errShebaNumber, setErrShebaNumber] = React.useState(false);
  const [isActive, setIsActive] = React.useState(true);
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
    setName("");
    setBranchId("");
    setAccountNumber("");
    setShebaNumber("");
    setErrName(false);
    setErrBranchId(false);
    setErrAccountNumber(false);
    setErrShebaNumber(false);
    setIsActive(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  const submitFormHandler = () => {
    if (!name) {
      setErrName(true);
    }
    if (!branchId) {
      setErrBranchId(true);
    }
    if (!accountNumber) {
      setErrAccountNumber(true);
    }
    if (!shebaNumber) {
      setErrShebaNumber(true);
    }
    if (shebaNumber.length >24 ) {
      Toast.fire({
        icon: "error",
        text:  "شماره شبا درست نیست",
        customClass: {
          container: "toast-modal",
        },
      });
    }
    if (name && branchId && accountNumber && shebaNumber && shebaNumber.length <=24) {
      const data = {
        id: 0,
        cooperativeId: Number(cooperativeId),
        name,
        branchId,
        accountNumber,
        shebaNumber,
        isActive,
      };
      setIsLoading(true);
      axios
        .post(mainDomain + `/api/Cooperative/Bank`, data, {
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
            text: "بانک جدید با موفقیت ثبت شد",
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
          <span className="text-xl">اطلاعات بانکی</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        <div className=" flex flex-wrap items-start mt-5">
          <div className="sm:w-1/2 w-full px-2 mt-5">
            <TextField
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="نام بانک*"
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
              helperText={errName ? "لطفا نام بانک را وارد کنید" : ""}
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
          <div className="sm:w-1/2 w-full px-2 mt-5">
            <TextField
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="نام شعبه*"
              name="name"
              onChange={(e) => {
                setBranchId(e.target.value);
                setErrBranchId(false);
                if (e.target.value === "") {
                  setErrBranchId(true);
                }
              }}
              value={branchId}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errBranchId ? "لطفا نام شعبه را وارد کنید" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errBranchId ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errBranchId ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errBranchId ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errBranchId ? "red" : "",
                  "&.Mui-focused": { color: errBranchId ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="sm:w-1/2 w-full px-2 mt-5">
            <TextField
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="شماره حساب*"
              name="name"
              onChange={(e) => {
                setAccountNumber(e.target.value);
                setErrAccountNumber(false);
                if (e.target.value === "") {
                  setErrAccountNumber(true);
                }
              }}
              value={accountNumber}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={
                errAccountNumber ? "لطفا شماره حساب را وارد کنید" : ""
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errAccountNumber ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errAccountNumber ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errAccountNumber ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errAccountNumber ? "red" : "",
                  "&.Mui-focused": { color: errAccountNumber ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="sm:w-1/2 w-full px-2 mt-5">
            <TextField
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="شماره شبا *"
              name="name"
              onChange={(e) => {
                setShebaNumber(e.target.value);
                setErrShebaNumber(false);
                if (e.target.value === "") {
                  setErrShebaNumber(true);
                }
              }}
              value={shebaNumber}
              slotProps={{
                              input: {
                                endAdornment: <InputAdornment position="start">IR</InputAdornment>,
                              },
                            }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errShebaNumber ? "لطفا شماره شبا را وارد کنید" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errShebaNumber ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errShebaNumber ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errShebaNumber ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errShebaNumber ? "red" : "",
                  "&.Mui-focused": { color: errShebaNumber ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="px-2 mt-5">
            <div className="flex items-center">
              <span className="-mt-2">فعال :</span>
              <Switch
                uncheckedIcon={<span className="text-xs text-white">خیر</span>}
                checkedIcon={
                  <span
                    style={{ color: themeColor.color }}
                    className="text-xs px-2"
                  >
                    بله
                  </span>
                }
                className="me-1 mb-sm-8 mb-2"
                onColor={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                onChange={() => {
                  setIsActive((e) => !e);
                }}
                checked={isActive}
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
    </>
  );
}
