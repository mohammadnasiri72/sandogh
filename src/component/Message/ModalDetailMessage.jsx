import { Divider, IconButton, Skeleton, Tooltip } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { makeStyles } from "@mui/styles";
import "animate.css";
import axios from "axios";
import PropTypes from "prop-types";
import * as React from "react";
import { CgClose } from "react-icons/cg";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useSelector } from "react-redux";
import { mainDomain } from "../../utils/mainDomain";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

ModalDetailMessage.propTypes = {
  id: PropTypes.number,
  handleStatusChange: PropTypes.func,
  valType: PropTypes.string,
  notif: PropTypes.object,
};
export default function ModalDetailMessage({
  id,
  handleStatusChange,
  valType,
  notif
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState({});

  

  
  

  

  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
    handleStatusChange(id)
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (open && valType==='inbox') {
      setIsLoading(true);
      axios
        .get(mainDomain + `/api/Message/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setMessage(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
    if (open && valType !== 'inbox') {
      setMessage(notif)
    }
  }, [open]);

  return (
    <>
      <div className="px-1">
        <Tooltip title="مشاهده جزئیات">
          {/* <Button
            onClick={handleClickOpen}
            sx={{
              minWidth: "35px",
              transition: "0.6s",
              color: "#546de5",
              backgroundColor:
                themeMode === "dark" ? "rgb(51 65 85)" : "#edf0fd",
              "&:hover": {
                backgroundColor: "#556ee6",
                color: "white",
              },
              boxShadow: "none",
            }}
          >
            <FaEye className="text-xl" />
          </Button> */}
          <IconButton
                      onClick={handleClickOpen}
                      sx={{
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M21.25 9.06449C18.94 5.46842 15.56 3.39795 12 3.39795C10.22 3.39795 8.49 3.91309 6.91 4.87402C5.33 5.84487 3.91 7.2615 2.75 9.06449C1.75 10.6198 1.75 13.146 2.75 14.7013C5.06 18.3073 8.44 20.3679 12 20.3679C13.78 20.3679 15.51 19.8527 17.09 18.8918C18.67 17.9209 20.09 16.5043 21.25 14.7013C22.25 13.1559 22.25 10.6198 21.25 9.06449ZM12 15.8901C9.76 15.8901 7.96 14.097 7.96 11.8879C7.96 9.6787 9.76 7.88561 12 7.88561C14.24 7.88561 16.04 9.6787 16.04 11.8879C16.04 14.097 14.24 15.8901 12 15.8901Z"
                          fill="#1787B0"
                        />
                        <path
                          d="M12 9.05457C10.43 9.05457 9.15002 10.3226 9.15002 11.8878C9.15002 13.4432 10.43 14.7112 12 14.7112C13.57 14.7112 14.86 13.4432 14.86 11.8878C14.86 10.3325 13.57 9.05457 12 9.05457Z"
                          fill="#1787B0"
                        />
                      </svg>
                    </IconButton>
        </Tooltip>
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
          <span className="text-2xl">پیام</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        <div className="px-5">
          <div className="flex justify-start">
            <span>عنوان پیام</span>
          </div>
          <div className="flex justify-start">
            {!isLoading && <span>{message.title}</span>}
            {isLoading && (
              <Skeleton width={"30%"} height={15} variant="rounded" />
            )}
          </div>
        </div>
        <div className="h-5"></div>
        <div className="px-5">
          <div className="flex justify-start">
            <span>متن پیام</span>
          </div>
          <div className="flex justify-start py-3">
            {!isLoading && (
              <div
                className="text-[#777] text-justify px-2"
                dangerouslySetInnerHTML={{ __html: message.body }}
              />
            )}
            {isLoading && (
              <Skeleton width={"70%"} height={15} variant="rounded" />
            )}
          </div>
        </div>
        <Divider className="w-full" />
      </Dialog>
    </>
  );
}
