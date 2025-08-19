import { Button, TextField } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import { AiOutlineClose } from "react-icons/ai";
import { FaChartSimple } from "react-icons/fa6";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { setValTab } from "../../redux/slice/adminLoan";
import { mainDomain } from "../../utils/mainDomain";
import moment from "jalali-moment";

export default function MainPageHomeDashboardAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const mainPageState = useSelector((store) => store.resetState.mainPageState);
  const [dataDashboard, setDataDashboard] = useState({});
  const [steps, setSteps] = useState([]);
  const [date, setDate] = useState(new Date());
  const [dateFa, setDateFa] = useState("");
  const [label, setLabel] = useState("انتخاب سال");

  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  function convertPersianToEnglish(persianNum) {
    return persianNum
      .split("")
      .map((char) => {
        const index = persianNumbers.indexOf(char);
        return index !== -1 ? englishNumbers[index] : char;
      })
      .join("");
  }


  useEffect(() => {
    const currentYear = moment().jYear();
    const persianYear = currentYear
      .toString() // تبدیل عدد به استرینگ
      .replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);

    setDateFa(persianYear); // خروجی: ۱۴۰۴
  }, []);

  const disPatch = useDispatch();

  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  useEffect(() => {
    if (dataDashboard.cooperativeDelaydLoans) {
      const arr = [];
      dataDashboard.cooperativeDelaydLoans.map((e) => {
        const obj = {};
        obj.label = e.loanMaturityFa;
        obj.description = e.cooperativeTitle;
        obj.amount = e.amount;
        obj.id = e.id;
        arr.push(obj);
      });
      setSteps(arr);
    }
  }, [dataDashboard]);

  useEffect(() => {
    if (dateFa) {
      setDataDashboard([]);
      axios
        .get(mainDomain + "/api/Dashboard", {
          params: {
            yearFa: Number(convertPersianToEnglish(dateFa)),
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setDataDashboard(res.data);
        })
        .catch(() => {});
    }
  }, [mainPageState, dateFa]);

  const Navigate = useNavigate();

  const handleBlur = () => {
    setLabel("انتخاب سال");
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
          onBlur={handleBlur}
          value={value}
          onChange={onChange}
          size="small"
          type="text"
          className="w-full"
          id="outlined-multiline-flexible"
          label={label}
          name="name"
        />
        {value && (
          <AiOutlineClose
            onClick={() => {
              setDate({});
              setDateFa("");
              setLabel("همه");
              setDataDashboard([]);
              axios
                .get(mainDomain + "/api/Dashboard", {
                  params: {
                    yearFa: 0,
                  },
                  headers: {
                    Authorization: `Bearer ${user.token}`,
                  },
                })
                .then((res) => {
                  setDataDashboard(res.data);
                })
                .catch(() => {});
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
          />
        )}
      </div>
    );
  }
  const currentYearPersian = new DateObject({ calendar: persian }).year;
  const lastDayOfYearPersian = new DateObject({
    year: currentYearPersian,
    month: 12,
    day: 29,
    calendar: persian,
  });
  const formattedDate = lastDayOfYearPersian.format("YYYY/MM/DD");
  const maxDate = new DateObject({ date: formattedDate, calendar: persian });
  return (
    <>
      <div className="px-5">
        {dataDashboard.cooperativeDelaydLoans && (
          <div>
            <div className="flex flex-wrap w-full mt-8">
              <div className="xl:w-1/2 w-full flex flex-wrap px-1">
                <div className="px-1 sm:w-1/2 w-full mt-2">
                  <div className="p-1 border rounded-lg w-full">
                    <div
                      style={{
                        background: themeColor.bgColor,
                        color: themeColor.color,
                      }}
                      className="p-3 rounded-lg"
                    >
                      <span className="font-bold text-xs">
                        درخواست های تسهیلات منتظر بررسی
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/images/20943798.png" alt="" />
                      <div
                        style={{
                          borderColor:
                            themeColor.bgColor?.match(
                              /#.{0,6}(?=(?:.*#|$))/g
                            )[0],
                        }}
                        className="w-full rounded-lg px-2 flex justify-between py-4 border border-dashed"
                      >
                        <div>
                          <span
                            style={{
                              color:
                                themeColor.bgColor?.match(
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
                                ? "text-white font-bold text-xs whitespace-nowrap"
                                : "text-black font-bold text-xs whitespace-nowrap"
                            }
                          >
                            درخواست منتظر بررسی
                          </span>
                        </div>
                        <div>
                          <Button
                            onClick={() => {
                              Navigate("/profile/AdminLoanList");
                              disPatch(setValTab(0));
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
                <div className="px-1 sm:w-1/2 w-full flex mt-2">
                  <div className="p-1 border rounded-lg w-full">
                    <div
                      style={{
                        background: themeColor.bgColor,
                        color: themeColor.color,
                      }}
                      className="p-3 rounded-lg"
                    >
                      <span className="font-bold text-xs">
                        تشکل های عضو صندوق عشایر
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/images/20943566.png" alt="" />
                      <div className="flex items-center">
                        <span className="text-blue-500 text-3xl font-bold">
                          {dataDashboard.cooperativeCount -
                            dataDashboard.cooperativeNoMemberCount}
                        </span>
                        <span style={{ fontWeight: 900 }} className="px-2">
                           سهام دار
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-blue-500 text-3xl font-bold">
                          {/* {dataDashboard.cooperativeCount} */}
                          {dataDashboard.cooperativeNoMemberCount}
                        </span>
                        <span style={{ fontWeight: 900 }} className="px-2">
                           غیر سهام دار
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl:w-1/2 w-full flex flex-wrap px-2">
                <div className="border rounded-lg p-3 mt-2 w-full  items-start">
                  <div className="w-full flex justify-center">
                    <div className="relative w-full px-2 flex items-center">
                      <DatePicker
                        maxDate={maxDate}
                        onlyYearPicker
                        className={
                          themeMode === "dark"
                            ? "bg-dark rmdp-mobile"
                            : "rmdp-mobile"
                        }
                        format="YYYY"
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
                          setDateFa(event.format("YYYY"));
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <div className="px-2  w-full mt-4">
                      <div
                        style={{
                          background: themeColor.bgColor,
                        }}
                        className="rounded-lg w-full p-3 flex flex-col"
                      >
                        <span style={{ color: themeColor.color }}>
                          تعداد تسهیلات پرداختی
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
                    <div className="px-2  w-full mt-4">
                      <div
                        style={{
                          background: themeColor.bgColor,
                        }}
                        className="rounded-lg w-full p-3 flex flex-col"
                      >
                        <span style={{ color: themeColor.color }}>
                          مبلغ کل تسهیلات پرداختی
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
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="xl:w-1/2 w-full px-2 mt-2">
                <div
                  className={
                    dataDashboard.cooperativeMaturedLoans.length === 0
                      ? themeMode === "dark"
                        ? "border rounded-lg p-3 bg-slate-700"
                        : "border rounded-lg p-3 bg-[#f4f8ff]"
                      : "border rounded-lg p-3"
                  }
                >
                  <div
                    style={{
                      background: themeColor.bgColor,
                      color: themeColor.color,
                    }}
                    className="rounded-lg p-2 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <FaChartSimple />
                      <span className="px-2">تسهیلات سررسید شده</span>
                    </div>
                    <div className="flex items-center">
                      <span>
                        {dataDashboard.cooperativeMaturedLoans.length > 0
                          ? dataDashboard.cooperativeMaturedLoans[0].total
                          : 0}
                      </span>

                      <span className="px-1">مورد</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap sm:flex-nowrap sm:gap-2 py-2">
                    {dataDashboard.cooperativeMaturedLoans.length > 0 &&
                      dataDashboard.cooperativeMaturedLoans.map(
                        (item, index) => (
                          <div
                            onClick={() => {
                              Navigate("/profile/AdminLoanList/edit", {
                                state: { myData: 4, page: 1, loanId: item.id },
                              });
                              disPatch(setValTab(4));
                            }}
                            key={item.desc}
                            className={
                              index % 2 === 0
                                ? " w-full mt-3 flex cursor-pointer hover:scale-105 duration-300"
                                : " w-full mt-3 flex cursor-pointer hover:scale-105 duration-300"
                            }
                          >
                            <div
                              className={
                                themeMode === "dark"
                                  ? "bg-slate-800 rounded-lg flex flex-col justify-start items-center px-3 pb-4 pt-1 w-full"
                                  : "bg-slate-100 rounded-lg flex flex-col justify-start items-center px-3 pb-4 pt-1 w-full"
                              }
                            >
                              <span className="font-semibold text-xs">
                                {item.cooperativeTitle}
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
                                    تاریخ سررسید
                                  </span>
                                </div>
                                <span className="text-xs font-semibold">
                                  {item.loanMaturityFa}
                                </span>
                              </div>
                              <div
                                className={
                                  themeMode === "dark"
                                    ? "rounded-lg bg-slate-900 flex justify-between items-center p-1 w-full mt-2"
                                    : "rounded-lg bg-white flex justify-between items-center p-1 w-full mt-2"
                                }
                              >
                                <div className="flex items-center">
                                  <img
                                    className="w-5"
                                    src="/images/dollar-square.svg"
                                    alt=""
                                  />
                                  <span className="px-2 text-xs">مبلغ</span>
                                </div>
                                <span className="text-orange-500 text-xs font-semibold">
                                  {item.amount.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    {dataDashboard.cooperativeMaturedLoans.length === 0 && (
                      <div className="flex flex-col items-center justify-center w-full">
                        <img src="/images/20943566 1.png" alt="" />
                        <span>موردی موجود نیست</span>
                      </div>
                    )}
                  </div>

                  {/* <div className="px-2 sm:w-1/2 w-full mt-2">
                      <div
                        onClick={() => {
                          Navigate("/profile/AdminLoanList", {
                            state: { myData: 4 },
                          });
                          disPatch(setValTab(4));
                        }}
                        style={{
                          background: themeColor.bgColor,
                        }}
                        className="rounded-lg w-full p-3 flex flex-col cursor-pointer hover:scale-105 duration-300"
                      >
                        <span style={{ color: themeColor.color }}>
                          مبلغ سررسید شده
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
                    </div> */}

                  <div
                    className={
                      themeMode === "dark"
                        ? "bg-slate-800 rounded-lg flex justify-between px-3 font-bold py-2 my-2"
                        : "bg-slate-100 rounded-lg flex justify-between px-3 font-bold py-2 my-2"
                    }
                  >
                    <span>مبلغ سررسید شده</span>
                    <span>
                      {dataDashboard.loanAmountMaturitySum.toLocaleString()}{" "}
                      ريال
                    </span>
                  </div>
                  {dataDashboard.cooperativeMaturedLoans.length > 0 && (
                    <div>
                      <Button
                        onClick={() => {
                          Navigate("/profile/AdminLoanList");
                          disPatch(setValTab(4));
                        }}
                        sx={{
                          background: themeColor.bgColor,
                          color: themeColor.color,
                          px: 3,
                        }}
                      >
                        بارگیری بیشتر
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="xl:w-1/2 w-full px-2 mt-2">
                <div
                  className={
                    steps.length === 0
                      ? "border rounded-lg p-3 bg-[#f4f8ff]"
                      : "border rounded-lg p-3"
                  }
                >
                  <div
                    style={{
                      background: themeColor.bgColor,
                      color: themeColor.color,
                    }}
                    className="rounded-lg p-2 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <FaChartSimple />
                      <span className="px-2">تسهیلات معوق</span>
                    </div>
                    <div className="flex items-center">
                      <span>
                        {dataDashboard.cooperativeDelaydLoans.length > 0
                          ? dataDashboard.cooperativeDelaydLoans[0].total
                          : 0}
                      </span>

                      <span className="px-1">مورد</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap sm:flex-nowrap sm:gap-2 py-2">
                    {steps.length > 0 &&
                      steps.map((item, index) => (
                        <div
                          onClick={() => {
                            Navigate("/profile/AdminLoanList/edit", {
                              state: { myData: 2, page: 1, loanId: item.id },
                            });
                            disPatch(setValTab(7));
                          }}
                          key={item.desc}
                          className={
                            index % 2 === 0
                              ? " w-full mt-3 flex cursor-pointer hover:scale-105 duration-300"
                              : " w-full mt-3 flex cursor-pointer hover:scale-105 duration-300"
                          }
                        >
                          <div
                            className={
                              themeMode === "dark"
                                ? "bg-slate-800 rounded-lg flex flex-col justify-start items-center px-3 pb-4 pt-1 w-full"
                                : "bg-slate-100 rounded-lg flex flex-col justify-start items-center px-3 pb-4 pt-1 w-full"
                            }
                          >
                            <span className="font-semibold text-xs">
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
                                  تاریخ سررسید
                                </span>
                              </div>
                              <span className="text-xs font-semibold">
                                {item.label}
                              </span>
                            </div>
                            <div
                              className={
                                themeMode === "dark"
                                  ? "rounded-lg bg-slate-900 flex justify-between items-center p-1 w-full mt-2"
                                  : "rounded-lg bg-white flex justify-between items-center p-1 w-full mt-2"
                              }
                            >
                              <div className="flex items-center">
                                <img
                                  className="w-5"
                                  src="/images/dollar-square.svg"
                                  alt=""
                                />
                                <span className="px-2 text-xs">مبلغ</span>
                              </div>
                              <span className="text-orange-500 text-xs font-semibold">
                                {item.amount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    {steps.length === 0 && (
                      <div className="flex flex-col items-center justify-center w-full">
                        <img src="/images/20943566 1.png" alt="" />
                        <span>موردی موجود نیست</span>
                      </div>
                    )}
                  </div>
                  {/* <div className="px-2 w-full my-2">
                    <div
                      onClick={() => {
                        Navigate("/profile/AdminLoanList");
                        disPatch(setValTab(7));
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
                  </div> */}
                  <div
                    className={
                      themeMode === "dark"
                        ? "bg-slate-800 rounded-lg flex justify-between px-3 font-bold py-2 my-2"
                        : "bg-slate-100 rounded-lg flex justify-between px-3 font-bold py-2 my-2"
                    }
                    // className="flex justify-between px-3 font-bold"
                  >
                    <span>مبلغ کل معوقات</span>
                    <span>
                      {dataDashboard.loanAmountDeyaledSum.toLocaleString()} ريال
                    </span>
                  </div>
                  {steps.length > 0 && (
                    <div>
                      <Button
                        onClick={() => {
                          Navigate("/profile/AdminLoanList");
                          disPatch(setValTab(7));
                        }}
                        sx={{
                          background: themeColor.bgColor,
                          color: themeColor.color,
                          px: 3,
                        }}
                      >
                        بارگیری بیشتر
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {!dataDashboard.cooperativeDelaydLoans && (
          <div
            className={
              themeMode === "dark" ? "bg-[#161C24] p-3" : "bg-[#fff] p-3"
            }
          >
            <div className="flex justify-center items-center w-full h-screen">
              <SyncLoader color={themeMode === "dark" ? "#fff" : "#1787B0"} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
