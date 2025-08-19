import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    IconButton,
    TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { MdOutlineDone } from "react-icons/md";
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

ModalResponseMessage.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
  selectedMessage: PropTypes.object,
  getListMessage: PropTypes.func,
};
export default function ModalResponseMessage({
  open,
  setOpen,
  selectedMessage,
  getListMessage,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const user = JSON.parse(localStorage.getItem("user"));
   const themeColor = useSelector((store) => store.setting.themeColor);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [errTitle, setErrTitle] = useState(false);
  const [body, setBody] = useState("");
  const [errBody, setErrBody] = useState(false);

  useEffect(() => {
    if (selectedMessage.title) {
      setTitle(`پاسخ ${selectedMessage.title}`);
    }
  }, [selectedMessage]);

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
  const resetState = () => {
    setTitle("");
    setBody("");
    setErrTitle(false);
    setErrBody(false);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
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
        receiver: selectedMessage.sender,
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
          <span className="text-xl">ارسال پیام</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        <div className="py-2">
          <span>گیرنده: </span>
          <span className="px-1">{selectedMessage.cooperativeTitle}</span>
          <div className="w-full px-2 mt-3">
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
          <div className="w-full px-2 mt-3">
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
        </div>
        <DialogActions>
          <div className="flex w-full justify-center">
            <Button
              size="large"
              onClick={submitFormHandler}
              disabled={isLoading}
              className="bg-slate-800"
              sx={{
                fontSize:'12px',
                transition: "0.6s",
                color: themeColor.color,
                background: themeColor.bgColor,
                boxShadow: "none",
              }}
            >
              {!isLoading && (
                <div className="flex items-center">
                  <MdOutlineDone className="text-lg"/>
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
