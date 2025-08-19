import { IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
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
import { SyncLoader } from "react-spinners";
import { mainDomain } from "../../utils/mainDomain";
import TableFileDownload from "./TableFileDownload";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

ModalDownloadFile.propTypes = {
  id: PropTypes.number,
};
export default function ModalDownloadFile({ id }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const user = JSON.parse(localStorage.getItem("user"));
  const themeColor = useSelector((store) => store.setting.themeColor);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [listFile, setListFile] = React.useState([]);
  const [listFileItem, setListFileItem] = React.useState([]);

  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (open) {
      setIsLoading(true);
      axios
        .get(mainDomain + `/api/CooperativeFile`, {
          params: {
            id,
            typeId: 1,
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setListFile(res.data);
        })
        .catch(() => {
          setIsLoading(false);
        });

      axios
        .get(mainDomain + `/api/CooperativeFile/ItemTypes`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setListFileItem(res.data);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [open]);

  return (
    <>
      <div className="px-1">
        <Tooltip title="انتقال مدارک">
          <Button
            onClick={handleClickOpen}
            sx={{
              minWidth: "35px",
              transition: "0.6s",
              color: "#fff",
              "&:hover": {
                backgroundColor: "transparent",
              },
              boxShadow: "none",
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
                d="M21.99 10.84C21.97 10.36 21.89 9.88999 21.74 9.43999C21.05 7.27999 19.03 5.71999 16.65 5.71999H13.86C13.28 5.71999 13.24 5.65998 12.93 5.24998L11.53 3.38998C10.88 2.51998 10.37 1.98999 8.73999 1.98999H6.40997C3.96997 1.98999 1.98999 3.96999 1.98999 6.40999V9.42998V16.64C1.98999 19.59 4.39003 21.99 7.34003 21.99H16.64C19.59 21.99 21.99 19.59 21.99 16.64V11.06C22 11 22 10.91 21.99 10.84Z"
                fill={themeMode==='dark'? '#fff' : '#1787B0'}
              />
              <path
                d="M15.5801 19.7C13.4701 19.85 13.4701 22.91 15.5801 23.06H20.5901C21.2001 23.06 21.78 22.84 22.23 22.43C23.71 21.14 22.92 18.54 20.97 18.3C20.27 14.08 14.16 15.68 15.61 19.7"
                fill={themeMode==='dark'? '#fff' : '#1787B0'}
              />
            </svg>
          </Button>
        </Tooltip>
      </div>
      <Dialog
        PaperProps={{
          className: classes.animatedDialog,
          sx: { width: "700px", maxWidth: "none" },
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
          <span className="text-xl">فایل های ضمیمه</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        <TableFileDownload listFile={listFile} listFileItem={listFileItem} />
        {isLoading && (
          <div className="flex justify-center items-center w-full h-52">
            <SyncLoader
              color={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
            />
          </div>
        )}
      </Dialog>
    </>
  );
}
