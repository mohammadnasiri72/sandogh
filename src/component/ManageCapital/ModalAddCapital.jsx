/* eslint-disable react/prop-types */

import {
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { makeStyles } from "@mui/styles";
import "animate.css";
import axios from "axios";
import moment from "jalali-moment";
import Num2persian from "num2persian";
import PropTypes from "prop-types";
import * as React from "react";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import { CgClose } from "react-icons/cg";
import { MdOutlineDone } from "react-icons/md";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

ModalAddCapital.propTypes = {
  level: PropTypes.number,
  item: PropTypes.object,
  listCapital: PropTypes.array,
  setListCapital: PropTypes.func,
  listProvince: PropTypes.array,
};
export default function ModalAddCapital({
  level,
  item,
  listCapital,
  setListCapital,
  listProvince,
}) {
  // const cooperativeId = useSelector((store) => store.cooperative.cooperativeId);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [capital, setCapital] = React.useState("");
  const [capitalMain, setCapitalMain] = React.useState({});
  const [dateFaRegister, setDateFaRegister] = React.useState("");

  const [sharesNumber, setSharesNumber] = React.useState("");
  const [errSharesNumber, setErrSharesNumber] = React.useState(false);
  const [fi, setFi] = React.useState("");
  const [totalShares, setTotalShares] = React.useState("");
  const [percentage, setPercentage] = React.useState("");
  const [sharePledge, setSharePledge] = React.useState(0);
  const [showLetter3, setShowLetter3] = React.useState(false);
  const [province, setProvince] = React.useState("");
  const [flag1, setFlag1] = React.useState(true);

  React.useEffect(() => {
    if (flag1) {
      
      setCapitalMain(item);
      setFlag1(false);
    }
  }, [item , flag1]);
  React.useEffect(() => {
    if (open) {
      setFlag1(true);
    }
  }, [open]);

  const { id, cooperativeTitle, provinceId, shareHolderCode } = capitalMain;

  React.useEffect(() => {
    if (listProvince.length > 0 && open) {
      setProvince(
        listProvince.find((ev) => Number(ev.provinceId) === provinceId).title
      );
    }
  }, [listProvince, open, capitalMain]);

  React.useEffect(() => {
    if (open) {
      if (capitalMain.capital) {
        setCapital(String(capitalMain.capital));
      } else {
        setCapital("");
      }
      if (capitalMain.sharesNumber) {
        setSharesNumber(String(capitalMain.sharesNumber));
      } else {
        setSharesNumber("");
      }
      if (capitalMain.sharePledge) {
        setSharePledge(1);
      } else {
        setSharePledge(0);
      }
      if (capitalMain.fi) {
        setFi(String(capitalMain.fi));
      } else {
        setFi("");
      }

      if (capitalMain.registerDateFa) {
        setDateFaRegister(
          capitalMain.registerDateFa
            ? new Date(
                moment(capitalMain.registerDateFa, "jYYYY/jMM/jDD").format(
                  "YYYY-MM-DD"
                )
              )
            : ""
        );
      } else {
        setDateFaRegister("");
      }
    }
  }, [capitalMain, open]);

  // const [registerDateFa, setRegisterDateFa] = React.useState(
  //   new Date().toLocaleDateString("fa-IR")
  // );
  // const [errRegisterDateFa, setErrRegisterDateFa] = React.useState(false);
  const textFieldRef = React.useRef(null);
  const handleFocus = () => {
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  };
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

  const resetState = () => {
    setSharesNumber("");
    // setFi("10000");
    setTotalShares("");
    setPercentage("");
    setErrSharesNumber(false);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  const formatNumber = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChangeSharesNumber = (event) => {
    if (event.target.value.length < 20) {
      setErrSharesNumber(false);
      const rawValue = event.target.value.replace(/,/g, "");
      if (/^\d*$/.test(rawValue)) {
        setSharesNumber(rawValue);
      }
    }
  };

  React.useEffect(() => {
    if (sharesNumber && fi) {
      setTotalShares(String(Number(sharesNumber) * Number(fi)));
    }
    if (!sharesNumber || !fi) {
      setTotalShares("");
    }
  }, [sharesNumber, fi]);

  React.useEffect(() => {
    if (totalShares && capital) {
      setPercentage(((Number(totalShares) / Number(capital)) * 100).toFixed(3));
    }
    if (!totalShares || !capital) {
      setPercentage("");
    }
  }, [totalShares, capital]);

  const submitFormHandler = () => {
    if (!sharesNumber) {
      setErrSharesNumber(true);
    }

    if (sharesNumber) {
      const data = {
        id,
        sharesNumber: Number(sharesNumber),
        fi: Number(fi),
        sharePledge: Number(sharePledge) !== 0 ? 1 : 0,
      };
      setIsLoading(true);
      axios
        .put(mainDomain + `/api/Capital/Save`, data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setListCapital(
            listCapital.map((obj) => (obj.id === res.data.id ? res.data : obj))
          );
          setIsLoading(false);
          handleFocus();
          gotoNext();
          Toast.fire({
            icon: "success",
            text: "سرمایه تعاونی با موفقیت ثبت شد",
            customClass: {
              container: "toast-modal",
            },
          });
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
    }
  };

  CustomMultipleInput.propTypes = {
    onFocus: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };
  function CustomMultipleInput({ onFocus, value, onChange }) {
    return (
      <div className="relative">
        <TextField
          disabled
          onFocus={onFocus}
          value={value}
          onChange={onChange}
          size="small"
          type="text"
          className="w-full"
          id="outlined-multiline-flexible"
          label="تاریخ ثبت*"
          name="name"
        />
      </div>
    );
  }

  const gotoNext = () => {
    setCapitalMain(
      listCapital[listCapital.findIndex((obj) => obj.id === capitalMain.id) + 1]
    );
    handleFocus();
  };
  const gotoPrev = () => {
    setCapitalMain(
      listCapital[listCapital.findIndex((obj) => obj.id === capitalMain.id) - 1]
    );
    handleFocus();
  };

  return (
    <>
      <div className="flex justify-start items-center">
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
        scroll={"paper"}
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
          <span className="text-xl">افزایش سرمایه</span>

          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        <div className="mt-2">
          {shareHolderCode}-{province} - {cooperativeTitle} -
          <Chip label={`مرحله ${level}`} />
        </div>
        <div className=" flex flex-wrap items-start  pb-4">
          <div className="sm:w-1/2 w-full px-2 mt-5">
            <TextField
              disabled
              className="w-full"
              size="small"
              label="سرمایه صندوق"
              variant="outlined"
              type="text"
              value={formatNumber(capital)}
            />
          </div>
          <div className="sm:w-1/2 w-full px-2 mt-5">
            <DatePicker
              disabled
              className={
                themeMode === "dark" ? "rmdp-mobile bg-dark" : "rmdp-mobile"
              }
              containerStyle={{
                width: "100%",
                margin: "auto",
              }}
              format="DD MMMM YYYY"
              render={<CustomMultipleInput />}
              calendarPosition="bottom-right"
              locale={persianFa}
              calendar={persian}
              value={dateFaRegister}
            />
          </div>
          <div className="sm:w-1/4 w-full px-2 mt-5">
            <TextField
              inputRef={textFieldRef}
              autoFocus
              className="w-full"
              size="small"
              label="تعداد سهم"
              variant="outlined"
              type="text"
              value={formatNumber(sharesNumber)}
              onChange={handleChangeSharesNumber}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errSharesNumber ? "تعداد سهم را وارد کنید" : ""}
              sx={{
                "& .MuiInputLabel-root": { fontSize: "12px" },
                "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled":
                  { fontSize: "1rem" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errSharesNumber ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errSharesNumber ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errSharesNumber ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errSharesNumber ? "red" : "",
                  "&.Mui-focused": { color: errSharesNumber ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="sm:w-1/4 w-full px-2 mt-5">
            <FormControl size="small" color="primary" className="w-full">
              <InputLabel
                color="primary"
                className="px-2"
                id="demo-simple-select-label"
              >
                وثیقه
              </InputLabel>
              <Select
                size="small"
                className="w-full"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sharePledge}
                label="وثیقه"
                color="primary"
                onChange={(e) => {
                  setSharePledge(e.target.value);
                }}
              >
                <MenuItem sx={{ fontSize: "12px" }} value={0}>
                  ندارد
                </MenuItem>
                <MenuItem sx={{ fontSize: "12px" }} value={1}>
                  دارد
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="sm:w-1/2 w-full px-2 mt-5">
            <TextField
              disabled
              className="w-full"
              size="small"
              label="قیمت هر سهم"
              variant="outlined"
              type="text"
              value={formatNumber(fi)}
            />
          </div>
          <div className="sm:w-1/2 w-full px-2 mt-5">
            <TextField
              sx={{
                "& .MuiInputLabel-root": { fontSize: "12px" },
                "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled":
                  { fontSize: "1rem" },
              }}
              disabled
              className="w-full"
              size="small"
              label="مبلغ کل سهام"
              variant="outlined"
              type="text"
              value={formatNumber(totalShares)}
              onFocus={() => {
                setShowLetter3(true);
              }}
              onBlur={() => {
                setShowLetter3(false);
              }}
            />
            {totalShares && showLetter3 && (
              <span
                className={
                  themeMode === "dark"
                    ? "flex justify-start text-xs text-[#fff5]"
                    : "flex justify-start text-xs text-[#0005]"
                }
              >
                {Num2persian(Number(totalShares))} تومان{" "}
              </span>
            )}
          </div>
          <div className="sm:w-1/2 w-full px-2 mt-5">
            <TextField
              sx={{
                "& .MuiInputLabel-root": { fontSize: "12px" },
                "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled":
                  { fontSize: "1rem" },
              }}
              disabled
              className="w-full"
              size="small"
              label="درصد سهم از کل سهام"
              variant="outlined"
              type="text"
              value={percentage}
            />
          </div>
        </div>
        <div className="flex justify-center px-2">
          <Divider className="w-full" />
        </div>
        <DialogActions>
          <div className="flex w-full justify-between">
            <Button
              variant="outlined"
              size="large"
              onClick={gotoPrev}
              disabled={
                listCapital.findIndex((obj) => obj.id === capitalMain.id) < 1
              }
              className="bg-slate-800"
              sx={{
                fontSize: "12px",
                transition: "0.6s",
                // color: themeColor.color,
                // background: themeColor.bgColor,
                boxShadow: "none",
              }}
            >
              <div className="flex items-center">
                <FaAngleRight />
                <span className="px-1">قبلی</span>
              </div>
            </Button>
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
                  <MdOutlineDone />
                  <span className="px-1">تایید</span>
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
            {
              <Button
                variant="outlined"
                size="large"
                onClick={gotoNext}
                disabled={
                  listCapital.findIndex((obj) => obj.id === capitalMain.id) +
                    1 >=
                  listCapital.length
                }
                className="bg-slate-800"
                sx={{
                  fontSize: "12px",
                  transition: "0.6s",
                  // color: themeColor.color,
                  // background: themeColor.bgColor,
                  boxShadow: "none",
                }}
              >
                <div className="flex items-center">
                  <span className="px-1">بعدی</span>
                  <FaAngleLeft />
                </div>
              </Button>
            }
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
