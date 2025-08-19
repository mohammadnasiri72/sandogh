import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import { AiOutlineClose } from "react-icons/ai";
import { FaArrowLeftLong } from "react-icons/fa6";
import DatePicker from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { mainDomain } from "../../utils/mainDomain";
import Loader from "../loader";

import moment from "jalali-moment";
import Num2persian from "num2persian";
import { IoMdReturnLeft } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { setLoanId } from "../../redux/slice/adminLoan";
import DetailsPaid from "./DetailsPaid";

export default function EditLoanPage() {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const user = JSON.parse(localStorage.getItem("user"));
  const [loader, setLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [LoanEdited, setLoanEdited] = useState({});
  const [signatory, setSignatory] = useState(1);
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
  const [tax, setTax] = useState("");
  const [errTax, setErrTax] = useState(false);
  const [guaranteeAmount, setGuaranteeAmount] = useState("");
  const [errGuaranteeAmount, setErrGuaranteeAmount] = useState(false);
  const [complications, setComplications] = useState("");
  const [errComplications, setErrComplications] = useState(false);
  const [fee, setFee] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [datePayment, setDatePayment] = useState("");
  const [paymentDateFa, setPaymentDateFa] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueDateFa, setDueDateFa] = useState("");
  const [receiptDate, setReceiptDate] = useState("");
  const [receiptDateFa, setReceiptDateFa] = useState("");
  const [showLetter, setShowLetter] = useState(false);
  const [showLetter2, setShowLetter2] = useState(false);
  const [showLetter3, setShowLetter3] = useState(false);
  const [showLetter4, setShowLetter4] = useState(false);
  const [showLetter5, setShowLetter5] = useState(false);
  const [showLetter6, setShowLetter6] = useState(false);
  const [showLetter7, setShowLetter7] = useState(false);
  const [showLetter8, setShowLetter8] = useState(false);
  const [showLetter9, setShowLetter9] = useState(false);
  const [typeValue, setTypeValue] = useState("");
  const [contractTypeId, setContractTypeId] = useState(0);
  const [feeCapitalIncrease, setFeeCapitalIncrease] = useState(5);
  const [amountCapitalIncrease, setAmountCapitalIncrease] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (facilityAmount) {
      const value = Math.round((facilityAmount * feeCapitalIncrease) / 100);
      setAmountCapitalIncrease(String(value).replace(/,/g, ""));
    }
  }, [facilityAmount, feeCapitalIncrease]);

  useEffect(() => {
    if (!LoanEdited.id) {
      if (contractTypeId === 1) {
        setFeeCapitalIncrease(5);
      }
      if (contractTypeId === 2) {
        setFeeCapitalIncrease(0);
      }
    }
  }, [contractTypeId]);

  useEffect(() => {
    if (contractTypeId === 1) {
      setFeeCapitalIncrease(5);
      setRefundAmount(String(Number(facilityAmount)));
    }
    if (contractTypeId === 2) {
      setFeeCapitalIncrease(0);
      setRefundAmount(
        String(
          Number(
            String(
              Math.round(
                (facilityAmount * feePercentage * contractPeriod) / numDay / 100
              )
            ).replace(/,/g, "")
          ) + Number(facilityAmount)
        )
      );
    }
  }, [contractTypeId]);

  useEffect(() => {
    if (contractTypeId === 1) {
      setRefundAmount(String(Number(facilityAmount)));
    }
    if (contractTypeId === 2) {
      setRefundAmount(
        String(
          Number(
            String(
              Math.round(
                (facilityAmount * feePercentage * contractPeriod) / numDay / 100
              )
            ).replace(/,/g, "")
          ) + Number(facilityAmount)
        )
      );
    }
  }, [contractTypeId, fee]);

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });
  const loanId = useSelector((store) => store.adminLoan.loanId);
  const disPatch = useDispatch();
  const url = useLocation();
  useEffect(() => {
    if (loanId === 0) {
      const id = url.pathname.substring(url.pathname.lastIndexOf("/") + 1);
      disPatch(setLoanId(id));
    }
  }, []);

  const formatNumber = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    if (LoanEdited.id) {
      setDateMeeting(
        LoanEdited.meetingDateFa
          ? new Date(
              moment(LoanEdited.meetingDateFa, "jYYYY/jMM/jDD").format(
                "YYYY-MM-DD"
              )
            )
          : ""
      );
      setMeetingDateFa(LoanEdited.meetingDateFa);

      setDateContract(
        LoanEdited.contractDateFa
          ? new Date(
              moment(LoanEdited.contractDateFa, "jYYYY/jMM/jDD").format(
                "YYYY-MM-DD"
              )
            )
          : ""
      );
      setContractDateFa(LoanEdited.contractDateFa);

      setMeetingNumber(LoanEdited.meetingNumber);
      setContractNumber(LoanEdited.contractNumber);
      setTypeValue(LoanEdited.inputType);

      setDatePayment(
        LoanEdited.paymentDateFa
          ? new Date(
              moment(LoanEdited.paymentDateFa, "jYYYY/jMM/jDD").format(
                "YYYY-MM-DD"
              )
            )
          : ""
      );
      setPaymentDateFa(LoanEdited.paymentDateFa);

      setFacilityAmount(String(LoanEdited.amount).replace(/,/g, ""));

      setFeePercentage(LoanEdited.wagePercent);
      setContractPeriod(LoanEdited.contractTerm);
      setNumDay(LoanEdited.contractDays);
      setReceiptDate(
        LoanEdited.receiptDateFa
          ? new Date(
              moment(LoanEdited.receiptDateFa, "jYYYY/jMM/jDD").format(
                "YYYY-MM-DD"
              )
            )
          : ""
      );
      setReceiptDateFa(LoanEdited.receiptDateFa);
      setAmountValue(String(LoanEdited.amountKg).replace(/,/g, ""));
      setUnitPrice(String(LoanEdited.priceKg).replace(/,/g, ""));
      setGuaranteeAmount(String(LoanEdited.amountGuarantee).replace(/,/g, ""));
      setComplications(String(LoanEdited.toll).replace(/,/g, ""));
      setTax(String(LoanEdited.tax).replace(/,/g, ""));
      setRefundAmount(String(LoanEdited.amountRefund).replace(/,/g, ""));
      setDueDate(
        LoanEdited.loanMaturityFa
          ? new Date(
              moment(LoanEdited.loanMaturityFa, "jYYYY/jMM/jDD").format(
                "YYYY-MM-DD"
              )
            )
          : ""
      );
      setDueDateFa(LoanEdited.loanMaturityFa);
      setContractTypeId(LoanEdited.contractTypeId);
      setAmountCapitalIncrease(
        String(LoanEdited.amountCapitalIncrease).replace(/,/g, "")
      );
      setFeeCapitalIncrease(
        Math.round((LoanEdited.amountCapitalIncrease * 100) / LoanEdited.amount)
      );
    }
  }, [LoanEdited]);

  useEffect(() => {
    if (loanId !== 0) {
      setLoader(true);

      axios
        .get(
          mainDomain +
            `/api/Loan/${
              location.state?.loanId ? location.state.loanId : loanId
            }`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          setLoanEdited(res.data.cooperativeLoanView);
          setLoader(false);
        })
        .catch(() => {
          setLoader(false);
        });
    }
  }, [loanId]);

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
        // cooperativeId: LoanEdited.cooperativeId,
        // loanRequestId: LoanEdited.loanRequestId,
        id: Number(loanId),
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
        paymentDateFa,
        loanMaturityFa: dueDateFa,
        receiptDateFa,
        inputType: typeValue,
        signatory,
      };

      setIsLoading(true);
      axios
        .put(mainDomain + "/api/Loan", data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          setIsLoading(false);
          Toast.fire({
            icon: "success",
            text: "ویرایش تسهیلات با موفقیت انجام شد",
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
          FormHelperTextProps={{ sx: { color: "red" } }}
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
          FormHelperTextProps={{ sx: { color: "red" } }}
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

  CustomMultipleInput3.propTypes = {
    onFocus: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };
  function CustomMultipleInput3({ onFocus, value, onChange }) {
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
          label="تاریخ پرداخت"
          name="name"
        />
        {value && (
          <AiOutlineClose
            onClick={() => {
              setDatePayment("");
              setPaymentDateFa("");
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
          />
        )}
      </div>
    );
  }

  CustomMultipleInput4.propTypes = {
    onFocus: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };
  function CustomMultipleInput4({ onFocus, value, onChange }) {
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
          label="تاریخ سر رسید"
          name="name"
        />
        {value && (
          <AiOutlineClose
            onClick={() => {
              setDueDate("");
              setDueDateFa("");
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
          />
        )}
      </div>
    );
  }

  CustomMultipleInput5.propTypes = {
    onFocus: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };
  function CustomMultipleInput5({ onFocus, value, onChange }) {
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
          label="تاریخ وصول چک"
          name="name"
        />
        {value && (
          <AiOutlineClose
            onClick={() => {
              setReceiptDate("");
              setReceiptDateFa("");
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
          />
        )}
      </div>
    );
  }
  const Navigate = useNavigate();

  return (
    <>
      <div className="px-1 flex justify-start mt-5">
        <Button
          onClick={() => {
            Navigate(`/profile/AdminLoanList`);
          }}
          sx={{
            fontSize: "12px",
            transition: "0.6s",
            color: themeColor.color,
            background: themeColor.bgColor,

            boxShadow: "none",
          }}
        >
          <div className="flex items-center">
            <FaArrowLeftLong />
            <span className="px-1">بازگشت به لیست</span>
          </div>
        </Button>
        {/* {LoanEdited.status === 100 && (
          <div className="px-1">
            <DropDownFormNew />
          </div>
        )}

        {LoanEdited.status !== 100 && LoanEdited.status && (
          <div className="px-1">
            <DropDownForm />
          </div>
        )} */}
        {/* <ModalDetailsFormSupervisor />
        <ModalDetailsForm /> */}
        {/* <div className="px-1">
          <DropDownForm LoanEdited={LoanEdited} flag={flag} setFlag={setFlag} />
        </div> */}
      </div>
      <div className="flex items-center justify-between px-4 py-2 flex-wrap">
        <h4 className="text-xl sm:w-2/3 w-full sm:mt-0 mt-3 flex">
          {LoanEdited.cooperativeTitle}
        </h4>

        <div className="sm:w-1/3 w-full sm:mt-0 mt-3 flex items-center gap-2 justify-end">
          <div>
            <span>کد تسهیلات: </span>
            <span>{LoanEdited.id}</span>
          </div>
          <div className="sm:w-1/3 w-full sm:mt-0 mt-3">
            <span className="text-sm">
              {LoanEdited.status === 100 ? (
                <span className="text-white bg-slate-500 rounded-full px-2 py-1 select-none">
                  ثبت
                </span>
              ) : LoanEdited.status === 101 ? (
                <span className="text-white bg-teal-500 rounded-full px-2 py-1 select-none">
                  پرداخت شده
                </span>
              ) : LoanEdited.status === 102 ? (
                <span className="text-white bg-red-500 rounded-full px-2 py-1 select-none">
                  معوق شده
                </span>
              ) : LoanEdited.status === 103 ? (
                <span className="text-white bg-emerald-500 rounded-full px-2 py-1 select-none">
                  باز پرداخت شده
                </span>
              ) : LoanEdited.status === 104 ? (
                <span className="text-white bg-yellow-500 rounded-full px-2 py-1 select-none">
                  سررسید شده
                </span>
              ) : (
                ""
              )}
            </span>
          </div>
        </div>
      </div>
      <Divider />
      <div>
        <div className="mt-7 px-3 flex flex-wrap items-start">
          <div className="md:w-1/5 relative w-full px-2 md:mt-0 mt-5">
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
                const newValue = e.target.value.replace(/,/g, "");
                if (/^\d*$/.test(newValue)) {
                  setMeetingNumber(newValue);
                }
                setErrMeetingNumber(false);
              }}
              FormHelperTextProps={{ sx: { color: "red" } }}
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
              FormHelperTextProps={{ sx: { color: "red" } }}
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
          <div className="md:w-1/5 relative w-full px-2 mt-5 md:mt-0">
            <DatePicker
              className={
                themeMode === "dark" ? "bg-dark rmdp-mobile" : "rmdp-mobile"
              }
              format="DD MMMM YYYY"
              render={<CustomMultipleInput2 />}
              calendarPosition="bottom-right"
              containerStyle={{
                width: "100%",
              }}
              inputClass="outline-none border rounded-lg w-full h-10 px-3 mt-3"
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
              FormHelperTextProps={{ sx: { color: "red" } }}
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

          <div className="md:w-1/5 w-full px-2 mt-5">
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
          <div className="md:w-1/5 w-full px-2 mt-5">
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
          <div className="md:w-1/5 w-full px-2 mt-5">
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
              FormHelperTextProps={{ sx: { color: "red" } }}
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
              FormHelperTextProps={{ sx: { color: "red" } }}
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
            {unitPrice > 0 && showLetter2 && (
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
              FormHelperTextProps={{ sx: { color: "red" } }}
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
              FormHelperTextProps={{ sx: { color: "red" } }}
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
              FormHelperTextProps={{ sx: { color: "red" } }}
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
          {(LoanEdited.status === 101 ||
            LoanEdited.status === 102 ||
            LoanEdited.status === 103 ||
            LoanEdited.status === 104) && (
            <div className="md:w-1/5 relative w-full px-2 mt-5">
              <DatePicker
                className={
                  themeMode === "dark" ? "bg-dark rmdp-mobile" : "rmdp-mobile"
                }
                format="DD MMMM YYYY"
                render={<CustomMultipleInput4 />}
                calendarPosition="bottom-right"
                containerStyle={{
                  width: "100%",
                }}
                inputClass="outline-none border rounded-lg w-full h-10 px-3 mt-3"
                locale={persianFa}
                calendar={persian}
                value={dueDate}
                onChange={(event) => {
                  setDueDate(event);
                  setDueDateFa(event.format("YYYY/MM/DD"));
                }}
              />
            </div>
          )}
          {(LoanEdited.status === 101 ||
            LoanEdited.status === 102 ||
            LoanEdited.status === 103 ||
            LoanEdited.status === 104) && (
            <div className="md:w-1/5 relative w-full px-2 mt-5">
              <DatePicker
                className={
                  themeMode === "dark" ? "bg-dark rmdp-mobile" : "rmdp-mobile"
                }
                format="DD MMMM YYYY"
                render={<CustomMultipleInput3 />}
                calendarPosition="bottom-right"
                containerStyle={{
                  width: "100%",
                }}
                inputClass="outline-none border rounded-lg w-full h-10 px-3 mt-3"
                locale={persianFa}
                calendar={persian}
                value={datePayment}
                onChange={(event) => {
                  setDatePayment(event);
                  setPaymentDateFa(event.format("YYYY/MM/DD"));
                }}
              />
            </div>
          )}
          {LoanEdited.status === 103 && (
            <div className="md:w-1/5 relative w-full px-2 mt-5">
              <DatePicker
                className={
                  themeMode === "dark" ? "bg-dark rmdp-mobile" : "rmdp-mobile"
                }
                format="DD MMMM YYYY"
                render={<CustomMultipleInput5 />}
                calendarPosition="bottom-right"
                containerStyle={{
                  width: "100%",
                }}
                inputClass="outline-none border rounded-lg w-full h-10 px-3 mt-3"
                locale={persianFa}
                calendar={persian}
                value={receiptDate}
                onChange={(event) => {
                  setReceiptDate(event);
                  setReceiptDateFa(event.format("YYYY/MM/DD"));
                }}
              />
            </div>
          )}
        </div>
      </div>
      {(LoanEdited.status === 100 || LoanEdited.status === 99) && (
        <div className="flex justify-center">
          <div className="flex justify-center mt-3">
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
          <div className="px-2 mt-3">
            <Button
              size="large"
              onClick={() => {
                Navigate(`/profile/AdminLoanList`);
              }}
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
      )}
      {(LoanEdited.status === 100 ||
        LoanEdited.status === 101 ||
        LoanEdited.status === 102 ||
        LoanEdited.status === 103 ||
        LoanEdited.status === 104) && (
        <div className="mt-10">
          <Divider />
          <DetailsPaid loanId={LoanEdited.loanRequestId} />
        </div>
      )}
      {loader && <Loader />}
    </>
  );
}
