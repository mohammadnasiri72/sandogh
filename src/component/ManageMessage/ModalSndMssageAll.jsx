import {
  CircularProgress,
  Divider,
  IconButton,
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
import { MdOutlineDone } from "react-icons/md";
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

ModalSndMssageAll.propTypes = {
  getListMessage: PropTypes.number,
};
export default function ModalSndMssageAll({ getListMessage }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [errTitle, setErrTitle] = React.useState(false);
  const [body, setBody] = React.useState("");
  const [errBody, setErrBody] = React.useState(false);

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

  const handleClose = () => {
    setOpen(false);
  };

  const submitFormHandler = () => {
    if (!title) {
      setErrTitle(true);
    }
    if (!body) {
      setErrBody(true);
    }
    if (title && body) {
      const data = {
        // receiver: '',
        title,
        body,
      };
      setIsLoading(true);
      axios
        .post(mainDomain + "/api/Message", data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          handleClose();
          setIsLoading(false);
          getListMessage();
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
      <div className="px-1">
        <Button
          onClick={handleClickOpen}
          sx={{
            width: "100%",
            transition: "0.6s",
            color: themeColor.color,
            background: themeColor.bgColor,

            boxShadow: "none",
          }}
        >
          <div className="flex items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M22 6.25V11.35C22 12.62 21.58 13.69 20.83 14.43C20.09 15.18 19.02 15.6 17.75 15.6V17.41C17.75 18.09 16.99 18.5 16.43 18.12L15.46 17.48C15.55 17.17 15.59 16.83 15.59 16.47V12.4C15.59 10.36 14.23 9 12.19 9H5.39999C5.25999 9 5.13 9.01002 5 9.02002V6.25C5 3.7 6.7 2 9.25 2H17.75C20.3 2 22 3.7 22 6.25Z"
                fill={themeColor.color}
              />
              <path
                d="M15.59 12.4V16.47C15.59 16.83 15.55 17.17 15.46 17.48C15.09 18.95 13.87 19.87 12.19 19.87H9.47L6.45 21.88C6 22.19 5.39999 21.86 5.39999 21.32V19.87C4.37999 19.87 3.53 19.53 2.94 18.94C2.34 18.34 2 17.49 2 16.47V12.4C2 10.5 3.18 9.19002 5 9.02002C5.13 9.01002 5.25999 9 5.39999 9H12.19C14.23 9 15.59 10.36 15.59 12.4Z"
                fill={themeColor.color}
              />
            </svg>
            <span className="px-1 whitespace-nowrap">ارسال پیام</span>
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
          <span className="text-xl">ارسال پیام</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        <div className="flex items-center justify-start px-5 text-sm">
          <span>گیرنده: </span>
          <span className="px-1">همه تشکل ها</span>
        </div>
        <div className="w-full px-2 mt-5">
          <TextField
            size="small"
            type="text"
            className="w-full"
            id="outlined-multiline-flexible"
            label="عنوان پیام*"
            name="name"
            onChange={(e) => {
              setTitle(e.target.value);
              setErrTitle(false);
              if (e.target.value === "") {
                setErrTitle(true);
              }
            }}
            value={title}
            FormHelperTextProps={{ sx: { color: "red" } }}
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
            size="small"
            type="text"
            multiline
            minRows={5}
            className="w-full"
            id="outlined-multiline-flexible"
            label="متن پیام*"
            name="Body"
            onChange={(e) => {
              setBody(e.target.value);
              setErrBody(false);
              if (e.target.value === "") {
                setErrBody(true);
              }
            }}
            value={body}
            FormHelperTextProps={{ sx: { color: "red" } }}
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
        <Divider className="w-full" />
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
