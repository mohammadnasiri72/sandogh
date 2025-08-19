import { Divider, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "animate.css";
import axios from "axios";
import PropTypes from "prop-types";
import * as React from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";
import Loader from "../loader";
import { RiArrowGoBackLine } from "react-icons/ri";

ModalBackLoan.propTypes = {
  id: PropTypes.number,
  setFlagDel: PropTypes.func,
  getLoanAdminList: PropTypes.func,
};

export default function ModalBackLoan({ id, setFlagDel, getLoanAdminList }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = React.useState(false);
  const [Loading, setLoading] = React.useState(false);
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

  const deleteHandler = () => {
    
    setLoading(true);
    axios
      .put(mainDomain + `/api/Loan/${id}/ComeBack`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        handleClose();
        setLoading(false);
        setFlagDel((e) => !e);
        if (getLoanAdminList) {
          getLoanAdminList();
        }
        Toast.fire({
          icon: "success",
          text: "عملیات با موفقیت انجام شد",
          customClass: {
            container: "toast-modal",
          },
        });
      })
      .catch((err) => {
        handleClose();
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
      <div className="px-1">
        {/* <Button
          size="large"
          onClick={handleClickOpen}
          sx={{
            fontSize: "12px",
            transition: "0.6s",
            color: "#fff",
            background: "#f46a6a",
            boxShadow: "none",
          }}
        >
          <div className="flex items-center">
            <span className="px-1 whitespace-nowrap">حذف</span>
          </div>
        </Button> */}
        <Tooltip title="برگشت به مرحله قبل">
          <span>
            <IconButton
              onClick={handleClickOpen}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <RiArrowGoBackLine className="text-[#f46a6a]" />
            </IconButton>
          </span>
        </Tooltip>
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
          {"بازگشت به مرحله قبل"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText sx={{ mt: 0 }} id="alert-dialog-slide-description">
            آیا از درخواست خود مطمئن هستید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor:
              themeMode === "dark" ? "rgb(30 41 59)" : "rgb(241 245 249)",
          }}
        >
          <Button
            onClick={deleteHandler}
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
              <span>بازگشت</span>
              <RiArrowGoBackLine className="" />
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
