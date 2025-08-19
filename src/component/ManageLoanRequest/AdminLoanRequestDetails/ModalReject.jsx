import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { mainDomain } from "../../../utils/mainDomain";
import Loader from "../../loader";

ModalReject.propTypes = {
 
};
export default function ModalReject() {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const user = JSON.parse(localStorage.getItem("user"));
  const loanId = useSelector((store) => store.adminLoanRequest.loanId);
  const [open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const Navigate = useNavigate();
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
        mainDomain + `/api/LoanRequest/${loanId}/Reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then(() => {
        setLoading(false);
        Navigate(`/profile/AdminLoanList`)
        Toast.fire({
          icon: "success",
          text: "درخواست با موفقیت رد شد",
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
      <Button
        size="large"
        onClick={handleClickOpen}
        sx={{
          fontSize: "12px",
          transition: "0.6s",
          height:'100%',
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
          <span className="px-1 whitespace-nowrap">رد درخواست</span>
        </div>
      </Button>
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
          {"رد کردن درخواست"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText sx={{ mt: 0 }} id="alert-dialog-slide-description">
            <span>آیا از رد درخواست مطمئن هستید؟</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor:
              themeMode === "dark" ? "rgb(30 41 59)" : "rgb(241 245 249)",
          }}
        >
          <Button
            onClick={rejectHandler}
            sx={{
              minWidth: "35px",
              transition: "0.6s",
              color: "#f46a6a",
              backgroundColor:
                themeMode === "dark" ? "rgb(51 65 85)" : "#fef0f0",
              "&:hover": {
                backgroundColor: "#f46a6a",
                color: "white",
              },
              boxShadow: "none",
            }}
          >
            <div className="flex items-center">
              <span className="px-1">رد کردن</span>
              <ImCross className="text-xs" />
            </div>
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              minWidth: "35px",
              transition: "0.6s",
              color: "#74788d",
              backgroundColor:
                themeMode === "dark" ? "rgb(51 65 85)" : "#f1f1f3",
              "&:hover": {
                backgroundColor: "#74788d",
                color: "white",
              },
              boxShadow: "none",
            }}
          >
            <div className="flex items-center">
              <span>انصراف</span>
            </div>
          </Button>
        </DialogActions>
      </Dialog>
      {Loading && <Loader />}
    </>
  );
}
