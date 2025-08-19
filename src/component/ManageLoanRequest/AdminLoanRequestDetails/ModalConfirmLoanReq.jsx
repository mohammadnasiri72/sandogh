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
import { BiSolidLike } from "react-icons/bi";
import { MdOutlineDone } from "react-icons/md";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../../utils/mainDomain";
import Loader from "../../loader";

ModalConfirmLoanReq.propTypes = {
  id: PropTypes.number,
  setFlag: PropTypes.func,
};
export default function ModalConfirmLoanReq({ id, setFlag }) {
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

  const confirmHandler = () => {
    setLoading(true);
    handleClose();

    axios
      .post(
        mainDomain + `/api/LoanRequest/Doc/${id}/Accept?desc=${desc}`,
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
          text: "فایل با موفقیت تایید شد",
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
          <Tooltip placement="top" title="تایید فایل">
            <IconButton
              size="medium"
              onClick={handleClickOpen}
              sx={{
                minWidth: "35px",
                transition: "0.6s",
                color: "#eaf9f4",
                backgroundColor:
                   "rgb(16 185 129)",
                "&:hover": {
                  backgroundColor: "rgb(5 150 105)",
                  color: "white",
                },
                boxShadow: "none",
              }}
            >
              <BiSolidLike className="text-xl" />
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
        <DialogTitle sx={{ fontSize: 30, color: "rgb(16 185 129)" }}>
          {"تایید فایل"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText sx={{ mt: 0 }} id="alert-dialog-slide-description">
            <span>
              آیا از تایید فایل ارسالی مطمئن هستید؟(چنانچه توضیحی دارید وارد
              کنید)
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
              onClick={confirmHandler}
              sx={{
                minWidth: "35px",
                transition: "0.6s",
                color: "white",
                backgroundColor: "rgb(16 185 129)",
                "&:hover": {
                  backgroundColor: "rgb(5 150 105)",
                },
                boxShadow: "none",
              }}
            >
              <div className="flex items-center">
                <MdOutlineDone className="text-lg" />
                <span>تایید</span>
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
