import {
  CircularProgress,
  Divider,
  IconButton,
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
import PropTypes from "prop-types";
import * as React from "react";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import { AiOutlineClose } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { MdModeEdit } from "react-icons/md";
import DatePicker from "react-multi-date-picker";
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

EditeCreditFile.propTypes = {
  setFlag: PropTypes.func,
  id: PropTypes.number,
};
export default function EditeCreditFile({ setFlag, id }) {
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
  const [creditFileEdited, setCreditFileEdited] = React.useState({});
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

  React.useEffect(() => {
    if ((creditFileEdited.id, open)) {
      setFoundedAdDateFa(
        new Date(
          moment(creditFileEdited.foundedAdDateFa, "jYYYY/jMM/jDD").format(
            "YYYY-MM-DD"
          )
        )
      );
      setChangesAdDateFa(
        new Date(
          moment(creditFileEdited.changesAdDateFa, "jYYYY/jMM/jDD").format(
            "YYYY-MM-DD"
          )
        )
      );
      setValFoundedAdDateFa(creditFileEdited.foundedAdDateFa);
      setValChangesAdDateFa(creditFileEdited.changesAdDateFa);
      setIdentificationDocs(creditFileEdited.identificationDocs);
      setAuthForms(creditFileEdited.authForms);
      setPowerAttorney(creditFileEdited.powerAttorney);
      setFinanicalForms(creditFileEdited.finanicalForms);
      setCreditFactor(creditFileEdited.creditFactor);
    }
  }, [open, creditFileEdited]);

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (id && open) {
      setLoader(true);
      axios
        .get(mainDomain + `/api/Cooperative/CreditFile/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setCreditFileEdited(res.data);
          setLoader(false);
        })
        .catch(() => {
          setLoader(false);
        });
    }
  }, [id, open]);

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
        id: creditFileEdited.id,
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
            text: "پرونده با موفقیت ویرایش شد",
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
          <span className="text-xl">ویرایش پرونده اعتباری</span>
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
                  <span style={{color: themeColor.color}} className="text-xs px-1">دارد</span>
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
                  <span style={{color: themeColor.color}} className="text-xs px-1">دارد</span>
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
                  <span style={{color:themeColor.color}} className="text-xs px-1 ">دارد</span>
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
                    <CircularProgress sx={{ color: themeColor.color }} />
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
