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
import PropTypes from "prop-types";
import { useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";
import Loader from "../loader";
import { setValTab } from "../../redux/slice/adminLoan";
import { useDispatch } from "react-redux";

FinalConfirm.propTypes = {
  loan: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  getLoanAdminList: PropTypes.func,
  getLoanRequestAdminList: PropTypes.func,
};
export default function FinalConfirm({
  loan,
  open,
  setOpen,
  getLoanAdminList,
  getLoanRequestAdminList,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const user = JSON.parse(localStorage.getItem("user"));
  const disPatch = useDispatch();
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

  const handleClose = () => {
    setOpen(false);
  };

  const confirmHandler = () => {
    setLoading(true);
    handleClose();
    axios
      .put(
        mainDomain + `/api/Loan/${loan.loanId}/Record`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then(() => {
        if (getLoanAdminList) {
          getLoanAdminList({
            page: 1,
            status: 100,
          });
        }
        if (getLoanRequestAdminList) {
          getLoanRequestAdminList();
        }
        setLoading(false);
        disPatch(setValTab(2));
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
          {"تایید نهایی"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText sx={{ mt: 0 }} id="alert-dialog-slide-description">
            <span>آیا از تایید نهایی مطمئن هستید؟</span>
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
        {Loading && <Loader />}
      </Dialog>
    </>
  );
}
