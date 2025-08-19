import {
  Alert,
  CircularProgress,
  Divider,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { makeStyles } from "@mui/styles";
import "animate.css";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { MdModeEditOutline } from "react-icons/md";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";
import UploadAvatar from "./UploadAvatar";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

ModalEditProfile.propTypes = {
  setAnchorEl: PropTypes.func,
};
export default function ModalEditProfile({ setAnchorEl }) {
  let user = JSON.parse(localStorage.getItem("user"));
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileSrc, setFileSrc] = useState("");
  const [name, setName] = useState("");
  const [errName, setErrName] = useState(false);
  const [family, setFamily] = useState("");
  const [errFamily, setErrFamily] = useState(false);
  const [mobile, setMobile] = useState("");
  const [errMobile, setErrMobile] = useState(false);

  useEffect(() => {
    if (open) {
      setName(user.name);
      setFamily(user.family);
      if (user.mobile) {
        setMobile(user.mobile);
      }
    }
  }, [open]);

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
    setName(user.name);
    setFamily(user.family);
    setMobile(user.mobile);
    setFileSrc("");
    setErrName(false);
    setErrFamily(false);
    setErrMobile(false);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  const submitFormHandler = () => {
    if (!name) {
      setErrName(true);
    }
    if (!family) {
      setErrFamily(true);
    }
    if (!mobile.match(paternMobile)) {
      setErrMobile(true);
    }
    if (name && family && mobile.match(paternMobile)) {
      setIsLoading(true);
      const data = fileSrc
        ? {
            avatar: fileSrc,
            name,
            family,
            mobile,
          }
        : {
            name,
            family,
            mobile,
          };

      axios
        .put(mainDomain + "/api/Account/Profile", data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          handleClose();
          setAnchorEl(null);
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...user,
              name: name,
              family: family,
              fullName: name + " " + family,
              mobile: mobile,
              avatar: res.data.photoFileName,
            })
          );
          Toast.fire({
            icon: "success",
            text: "پروفایل با موفقیت ویرایش شد",
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
      <MenuItem sx={{ padding: 2 }} onClick={handleClickOpen}>
        <div className="flex justify-start items-center">
          <BiUser />
          <span
            className={
              themeMode === "dark"
                ? "text-xs text-[#fffb] px-1"
                : "text-xs text-[#000b] px-1"
            }
          >
            ویرایش پروفایل
          </span>
        </div>
      </MenuItem>
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
          <span className="text-2xl">ویرایش پروفایل</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        <div className="p-3">
          <Alert severity="info">
            چنانچه مایل به تغییر تصویر هستید، روی تصویر کلیک کنید
          </Alert>
        </div>
        <div className="w-full flex justify-center">
          <UploadAvatar setFileSrc={setFileSrc} />
        </div>
        <div className="w-full px-2 my-3">
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
        <div className="w-full px-2 my-3">
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
            helperText={errFamily ? "لطفا نام و نام خانوادگی را وارد کنید" : ""}
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
        <div className="flex relative w-full px-2 mt-3">
          <TextField
            size="small"
            label=" شماره همراه*"
            className="border rounded-lg w-full px-3"
            value={mobile}
            type="tel"
            onChange={(e) => {
              setMobile(e.target.value);
              setErrMobile(false);
            }}
            FormHelperTextProps={{ sx: { color: "red" } }}
            helperText={
              errMobile && !mobile.match(paternMobile) && mobile.length > 0
                ? "شماره همراه درست نیست"
                : ""
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errMobile ? "red" : "",
                },
                "&:hover fieldset": {
                  borderColor: errMobile ? "red" : "",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errMobile ? "red" : "",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: errMobile ? "red" : "",
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
        <div className="pt-5">
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
                  <MdModeEditOutline />
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
      </Dialog>
    </>
  );
}
