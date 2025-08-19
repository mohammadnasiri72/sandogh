import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { MdOutlineDone } from "react-icons/md";
import { useSelector } from "react-redux";
import Switch from "react-switch";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";

UserAccount.propTypes = {
  nationalId: PropTypes.number,
  openUserAccount: PropTypes.bool,
};
export default function UserAccount({ nationalId, openUserAccount }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [errNewPass, setErrNewPass] = useState(false);
  const [newPassRepet, setNewPassRepet] = useState("");
  const [errNewPassRepet, setErrNewPassRepet] = useState(false);

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  useEffect(() => {
    if (open) {
      axios
        .get(mainDomain + `/api/Account/${nationalId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setActive(res.data.isActive);          
        })
        .catch(() => {});
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (openUserAccount) {
      setOpen(true);
    }
  }, [openUserAccount]);

  const submitFormHandler = () => {
    if (!newPass) {
      setErrNewPass(true);
    }
    if (!newPassRepet) {
      setErrNewPassRepet(true);
    }
    if (newPass && newPassRepet) {
      if (newPass !== newPassRepet) {
        Toast.fire({
          icon: "error",
          text: "تکرار رمز وارد شده یکسان نیست",
          customClass: {
            container: "toast-modal",
          },
        });
      } else {
        const data = {
          username: nationalId,
          isActive: active,
          newPassword: newPass,
          newPassword2: newPassRepet,
        };
        setIsLoading(true);
        axios
          .post(mainDomain + "/api/Cooperative/Account", data, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then(() => {
            setIsLoading(false);
            handleClose();
            Toast.fire({
              icon: "success",
              text: "عملیات با موفقیت انجام شد",
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
      <div className="sm:block hidden">
        <Tooltip title="حساب کاربری">
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
                d="M12 17.1879C12.9002 17.1879 13.63 16.465 13.63 15.5731C13.63 14.6813 12.9002 13.9584 12 13.9584C11.0998 13.9584 10.37 14.6813 10.37 15.5731C10.37 16.465 11.0998 17.1879 12 17.1879Z"
                fill="#1787B0"
              />
              <path
                d="M16.65 9.35181H7.35C3.25 9.35181 2 10.5901 2 14.6518V16.4944C2 20.5561 3.25 21.7944 7.35 21.7944H16.65C20.75 21.7944 22 20.5561 22 16.4944V14.6518C22 10.5901 20.75 9.35181 16.65 9.35181ZM12 18.5649C10.33 18.5649 8.98 17.2176 8.98 15.5731C8.98 13.9286 10.33 12.5813 12 12.5813C13.67 12.5813 15.02 13.9286 15.02 15.5731C15.02 17.2176 13.67 18.5649 12 18.5649Z"
                fill="#1787B0"
              />
              <path
                opacity="0.4"
                d="M7.11997 9.3617V8.20263C7.11997 5.30001 7.94997 3.36824 12 3.36824C16.05 3.36824 16.88 5.30001 16.88 8.20263V9.3617C17.39 9.3716 17.85 9.39142 18.28 9.45086V8.20263C18.28 5.52786 17.63 1.98132 12 1.98132C6.36997 1.98132 5.71997 5.52786 5.71997 8.20263V9.44095C6.13997 9.39142 6.60997 9.3617 7.11997 9.3617Z"
                fill="#1787B0"
              />
            </svg>
          </IconButton>
        </Tooltip>
      </div>
      <div className="sm:hidden block ">
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
              d="M12 17.1879C12.9002 17.1879 13.63 16.465 13.63 15.5731C13.63 14.6813 12.9002 13.9584 12 13.9584C11.0998 13.9584 10.37 14.6813 10.37 15.5731C10.37 16.465 11.0998 17.1879 12 17.1879Z"
              fill="#1787B0"
            />
            <path
              d="M16.65 9.35181H7.35C3.25 9.35181 2 10.5901 2 14.6518V16.4944C2 20.5561 3.25 21.7944 7.35 21.7944H16.65C20.75 21.7944 22 20.5561 22 16.4944V14.6518C22 10.5901 20.75 9.35181 16.65 9.35181ZM12 18.5649C10.33 18.5649 8.98 17.2176 8.98 15.5731C8.98 13.9286 10.33 12.5813 12 12.5813C13.67 12.5813 15.02 13.9286 15.02 15.5731C15.02 17.2176 13.67 18.5649 12 18.5649Z"
              fill="#1787B0"
            />
            <path
              opacity="0.4"
              d="M7.11997 9.3617V8.20263C7.11997 5.30001 7.94997 3.36824 12 3.36824C16.05 3.36824 16.88 5.30001 16.88 8.20263V9.3617C17.39 9.3716 17.85 9.39142 18.28 9.45086V8.20263C18.28 5.52786 17.63 1.98132 12 1.98132C6.36997 1.98132 5.71997 5.52786 5.71997 8.20263V9.44095C6.13997 9.39142 6.60997 9.3617 7.11997 9.3617Z"
              fill="#1787B0"
            />
          </svg>
          <span className="px-1 text-xs text-[#1787B0]">حساب کاربری</span>
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
          className={
            themeMode === "dark"
              ? "flex justify-between px-5 items-center py-2 bg-slate-700"
              : "flex justify-between px-5 items-center py-2 bg-slate-50"
          }
        >
          <span className="text-2xl">حساب کاربری</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        <Divider />
        <DialogContent>
          <div className="flex flex-col items-start">
            <span>نام کاربری</span>
            <span>{nationalId}</span>
            {/* <FormControlLabel
                onChange={() => {
                  setActive((e) => !e);
                }}
                control={<Switch checked={active} />}
                label={active ? "فعال" : "غیرفعال"}
              /> */}
            <div className="flex items-center py-2 ">
              <span className="-mt-2 text-sm">فعال :</span>
              <Switch
                uncheckedIcon={
                  <span className="text-xs text-white px-2">خیر</span>
                }
                checkedIcon={
                  <span className="text-xs px-2 text-white">بله</span>
                }
                className="me-1 mb-sm-8 mb-2"
                onColor={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                onChange={() => {
                  setActive((e) => !e);
                }}
                checked={active}
              />
            </div>
            <div className="flex relative w-full px-2 mt-3">
              <TextField
                size="small"
                type="password"
                className="w-full"
                id="outlined-multiline-flexible"
                label="رمز جدید"
                name="name"
                onChange={(e) => {
                  setNewPass(e.target.value);
                  setErrNewPass(false);
                }}
                value={newPass}
                FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
                helperText={errNewPass ? "لطفا رمز جدید را وارد کنید" : ""}
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
              />
            </div>
            <div className="flex relative w-full px-2 mt-3">
              <TextField
                size="small"
                type="password"
                className="w-full"
                id="outlined-multiline-flexible"
                label="تکرار رمز جدید"
                name="name"
                onChange={(e) => {
                  setNewPassRepet(e.target.value);
                  setErrNewPassRepet(false);
                }}
                value={newPassRepet}
                FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
                helperText={
                  errNewPassRepet ? "لطفا تکرار رمز جدید را وارد کنید" : ""
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
              />
            </div>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions>
          <div className="flex w-full px-6 justify-center">
            <Button
              onClick={submitFormHandler}
              sx={{
                minWidth: "35px",
                transition: "0.6s",
                color: themeColor.color,
                background: themeColor.bgColor,
                boxShadow: "none",
              }}
            >
              {/* <div className="flex items-center">
                  <MdOutlineDone className="text-md" />
                  <span className="px-1">تایید</span>
                </div> */}
              {!isLoading && (
                <div className="flex items-center">
                  <MdOutlineDone className="text-md" />
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
        </DialogActions>
      </Dialog>
    </>
  );
}
