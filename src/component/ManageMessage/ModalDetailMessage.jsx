import { Divider, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { makeStyles } from "@mui/styles";
import "animate.css";
import axios from "axios";
import PropTypes from "prop-types";
import * as React from "react";
import { CgClose } from "react-icons/cg";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
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
  setOpenRes: PropTypes.func,
  openRes: PropTypes.bool,
  setSelectedMessage: PropTypes.func,
  setListMessage: PropTypes.func,
  listMessage: PropTypes.array,
  valType: PropTypes.string,
  notif: PropTypes.object,
};
export default function ModalDetailMessage({
  id,
  setOpenRes,
  openRes,
  setSelectedMessage,
  setListMessage,
  listMessage,
  valType,
  notif
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState({});

  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  React.useEffect(() => {
    if (openRes) {
      handleClose();
    }
  }, [openRes]);

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
          const updatedData = listMessage.map((item) =>
            item.id === id ? { ...item, seen: true } : item
          );
          setListMessage(updatedData);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
    if (open && valType!=='inbox') {
      setMessage(notif)
    }
  }, [open]);

  return (
    <>
      <div className="px-1">
        <Tooltip title="مشاهده جزئیات">
         
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
          <span className="text-xl">پیام</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        {!isLoading && (
          <div>
            <div className="px-5">
              <div className="flex justify-start items-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M22 7.81V16.19C22 19.83 19.83 22 16.19 22H7.81C7.61 22 7.41 21.99 7.22 21.98C5.99 21.9 4.95 21.55 4.13 20.95C3.71 20.66 3.34 20.29 3.05 19.87C2.36 18.92 2 17.68 2 16.19V7.81C2 4.37 3.94 2.24 7.22 2.03C7.41 2.01 7.61 2 7.81 2H16.19C17.68 2 18.92 2.36 19.87 3.05C20.29 3.34 20.66 3.71 20.95 4.13C21.64 5.08 22 6.32 22 7.81Z"
                    fill={themeMode==='dark'? '#fff' : themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                  />
                  <path
                    d="M16.67 5.64H7.33C6.18 5.64 5.25 6.57 5.25 7.72V8.9C5.25 9.31 5.59 9.65 6 9.65C6.41 9.65 6.75 9.31 6.75 8.9V7.72C6.75 7.4 7.01 7.14 7.33 7.14H11.25V16.86H9.47C9.06 16.86 8.72 17.2 8.72 17.61C8.72 18.02 9.06 18.36 9.47 18.36H14.54C14.95 18.36 15.29 18.02 15.29 17.61C15.29 17.2 14.95 16.86 14.54 16.86H12.76V7.14H16.68C17 7.14 17.26 7.4 17.26 7.72V8.9C17.26 9.31 17.6 9.65 18.01 9.65C18.42 9.65 18.76 9.31 18.76 8.9V7.72C18.75 6.58 17.82 5.64 16.67 5.64Z"
                    fill={themeMode==='dark'? '#fff' : themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                  />
                </svg>
                <div className="flex justify-start px-2">
                  <span className="text-xl">{message.title}</span>
                </div>
              </div>
            </div>
            <div className="px-5">
              <div className="flex justify-start py-3">
                <div className="flex items-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.4"
                      d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z"
                      fill={themeMode==='dark'? '#fff' : themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                    />
                    <path
                      d="M18.5 9.25H16.5C14.98 9.25 13.75 8.02 13.75 6.5V4.5C13.75 4.09 14.09 3.75 14.5 3.75C14.91 3.75 15.25 4.09 15.25 4.5V6.5C15.25 7.19 15.81 7.75 16.5 7.75H18.5C18.91 7.75 19.25 8.09 19.25 8.5C19.25 8.91 18.91 9.25 18.5 9.25Z"
                      fill={themeMode==='dark'? '#fff' : themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                    />
                    <path
                      d="M12 13.75H8C7.59 13.75 7.25 13.41 7.25 13C7.25 12.59 7.59 12.25 8 12.25H12C12.41 12.25 12.75 12.59 12.75 13C12.75 13.41 12.41 13.75 12 13.75Z"
                      fill={themeMode==='dark'? '#fff' : themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                    />
                    <path
                      d="M16 17.75H8C7.59 17.75 7.25 17.41 7.25 17C7.25 16.59 7.59 16.25 8 16.25H16C16.41 16.25 16.75 16.59 16.75 17C16.75 17.41 16.41 17.75 16 17.75Z"
                      fill={themeMode==='dark'? '#fff' : themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                    />
                  </svg>
                  <div
                    className="text-[#777] text-justify px-2"
                    dangerouslySetInnerHTML={{ __html: message.body }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="h-20 flex justify-center items-center">
            <SyncLoader
              color={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
            />
          </div>
        )}
        {message.sender !== "admin" && !isLoading && (
          <div>
            <Divider className="w-full" />
            <DialogActions>
              <div className="w-full flex justify-center items-center">
                <Button
                  onClick={() => {
                    setOpenRes(true);
                    setSelectedMessage(message);
                  }}
                  sx={{
                    fontSize: "12px",
                    minWidth: "35px",
                    transition: "0.6s",
                    color: themeColor.color,
                    background: themeColor.bgColor,
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
                        opacity="0.4"
                        d="M22 6.25V11.35C22 12.62 21.58 13.69 20.83 14.43C20.09 15.18 19.02 15.6 17.75 15.6V17.41C17.75 18.09 16.99 18.5 16.43 18.12L15.46 17.48C15.55 17.17 15.59 16.83 15.59 16.47V12.4C15.59 10.36 14.23 9 12.19 9H5.39999C5.25999 9 5.13 9.01002 5 9.02002V6.25C5 3.7 6.7 2 9.25 2H17.75C20.3 2 22 3.7 22 6.25Z"
                        fill={themeColor.color}
                      />
                      <path
                        d="M15.59 12.4V16.47C15.59 16.83 15.55 17.17 15.46 17.48C15.09 18.95 13.87 19.87 12.19 19.87H9.47L6.45 21.88C6 22.19 5.39999 21.86 5.39999 21.32V19.87C4.37999 19.87 3.53 19.53 2.94 18.94C2.34 18.34 2 17.49 2 16.47V12.4C2 10.5 3.18 9.19002 5 9.02002C5.13 9.01002 5.25999 9 5.39999 9H12.19C14.23 9 15.59 10.36 15.59 12.4Z"
                        fill={themeColor.color}
                      />
                    </svg>
                    <span className="px-1">ارسال پیام</span>
                  </div>
                </Button>
              </div>
            </DialogActions>
          </div>
        )}
      </Dialog>
    </>
  );
}
