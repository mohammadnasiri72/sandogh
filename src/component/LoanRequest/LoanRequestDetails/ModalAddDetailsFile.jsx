import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  Divider,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoMdReturnLeft } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../../utils/mainDomain";
import UploadImgDoc from "./UploadImgDoc";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

ModalAddDetailsFile.propTypes = {
  setFlag: PropTypes.func,
  activeStep: PropTypes.number,
  loanDocs: PropTypes.array,
};
export default function ModalAddDetailsFile({ setFlag, activeStep, loanDocs }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const loanRequestData = useSelector(
    (store) => store.loanRequest.loanRequestData
  );
  const loanId = useSelector((store) => store.loanRequest.loanId);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [desc, setDesc] = useState("");

  const [fileName, setFileName] = useState("");

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });
  const classes = useStyles();

  const resetState = () => {
    setFileName("");
    setDesc("");
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  const submitFormHandler = () => {
    if (!fileName) {
      Toast.fire({
        icon: "error",
        text: "لطفا ابتدا فایل را بارگذاری کنید",
        customClass: {
          container: "toast-modal",
        },
      });
    }
    if (fileName) {
      setIsLoading(true);
      let data = {
        requestId: loanId,
        itemId: loanRequestData.loanRequestItems[activeStep].id,
        isFromAvailableFiles: false,
        fileName,
        desc,
      };

      if (loanDocs.length > 0) {
        axios
          .delete(mainDomain + `/api/LoanRequest/Doc/${loanDocs[0].id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then(() => {
            axios
              .post(mainDomain + "/api/LoanRequest/Doc", data, {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              })
              .then(() => {
                setIsLoading(false);
                handleClose();
                setFlag((e) => !e);
                Toast.fire({
                  icon: "success",
                  text: "فایل با موفقیت جایگزین شد",
                  customClass: {
                    container: "toast-modal",
                  },
                });
              })
              .catch((err) => {
                setIsLoading(false);
                handleClose();
                Toast.fire({
                  icon: "error",
                  text: err.response ? err.response.data : "خطای شبکه",
                  customClass: {
                    container: "toast-modal",
                  },
                });
              });
          })
          .catch((err) => {
            handleClose();
            setIsLoading(false);
            Toast.fire({
              icon: "error",
              text: err.response ? err.response.data : "خطای شبکه",
              customClass: {
                container: "toast-modal",
              },
            });
          });
      } else {
        axios
          .post(mainDomain + "/api/LoanRequest/Doc", data, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then(() => {
            setIsLoading(false);
            handleClose();
            setFlag((e) => !e);
            Toast.fire({
              icon: "success",
              text: "فایل با موفقیت ارسال شد",
              customClass: {
                container: "toast-modal",
              },
            });
          })
          .catch((err) => {
            setIsLoading(false);
            handleClose();
            Toast.fire({
              icon: "error",
              text: err.response ? err.response.data : "خطای شبکه",
              customClass: {
                container: "toast-modal",
              },
            });
          });
      }
    }
  };

  return (
    <>
      {(loanDocs.length === 0 || loanDocs[0]?.status === 3) && (
        <div className="px-1">
          <Button
            onClick={handleClickOpen}
            sx={{
              fontSize: "12px",
              width: "100%",
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
                  fill={themeColor.color}
                />
                <path
                  d="M15.5801 19.7C13.4701 19.85 13.4701 22.91 15.5801 23.06H20.5901C21.2001 23.06 21.78 22.84 22.23 22.43C23.71 21.14 22.92 18.54 20.97 18.3C20.27 14.08 14.16 15.68 15.61 19.7"
                  fill={themeColor.color}
                />
              </svg>
              <span className="px-1 whitespace-nowrap">افزودن فایل</span>
            </div>
          </Button>
        </div>
      )}
      {loanDocs.length > 0 && loanDocs[0]?.status !== 3 && (
        <div className="px-1">
          <Tooltip title="فقط یک فایل میتوانید ارسال کنید!!!">
            <span>
              <Button
                disabled
                onClick={handleClickOpen}
                sx={{
                  fontSize: "12px",
                  width: "100%",
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
                      fill={themeColor.color}
                    />
                    <path
                      d="M15.5801 19.7C13.4701 19.85 13.4701 22.91 15.5801 23.06H20.5901C21.2001 23.06 21.78 22.84 22.23 22.43C23.71 21.14 22.92 18.54 20.97 18.3C20.27 14.08 14.16 15.68 15.61 19.7"
                      fill={themeColor.color}
                    />
                  </svg>
                  <span className="px-1 whitespace-nowrap">افزودن فایل</span>
                </div>
              </Button>
            </span>
          </Tooltip>
        </div>
      )}
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
          <span className="text-xl text-start flex justify-start items-center">
            افزودن فایل
          </span>

          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        <div className="px-2">
          <Alert severity="error">
            {loanRequestData.loanRequestItems && (
              <div
                dangerouslySetInnerHTML={{
                  __html: loanRequestData.loanRequestItems[activeStep].body,
                }}
              />
            )}
          </Alert>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full flex justify-start px-2">
            <UploadImgDoc setFileName={setFileName} activeStep={activeStep} />
          </div>
          <div className="px-6 text-xs mt-2 w-full flex justify-start">
            <span>فرمت های قابل بارگذاری : </span>
            <span className="px-2">{loanRequestData.loanRequestItems[activeStep].fileExt}</span>
          </div>

          <div className="flex relative w-full px-2 mt-3">
            <TextField
              multiline
              minRows={3}
              size="small"
              label="توضیحات فایل"
              className="border rounded-lg w-full px-3"
              value={desc}
              placeholder="توضیحات..."
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="py-2">
          <Divider className="w-full" />
        </div>
        <DialogActions>
          <div className="flex w-full justify-center">
            <div className="px-1">
              <Button
                size="large"
                onClick={submitFormHandler}
                disabled={isLoading}
                className="bg-slate-800"
                sx={{
                  fontSize: "12px",
                  transition: "0.6s",
                  color: "#fff",
                  backgroundColor: "#556ee6",
                  "&:hover": {
                    backgroundColor: "#485ec4",
                  },
                  boxShadow: "none",
                }}
              >
                {!isLoading && (
                  <div className="flex items-center">
                    <MdOutlineDone />
                    <span className="px-1">ارسال</span>
                  </div>
                )}
                {isLoading && (
                  <div className="flex justify-center items-center">
                    <div className="scale-50 w-10 h-6  text-white">
                      <CircularProgress sx={{ color: "#fff" }} />
                    </div>
                  </div>
                )}
              </Button>
            </div>
            <div className="px-1">
              <Button
                size="large"
                onClick={handleClose}
                disabled={isLoading}
                sx={{
                  fontSize: "12px",
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
                  <IoMdReturnLeft />
                  <span className="px-1">انصراف</span>
                </div>
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
