/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Collapse, Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { setLoanId, setLoanRequestData } from "../../redux/slice/loanRequest";
import { mainDomain } from "../../utils/mainDomain";
import { IoIosArrowDown } from "react-icons/io";
import ModalSndMssage from "../LoanRequest/LoanRequestDetails/ModalSndMssage";
import ConfirmSubmit from "../LoanRequest/LoanRequestDetails/ConfirmSubmit";
import StepperLoanRequest from "../LoanRequest/LoanRequestDetails/StepperLoanRequest";
import ConfirmDeleteNewLoanRequest from "./ConfirmDeleteNewLoanRequest";

export default function DetailsNewLoanRequest() {
  const themeColor = useSelector((store) => store.setting.themeColor);
  const disPatch = useDispatch();
  const Navigate = useNavigate();
  const loanId = useSelector((store) => store.loanRequest.loanId);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [loanDocs, setLoanDocs] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const loanRequestData = useSelector(
    (store) => store.loanRequest.loanRequestData
  );
  const url = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const id = url.pathname.substring(url.pathname.lastIndexOf("/") + 1);
    // dispatch(setCooperativeId(id));
    disPatch(setLoanId(Number(id)));
  }, []);

  useEffect(() => {
    if (loanId !== 0) {
      setIsLoading(true);
      disPatch(setLoanRequestData({}));
      axios
        .get(mainDomain + `/api/LoanRequest/${loanId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          disPatch(setLoanRequestData(res.data));
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [flag, loanId]);

  useEffect(() => {
    if (loanRequestData.loanRequestDto) {
      setFilteredArray(
        loanRequestData.loanRequestItems.filter((item) => {
          return !loanRequestData.cooperativeLoanDocs.some(
            (obj) => obj.itemId === item.id
          );
        })
        //   .filter((item) => {
        //     return !loanRequestData.cooperativeFileList.some(
        //       (obj) => obj.itemId === item.id
        //     );
        //   })
      );
    }
  }, [loanRequestData]);

  return (
    <>
      <div className="px-5 pt-3">
        {loanRequestData.loanRequestDto && (
          <div className="mt-5">
            <div className="w-full">
              <div className="flex sm:flex-nowrap flex-wrap justify-between w-full">
                <div className="w-full">
                  <div className="flex flex-wrap sm:flex-nowrap justify-between items-start w-full">
                    <div className="px-1 flex justify-start w-full">
                      <div className="lg:w-1/5 sm:w-1/3 w-1/2 px-1">
                        <Button
                          onClick={() => {
                            Navigate(`/profile/LoanList`);
                          }}
                          sx={{
                            width: "100%",
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
                      </div>
                      <div className="lg:w-1/5 sm:w-1/3 w-1/2 px-1">
                        {loanRequestData.loanRequestDto &&
                          (loanRequestData.loanRequestDto.status === 1 ||
                            loanRequestData.loanRequestDto.status === 2) && (
                            <ModalSndMssage />
                          )}
                      </div>
                    </div>
                  </div>
                  {(loanRequestData.loanRequestDto.status === 1 ||
                    loanRequestData.loanRequestDto.status === 2) && (
                    <div className="mt-3 select-none lg:w-2/5 sm:w-2/3 w-full px-2">
                      <ConfirmSubmit
                        loanDocs={loanDocs}
                        setFlag={setFlag}
                        filteredArray={filteredArray}
                      />
                    </div>
                  )}
                </div>
                {loanRequestData.loanRequestDto.status === 1 && (
                  <div className="flex justify-center items-center">
                    <ConfirmDeleteNewLoanRequest
                      id={loanRequestData.loanRequestDto.id}
                    />
                  </div>
                )}
              </div>

              <div className="rounded-lg border p-3 w-full mt-3">
                <div
                  onClick={() => {
                    setOpen((e) => !e);
                  }}
                  style={{
                    background: themeColor.bgColor,
                    color: themeColor.color,
                  }}
                  className="rounded-lg p-2 flex justify-between items-center cursor-pointer"
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
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        fill="#fff"
                      />
                      <path
                        d="M12 13.75C12.41 13.75 12.75 13.41 12.75 13V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V13C11.25 13.41 11.59 13.75 12 13.75Z"
                        fill="#fff"
                      />
                      <path
                        d="M12.92 15.62C12.87 15.5 12.8 15.39 12.71 15.29C12.61 15.2 12.5 15.13 12.38 15.08C12.14 14.98 11.86 14.98 11.62 15.08C11.5 15.13 11.39 15.2 11.29 15.29C11.2 15.39 11.13 15.5 11.08 15.62C11.03 15.74 11 15.87 11 16C11 16.13 11.03 16.26 11.08 16.38C11.13 16.51 11.2 16.61 11.29 16.71C11.39 16.8 11.5 16.87 11.62 16.92C11.74 16.97 11.87 17 12 17C12.13 17 12.26 16.97 12.38 16.92C12.5 16.87 12.61 16.8 12.71 16.71C12.8 16.61 12.87 16.51 12.92 16.38C12.97 16.26 13 16.13 13 16C13 15.87 12.97 15.74 12.92 15.62Z"
                        fill="#fff"
                      />
                    </svg>
                    <span className="px-2 select-none">
                      {loanRequestData.loanRequestDto.title}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center justify-center px-1">
                      {loanRequestData.loanRequestDto.status === 1 && (
                        <span className="text-teal-600 bg-teal-50 rounded-full px-2 select-none text-xs py-1">
                          منتظر ارسال مدرک
                        </span>
                      )}
                      {loanRequestData.loanRequestDto.status === 2 && (
                        <span className="text-yellow-600 bg-yellow-50 rounded-full px-2 select-none text-xs py-1">
                          در حال بررسی
                        </span>
                      )}
                      {loanRequestData.loanRequestDto.status === 3 && (
                        <span className="text-red-600 bg-red-50 rounded-full px-2 select-none text-xs py-1">
                          رد شده
                        </span>
                      )}
                      {loanRequestData.loanRequestDto.status === 4 && (
                        <span className="text-emerald-600 bg-emerald-50 rounded-full px-2 select-none text-xs py-1">
                          تایید شده
                        </span>
                      )}
                      {loanRequestData.loanRequestDto.status === 5 && (
                        <span className="text-orange-600 bg-orange-50 rounded-full px-2 select-none text-xs py-1">
                          آرشیو شده
                        </span>
                      )}
                    </div>
                    <IoIosArrowDown
                      className={
                        open ? "rotate-180 duration-300" : "duration-300"
                      }
                    />
                  </div>
                </div>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <div className="flex flex-wrap w-full">
                    <div className="px-1 sm:w-1/2 w-full mt-2">
                      <div
                        className={
                          themeMode === "dark"
                            ? "rounded-lg bg-slate-700 px-3 py-1  flex justify-between items-center"
                            : "rounded-lg bg-slate-100 px-3 py-1  flex justify-between items-center"
                        }
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
                              d="M21.5 10.9V4.1C21.5 2.6 20.86 2 19.27 2H15.23C13.64 2 13 2.6 13 4.1V10.9C13 12.4 13.64 13 15.23 13H19.27C20.86 13 21.5 12.4 21.5 10.9Z"
                              fill="#1787B0"
                            />
                            <path
                              d="M11 13.1V19.9C11 21.4 10.36 22 8.77 22H4.73C3.14 22 2.5 21.4 2.5 19.9V13.1C2.5 11.6 3.14 11 4.73 11H8.77C10.36 11 11 11.6 11 13.1Z"
                              fill="#1787B0"
                            />
                            <path
                              opacity="0.4"
                              d="M21.5 19.9V17.1C21.5 15.6 20.86 15 19.27 15H15.23C13.64 15 13 15.6 13 17.1V19.9C13 21.4 13.64 22 15.23 22H19.27C20.86 22 21.5 21.4 21.5 19.9Z"
                              fill="#1787B0"
                            />
                            <path
                              opacity="0.4"
                              d="M11 6.9V4.1C11 2.6 10.36 2 8.77 2H4.73C3.14 2 2.5 2.6 2.5 4.1V6.9C2.5 8.4 3.14 9 4.73 9H8.77C10.36 9 11 8.4 11 6.9Z"
                              fill="#1787B0"
                            />
                          </svg>
                          <span className="px-1 text-xs whitespace-nowrap">
                            مبلغ
                          </span>
                        </div>
                        <span className="text-xs whitespace-nowrap font-extrabold">
                          {loanRequestData.loanRequestDto.amount.toLocaleString()}
                          <span className="pr-1">ریال</span>
                        </span>
                      </div>
                    </div>
                    <div className="px-1 sm:w-1/2 w-full mt-2">
                      <div
                        className={
                          themeMode === "dark"
                            ? "rounded-lg bg-slate-700 px-3 py-1  flex justify-between items-center"
                            : "rounded-lg bg-slate-100 px-3 py-1  flex justify-between items-center"
                        }
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
                              d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z"
                              fill="#1787B0"
                            />
                            <path
                              d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z"
                              fill="#1787B0"
                            />
                            <path
                              d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z"
                              fill="#1787B0"
                            />
                            <path
                              opacity="0.4"
                              d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z"
                              fill="#1787B0"
                            />
                          </svg>
                          <span className="px-1 text-xs whitespace-nowrap">
                            نهاده
                          </span>
                        </div>
                        <span className="text-xs whitespace-nowrap font-extrabold">
                          {loanRequestData.loanRequestDto.inputType} /{" "}
                          {loanRequestData.loanRequestDto.volume.toLocaleString()}
                          kg
                        </span>
                      </div>
                    </div>
                    <div className="px-1 sm:w-1/2 w-full mt-2">
                      <div
                        className={
                          themeMode === "dark"
                            ? "rounded-lg bg-slate-700 px-3 py-1  flex justify-between items-center"
                            : "rounded-lg bg-slate-100 px-3 py-1  flex justify-between items-center"
                        }
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
                              d="M16.75 3.56V2C16.75 1.59 16.41 1.25 16 1.25C15.59 1.25 15.25 1.59 15.25 2V3.5H8.74998V2C8.74998 1.59 8.40998 1.25 7.99998 1.25C7.58998 1.25 7.24998 1.59 7.24998 2V3.56C4.54998 3.81 3.23999 5.42 3.03999 7.81C3.01999 8.1 3.25999 8.34 3.53999 8.34H20.46C20.75 8.34 20.99 8.09 20.96 7.81C20.76 5.42 19.45 3.81 16.75 3.56Z"
                              fill="#1787B0"
                            />
                            <path
                              opacity="0.4"
                              d="M21 10.84V12.58C21 13.19 20.46 13.66 19.86 13.56C19.58 13.52 19.29 13.49 19 13.49C15.97 13.49 13.5 15.96 13.5 18.99C13.5 19.45 13.68 20.09 13.87 20.67C14.09 21.32 13.61 21.99 12.92 21.99H8C4.5 21.99 3 19.99 3 16.99V10.83C3 10.28 3.45 9.82999 4 9.82999H20C20.55 9.83999 21 10.29 21 10.84Z"
                              fill="#1787B0"
                            />
                            <path
                              d="M19 15C16.79 15 15 16.79 15 19C15 19.75 15.21 20.46 15.58 21.06C16.27 22.22 17.54 23 19 23C20.46 23 21.73 22.22 22.42 21.06C22.79 20.46 23 19.75 23 19C23 16.79 21.21 15 19 15ZM21.07 18.57L18.94 20.54C18.8 20.67 18.61 20.74 18.43 20.74C18.24 20.74 18.05 20.67 17.9 20.52L16.91 19.53C16.62 19.24 16.62 18.76 16.91 18.47C17.2 18.18 17.68 18.18 17.97 18.47L18.45 18.95L20.05 17.47C20.35 17.19 20.83 17.21 21.11 17.51C21.39 17.81 21.37 18.28 21.07 18.57Z"
                              fill="#1787B0"
                            />
                            <path
                              d="M8.5 15C8.24 15 7.98 14.89 7.79 14.71C7.61 14.52 7.5 14.26 7.5 14C7.5 13.74 7.61 13.48 7.79 13.29C8.02 13.06 8.37 12.95 8.7 13.02C8.76 13.03 8.82 13.05 8.88 13.08C8.94 13.1 9 13.13 9.06 13.17C9.11 13.21 9.16 13.25 9.21 13.29C9.39 13.48 9.5 13.74 9.5 14C9.5 14.26 9.39 14.52 9.21 14.71C9.16 14.75 9.11 14.79 9.06 14.83C9 14.87 8.94 14.9 8.88 14.92C8.82 14.95 8.76 14.97 8.7 14.98C8.63 14.99 8.56 15 8.5 15Z"
                              fill="#1787B0"
                            />
                            <path
                              d="M12 15C11.74 15 11.48 14.89 11.29 14.71C11.11 14.52 11 14.26 11 14C11 13.74 11.11 13.48 11.29 13.29C11.67 12.92 12.34 12.92 12.71 13.29C12.89 13.48 13 13.74 13 14C13 14.26 12.89 14.52 12.71 14.71C12.52 14.89 12.26 15 12 15Z"
                              fill="#1787B0"
                            />
                            <path
                              d="M8.5 18.5C8.24 18.5 7.98 18.39 7.79 18.21C7.61 18.02 7.5 17.76 7.5 17.5C7.5 17.24 7.61 16.98 7.79 16.79C7.89 16.7 7.99 16.63 8.12 16.58C8.49 16.42 8.93 16.51 9.21 16.79C9.39 16.98 9.5 17.24 9.5 17.5C9.5 17.76 9.39 18.02 9.21 18.21C9.02 18.39 8.76 18.5 8.5 18.5Z"
                              fill="#1787B0"
                            />
                          </svg>
                          <span className="px-1 text-xs whitespace-nowrap">
                            تاریخ ثبت درخواست
                          </span>
                        </div>
                        <span className="text-xs whitespace-nowrap font-extrabold">
                          {loanRequestData.loanRequestDto.createdFa}
                        </span>
                      </div>
                    </div>
                    <div className="px-1 sm:w-1/2 w-full mt-2">
                      <div
                        className={
                          themeMode === "dark"
                            ? "rounded-lg bg-slate-700 px-3 py-1  flex justify-between items-center"
                            : "rounded-lg bg-slate-100 px-3 py-1  flex justify-between items-center"
                        }
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
                              d="M16.75 3.56V2C16.75 1.59 16.41 1.25 16 1.25C15.59 1.25 15.25 1.59 15.25 2V3.5H8.74998V2C8.74998 1.59 8.40998 1.25 7.99998 1.25C7.58998 1.25 7.24998 1.59 7.24998 2V3.56C4.54998 3.81 3.23999 5.42 3.03999 7.81C3.01999 8.1 3.25999 8.34 3.53999 8.34H20.46C20.75 8.34 20.99 8.09 20.96 7.81C20.76 5.42 19.45 3.81 16.75 3.56Z"
                              fill="#1787B0"
                            />
                            <path
                              opacity="0.4"
                              d="M20 9.84C20.55 9.84 21 10.29 21 10.84V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V10.84C3 10.29 3.45 9.84 4 9.84H20Z"
                              fill="#1787B0"
                            />
                            <path
                              d="M14.84 14.99L14.34 15.5H14.33L11.3 18.53C11.17 18.66 10.9 18.8 10.71 18.82L9.35999 19.02C8.86999 19.09 8.53001 18.74 8.60001 18.26L8.79002 16.9C8.82002 16.71 8.94999 16.45 9.07999 16.31L12.12 13.28L12.62 12.77C12.95 12.44 13.32 12.2 13.72 12.2C14.06 12.2 14.43 12.36 14.84 12.77C15.74 13.67 15.45 14.38 14.84 14.99Z"
                              fill="#1787B0"
                            />
                          </svg>
                          <span className="px-1 text-xs whitespace-nowrap">
                            تاریخ آخرین ویرایش
                          </span>
                        </div>
                        <span className="text-xs whitespace-nowrap font-extrabold">
                          {loanRequestData.loanRequestDto.modifiedFa}
                        </span>
                      </div>
                    </div>
                    <div className="px-1 w-full mt-2">
                      <div
                        className={
                          themeMode === "dark"
                            ? "rounded-lg bg-slate-700 px-3 py-1 "
                            : "rounded-lg bg-slate-100 px-3 py-1 "
                        }
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
                              d="M16.24 3.65002H7.76C5.29 3.65002 3.29 5.66002 3.29 8.12002V17.53C3.29 19.99 5.3 22 7.76 22H16.23C18.7 22 20.7 19.99 20.7 17.53V8.12002C20.71 5.65002 18.7 3.65002 16.24 3.65002Z"
                              fill="#1787B0"
                            />
                            <path
                              d="M14.35 2H9.65C8.61 2 7.76 2.84 7.76 3.88V4.82C7.76 5.86 8.6 6.7 9.64 6.7H14.35C15.39 6.7 16.23 5.86 16.23 4.82V3.88C16.24 2.84 15.39 2 14.35 2Z"
                              fill="#1787B0"
                            />
                            <path
                              d="M15 12.95H8C7.59 12.95 7.25 12.61 7.25 12.2C7.25 11.79 7.59 11.45 8 11.45H15C15.41 11.45 15.75 11.79 15.75 12.2C15.75 12.61 15.41 12.95 15 12.95Z"
                              fill="#1787B0"
                            />
                            <path
                              d="M12.38 16.95H8C7.59 16.95 7.25 16.61 7.25 16.2C7.25 15.79 7.59 15.45 8 15.45H12.38C12.79 15.45 13.13 15.79 13.13 16.2C13.13 16.61 12.79 16.95 12.38 16.95Z"
                              fill="#1787B0"
                            />
                          </svg>

                          <span className="px-1 text-xs whitespace-nowrap">
                            خلاصه طرح
                          </span>
                        </div>
                        <span className="text-xs font-extrabold flex justify-start p-3">
                          {loanRequestData.loanRequestDto.planSummary}
                        </span>
                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>
            <Divider className="pt-3" />
            <div className="mt-3">
              <StepperLoanRequest
                setFlag={setFlag}
                loading={isLoading}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                loanDocs={loanDocs}
                setLoanDocs={setLoanDocs}
              />
            </div>
          </div>
        )}
      </div>
      {isLoading && (
        <div className="flex justify-center items-center w-full h-96">
          <SyncLoader color={themeMode === "dark" ? "#fff" : "#1787B0"} />
        </div>
      )}
    </>
  );
}
