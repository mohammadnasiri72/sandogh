import {
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { makeStyles } from "@mui/styles";
import "animate.css";
import axios from "axios";
import PropTypes from "prop-types";
import * as React from "react";
import { CgClose } from "react-icons/cg";
import { MdModeEdit } from "react-icons/md";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useSelector } from "react-redux";
import Switch from "react-switch";
import Swal from "sweetalert2";
import { mainDomain } from "../../../utils/mainDomain";
import Loader from "../../loader";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

EditeBank.propTypes = {
  setFlag: PropTypes.func,
  id: PropTypes.number,
};
export default function EditeBank({ setFlag, id }) {
  const cooperativeId = useSelector((store) => store.cooperative.cooperativeId);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [errName, setErrName] = React.useState(false);
  const [branchId, setBranchId] = React.useState("");
  const [errBranchId, setErrBranchId] = React.useState(false);
  const [accountNumber, setAccountNumber] = React.useState("");
  const [errAccountNumber, setErrAccountNumber] = React.useState(false);
  const [shebaNumber, setShebaNumber] = React.useState("");
  const [errShebaNumber, setErrShebaNumber] = React.useState(false);
  const [isActive, setIsActive] = React.useState(true);
  const [bankEdited, setBankEdited] = React.useState({});
  const [loader, setLoader] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

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

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (id && open) {
      setLoader(true);
      axios
        .get(mainDomain + `/api/Cooperative/Bank/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setBankEdited(res.data);
          setLoader(false);
        })
        .catch(() => {
          setLoader(false);
        });
    }
  }, [id, open]);

  React.useEffect(() => {
    if (bankEdited.id) {
      setName(bankEdited.name);
      setBranchId(bankEdited.branchId);
      setAccountNumber(bankEdited.accountNumber);
      setShebaNumber(bankEdited.shebaNumber);
      setIsActive(bankEdited.isActive);
    }
  }, [bankEdited]);

  const submitFormHandler = () => {
    if (!name) {
      setErrName(true);
    }
    if (!branchId) {
      setErrBranchId(true);
    }
    if (!accountNumber) {
      setErrAccountNumber(true);
    }
    if (!shebaNumber) {
      setErrShebaNumber(true);
    }
    if (shebaNumber.length >24 ) {
      Toast.fire({
        icon: "error",
        text:  "شماره شبا درست نیست",
        customClass: {
          container: "toast-modal",
        },
      });
    }
    if (name && branchId && accountNumber && shebaNumber && shebaNumber.length <=24) {
      const data = {
        id: bankEdited.id,
        cooperativeId: Number(cooperativeId),
        name,
        branchId,
        accountNumber,
        shebaNumber,
        isActive,
      };
      setIsLoading(true);
      axios
        .post(mainDomain + `/api/Cooperative/Bank`, data, {
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
            text: "بانک با موفقیت ویرایش شد",
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
  };

  return (
    <>
      <div className="px-1">
        <Tooltip title="ویرایش">
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
                d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z"
                fill="#1787B0"
              />
              <path
                opacity="0.4"
                d="M19.02 3.47997C17.08 1.53997 15.18 1.48997 13.19 3.47997L11.98 4.68997C11.88 4.78997 11.84 4.94997 11.88 5.08997C12.64 7.73997 14.76 9.85997 17.41 10.62C17.45 10.63 17.49 10.64 17.53 10.64C17.64 10.64 17.74 10.6 17.82 10.52L19.02 9.30997C20.01 8.32997 20.49 7.37997 20.49 6.41997C20.5 5.42997 20.02 4.46997 19.02 3.47997Z"
                fill="#1787B0"
              />
              <path
                d="M15.61 11.53C15.32 11.39 15.04 11.25 14.77 11.09C14.55 10.96 14.34 10.82 14.13 10.67C13.96 10.56 13.76 10.4 13.57 10.24C13.55 10.23 13.48 10.17 13.4 10.09C13.07 9.80999 12.7 9.44999 12.37 9.04999C12.34 9.02999 12.29 8.95999 12.22 8.86999C12.12 8.74999 11.95 8.54999 11.8 8.31999C11.68 8.16999 11.54 7.94999 11.41 7.72999C11.25 7.45999 11.11 7.18999 10.97 6.90999C10.83 6.60999 10.72 6.31999 10.62 6.04999L4.34001 12.33C4.21001 12.46 4.09001 12.71 4.06001 12.88L3.52001 16.71C3.42001 17.39 3.61001 18.03 4.03001 18.46C4.39001 18.81 4.89001 19 5.43001 19C5.55001 19 5.67001 18.99 5.79001 18.97L9.63001 18.43C9.81001 18.4 10.06 18.28 10.18 18.15L16.46 11.87C16.18 11.77 15.91 11.66 15.61 11.53Z"
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
          <span className="text-xl">ویرایش اطلاعات بانکی</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        <div className=" flex flex-wrap items-start mt-5">
          <div className="sm:w-1/2 w-full px-2 mt-5">
            <TextField
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="نام بانک*"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
                setErrName(false);
                if (e.target.value === "") {
                  setErrName(true);
                }
              }}
              value={name}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errName ? "لطفا نام بانک را وارد کنید" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errName ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errName ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errName ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errName ? "red" : "",
                  "&.Mui-focused": { color: errName ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="sm:w-1/2 w-full px-2 mt-5">
            <TextField
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="نام شعبه*"
              name="name"
              onChange={(e) => {
                setBranchId(e.target.value);
                setErrBranchId(false);
                if (e.target.value === "") {
                  setErrBranchId(true);
                }
              }}
              value={branchId}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errBranchId ? "لطفا نام شعبه را وارد کنید" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errBranchId ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errBranchId ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errBranchId ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errBranchId ? "red" : "",
                  "&.Mui-focused": { color: errBranchId ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="sm:w-1/2 w-full px-2 mt-5">
            <TextField
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="شماره حساب*"
              name="name"
              onChange={(e) => {
                setAccountNumber(e.target.value);
                setErrAccountNumber(false);
                if (e.target.value === "") {
                  setErrAccountNumber(true);
                }
              }}
              value={accountNumber}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={
                errAccountNumber ? "لطفا شماره حساب را وارد کنید" : ""
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errAccountNumber ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errAccountNumber ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errAccountNumber ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errAccountNumber ? "red" : "",
                  "&.Mui-focused": { color: errAccountNumber ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="sm:w-1/2 w-full px-2 mt-5">
            <TextField
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="شماره شبا *"
              name="name"
              onChange={(e) => {
                setShebaNumber(e.target.value);
                setErrShebaNumber(false);
                if (e.target.value === "") {
                  setErrShebaNumber(true);
                }
              }}
              value={shebaNumber}
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="start">IR</InputAdornment>,
                },
              }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errShebaNumber ? "لطفا شماره شبا را وارد کنید" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errShebaNumber ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errShebaNumber ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errShebaNumber ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errShebaNumber ? "red" : "",
                  "&.Mui-focused": { color: errShebaNumber ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="px-2 mt-5">
            <div className="flex items-center">
              <span className="-mt-2">فعال :</span>
              <Switch
                uncheckedIcon={<span className="text-xs text-white">خیر</span>}
                checkedIcon={
                  <span style={{color: themeColor.color}} className="text-xs px-2">بله</span>
                }
                className="me-1 mb-sm-8 mb-2"
                onColor={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                onChange={() => {
                  setIsActive((e) => !e);
                }}
                checked={isActive}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center px-2">
          <Divider className="w-full" />
        </div>
        <DialogActions>
          <div className="flex w-full justify-center">
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
              {!isLoading && (
                <div className="flex items-center">
                  <MdModeEdit />
                  <span className="px-1">ویرایش</span>
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
        </DialogActions>
        {loader && <Loader />}
      </Dialog>
    </>
  );
}
