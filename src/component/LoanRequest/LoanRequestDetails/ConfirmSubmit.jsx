import SendIcon from "@mui/icons-material/Send";
import { Divider, Tooltip } from "@mui/material";
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
import { MdDone } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { mainDomain } from "../../../utils/mainDomain";
import Loader from "../../loader";

ConfirmSubmit.propTypes = {
  id: PropTypes.number,
  setFlag: PropTypes.func,
  filteredArray: PropTypes.array,
};

export default function ConfirmSubmit({ setFlag, filteredArray }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const loanId = useSelector((store) => store.loanRequest.loanId);
  const loanRequestData = useSelector(
    (store) => store.loanRequest.loanRequestData
  );
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
  const Navigate = useNavigate();
  const submitHandler = () => {
    setLoading(true);
    handleClose();
    axios
      .post(
        mainDomain + `/api/LoanRequest/${loanId}/Submit`,
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
        Navigate(`/profile/LoanList`);
        Toast.fire({
          icon: "success",
          text: "درخواست بررسی مدارک با موفقیت ارسال شد",
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
      {filteredArray.length === 0 &&
        loanRequestData.cooperativeLoanDocs.filter((e) => e.status === 3)
          .length === 0 && (
          <Button
            size="large"
            onClick={handleClickOpen}
            sx={{
              width: "100%",
              whiteSpace: "nowrap",
              minWidth: "35px",
              fontWeight: "bold",
              transition: "0.6s",
              color: "#fff",
              backgroundColor: "rgb(249 115 22)",
              "&:hover": {
                backgroundColor: "rgb(234 88 12)",
              },
              boxShadow: "none",
            }}
          >
            <SendIcon fontSize="small" />
            <span className="px-1 text-xl">درخواست بررسی مدارک</span>
          </Button>
        )}
      {(filteredArray.length !== 0 ||
        loanRequestData.cooperativeLoanDocs.filter((e) => e.status === 3)
          .length !== 0) && (
        <Tooltip title="لطفا تمامی فایل های خواسته شده را بارگذاری نمایید">
          <span>
            <Button
              onClick={handleClickOpen}
              disabled
              size="large"
              sx={{
                width: "100%",
                whiteSpace: "nowrap",
                minWidth: "35px",
                fontWeight: "bold",
                transition: "0.6s",
                color: "#fff",
                backgroundColor: "#ccc",

                boxShadow: "none",
              }}
            >
              <SendIcon fontSize="small" />
              <span className="px-1 text-xl">درخواست بررسی مدارک</span>
            </Button>
          </span>
        </Tooltip>
      )}
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
        <DialogTitle sx={{ fontSize: 25 }}>{"درخواست بررسی مدارک"}</DialogTitle>
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
            onClick={submitHandler}
            sx={{
              minWidth: "35px",
              transition: "0.6s",
              color: "#fff",
              backgroundColor: "#556ee6",
              "&:hover": {
                backgroundColor: "#485ec4",
              },
              boxShadow: "none",
            }}
          >
            <div className="flex items-center">
              <span>تایید</span>
              <MdDone className="text-md" />
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
        </DialogActions>
      </Dialog>

      {Loading && <Loader />}
    </>
  );
}
