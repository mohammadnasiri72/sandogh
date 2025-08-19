import {
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { makeStyles } from "@mui/styles";
import "animate.css";
import axios from "axios";
import { useState } from "react";
import { BiLockOpen } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

ModalChangPass.propTypes = {
  // setValuetabs: PropTypes.func,
};
export default function ModalChangPass() {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pass, setPass] = useState("");
  const [errPass, setErrPass] = useState(false);
  const [isPass, setIsPass] = useState(true);
  const [newPass, setNewPass] = useState("");
  const [errNewPass, setErrNewPass] = useState(false);
  const [isNewPass, setIsNewPass] = useState(true);
  const [newPassRepet, setNewPassRepet] = useState("");
  const [errNewPassRepet, setErrNewPassRepet] = useState(false);
  const [isNewPassRepet, setIsNewPassRepet] = useState(true);
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
    setPass("");
    setNewPass("");
    setNewPassRepet("");
    setErrPass(false);
    setErrNewPass(false);
    setErrNewPassRepet(false);
    setIsPass(true);
    setIsNewPass(true);
    setIsNewPassRepet(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  const submitFormHandler = () => {
    if (!pass) {
      setErrPass(true);
    }
    if (!newPass) {
      setErrNewPass(true);
    }
    if (!newPassRepet) {
      setErrNewPassRepet(true);
    }
    if (pass && newPass && newPassRepet) {
      if (newPass !== newPassRepet) {
        Toast.fire({
          icon: "error",
          text: "تکرار پسورد جدید یکسان نیست",
          customClass: {
            container: "toast-modal",
          },
        });
      }

      if (newPass === newPassRepet) {
        const data = {
          currentPassword: pass,
          newPassword: newPass,
          newPassword2: newPassRepet,
        };
        setIsLoading(true);
        axios
          .post(mainDomain + "/api/Account/ChangePassword", data, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then(() => {
            setIsLoading(false);
            handleClose();
            Toast.fire({
              icon: "success",
              text: "رمز عبور با موفقیت تغییر کرد",
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
    }
  };

  return (
    <>
      <MenuItem sx={{ padding: 2 }} onClick={handleClickOpen}>
        <div className="flex justify-start items-center">
          <BiLockOpen />
          <span
            className={
              themeMode === "dark"
                ? "text-xs text-[#fffb] px-1"
                : "text-xs text-[#000b] px-1"
            }
          >
            تغییر رمز عبور
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
          <span className="text-2xl">تغییر رمز عبور</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>

        <div className="w-full px-2 my-3 flex items-center relative">
          <TextField
            size="small"
            type={isPass ? "password" : "text"}
            className="w-full"
            id="outlined-multiline-flexible"
            label="رمز عبور فعلی*"
            name="pass"
            onChange={(e) => {
              setPass(e.target.value);
              setErrPass(false);
              if (e.target.value === "") {
                setErrPass(true);
              }
            }}
            value={pass}
            FormHelperTextProps={{ sx: { color: "red" } }}
            helperText={errPass ? "لطفا رمز عبور فعلی را وارد کنید" : ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errPass ? "red" : "",
                },
                "&:hover fieldset": {
                  borderColor: errPass ? "red" : "",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errPass ? "red" : "",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: errPass ? "red" : "",
                "&.Mui-focused": { color: errPass ? "red" : "" },
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setIsPass((e) => !e);
                      }}
                    >
                      {isPass && <FaEye />}
                      {!isPass && <FaEyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>

        <div className="w-full px-2 my-3 flex items-center relative">
          <TextField
            size="small"
            type={isNewPass ? "password" : "text"}
            className="w-full"
            id="outlined-multiline-flexible"
            label="رمز عبور جدید*"
            name="newPass"
            onChange={(e) => {
              setNewPass(e.target.value);
              setErrNewPass(false);
              if (e.target.value === "") {
                setErrNewPass(true);
              }
            }}
            value={newPass}
            FormHelperTextProps={{ sx: { color: "red" } }}
            helperText={errNewPass ? "لطفا رمز عبور جدید را وارد کنید" : ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errNewPass ? "red" : "",
                },
                "&:hover fieldset": {
                  borderColor: errNewPass ? "red" : "",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errNewPass ? "red" : "",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: errNewPass ? "red" : "",
                "&.Mui-focused": { color: errNewPass ? "red" : "" },
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setIsNewPass((e) => !e);
                      }}
                    >
                      {isNewPass && <FaEye />}
                      {!isNewPass && <FaEyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>

        <div className="w-full px-2 my-3 flex items-center relative">
          <TextField
            size="small"
            type={isNewPassRepet ? "password" : "text"}
            className="w-full"
            id="outlined-multiline-flexible"
            label="رمز عبور جدید*"
            name="newPass"
            onChange={(e) => {
              setNewPassRepet(e.target.value);
              setErrNewPassRepet(false);
              if (e.target.value === "") {
                setErrNewPassRepet(true);
              }
            }}
            value={newPassRepet}
            FormHelperTextProps={{ sx: { color: "red" } }}
            helperText={
              errNewPassRepet ? "لطفا رمز عبور جدید را وارد کنید" : ""
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errNewPassRepet ? "red" : "",
                },
                "&:hover fieldset": {
                  borderColor: errNewPassRepet ? "red" : "",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errNewPassRepet ? "red" : "",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: errNewPassRepet ? "red" : "",
                "&.Mui-focused": { color: errNewPassRepet ? "red" : "" },
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setIsNewPassRepet((e) => !e);
                      }}
                    >
                      {isNewPassRepet && <FaEye />}
                      {!isNewPassRepet && <FaEyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>

        <Divider className="w-full" />

        <DialogActions>
          <div className="flex w-full justify-center">
            <Button
              size="large"
              onClick={submitFormHandler}
              disabled={isLoading}
              className="bg-slate-800"
              sx={{
                minWidth: "80px",
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
