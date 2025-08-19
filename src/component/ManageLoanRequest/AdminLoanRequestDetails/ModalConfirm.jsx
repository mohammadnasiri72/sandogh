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
import { MdOutlineDone } from "react-icons/md";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../../utils/mainDomain";
import Loader from "../../loader";
import { useNavigate } from "react-router-dom";
import { setValTab } from "../../../redux/slice/adminLoan";
import { useDispatch } from "react-redux";

export default function ModalConfirm() {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const loanId = useSelector((store) => store.adminLoanRequest.loanId);
  const user = JSON.parse(localStorage.getItem("user"));
  const loanRequestData = useSelector(
    (store) => store.adminLoanRequest.loanRequestData
  );
  const [open, setOpen] = useState(false);
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
    if (
      loanRequestData.cooperativeLoanDocs.filter(
        (e) => e.status === 2 || e.status === 3
      ).length > 0
    ) {
      Swal.fire({
        icon: "error",
        title: "اخطار",
        text: "همه مدارک ارسالی تایید نشده است",
        confirmButtonText: "متوجه شدم",
      });
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const disPatch = useDispatch()
  const Navigate = useNavigate();
  const confirmHandler = () => {
    
    setLoading(true);
    handleClose();
    axios
      .post(
        mainDomain + `/api/LoanRequest/${loanId}/Confirm`,
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
        disPatch(setValTab(1));
        Toast.fire({
          icon: "success",
          text: "درخواست با موفقیت تایید شد",
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
          backgroundColor: "#34c38f",
          "&:hover": {
            backgroundColor: "#2ca67a",
          },
          boxShadow: "none",
        }}
      >
        <div className="flex items-center">
          <MdOutlineDone className="text-lg" />
          <span className="px-1 whitespace-nowrap">تایید درخواست</span>
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
        <DialogTitle sx={{ fontSize: 30, color: "rgb(16 185 129)" }}>
          {"تایید فایل"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText sx={{ mt: 0 }} id="alert-dialog-slide-description">
            <span>آیا از تایید فایل ارسالی مطمئن هستید؟</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor:
              themeMode === "dark" ? "rgb(30 41 59)" : "rgb(241 245 249)",
          }}
        >
          <Button
            onClick={confirmHandler}
            sx={{
              minWidth: "35px",
              transition: "0.6s",
              color: "white",
              backgroundColor:
                themeMode === "dark" ? "rgb(51 65 85)" : "rgb(16 185 129)",
              "&:hover": {
                backgroundColor: "rgb(5 150 105)",
                color: "white",
              },
              boxShadow: "none",
            }}
          >
            <div className="flex items-center">
              <span>تایید</span>
              <MdOutlineDone className="text-xl" />
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
