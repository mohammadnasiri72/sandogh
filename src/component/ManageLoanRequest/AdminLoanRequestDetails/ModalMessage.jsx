import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { CiMail } from "react-icons/ci";
import { MdOutlineDone } from "react-icons/md";
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

export default function ModalMessage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [errTitle, setErrTitle] = useState(false);
  const [body, setBody] = useState("");
  const [errBody, setErrBody] = useState(false);
  const [sendSmsUser, setSendSmsUser] = useState(false);
  const [sendSmsContract, setSendSmsContract] = useState(false);

  const classes = useStyles();
  const themeMode = useSelector((store) => store.setting.themeMode);
  const loanId = useSelector((store) => store.adminLoanRequest.loanId);

  const resetState = () => {
    setTitle("");
    setBody("");
    setErrTitle(false);
    setErrBody(false);
    setSendSmsUser(false);
    setSendSmsContract(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const submitFormHandler = () => {
    if (!title) {
      setErrTitle(true);
    }
    if (!body) {
      setErrBody(true);
    }
    if (title && body) {
      setIsLoading(true);
      const data = {
        requestId: Number(loanId),
        title,
        body,
        sendToUser: sendSmsUser,
        sendToContractingParty: sendSmsContract,
      };
      axios
        .post(mainDomain + `/api/Message/LoanRequest`, data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          setIsLoading(false);
          handleClose();
          Toast.fire({
            icon: "success",
            text: "پیام با موفقیت ارسال شد",
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
      <Button
        size="large"
        onClick={handleClickOpen}
        sx={{
          fontSize: "12px",
          transition: "0.6s",
          height:'100%',
          color: "#fff",
          backgroundColor: "#556ee6",
          "&:hover": {
            backgroundColor: "#485ec4",
          },
          boxShadow: "none",
        }}
      >
        <div className="flex items-center">
          <CiMail className="text-lg" />
          <span className="px-1 whitespace-nowrap">ارسال پیام</span>
        </div>
      </Button>
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
          <span className="text-xl">ارسال پیام</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        <div className=" flex flex-wrap items-start mt-5">
          <div className="w-full px-2 mt-5">
            <TextField
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="عنوان پیام*"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
                setErrTitle(false);
                if (e.target.value === "") {
                  setErrTitle(true);
                }
              }}
              value={title}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errTitle ? "لطفا عنوان پیام را وارد کنید" : ""}
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
          <div className="w-full px-2 mt-5">
            <TextField
              multiline
              minRows={5}
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="متن پیام*"
              name="title"
              onChange={(e) => {
                setBody(e.target.value);
                setErrBody(false);
                if (e.target.value === "") {
                  setErrBody(true);
                }
              }}
              value={body}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errBody ? "لطفا متن پیام را وارد کنید" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errBody ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errBody ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errBody ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errBody ? "red" : "",
                  "&.Mui-focused": { color: errBody ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="flex justify-between sm:px-5 px-2 w-full flex-wrap py-3">
            <div className="flex items-center">
              <span className="-mt-2 text-xs"> ارسال پیامک به کاربر :</span>
              <Switch
                uncheckedIcon={<span className="text-xs text-white">خیر</span>}
                checkedIcon={
                  <span className="text-xs px-2 text-white">بله</span>
                }
                className="me-1 mb-sm-8 mb-2"
                onColor="#556ee6"
                onChange={() => {
                  setSendSmsUser((e) => !e);
                }}
                checked={sendSmsUser}
              />
            </div>
            <div className="flex items-center">
              <span className="-mt-2 text-xs">
                {" "}
                ارسال پیامک به طرف های قرارداد :
              </span>
              <Switch
                uncheckedIcon={<span className="text-xs text-white">خیر</span>}
                checkedIcon={
                  <span className="text-xs px-2 text-white">بله</span>
                }
                className="me-1 mb-sm-8 mb-2"
                onColor="#556ee6"
                onChange={() => {
                  setSendSmsContract((e) => !e);
                }}
                checked={sendSmsContract}
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
                color: "#fff",
                backgroundColor: "#556ee6",
                "&:hover": {
                  backgroundColor: "#485ec4",
                  color: "white",
                },
                boxShadow: "none",
              }}
            >
              {!isLoading && (
                <div className="flex items-center">
                  <MdOutlineDone />
                  <span className="px-1">ارسال</span>
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
