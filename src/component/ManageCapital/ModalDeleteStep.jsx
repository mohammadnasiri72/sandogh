import { Button, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "animate.css";
import axios from "axios";
import PropTypes from "prop-types";
import * as React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import { mainDomain } from "../../utils/mainDomain";
import Loader from "../loader";

ModalDeleteStep.propTypes = {
  valStep: PropTypes.number,
  setFlag: PropTypes.func,
};

export default function ModalDeleteStep({ valStep, setFlag }) {
  const themeMode = useSelector((store) => store.setting.themeMode);

  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
      .delete(mainDomain + `/api/Capital/step/${valStep}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        setFlag((e) => !e);
        Toast.fire({
          icon: "success",
          text: "مرحله با موفقیت حذف شد",
          customClass: {
            container: "toast-modal",
          },
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          text: err.response ? err.response.data : "خطای شبکه",
          customClass: {
            container: "toast-modal",
          },
        });
      })
      .finally(() => {
        setLoading(false);
        handleClose();
      });
  };

  return (
    <>
      <div className="sm:w-auto w-full sm:mt-0 mt-2">
        <Button className="w-full"
          onClick={handleClickOpen}
          sx={{
            fontSize: "12px",
            // minWidth: "35px",
            transition: "0.6s",
            color: "#fff",
            background: "#F82E32",
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
                d="M21.07 5.18109C19.46 5.02258 17.85 4.9037 16.23 4.81454V4.80464L16.01 3.51679C15.86 2.60538 15.64 1.23828 13.3 1.23828H10.68C8.35004 1.23828 8.13003 2.54594 7.97004 3.50688L7.76004 4.77492C6.83004 4.83436 5.90004 4.8938 4.97004 4.98295L2.93004 5.18109C2.51004 5.22071 2.21004 5.58725 2.25004 5.99342C2.29004 6.39959 2.65004 6.69679 3.07004 6.65716L5.11004 6.45903C10.35 5.94389 15.63 6.14202 20.93 6.66707C20.96 6.66707 20.98 6.66707 21.01 6.66707C21.39 6.66707 21.72 6.37978 21.76 5.99342C21.79 5.58725 21.49 5.22071 21.07 5.18109Z"
                fill="#fff"
              />
              <path
                opacity="0.3991"
                d="M19.23 8.06397C18.99 7.8163 18.66 7.67761 18.32 7.67761H5.67999C5.33999 7.67761 4.99999 7.8163 4.76999 8.06397C4.53999 8.31163 4.40999 8.64845 4.42999 8.99518L5.04999 19.1593C5.15999 20.6651 5.29999 22.5473 8.78999 22.5473H15.21C18.7 22.5473 18.84 20.675 18.95 19.1593L19.57 9.00509C19.59 8.64845 19.46 8.31163 19.23 8.06397Z"
                fill="#fff"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.57996 16.8411C9.57996 16.4308 9.91574 16.0981 10.33 16.0981H13.66C14.0742 16.0981 14.41 16.4308 14.41 16.8411C14.41 17.2515 14.0742 17.5841 13.66 17.5841H10.33C9.91574 17.5841 9.57996 17.2515 9.57996 16.8411Z"
                fill="#fff"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.75 12.8785C8.75 12.4681 9.08579 12.1355 9.5 12.1355H14.5C14.9142 12.1355 15.25 12.4681 15.25 12.8785C15.25 13.2888 14.9142 13.6215 14.5 13.6215H9.5C9.08579 13.6215 8.75 13.2888 8.75 12.8785Z"
                fill="#fff"
              />
            </svg>
            <span className="px-1">حذف کلی مرحله فعلی</span>
          </div>
        </Button>
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
          {"حذف تعاونی"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText sx={{ mt: 0 }} id="alert-dialog-slide-description">
            آیا از حذف مطمئن هستید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor:
              themeMode === "dark" ? "rgb(30 41 59)" : "rgb(241 245 249)",
          }}
        >
          <Button
            loading={loading}
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
              <span>حذف</span>
              <IoTrashOutline className="text-xl" />
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
        {loading && <Loader />}
      </Dialog>
    </>
  );
}
