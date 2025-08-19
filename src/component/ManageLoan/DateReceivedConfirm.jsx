

import {
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
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import { AiOutlineClose } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { FaCalendarCheck } from "react-icons/fa6";
import { IoMdReturnLeft } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import DatePicker from "react-multi-date-picker";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";
  
  const useStyles = makeStyles({
    animatedDialog: { animation: `$fadeInUp 500ms` },
    "@keyframes fadeInUp": {
      from: { opacity: 0, transform: "translateY(20px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
  });
  
  DateReceivedConfirm.propTypes = {
    loan: PropTypes.object,
    getLoanAdminList: PropTypes.func,
  };
  export default function DateReceivedConfirm({ loan, getLoanAdminList }) {
    const themeMode = useSelector((store) => store.setting.themeMode);
  
    const user = JSON.parse(localStorage.getItem("user"));
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState("");
    const [errDate, setErrDate] = useState(false);
    const [dateFa, setDateFa] = useState("");
  
    //   const formatNumber = (num) => {
    //     return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //   };
  
  
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
      setDate("");
      setDateFa("");
      setErrDate(false);
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      resetState();
    };
  
    const submitFormHandler = () => {
      if (!dateFa) {
        setErrDate(true);
      }
      if (dateFa) {
        setIsLoading(true);
        axios
          .put(mainDomain + `/api/Loan/${loan.id}/Received`, dateFa, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then(() => {
            setIsLoading(false);
            handleClose();
            if (getLoanAdminList) {
              getLoanAdminList();
            }
            Toast.fire({
              icon: "success",
              text: "درخواست با موفقیت تایید شد",
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
            onFocus={onFocus}
            value={value}
            onChange={onChange}
            size="small"
            type="text"
            className="w-full"
            id="outlined-multiline-flexible"
            label="تاریخ وصول"
            name="name"
            FormHelperTextProps={{ sx: { color: "red" } }}
            helperText={errDate ? "لطفا تاریخ وصول را وارد کنید" : ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: errDate ? "red" : "",
                },
                "&:hover fieldset": {
                  borderColor: errDate ? "red" : "",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errDate ? "red" : "",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: errDate ? "red" : "",
                "&.Mui-focused": { color: errDate ? "red" : "" },
              },
            }}
          />
          {value && (
            <AiOutlineClose
              onClick={() => {
                setDate("");
                setDateFa("");
                setErrDate(true);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
            />
          )}
        </div>
      );
    }
    return (
      <>
        <div>
          <Tooltip  title="ثبت تاریخ وصول">
            <span>
              <IconButton
               
                onClick={handleClickOpen}
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <FaCalendarCheck
                  className="text-emerald-500"
                />
              </IconButton>
            </span>
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
            <span className="text-xl text-start flex justify-start items-center">
              تایید تاریخ وصول
            </span>
  
            <IconButton onClick={handleClose}>
              <CgClose className="text-xl" />
            </IconButton>
          </div>
  
          <div className="flex flex-wrap">
            <div className="relative w-full px-5 mt-3">
              <DatePicker
                className={
                  themeMode === "dark" ? "bg-dark rmdp-mobile" : "rmdp-mobile"
                }
                format="DD MMMM YYYY"
                render={<CustomMultipleInput />}
                calendarPosition="bottom-right"
                containerStyle={{
                  width: "100%",
                }}
                inputClass="outline-none border rounded-lg w-full h-10 px-3 mt-3"
                locale={persianFa}
                calendar={persian}
                value={date}
                onChange={(event) => {
                  setDate(event);
                  setDateFa(event.format("YYYY/MM/DD"));
                  setErrDate(false);
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
  