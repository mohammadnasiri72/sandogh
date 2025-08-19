import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { BiSolidDislike } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../../utils/mainDomain";
import Loader from "../../loader";

ModalRejectLoanReq.propTypes = {
  id: PropTypes.number,
  setFlag: PropTypes.func,
};
export default function ModalRejectLoanReq({ id, setFlag }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [Loading, setLoading] = useState(false);
  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const rejectHandler = () => {
    setLoading(true);
    handleClose();

    axios
      .post(
        mainDomain + `/api/LoanRequest/Doc/${id}/Refuse?desc=${desc}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then(() => {
        setLoading(false);
        setFlag((e) => !e);
        Toast.fire({
          icon: "success",
          text: "فایل با موفقیت رد شد",
          customClass: {
            container: "toast-modal",
          },
        });
      })
      .catch((err) => {
        setLoading(false);
        Toast.fire({
          icon: "error",
          text: err.response ? err.response.data : "خطای شبکه",
          customClass: {
            container: "toast-modal",
          },
        });
      });
  };
  return (
    <>
      <div className="mt-3">
        <div className="px-1">
          <Tooltip placement="top" title="رد کردن فایل">
            <IconButton
              size="medium"
              onClick={handleClickOpen}
              sx={{
                minWidth: "35px",
                transition: "0.6s",
                color: "#fef0f0",
                backgroundColor: "rgb(239 68 68)",
                "&:hover": {
                  backgroundColor: "rgb(220 38 38)",
                  color: "white",
                },
                boxShadow: "none",
              }}
            >
              <BiSolidDislike className="text-xl" />
            </IconButton>
          </Tooltip>
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
        <DialogTitle sx={{ fontSize: 30, color: "#f46a6a" }}>
          {"رد کردن فایل"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText sx={{ mt: 0 }} id="alert-dialog-slide-description">
            <span>
              آیا از رد فایل ارسالی مطمئن هستید؟(چنانچه توضیحی دارید وارد کنید)
            </span>
            <div className="w-full px-2 my-3">
              <TextField
                size="small"
                type="text"
                className="w-full"
                id="outlined-multiline-flexible"
                label="توضیحات"
                name="name"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                value={desc}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor:
              themeMode === "dark" ? "rgb(30 41 59)" : "rgb(241 245 249)",
          }}
        >
          <div className="flex justify-center items-center w-full gap-3">
            <Button
              onClick={rejectHandler}
              sx={{
                minWidth: "35px",
                transition: "0.6s",
                color: "#fff",
                backgroundColor: "#f46a6a",
                "&:hover": {
                  backgroundColor: "#cf5a5a",
                },
                boxShadow: "none",
              }}
            >
              <div className="flex items-center">
                <RxCross2 className="text-lg" />
                <span className="px-1">رد کردن</span>
              </div>
            </Button>
            <Button
              onClick={handleClose}
              sx={{
                minWidth: "35px",
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
                <span>انصراف</span>
              </div>
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      {Loading && <Loader />}
    </>
  );
}
