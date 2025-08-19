import {
  Button,
  Dialog,
  Divider,
  IconButton,
  ListItemButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

MessageReeceived.propTypes = {
  dataDashboard: PropTypes.object,
};

export default function MessageReeceived({ dataDashboard }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [open, setOpen] = useState(false);
  const [messageSelected, setMessageSelected] = useState({});
  const Navigate = useNavigate();
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex font-semibold text-lg pb-3">پیامهای دریافتی</div>
      {dataDashboard.cooperativeMessageViewList &&
        dataDashboard.cooperativeMessageViewList.map((message) => (
          <div key={message.id} className="">
            <ListItemButton
              sx={{ py: 2 }}
              onClick={() => {
                handleClickOpen();
                setMessageSelected(message);
              }}
              className="flex items-center"
            >
              <AiOutlineMessage className="text-4xl" />

              <div className="flex flex-col items-start justify-center px-4">
                <span>{message.title}</span>
                <span
                  className={
                    themeMode === "dark"
                      ? "text-[#fff8] text-xs"
                      : "text-[#0008] text-xs"
                  }
                >
                  ارسال شده در {message.createdFa}
                </span>
              </div>
            </ListItemButton>
            <Divider />
          </div>
        ))}
      <Button
        onClick={() => {
          Navigate("/profile/Message");
        }}
        sx={{ mt: 1, mr: 1 }}
      >
        بارگیری بیشتر
      </Button>

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
            <span>{messageSelected.title}</span>
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
              dangerouslySetInnerHTML={{ __html: messageSelected.body }}
            />
          </div>
        </div>
        <Divider className="w-full" />
      </Dialog>
    </>
  );
}
