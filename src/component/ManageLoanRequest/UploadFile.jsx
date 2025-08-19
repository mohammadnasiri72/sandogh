import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { makeStyles, styled } from "@mui/styles";
import "animate.css";
import axios from "axios";
import PropTypes from "prop-types";
import * as React from "react";
import { CgClose } from "react-icons/cg";
import { LuSend } from "react-icons/lu";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import Switch from "react-switch";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";
import TableFileUploaded from "./TableFileUploaded";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

UploadFile.propTypes = {
  id: PropTypes.number,
};
export default function UploadFile({ id }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [flag, setFlag] = React.useState(false);

  const [isSms, setIsSms] = React.useState(false);
  const [cancelTokenSource, setCancelTokenSource] = React.useState(null);
  const [fileName, setFileName] = React.useState("");
  const [fileSrc, setFileSrc] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [errDesc, setErrDesc] = React.useState(false);
  const [listFileUploaded, setListFileUploaded] = React.useState([]);

  const [uploadProgress, setUploadProgress] = React.useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    if (open) {
      setLoader(true);
      axios
        .get(mainDomain + `/api/CooperativeFile/LoanRequest/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setLoader(false);
          setListFileUploaded(res.data);
        })
        .catch(() => {
          setLoader(false);
        });
    }
  }, [open, flag]);

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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const resetState = () => {
    setListFileUploaded([]);
    setDesc("");
    setErrDesc(false);
    setFileName("");
    setFileSrc("");
    setIsSms(false);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  const handleDeleteFile = () => {
    setFileName("");
    setFileSrc("");
  };

  const viewImgHandler = (e) => {
    setFileName(e.target.files[0].name);

    setIsLoading(true);
    const cancelToken = axios.CancelToken.source();
    setCancelTokenSource(cancelToken);
    const fileData = new FormData();
    fileData.append("files", e.target.files[0]);
    axios
      .post(`${mainDomain}/api/File/Upload`, fileData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        cancelToken: cancelToken.token,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      })
      .then((res) => {
        setIsLoading(false);
        setFileSrc(res.data);

        // Toast.fire({
        //   icon: "success",
        //   text: "فایل با موفقیت آپلود شد",
        //   customClass: {
        //     container: "toast-modal",
        //   },
        // });
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.fire({
          icon: "error",
          text: err.response ? err.response.data : "خطای شبکه",
          customClass: {
            container: "toast-modal",
          },
        });
      });
  };

  const handleCancelUpload = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Upload canceled by user.");
    }
  };

  const submitFormHandler = () => {
    if (!desc && fileSrc) {
      setErrDesc(true);
    }
    if (!fileSrc) {
      Toast.fire({
        icon: "error",
        text: "لطفا ابتدا فایل را انتخاب کنید",
        customClass: {
          container: "toast-modal",
        },
      });
    }
    if (desc && fileSrc) {
      setLoading(true);
      const data = {
        requestId: id,
        fileName: fileSrc,
        fileDesc: desc,
        sendSms: isSms,
      };
      axios
        .post(mainDomain + "/api/CooperativeFile/LoanRequest", data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          setLoading(false);
          setFlag((e) => !e);
          setDesc("");
          setErrDesc(false);
          setFileName("");
          setFileSrc("");
          setIsSms(false);
          Toast.fire({
            icon: "success",
            text: "فایل با موفقیت آپلود شد",
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
    }
  };

  return (
    <>
      <div className="flex justify-start items-center ">
        <Tooltip title="فایلهای ضمیمه">
          
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
                d="M21.99 10.84C21.97 10.36 21.89 9.88999 21.74 9.43999C21.05 7.27999 19.03 5.71999 16.65 5.71999H13.86C13.28 5.71999 13.24 5.65998 12.93 5.24998L11.53 3.38998C10.88 2.51998 10.37 1.98999 8.73999 1.98999H6.40997C3.96997 1.98999 1.98999 3.96999 1.98999 6.40999V9.42998V16.64C1.98999 19.59 4.39003 21.99 7.34003 21.99H16.64C19.59 21.99 21.99 19.59 21.99 16.64V11.06C22 11 22 10.91 21.99 10.84Z"
                fill={themeMode === "dark" ? "#fff" : "#1787B0"}
              />
              <path
                d="M15.5801 19.7C13.4701 19.85 13.4701 22.91 15.5801 23.06H20.5901C21.2001 23.06 21.78 22.84 22.23 22.43C23.71 21.14 22.92 18.54 20.97 18.3C20.27 14.08 14.16 15.68 15.61 19.7"
                fill={themeMode === "dark" ? "#fff" : "#1787B0"}
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
          <span className="text-2xl">فایل های ضمیمه</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        <div className=" flex flex-wrap items-start mt-5 px-2">
          <div className="flex items-center mt-1 px-2">
            <span className="-mt-2">ارسال پیام :</span>
            <Switch
              uncheckedIcon={<span className="text-xs text-white">خیر</span>}
              checkedIcon={
                <span
                  style={{ color: themeColor.color }}
                  className="text-xs px-2"
                >
                  بله
                </span>
              }
              className="me-1 mb-sm-8 mb-2"
              onColor={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
              onChange={() => {
                setIsSms((e) => !e);
              }}
              checked={isSms}
            />
          </div>
          {!fileSrc && (
            <div className="flex justify-start px-2 items-start">
              {!isLoading && (
                <Button
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
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  انتخاب فایل
                  <VisuallyHiddenInput
                    type="file"
                    onChange={viewImgHandler}
                    multiple
                  />
                </Button>
              )}
              {isLoading && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancelUpload}
                >
                  لغو آپلود
                </Button>
              )}
              <Box sx={{ marginX: 2 }}>
                {isLoading && (
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <CircularProgress
                      size={30}
                      variant="determinate"
                      value={uploadProgress}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        component="div"
                        sx={{ color: "text.secondary" }}
                      >
                        {`${Math.round(uploadProgress)}%`}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </div>
          )}
          {fileSrc && <Chip label={fileName} onDelete={handleDeleteFile} />}
        </div>
        <div className=" flex justify-between items-start px-2">
          <div className="w-full my-3">
            <TextField
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="توضیحات(الزامی)"
              name="name"
              onChange={(e) => {
                setDesc(e.target.value);
                setErrDesc(false);
              }}
              value={desc}
              FormHelperTextProps={{ sx: { color: "red" } }}
              helperText={errDesc ? "لطفا توضیحات را وارد کنید" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errDesc ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errDesc ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errDesc ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errDesc ? "red" : "",
                  "&.Mui-focused": { color: errDesc ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="flex my-3 px-2">
            <Button
              size="large"
              onClick={submitFormHandler}
              disabled={isLoading}
              className="bg-slate-800"
              sx={{
                fontSize: "12px",
                transition: "0.6s",
                color: themeColor.color,
                background: themeColor.bgColor,

                boxShadow: "none",
              }}
            >
              {!loading && (
                <div className="flex items-center">
                  <LuSend />
                  <span className="px-1 whitespace-nowrap">ارسال فایل</span>
                </div>
              )}
              {loading && (
                <div className="flex justify-center items-center">
                  <div className="scale-50 w-10 h-6  text-white">
                    <CircularProgress sx={{ color: themeColor.color }} />
                  </div>
                </div>
              )}
            </Button>
          </div>
        </div>
        <div className="flex justify-center px-2">
          <Divider className="w-full" />
        </div>
        <div>
          {listFileUploaded.length > 0 && (
            <TableFileUploaded
              listFileUploaded={listFileUploaded}
              setFlag={setFlag}
            />
          )}
          {listFileUploaded.length == 0 && loader && (
            <div className="w-full flex justify-center h-12 mt-5">
              <SyncLoader
                color={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
              />
            </div>
          )}
        </div>
      </Dialog>
      {/* {uploadProgress === 100 && isLoading && <Loader />} */}
    </>
  );
}
