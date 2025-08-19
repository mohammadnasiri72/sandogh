import {
  Button,
  CircularProgress,
  Dialog,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
} from "@mui/material";
import axios from "axios";
import Num2persian from "num2persian";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdReturnLeft } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import DatePicker from "react-multi-date-picker";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

ConfirmPrimary.propTypes = {
  id: PropTypes.number,
  cooperativeId: PropTypes.number,
  getLoanRequestAdminList: PropTypes.func,
  setPageIndex: PropTypes.func,
  setFlagNumber: PropTypes.func,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default function ConfirmPrimary({
  id,
  getLoanRequestAdminList,
  cooperativeId,
  setPageIndex,
  open,
  setOpen,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const [isLoading, setIsLoading] = useState(false);

  const [dateMeeting, setDateMeeting] = useState(new Date());
  const [meetingDateFa, setMeetingDateFa] = useState(
    new Date().toLocaleDateString("fa-IR")
  );
  const [errMeetingDateFa, setErrMeetingDateFa] = useState(false);

  const [dateContract, setDateContract] = useState(new Date());
  const [contractDateFa, setContractDateFa] = useState(
    new Date().toLocaleDateString("fa-IR")
  );
  const [errContractDateFa, setErrContractDateFa] = useState(false);
  const [meetingNumber, setMeetingNumber] = useState("");
  const [errMeetingNumber, setErrMeetingNumber] = useState(false);
  const [contractNumber, setContractNumber] = useState("");
  const [errContractNumber, setErrContractNumber] = useState(false);
  const [facilityAmount, setFacilityAmount] = useState("");
  const [errFacilityAmount, setErrFacilityAmount] = useState(false);
  const [feePercentage, setFeePercentage] = useState(4);
  const [contractPeriod, setContractPeriod] = useState(210);
  const [numDay, setNumDay] = useState(365);
  const [amountValue, setAmountValue] = useState("");
  const [errAmountValue, setErrAmountValue] = useState(false);
  const [unitPrice, setUnitPrice] = useState("");
  const [errUnitPrice, setErrUnitPrice] = useState(false);
  const [tax, setTax] = useState("0");
  const [errTax, setErrTax] = useState(false);
  const [guaranteeAmount, setGuaranteeAmount] = useState("");
  const [errGuaranteeAmount, setErrGuaranteeAmount] = useState(false);
  const [complications, setComplications] = useState("0");
  const [errComplications, setErrComplications] = useState(false);
  const [fee, setFee] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [contractTypeId, setContractTypeId] = useState(1);
  const [amountCapitalIncrease, setAmountCapitalIncrease] = useState("0");
  const [feeCapitalIncrease, setFeeCapitalIncrease] = useState(5);
  const [showLetter, setShowLetter] = React.useState(false);
  const [showLetter2, setShowLetter2] = React.useState(false);
  const [showLetter3, setShowLetter3] = React.useState(false);
  const [showLetter4, setShowLetter4] = React.useState(false);
  const [showLetter5, setShowLetter5] = React.useState(false);
  const [showLetter6, setShowLetter6] = React.useState(false);
  const [showLetter7, setShowLetter7] = React.useState(false);
  const [showLetter8, setShowLetter8] = React.useState(false);
  const [showLetter9, setShowLetter9] = React.useState(false);
  const [signatory, setSignatory] = React.useState(1);

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  useEffect(() => {
    if (contractTypeId === 1) {
      setFeeCapitalIncrease(5);
      setRefundAmount(String(Number(facilityAmount)));
    }
    if (contractTypeId === 2) {
      setFeeCapitalIncrease(0);
      setRefundAmount(String(Number(fee) + Number(facilityAmount)));
    }
  }, [contractTypeId]);

  useEffect(() => {
    if (contractTypeId === 1) {
      setRefundAmount(String(Number(facilityAmount)));
    }
    if (contractTypeId === 2) {
      setRefundAmount(String(Number(fee) + Number(facilityAmount)));
    }
  }, [contractTypeId, fee]);

  const formatNumber = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const resetState = () => {
    setDateMeeting(new Date());
    setDateContract(new Date());
    setMeetingDateFa(new Date().toLocaleDateString("fa-IR"));
    setContractDateFa(new Date().toLocaleDateString("fa-IR"));
    setErrMeetingDateFa(false);
    setErrContractDateFa(false);
    setMeetingNumber("");
    setContractNumber("");
    setFacilityAmount("");
    setAmountValue("");
    setUnitPrice("");
    setTax("");
    setGuaranteeAmount("");
    setComplications("");
    setFee("");
    setRefundAmount("");
    setTotalAmount("");
    setErrMeetingNumber(false);
    setErrContractNumber(false);
    setErrFacilityAmount(false);
    setErrAmountValue(false);
    setErrUnitPrice(false);
    setErrTax(false);
    setErrGuaranteeAmount(false);
    setErrComplications(false);
    setFeePercentage(4);
    setContractPeriod(210);
    setNumDay(360);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  useEffect(() => {
    if (facilityAmount && feePercentage && contractPeriod && numDay) {
      const wage = Math.round(
        (facilityAmount * feePercentage * contractPeriod) / numDay / 100
      );
      setFee(String(wage).replace(/,/g, ""));
    } else {
      setFee("");
    }
  }, [facilityAmount, feePercentage, contractPeriod, numDay]);

  useEffect(() => {
    if (facilityAmount) {
      const value = Math.round((facilityAmount * feeCapitalIncrease) / 100);
      setAmountCapitalIncrease(String(value).replace(/,/g, ""));
    }
  }, [facilityAmount, feeCapitalIncrease]);

  useEffect(() => {
    if (complications && tax) {
      setTotalAmount(
        String(Number(complications) + Number(tax)).replace(/,/g, "")
      );
    }
  }, [complications, tax]);

  const submitFormHandler = () => {
    if (!meetingDateFa) {
      setErrMeetingDateFa(true);
    }
    if (!contractDateFa) {
      setErrContractDateFa(true);
    }
    if (!meetingNumber) {
      setErrMeetingNumber(true);
    }

    if (!contractNumber) {
      setErrContractNumber(true);
    }
    if (!facilityAmount) {
      setErrFacilityAmount(true);
    }
    if (!amountValue) {
      setErrAmountValue(true);
    }
    if (!unitPrice) {
      setErrUnitPrice(true);
    }
    if (!guaranteeAmount) {
      setErrGuaranteeAmount(true);
    }
    if (!complications) {
      setErrComplications(true);
    }
    if (!tax) {
      setErrTax(true);
    }

    if (
      meetingDateFa &&
      contractDateFa &&
      meetingNumber &&
      contractNumber &&
      facilityAmount &&
      amountValue &&
      unitPrice &&
      guaranteeAmount &&
      complications &&
      tax
    ) {
      const data = {
        cooperativeId,
        loanRequestId: id,
        meetingNumber: Number(meetingNumber),
        contractNumber,
        amount: Number(facilityAmount),
        wagePercent: Number(feePercentage),
        contractTerm: Number(contractPeriod),
        contractDays: Number(numDay),
        amountKg: Number(amountValue),
        priceKg: Number(unitPrice),
        wage: Number(fee),
        amountRefund: Number(refundAmount),
        amountGuarantee: Number(guaranteeAmount),
        toll: Number(complications),
        tax: Number(tax),
        meetingDateFa,
        contractDateFa,
        contractTypeId,
        amountCapitalIncrease: Number(amountCapitalIncrease),
        paymentDateFa: "",
        loanMaturityFa: "",
        receiptDateFa: "",
        inputType: typeValue,
        signatory,
      };

      setIsLoading(true);
      axios
        .post(mainDomain + "/api/Loan", data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          setIsLoading(false);
          handleClose();
          getLoanRequestAdminList({ page: 1, statusId: 4 });
          setPageIndex(1);
          Toast.fire({
            icon: "success",
            text: "ثبت نهایی با موفقیت انجام شد",
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
          label="تاریخ جلسه*"
          name="name"
          FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
          helperText={errMeetingDateFa ? "لطفا تاریخ جلسه را وارد کنید" : ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errMeetingDateFa ? "red" : "",
              },
              "&:hover fieldset": {
                borderColor: errMeetingDateFa ? "red" : "",
              },
              "&.Mui-focused fieldset": {
                borderColor: errMeetingDateFa ? "red" : "",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: errMeetingDateFa ? "red" : "",
              "&.Mui-focused": { color: errMeetingDateFa ? "red" : "" },
            },
          }}
        />
        {value && (
          <AiOutlineClose
            onClick={() => {
              setDateMeeting("");
              setMeetingDateFa("");
              setErrMeetingDateFa(true);
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
          label="تاریخ قرارداد*"
          name="name"
          FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
          helperText={
            errContractDateFa ? "لطفا تاریخ قرارداد را وارد کنید" : ""
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: errContractDateFa ? "red" : "",
              },
              "&:hover fieldset": {
                borderColor: errContractDateFa ? "red" : "",
              },
              "&.Mui-focused fieldset": {
                borderColor: errContractDateFa ? "red" : "",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: errContractDateFa ? "red" : "",
              "&.Mui-focused": { color: errContractDateFa ? "red" : "" },
            },
          }}
        />
        {value && (
          <AiOutlineClose
            onClick={() => {
              setDateContract("");
              setContractDateFa("");
              setErrContractDateFa(true);
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
        {/* <Tooltip title="ثبت اولیه">
          <IconButton
            onClick={handleClickOpen}
            sx={{
              paddingX: 1,
              minWidth: "35px",
              transition: "0.6s",
             
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
                d="M16.24 3.65002H7.76C5.29 3.65002 3.29 5.66002 3.29 8.12002V17.53C3.29 19.99 5.3 22 7.76 22H16.23C18.7 22 20.7 19.99 20.7 17.53V8.12002C20.71 5.65002 18.7 3.65002 16.24 3.65002Z"
                fill='#34c38f'
              />
              <path
                d="M14.35 2H9.65C8.61 2 7.76 2.84 7.76 3.88V4.82C7.76 5.86 8.6 6.7 9.64 6.7H14.35C15.39 6.7 16.23 5.86 16.23 4.82V3.88C16.24 2.84 15.39 2 14.35 2Z"
                fill='#34c38f'
              />
              <path
                d="M10.81 16.95C10.62 16.95 10.43 16.88 10.28 16.73L8.78 15.23C8.49 14.94 8.49 14.46 8.78 14.17C9.07 13.88 9.55 13.88 9.84 14.17L10.81 15.14L14.28 11.67C14.57 11.38 15.05 11.38 15.34 11.67C15.63 11.96 15.63 12.44 15.34 12.73L11.34 16.73C11.2 16.88 11 16.95 10.81 16.95Z"
                fill='#34c38f'
              />
            </svg>
          </IconButton>
        </Tooltip> */}
        {/* <Button
          style={{ background: "#34c38f" }}
          className="flex items-center"
          onClick={handleClickOpen}
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
              d="M16.24 3.65002H7.76C5.29 3.65002 3.29 5.66002 3.29 8.12002V17.53C3.29 19.99 5.3 22 7.76 22H16.23C18.7 22 20.7 19.99 20.7 17.53V8.12002C20.71 5.65002 18.7 3.65002 16.24 3.65002Z"
              fill="#fff"
            />
            <path
              d="M14.35 2H9.65C8.61 2 7.76 2.84 7.76 3.88V4.82C7.76 5.86 8.6 6.7 9.64 6.7H14.35C15.39 6.7 16.23 5.86 16.23 4.82V3.88C16.24 2.84 15.39 2 14.35 2Z"
              fill="#fff"
            />
            <path
              d="M10.81 16.95C10.62 16.95 10.43 16.88 10.28 16.73L8.78 15.23C8.49 14.94 8.49 14.46 8.78 14.17C9.07 13.88 9.55 13.88 9.84 14.17L10.81 15.14L14.28 11.67C14.57 11.38 15.05 11.38 15.34 11.67C15.63 11.96 15.63 12.44 15.34 12.73L11.34 16.73C11.2 16.88 11 16.95 10.81 16.95Z"
              fill="#fff"
            />
          </svg>
          <span className="text-[#fff]">ثبت اولیه</span>
        </Button> */}
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          sx: { background: themeMode === "dark" ? "rgb(15 23 42)" : "#fff" },
        }}
      >
        <div
          style={{
            background: themeColor.bgColor,
            color: themeColor.color,
          }}
          className={
            themeMode === "dark"
              ? "flex justify-between items-center px-4 py-2 shadow-lg"
              : "flex justify-between items-center px-4 py-2 shadow-lg"
          }
        >
          <span className="font-semibold text-lg">ثبت تسهیلات</span>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <IoCloseSharp />
          </IconButton>
        </div>
        <Divider />
        <div className="mt-7 px-3 flex flex-wrap items-start">
          <div className="md:w-1/5 relative w-full px-2">
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
              inputClass="outline-none border rounded-lg w-full h-10 px-3 mt-5"
              locale={persianFa}
              calendar={persian}
              value={dateMeeting}
              onChange={(event) => {
                setDateMeeting(event);
                setMeetingDateFa(event.format("YYYY/MM/DD"));
                setErrMeetingDateFa(false);
              }}
            />
          </div>
          <div className="flex relative md:w-1/5 w-full px-2 md:mt-0 mt-5">
            <TextField
              size="small"
              label=" شماره جلسه*"
              className="border rounded-lg w-full px-3"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={meetingNumber}
              placeholder=" شماره جلسه..."
              onChange={(e) => {
                const newValue = e.target.value;
                setMeetingNumber(newValue);
                setErrMeetingNumber(false);
              }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={
                errMeetingNumber ? "لطفا شماره جلسه را وارد کنید" : ""
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errMeetingNumber ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errMeetingNumber ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errMeetingNumber ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errMeetingNumber ? "red" : "",
                  "&.Mui-focused": { color: errMeetingNumber ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="md:w-1/5 w-full px-2 md:mt-0 mt-5">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">نوع قرارداد</InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={contractTypeId}
                label="نوع قرارداد"
                onChange={(e) => {
                  setContractTypeId(e.target.value);
                }}
              >
                <MenuItem value={1}>عادی</MenuItem>
                <MenuItem value={2}>ضروری</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="flex relative md:w-1/5 w-full px-2 md:mt-0 mt-5">
            <TextField
              size="small"
              label=" شماره قرارداد*"
              className="border rounded-lg w-full px-3"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={contractNumber}
              placeholder=" شماره قرارداد..."
              onChange={(e) => {
                const newValue = e.target.value;
                setContractNumber(newValue);
                setErrContractNumber(false);
              }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={
                errContractNumber ? "لطفا شماره قرارداد را وارد کنید" : ""
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errContractNumber ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errContractNumber ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errContractNumber ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errContractNumber ? "red" : "",
                  "&.Mui-focused": { color: errContractNumber ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="md:w-1/5 relative w-full px-2 md:mt-0 mt-5">
            <DatePicker
              // className={themeMode === 'dark' ? 'bg-dark rmdp-mobile' : 'rmdp-mobile'}
              format="DD MMMM YYYY"
              render={<CustomMultipleInput2 />}
              calendarPosition="bottom-right"
              containerStyle={{
                width: "100%",
              }}
              inputClass="outline-none border rounded-lg w-full h-10 px-3 mt-5"
              locale={persianFa}
              calendar={persian}
              value={dateContract}
              onChange={(event) => {
                setDateContract(event);
                setContractDateFa(event.format("YYYY/MM/DD"));
                setErrContractDateFa(false);
              }}
            />
          </div>
          <div className="md:w-1/5 w-full px-2 mt-5">
            <TextField
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">ریال</InputAdornment>
                  ),
                },
              }}
              className="w-full"
              size="small"
              label="مبلغ تسهیلات*"
              variant="outlined"
              type="text"
              value={formatNumber(facilityAmount)}
              onChange={(event) => {
                if (event.target.value.length < 20) {
                  setErrFacilityAmount(false);
                  const rawValue = event.target.value.replace(/,/g, "");
                  if (/^\d*$/.test(rawValue)) {
                    setFacilityAmount(rawValue);
                    if (contractTypeId === 1) {
                      setRefundAmount(rawValue);
                    }
                    if (contractTypeId === 2) {
                      setRefundAmount(
                        String(
                          Number(rawValue) +
                            Math.round(
                              (rawValue * feePercentage * contractPeriod) /
                                numDay /
                                100
                            )
                        )
                      );
                    }
                  }
                }
              }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={
                errFacilityAmount ? "لطفا مبلغ تسهیلات را وارد کنید" : ""
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errFacilityAmount ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errFacilityAmount ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errFacilityAmount ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errFacilityAmount ? "red" : "",
                  "&.Mui-focused": { color: errFacilityAmount ? "red" : "" },
                },
              }}
              onFocus={() => {
                setShowLetter(true);
              }}
              onBlur={() => {
                setShowLetter(false);
              }}
            />
            {facilityAmount && showLetter && (
              <span className="flex justify-start text-xs ">
                {Num2persian(Number(facilityAmount))} ریال{" "}
              </span>
            )}
          </div>
          <div className="flex relative md:w-1/5 w-full px-2 mt-5">
            <TextField
              size="small"
              label="درصد کارمزد"
              className="border rounded-lg w-full px-3"
              value={feePercentage}
              type="number"
              placeholder="درصد کارمزد..."
              onChange={(e) => {
                if (e.target.value >= 0 && e.target.value <= 100) {
                  setFeePercentage(e.target.value * 1);
                }
              }}
            />
          </div>
          <div className="flex relative md:w-1/5 w-full px-2 mt-5">
            <TextField
              size="small"
              label="مدت قرارداد"
              className="border rounded-lg w-full px-3"
              value={contractPeriod}
              type="number"
              placeholder="مدت قرارداد..."
              onChange={(e) => {
                if (e.target.value >= 0) {
                  setContractPeriod(e.target.value * 1);
                }
              }}
            />
          </div>
          <div className="flex relative md:w-1/5 w-full px-2 mt-5">
            <TextField
              size="small"
              label="روز"
              className="border rounded-lg w-full px-3"
              value={numDay}
              type="number"
              placeholder="روز..."
              onChange={(e) => {
                if (e.target.value >= 0) {
                  setNumDay(e.target.value * 1);
                }
              }}
            />
          </div>
          <div className="flex relative md:w-1/5 w-full px-2 mt-5">
            <TextField
              size="small"
              label="نوع نهاده"
              className="border rounded-lg w-full px-3"
              value={typeValue}
              type="text"
              placeholder="نوع نهاده..."
              onChange={(e) => {
                setTypeValue(e.target.value);
              }}
            />
          </div>
          <div className="flex relative md:w-1/5 w-full px-2 mt-5">
            <TextField
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">kg</InputAdornment>
                  ),
                },
              }}
              size="small"
              label="مقدار نهاده*"
              className="border rounded-lg w-full px-3"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={formatNumber(amountValue)}
              placeholder="مقدار نهاده..."
              onChange={(e) => {
                const newValue = e.target.value.replace(/[^\d]/g, "");
                setAmountValue(newValue.replace(/,/g, ""));
                setErrAmountValue(false);
              }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errAmountValue ? "لطفا مقدار نهاده را وارد کنید" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errAmountValue ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errAmountValue ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errAmountValue ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errAmountValue ? "red" : "",
                  "&.Mui-focused": { color: errAmountValue ? "red" : "" },
                },
              }}
            />
          </div>
          <div className="md:w-1/5 w-full px-2 mt-5">
            <TextField
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">ریال</InputAdornment>
                  ),
                },
              }}
              className="w-full"
              size="small"
              label="قیمت هر کیلو*"
              variant="outlined"
              type="text"
              value={formatNumber(unitPrice)}
              onChange={(event) => {
                if (event.target.value.length < 20) {
                  setErrUnitPrice(false);
                  const rawValue = event.target.value.replace(/,/g, "");
                  if (/^\d*$/.test(rawValue)) {
                    setUnitPrice(rawValue);
                  }
                }
              }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errUnitPrice ? "لطفا قیمت هر کیلو را وارد کنید" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errUnitPrice ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errUnitPrice ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errUnitPrice ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errUnitPrice ? "red" : "",
                  "&.Mui-focused": { color: errUnitPrice ? "red" : "" },
                },
              }}
              onFocus={() => {
                setShowLetter2(true);
              }}
              onBlur={() => {
                setShowLetter2(false);
              }}
            />
            {unitPrice && showLetter2 && (
              <span className="flex justify-start text-xs ">
                {Num2persian(Number(unitPrice))} ریال{" "}
              </span>
            )}
          </div>
          <div className="md:w-1/5 w-full px-2 mt-5">
            <TextField
              disabled
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">ریال</InputAdornment>
                  ),
                },
              }}
              className="w-full"
              size="small"
              label="کارمزد"
              variant="outlined"
              type="text"
              value={formatNumber(fee)}
              onFocus={() => {
                setShowLetter6(true);
              }}
              onBlur={() => {
                setShowLetter6(false);
              }}
            />
            {fee && showLetter6 && (
              <span className="flex justify-start text-xs ">
                {Num2persian(Number(fee))} ریال{" "}
              </span>
            )}
          </div>

          <div className="flex relative md:w-1/5 w-full px-2 mt-5">
            <TextField
              size="small"
              label="درصد افزایش سرمایه"
              className="border rounded-lg w-full px-3"
              value={feeCapitalIncrease}
              type="number"
              placeholder="درصد افزایش سرمایه..."
              onChange={(e) => {
                if (e.target.value >= 0 && e.target.value <= 100) {
                  setFeeCapitalIncrease(e.target.value * 1);
                }
              }}
            />
          </div>
          <div className="md:w-1/5 w-full px-2 mt-5">
            <TextField
              disabled
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">ریال</InputAdornment>
                  ),
                },
              }}
              className="w-full"
              size="small"
              label="مقدار افزایش سرمایه"
              variant="outlined"
              type="text"
              value={formatNumber(amountCapitalIncrease)}
              onFocus={() => {
                setShowLetter9(true);
              }}
              onBlur={() => {
                setShowLetter9(false);
              }}
            />
            {fee && showLetter9 && (
              <span className="flex justify-start text-xs ">
                {Num2persian(Number(fee))} ریال{" "}
              </span>
            )}
          </div>
          <div className="md:w-1/5 w-full px-2 mt-5">
            <TextField
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">ریال</InputAdornment>
                  ),
                },
              }}
              className="w-full"
              size="small"
              label="مبلغ ضمانت*"
              variant="outlined"
              type="text"
              value={formatNumber(guaranteeAmount)}
              onChange={(event) => {
                if (event.target.value.length < 20) {
                  setErrGuaranteeAmount(false);
                  const rawValue = event.target.value.replace(/,/g, "");
                  if (/^\d*$/.test(rawValue)) {
                    setGuaranteeAmount(rawValue);
                  }
                }
              }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={
                errGuaranteeAmount ? "لطفا مبلغ ضمانت را وارد کنید" : ""
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errGuaranteeAmount ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errGuaranteeAmount ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errGuaranteeAmount ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errGuaranteeAmount ? "red" : "",
                  "&.Mui-focused": { color: errGuaranteeAmount ? "red" : "" },
                },
              }}
              onFocus={() => {
                setShowLetter3(true);
              }}
              onBlur={() => {
                setShowLetter3(false);
              }}
            />
            {guaranteeAmount && showLetter3 && (
              <span className="flex justify-start text-xs ">
                {Num2persian(Number(guaranteeAmount))} ریال{" "}
              </span>
            )}
          </div>
          <div className="md:w-1/5 w-full px-2 mt-5">
            <TextField
              disabled
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">ریال</InputAdornment>
                  ),
                },
              }}
              className="w-full"
              size="small"
              label="مبلغ بازپرداخت"
              variant="outlined"
              type="text"
              value={formatNumber(refundAmount)}
              onFocus={() => {
                setShowLetter7(true);
              }}
              onBlur={() => {
                setShowLetter7(false);
              }}
            />
            {refundAmount && showLetter7 && (
              <span className="flex justify-start text-xs ">
                {Num2persian(Number(refundAmount))} ریال{" "}
              </span>
            )}
          </div>
          <div className="md:w-1/5 w-full px-2 mt-5">
            <TextField
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">ریال</InputAdornment>
                  ),
                },
              }}
              className="w-full"
              size="small"
              label="عوارض*"
              variant="outlined"
              type="text"
              value={formatNumber(complications)}
              onChange={(event) => {
                if (event.target.value.length < 20) {
                  setErrComplications(false);
                  const rawValue = event.target.value.replace(/,/g, "");
                  if (/^\d*$/.test(rawValue)) {
                    setComplications(rawValue);
                  }
                }
              }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errComplications ? "لطفا عوارض را وارد کنید" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errComplications ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errComplications ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errComplications ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errComplications ? "red" : "",
                  "&.Mui-focused": { color: errComplications ? "red" : "" },
                },
              }}
              onFocus={() => {
                setShowLetter4(true);
              }}
              onBlur={() => {
                setShowLetter4(false);
              }}
            />
            {complications && showLetter4 && (
              <span className="flex justify-start text-xs ">
                {Num2persian(Number(complications))} ریال{" "}
              </span>
            )}
          </div>
          <div className="md:w-1/5 w-full px-2 mt-5">
            <TextField
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">ریال</InputAdornment>
                  ),
                },
              }}
              className="w-full"
              size="small"
              label="مالیات*"
              variant="outlined"
              type="text"
              value={formatNumber(tax)}
              onChange={(event) => {
                if (event.target.value.length < 20) {
                  setErrTax(false);
                  const rawValue = event.target.value.replace(/,/g, "");
                  if (/^\d*$/.test(rawValue)) {
                    setTax(rawValue);
                  }
                }
              }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              FormHelperTextProps={{ sx: { color: "red", fontSize: "10px" } }}
              helperText={errTax ? "لطفا مالیات را وارد کنید" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errTax ? "red" : "",
                  },
                  "&:hover fieldset": {
                    borderColor: errTax ? "red" : "",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errTax ? "red" : "",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: errTax ? "red" : "",
                  "&.Mui-focused": { color: errTax ? "red" : "" },
                },
              }}
              onFocus={() => {
                setShowLetter5(true);
              }}
              onBlur={() => {
                setShowLetter5(false);
              }}
            />
            {tax && showLetter5 && (
              <span className="flex justify-start text-xs ">
                {Num2persian(Number(tax))} ریال{" "}
              </span>
            )}
          </div>
          <div className="md:w-1/5 w-full px-2 mt-5">
            <TextField
              disabled
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">ریال</InputAdornment>
                  ),
                },
              }}
              className="w-full"
              size="small"
              label="مجموع"
              variant="outlined"
              type="text"
              value={formatNumber(totalAmount)}
              onFocus={() => {
                setShowLetter8(true);
              }}
              onBlur={() => {
                setShowLetter8(false);
              }}
            />
            {totalAmount && showLetter8 && (
              <span className="flex justify-start text-xs ">
                {Num2persian(Number(totalAmount))} ریال{" "}
              </span>
            )}
          </div>
          <div className="md:w-1/5 w-full px-2 mt-5">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">امضا کننده</InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={signatory}
                label="امضا کننده"
                onChange={(e) => {
                  setSignatory(e.target.value);
                }}
              >
                <MenuItem value={1}>رئیس هیئت مدیره</MenuItem>
                <MenuItem value={2}>نائب رئیس هیئت مدیره</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <div className="px-2">
            <Button
              size="large"
              onClick={submitFormHandler}
              disabled={isLoading}
              className="bg-slate-800"
              sx={{
                fontSize: "12px",
                transition: "0.6s",
                background: themeColor.bgColor,
                color: themeColor.color,
                boxShadow: "none",
              }}
            >
              {!isLoading && (
                <div className="flex items-center">
                  <MdOutlineDone />
                  <span className="px-1">ثبت اولیه</span>
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
          <div className="px-2">
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
      </Dialog>
    </>
  );
}
