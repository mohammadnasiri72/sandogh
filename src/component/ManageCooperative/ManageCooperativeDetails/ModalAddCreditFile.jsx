import {
  CircularProgress,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { makeStyles } from "@mui/styles";
import "animate.css";
import axios from "axios";
import PropTypes from "prop-types";
import * as React from "react";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import { AiOutlineClose } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useSelector } from "react-redux";
import Switch from "react-switch";
import Swal from "sweetalert2";
import { mainDomain } from "../../../utils/mainDomain";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

ModalAddCreditFile.propTypes = {
  setFlag: PropTypes.func,
};
export default function ModalAddCreditFile({ setFlag }) {
  const cooperativeId = useSelector((store) => store.cooperative.cooperativeId);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [open, setOpen] = React.useState(false);
  const [foundedAdDateFa, setFoundedAdDateFa] = React.useState(new Date());
  const [valFoundedAdDateFa, setValFoundedAdDateFa] = React.useState(
    new Date().toLocaleDateString("fa-IR")
  );
  const [errFoundedAdDateFa, setErrFoundedAdDateFa] = React.useState(false);

  const [changesAdDateFa, setChangesAdDateFa] = React.useState(new Date());
  const [valChangesAdDateFa, setValChangesAdDateFa] = React.useState(
    new Date().toLocaleDateString("fa-IR")
  );
  const [errChangesAdDateFa, setErrChangesAdDateFa] = React.useState(false);
  const [finanicalForms, setFinanicalForms] = React.useState("");
  const [errFinanicalForms, setErrFinanicalForms] = React.useState(false);
  const [identificationDocs, setIdentificationDocs] = React.useState(false);
  const [authForms, setAuthForms] = React.useState(false);
  const [powerAttorney, setPowerAttorney] = React.useState(false);
  const [creditFactor, setCreditFactor] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
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
    setFoundedAdDateFa(new Date());
    setChangesAdDateFa(new Date());
    setValFoundedAdDateFa(new Date().toLocaleDateString("fa-IR"));
    setValChangesAdDateFa(new Date().toLocaleDateString("fa-IR"));
    setErrFoundedAdDateFa(false);
    setErrChangesAdDateFa(false);
    setErrFinanicalForms(false);
    setIdentificationDocs(false);
    setAuthForms(false);
    setPowerAttorney(false);
    setFinanicalForms("");
    setCreditFactor(0);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  const submitFormHandler = () => {
    if (!finanicalForms) {
      setErrFinanicalForms(true);
    }
    if (!valFoundedAdDateFa) {
      setErrFoundedAdDateFa(true);
    }
    if (!valChangesAdDateFa) {
      setErrChangesAdDateFa(true);
    }
    if (finanicalForms && valFoundedAdDateFa && valChangesAdDateFa) {
      const data = {
        id: 0,
        cooperativeId: Number(cooperativeId),
        identificationDocs,
        finanicalForms,
        authForms,
        powerAttorney,
        creditFactor,
        foundedAdDateFa: valFoundedAdDateFa,
        changesAdDateFa: valChangesAdDateFa,
      };
      setIsLoading(true);
      axios
        .post(mainDomain + `/api/Cooperative/CreditFile`, data, {
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
            text: "پرونده جدید با موفقیت ثبت شد",
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

  CustomMultipleInput.propTypes = {
    onFocus: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };
  function CustomMultipleInput({ onFocus, value, onChange }) {
    return (
      <div className="relative">
        <TextField
          onFocus={onFocus}
          value={value}
          onChange={onChange}
          size="small"
          type="text"
          className="w-full"
          id="outlined-multiline-flexible"
          label="آگهی تاسیس*"
          name="name"
          FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
          helperText={errFoundedAdDateFa ? "لطفا آگهی تاسیس را وارد کنید" : ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errFoundedAdDateFa ? "red" : "",
              },
              "&:hover fieldset": {
                borderColor: errFoundedAdDateFa ? "red" : "",
              },
              "&.Mui-focused fieldset": {
                borderColor: errFoundedAdDateFa ? "red" : "",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: errFoundedAdDateFa ? "red" : "",
              "&.Mui-focused": { color: errFoundedAdDateFa ? "red" : "" },
            },
          }}
        />
        {value && (
          <AiOutlineClose
            onClick={() => {
              setValFoundedAdDateFa("");
              setFoundedAdDateFa("");
              setErrFoundedAdDateFa(true);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
          />
        )}
      </div>
    );
  }

  CustomMultipleInput2.propTypes = {
    onFocus: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };
  function CustomMultipleInput2({ onFocus, value, onChange }) {
    return (
      <div className="relative">
        <TextField
          onFocus={onFocus}
          value={value}
          onChange={onChange}
          size="small"
          type="text"
          className="w-full"
          id="outlined-multiline-flexible"
          label="آگهی تغییرات*"
          name="name"
          FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
          helperText={
            errChangesAdDateFa ? "لطفا آگهی تغییرات را وارد کنید" : ""
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errChangesAdDateFa ? "red" : "",
              },
              "&:hover fieldset": {
                borderColor: errChangesAdDateFa ? "red" : "",
              },
              "&.Mui-focused fieldset": {
                borderColor: errChangesAdDateFa ? "red" : "",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: errChangesAdDateFa ? "red" : "",
              "&.Mui-focused": { color: errChangesAdDateFa ? "red" : "" },
            },
          }}
        />
        {value && (
          <AiOutlineClose
            onClick={() => {
              setValChangesAdDateFa("");
              setChangesAdDateFa("");
              setErrChangesAdDateFa(true);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
          />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex justify-start items-center">
        <Button
          onClick={handleClickOpen}
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
            <FaPlus />
            <span className="px-1">افزودن</span>
          </div>
        </Button>
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
          <span className="text-xl">پرونده اعتباری</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        <div className=" flex flex-wrap items-start mt-5">
          <div className="sm:w-1/2 w-full px-2 md:mt-0 mt-5">
            <DatePicker
              className={
                themeMode === "dark" ? "rmdp-mobile bg-dark" : "rmdp-mobile"
              }
              animations={[transition()]}
              containerStyle={{
                width: "100%",
                margin: "auto",
              }}
              format="DD MMMM YYYY"
              render={<CustomMultipleInput />}
              calendarPosition="bottom-right"
              locale={persianFa}
              calendar={persian}
              value={foundedAdDateFa}
              onChange={(event) => {
                setFoundedAdDateFa(event);
                setValFoundedAdDateFa(event.format("YYYY/MM/DD"));
                setErrFoundedAdDateFa(false);
              }}
            />
          </div>
          <div className="sm:w-1/2 w-full px-2 md:mt-0 mt-5">
            <DatePicker
              className={
                themeMode === "dark" ? "rmdp-mobile bg-dark" : "rmdp-mobile"
              }
              animations={[transition()]}
              containerStyle={{
                width: "100%",
                margin: "auto",
              }}
              format="DD MMMM YYYY"
              render={<CustomMultipleInput2 />}
              calendarPosition="bottom-right"
              locale={persianFa}
              calendar={persian}
              value={changesAdDateFa}
              onChange={(event) => {
                setChangesAdDateFa(event);
                setValChangesAdDateFa(event.format("YYYY/MM/DD"));
                setErrChangesAdDateFa(false);
              }}
            />
          </div>
          <div className="sm:w-1/2 w-full px-2 mt-5">
            <TextField
              size="small"
              type="text"
              className="w-full"
              id="outlined-multiline-flexible"
              label="صورتهای مالی*"
              name="name"
              onChange={(e) => {
                setFinanicalForms(e.target.value);
                setErrFinanicalForms(false);
                if (e.target.value === "") {
                  setErrFinanicalForms(true);
                }
              }}
              value={finanicalForms}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={
                errFinanicalForms ? "لطفا عنوان صورتهای مالی را وارد کنید" : ""
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errFinanicalForms ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errFinanicalForms ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errFinanicalForms ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errFinanicalForms ? "red" : "",
                  "&.Mui-focused": { color: errFinanicalForms ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="flex relative sm:w-1/2 w-full px-2 mt-5">
            <TextField
              // disabled={isVacant}

              size="small"
              label="ضریب اعتباری*"
              className="border rounded-lg w-full px-3"
              value={creditFactor}
              type="number"
              placeholder="ضریب اعتباری..."
              onChange={(e) => {
                if (e.target.value >= 0 && e.target.value <= 100) {
                  setCreditFactor(e.target.value * 1);
                }
              }}
            />
          </div>
          <div className="flex justify-between px-4 w-full flex-wrap">
            <div className="flex items-center py-2">
              <span className="-mt-2 text-sm">مدرک شناسایی :</span>
              <Switch
                uncheckedIcon={
                  <span className="text-xs text-white">ندارد</span>
                }
                checkedIcon={
                  <span
                    style={{ color: themeColor.color }}
                    className="text-xs px-1"
                  >
                    دارد
                  </span>
                }
                className="me-1 mb-sm-8 mb-2"
                onColor={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                onChange={() => {
                  setIdentificationDocs((e) => !e);
                }}
                checked={identificationDocs}
              />
            </div>
            <div className="flex items-center py-2">
              <span className="-mt-2 text-sm">فرم احراز هویت :</span>
              <Switch
                uncheckedIcon={
                  <span className="text-xs text-white">ندارد</span>
                }
                checkedIcon={
                  <span
                    style={{ color: themeColor.color }}
                    className="text-xs px-1"
                  >
                    دارد
                  </span>
                }
                className="me-1 mb-sm-8 mb-2"
                onColor={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                onChange={() => {
                  setAuthForms((e) => !e);
                }}
                checked={authForms}
              />
            </div>

            <div className="flex items-center py-2">
              <span className="-mt-2 text-sm">وکالت توثیق سهام :</span>
              <Switch
                uncheckedIcon={
                  <span className="text-xs text-white">ندارد</span>
                }
                checkedIcon={
                  <span
                    style={{ color: themeColor.color }}
                    className="text-xs px-1"
                  >
                    دارد
                  </span>
                }
                className="me-1 mb-sm-8 mb-2"
                onColor={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                onChange={() => {
                  setPowerAttorney((e) => !e);
                }}
                checked={powerAttorney}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center px-2">
          <Divider className="w-full" />
        </div>
        <DialogActions>
          <div className="flex w-full justify-center ">
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
                    <CircularProgress sx={{ color: themeColor.color }} />
                  </div>
                </div>
              )}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
