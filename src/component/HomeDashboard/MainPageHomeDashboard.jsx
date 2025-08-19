import { Button, Dialog, Divider, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  BiSolidMessageRoundedDetail,
  BiSolidMessageRoundedError,
} from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { PiTimerFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";
import ChartDashboard from "./ChartDashboard";
import TableLoanSet from "./TableLoanSet";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

export default function MainPageHomeDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const mainPageState = useSelector((store) => store.resetState.mainPageState);
  const [dataDashboard, setDataDashboard] = useState({});
  const [open, setOpen] = useState(false);
  const [messageSelected, setMessageSelected] = useState({});
  const [steps, setSteps] = useState([]);
  const [listLoan, setListLoan] = useState([]);
  const Navigate = useNavigate();
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setDataDashboard([]);
    axios
      .get(mainDomain + "/api/Dashboard/Current", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setDataDashboard(res.data);
        
      })
      .catch(() => {});
  }, [mainPageState]);

  useEffect(() => {
    if (dataDashboard.cooperativeNotifyList) {
      const arr = [];
      dataDashboard.cooperativeNotifyList.map((e) => {
        const obj = {};
        obj.label = e.createdFa;
        obj.description = e.title;
        obj.body = e.body;
        arr.push(obj);
      });
      setSteps(arr);
    }
  }, [dataDashboard]);

  useEffect(() => {
    axios
      .get(mainDomain + "/api/Loan/Current", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: {
          find: "",
          status: 100,
          sortFilter: 1,
          sortDir: 1,
          pageSize: 25,
          page: 1,
        },
      })
      .then((res) => {
        setListLoan(res.data.cooperativeLoanList);        
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {(dataDashboard.loanCount || dataDashboard.loanCount === 0) &&
        listLoan.length > 0 && (
          <div className="py-3">
            
            <TableLoanSet listLoan={listLoan} />
          </div>
        )}
      {(dataDashboard.loanCount || dataDashboard.loanCount === 0) &&
        (
          <div className="flex flex-wrap px-4">
            <div className="w-full flex flex-wrap">
              <div className="p-1 xl:w-1/2 w-full flex flex-wrap">
                <div className="px-1 sm:w-1/2 w-full">
                  <div className="border rounded-lg p-2 h-full">
                    <div
                      style={{
                        background: themeColor.bgColor,
                        color: themeColor.color,
                      }}
                      className="p-3 rounded-lg flex"
                    >
                      <span className="font-bold text-xs">
                        درخواست های تسهیلات منتظر بررسی
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-between">
                      <img src="/images/20943798.png" alt="" />
                      <div
                        style={{
                          borderColor:
                            themeColor.bgColor.match(
                              /#.{0,6}(?=(?:.*#|$))/g
                            )[0],
                        }}
                        className="w-full rounded-lg px-1 flex justify-between py-4 border border-dashed"
                      >
                        <div>
                          <span
                            style={{
                              color:
                                themeColor.bgColor.match(
                                  /#.{0,6}(?=(?:.*#|$))/g
                                )[0],
                            }}
                            className="font-semibold text-2xl"
                          >
                            {dataDashboard.loanRequestPendingCount}
                          </span>
                          <span
                            className={
                              themeMode === "dark"
                                ? "text-white font-bold text-xs whitespace-nowrap px-1"
                                : "text-black font-bold text-xs whitespace-nowrap px-1"
                            }
                          >
                            درخواست منتظر بررسی
                          </span>
                        </div>
                        <div>
                          <Button
                            onClick={() => {
                              Navigate("/profile/LoanList", {
                                state: { myData: 0 },
                              });
                            }}
                            sx={{
                              background: themeColor.bgColor,
                              color: themeColor.color,
                              borderRadius: "10px",
                              whiteSpace: "nowrap",
                              fontSize: "0.75rem",
                            }}
                          >
                            بررسی لیست
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-1 sm:w-1/2 w-full">
                  <div className=" border rounded-lg p-3 overflow-hidden">
                    <ChartDashboard dataDashboard={dataDashboard} />
                  </div>
                </div>
              </div>

              <div className="xl:w-1/2 w-full flex flex-wrap px-2 py-1">
                <div className="border rounded-lg w-full flex flex-wrap items-start">
                  <div className="px-2 sm:w-1/2 w-full mt-2">
                    <div
                      style={{
                        background: themeColor.bgColor,
                      }}
                      className="rounded-lg w-full p-3 flex flex-col"
                    >
                      <span style={{ color: themeColor.color }}>
                        کل تسهیلات
                      </span>
                      <span
                        style={{ fontWeight: 900 }}
                        className={
                          themeMode === "dark"
                            ? "bg-slate-900 p-1 rounded-lg mt-3"
                            : "bg-white p-1 rounded-lg mt-3"
                        }
                      >
                        {dataDashboard.loanCount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="px-2 sm:w-1/2 w-full mt-2">
                    <div
                      style={{
                        background: themeColor.bgColor,
                      }}
                      className="rounded-lg w-full p-3 flex flex-col"
                    >
                      <span style={{ color: themeColor.color }}>
                        کل دریافتی
                      </span>
                      <span
                        style={{ fontWeight: 900 }}
                        className={
                          themeMode === "dark"
                            ? "bg-slate-900 p-1 rounded-lg mt-3"
                            : "bg-white p-1 rounded-lg mt-3"
                        }
                      >
                        {dataDashboard.loanAmountSum.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="px-2 sm:w-1/2 w-full mt-2">
                    <div
                      onClick={() => {
                        Navigate("/profile/LoanList", {
                          state: { myData: 3 },
                        });
                      }}
                      style={{
                        background: themeColor.bgColor,
                      }}
                      className="rounded-lg w-full p-3 flex flex-col cursor-pointer hover:scale-105 duration-300"
                    >
                      <span style={{ color: themeColor.color }}>
                        بدهی جاری{" "}
                      </span>
                      <span
                        style={{ fontWeight: 900 }}
                        className={
                          themeMode === "dark"
                            ? "bg-slate-900 p-1 rounded-lg mt-3"
                            : "bg-white p-1 rounded-lg mt-3"
                        }
                      >
                        {dataDashboard.loanAmountPaidSum.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="px-2 sm:w-1/2 w-full mt-2">
                    <div
                      onClick={() => {
                        Navigate("/profile/LoanList", {
                          state: { myData: 5 },
                        });
                      }}
                      style={{
                        background: themeColor.bgColor,
                      }}
                      className="rounded-lg w-full p-3 flex flex-col cursor-pointer hover:scale-105 duration-300"
                    >
                      <span style={{ color: themeColor.color }}>وصول شده</span>
                      <span
                        style={{ fontWeight: 900 }}
                        className={
                          themeMode === "dark"
                            ? "bg-slate-900 p-1 rounded-lg mt-3"
                            : "bg-white p-1 rounded-lg mt-3"
                        }
                      >
                        {dataDashboard.loanAmountReceivedSum.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="px-2 sm:w-1/2 w-full mt-2">
                    <div
                      onClick={() => {
                        Navigate("/profile/LoanList", {
                          state: { myData: 6 },
                        });
                      }}
                      style={{
                        background: themeColor.bgColor,
                      }}
                      className="rounded-lg w-full p-3 flex flex-col cursor-pointer hover:scale-105 duration-300"
                    >
                      <span style={{ color: themeColor.color }}>
                        مبلغ کل معوقات
                      </span>
                      <span
                        style={{ fontWeight: 900 }}
                        className={
                          themeMode === "dark"
                            ? "bg-slate-900 p-1 rounded-lg mt-3"
                            : "bg-white p-1 rounded-lg mt-3"
                        }
                      >
                        {dataDashboard.loanAmountDeyaledSum.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="px-2 sm:w-1/2 w-full mt-2">
                    <div
                      onClick={() => {
                        Navigate("/profile/LoanList", {
                          state: { myData: 4 },
                        });
                      }}
                      style={{
                        background: themeColor.bgColor,
                      }}
                      className="rounded-lg w-full p-3 flex flex-col cursor-pointer hover:scale-105 duration-300"
                    >
                      <span style={{ color: themeColor.color }}>
                        سررسید شده{" "}
                      </span>
                      <span
                        style={{ fontWeight: 900 }}
                        className={
                          themeMode === "dark"
                            ? "bg-slate-900 p-1 rounded-lg mt-3"
                            : "bg-white p-1 rounded-lg mt-3"
                        }
                      >
                        {dataDashboard.loanAmountMaturitySum.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap w-full mt-2">
              <div className="xl:w-1/2 w-full px-2">
                <div className="border rounded-lg p-3 h-full w-full">
                  <div
                    style={{ background: themeColor.bgColor }}
                    className="p-3 rounded-lg flex justify-between"
                  >
                    <div
                      style={{ color: themeColor.color }}
                      className="flex items-center"
                    >
                      <BiSolidMessageRoundedDetail />
                      <span className="font-bold text-xs px-2">
                        پیامهای دریافتی
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    {dataDashboard.cooperativeMessageViewList.length > 0 &&
                      dataDashboard.cooperativeMessageViewList.map(
                        (item, index) => (
                          <div
                            onClick={() => {
                              handleClickOpen();
                              setMessageSelected(item);
                            }}
                            key={item.desc}
                            className={
                              index % 2 === 0
                                ? "sm:w-1/2 w-full sm:pl-2 mt-3 flex cursor-pointer hover:scale-105 duration-300"
                                : "sm:w-1/2 w-full sm:pr-2 mt-3 flex cursor-pointer hover:scale-105 duration-300"
                            }
                          >
                            <div
                              className={
                                themeMode === "dark"
                                  ? "bg-slate-800 rounded-lg flex flex-col justify-start items-center px-3 pb-4 pt-1 w-full"
                                  : "bg-slate-100 rounded-lg flex flex-col justify-start items-center px-3 pb-4 pt-1 w-full"
                              }
                            >
                              <span className="font-semibold">
                                {item.title}
                              </span>
                              <div
                                className={
                                  themeMode === "dark"
                                    ? "rounded-lg bg-slate-900 flex justify-between p-1  w-full mt-2"
                                    : "rounded-lg bg-white flex justify-between p-1  w-full mt-2"
                                }
                              >
                                <div className="flex items-center">
                                  <img
                                    className="w-5"
                                    src="/images/calendarDark.svg"
                                    alt=""
                                  />
                                  <span className="px-2 text-xs">
                                    تاریخ ارسال
                                  </span>
                                </div>
                                <span className="text-xs font-semibold">
                                  {item.createdFa.slice(0, 11)}
                                </span>
                              </div>
                              <div
                                className={
                                  themeMode === "dark"
                                    ? "rounded-lg bg-slate-900 flex justify-between p-1  w-full mt-2"
                                    : "rounded-lg bg-white flex justify-between p-1  w-full mt-2"
                                }
                              >
                                <div className="flex items-center">
                                  <PiTimerFill />
                                  <span className="px-2 text-xs">
                                    زمان ارسال
                                  </span>
                                </div>
                                <span className="text-xs font-semibold">
                                  {item.createdFa.slice(11)}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    {dataDashboard.cooperativeMessageViewList.length === 0 && (
                      <div className="flex flex-col items-center justify-center w-full">
                        <img
                          className="w-80"
                          src="/images/20943566 1.png"
                          alt=""
                        />
                        <span>موردی موجود نیست</span>
                      </div>
                    )}
                  </div>
                  {dataDashboard.cooperativeMessageViewList.length > 0 && (
                    <div className="mt-2">
                      <Button
                        onClick={() => {
                          Navigate("/profile/Message");
                        }}
                        sx={{
                          background: themeColor.bgColor,
                          color: themeColor.color,
                          px: 3,
                        }}
                      >
                        مشاهده لیست
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="xl:w-1/2 w-full px-2">
                <div className="border rounded-lg p-3 h-full w-full">
                  <div
                    style={{ background: themeColor.bgColor }}
                    className="p-3 rounded-lg flex justify-between"
                  >
                    <div
                      style={{ color: themeColor.color }}
                      className="flex items-center"
                    >
                      <BiSolidMessageRoundedError />
                      <span className="font-bold text-xs px-2">
                        پیام های سیستم
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    {steps.length > 0 &&
                      steps.map((item, index) => (
                        <div
                          onClick={() => {
                            Swal.fire({
                              title: item.description,
                              text: item.body,
                              icon: "info",
                            });
                          }}
                          key={index}
                          className={
                            index % 2 === 0
                              ? "sm:w-1/2 w-full sm:pl-2 mt-3 flex cursor-pointer hover:scale-105 duration-300"
                              : "sm:w-1/2 w-full sm:pr-2 mt-3 flex cursor-pointer hover:scale-105 duration-300"
                          }
                        >
                          <div
                            className={
                              themeMode === "dark"
                                ? "bg-slate-800 rounded-lg flex flex-col justify-start items-center px-3 pb-4 pt-1 w-full"
                                : "bg-slate-100 rounded-lg flex flex-col justify-start items-center px-3 pb-4 pt-1 w-full"
                            }
                          >
                            <span className="font-semibold">
                              {item.description}
                            </span>
                            <div
                              className={
                                themeMode === "dark"
                                  ? "rounded-lg bg-slate-900 flex justify-between p-1  w-full mt-2"
                                  : "rounded-lg bg-white flex justify-between p-1  w-full mt-2"
                              }
                            >
                              <div className="flex items-center">
                                <img
                                  className="w-5"
                                  src="/images/calendarDark.svg"
                                  alt=""
                                />
                                <span className="px-2 text-xs">
                                  تاریخ ارسال
                                </span>
                              </div>
                              <span className="text-xs font-semibold">
                                {item.label.slice(0, 11)}
                              </span>
                            </div>
                            <div
                              className={
                                themeMode === "dark"
                                  ? "rounded-lg bg-slate-900 flex justify-between p-1  w-full mt-2"
                                  : "rounded-lg bg-white flex justify-between p-1  w-full mt-2"
                              }
                            >
                              <div className="flex items-center">
                                <PiTimerFill />
                                <span className="px-2 text-xs">زمان ارسال</span>
                              </div>
                              <span className="text-xs font-semibold">
                                {item.label.slice(11)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
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
          <span className="text-2xl">پیام</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>
        <div className="px-5">
          <div className="flex justify-start">
            <span>عنوان پیام</span>
          </div>
          <div className="flex justify-start">
            <span>{messageSelected.title}</span>
          </div>
        </div>
        <div className="h-5"></div>
        <div className="px-5">
          <div className="flex justify-start">
            <span>متن پیام</span>
          </div>
          <div className="flex justify-start py-3">
            <div
              className="text-[#777] text-justify px-2"
              dangerouslySetInnerHTML={{ __html: messageSelected.body }}
            />
          </div>
        </div>
        <Divider className="w-full" />
      </Dialog>

      {!dataDashboard.loanCount &&
        dataDashboard.loanCount !== 0 &&
        listLoan.length === 0 && (
          <div className={themeMode === "dark" ? "bg-[#161C24] p-3" : "p-3"}>
            <div className="flex justify-center items-center w-full h-screen">
              <SyncLoader color={themeMode === "dark" ? "#fff" : "#1787B0"} />
            </div>
          </div>
        )}
    </>
  );
}
