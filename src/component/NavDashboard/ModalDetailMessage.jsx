import { Divider, IconButton } from "@mui/material";
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
  open: PropTypes.bool,
  openRes: PropTypes.bool,
  setOpen: PropTypes.func,
  setOpenRes: PropTypes.func,
  setSelectedMessage: PropTypes.func,
  id: PropTypes.number,
  listMessage: PropTypes.array,
  setListMessage: PropTypes.func,
  setFlag: PropTypes.func,
};
export default function ModalDetailMessage({
  open,
  setOpen,
  openRes,
  setOpenRes,
  setSelectedMessage,
  listMessage,
  setListMessage,
  id,
  setFlag,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState({});

  const classes = useStyles();

  React.useEffect(() => {
    if (openRes) {
      handleClose();
    }
  }, [openRes]);

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (open) {
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
          setFlag((e) => !e);
          const updatedData = listMessage.map((item) =>
            item.id === id ? { ...item, seen: true } : item
          );
          setListMessage(updatedData);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [open]);

  return (
    <>
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
              <div className="flex justify-start">
                <span>عنوان پیام</span>
              </div>
              <div className="flex justify-start py-3">
                <span>{message.title}</span>
              </div>
            </div>
            <div className="h-5"></div>
            <div className="px-5">
              <div className="flex justify-start">
                <span>متن پیام</span>
              </div>
              <div className="flex justify-start py-3">
                <div
                  className="text-[#777] text-justify px-2"
                  dangerouslySetInnerHTML={{ __html: message.body }}
                />
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
        {!isLoading && (
          <div>
            <Divider className="w-full" />
            {message.sender !== "admin" && (
              <DialogActions>
                <div className="w-full flex justify-start items-center">
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
            )}
          </div>
        )}
      </Dialog>
    </>
  );
}
