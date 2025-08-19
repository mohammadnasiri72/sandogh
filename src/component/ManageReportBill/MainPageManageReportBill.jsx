import {
  Autocomplete,
  Box,
  Collapse,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import { AiOutlineClose } from "react-icons/ai";
import { FaChartSimple } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import DatePicker from "react-multi-date-picker";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";
import TableReportLoan from "./TableReportLoan";

export default function MainPageManageReportBill() {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const user = JSON.parse(localStorage.getItem("user"));
  const mainPageState = useSelector((store) => store.resetState.mainPageState);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExcel, setIsLoadingExcel] = useState(false);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [listProvince, setListProvince] = useState([]);
  const [valProvince, setValProvince] = useState({
    title: "همه استان ها",
    id: 0,
  });
  const [valStatusCooperative, setValStatusCooperative] = useState(0);
  const [valStatusLoan, setValStatusLoan] = useState(0);
  const [valDir, setValDir] = useState(0);
  const [valSort, setValSort] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [ListCooperative, setListCooperative] = useState([]);
  const [valCooperative, setValCooperative] = useState({
    title: "همه تشکل ها",
    userName: 0,
  });
  const [date, setDate] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [listReportLoan, setListReportLoan] = useState([]);
  const [subHeaderList, setSubHeaderList] = useState([]);
  const [selectedField, setSelectedField] = useState([]);
  const [selectedCols, setSelectedCols] = useState([]);
  const [selectedColsWidth, setSelectedColsWidth] = useState([]);
  const [open, setOpen] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const [isLoadingPrint, setIsLoadingPrint] = useState(false);
  const [formDetails, setFormDetails] = useState([]);

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
    setSelectedCols(selectedField.map((item) => item.title));
    setSelectedColsWidth(selectedField.map((item) => item.width));
  }, [selectedField]);

  const listStatusCooperative = [
    {
      id: 0,
      name: "همه",
    },
    {
      id: 1,
      name: "سهامدار",
    },
    {
      id: 2,
      name: "غیر سهامدار",
    },
    {
      id: 3,
      name: "بخش دولتی",
    },
  ];
  const listStatusLoan = [
    {
      id: 0,
      name: "همه",
    },
    {
      id: 101,
      name: "پرداخت شده",
    },
    {
      id: 104,
      name: "سررسید شده",
    },
    {
      id: 102,
      name: "معوق شده",
    },
    {
      id: 103,
      name: "وصول شده",
    },
  ];
  const listDir = [
    {
      id: 0,
      name: "نزولی",
    },
    {
      id: 1,
      name: "صعودی",
    },
  ];
  const listSort = [
    {
      id: 5,
      name: "تاریخ پرداخت",
    },
    {
      id: 7,
      name: "تاریخ سررسید",
    },
    {
      id: 8,
      name: "تاریخ وصول",
    },
    {
      id: 4,
      name: "تاریخ قرارداد",
    },
    {
      id: 3,
      name: "تاریخ جلسه",
    },
    {
      id: 6,
      name: "مبلغ تسهیلات",
    },
    {
      id: 1,
      name: "ترتیب درج",
    },
    {
      id: 2,
      name: "ویرایش",
    },
  ];
  // get Province
  useEffect(() => {
    axios
      .get(mainDomain + "/api/BasicInfo/Province", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setListProvince(res.data);
      })
      .catch(() => {});
  }, []);

  //   get list Coparative
  useEffect(() => {
    axios
      .get(mainDomain + "/api/BasicInfo/Cooperative", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setListCooperative(res.data);
      })
      .catch(() => {});
  }, []);

  //  get ReportListLoan
  const config = {
    method: "get",
    url: `${mainDomain}/api/Report/Invoice`,
    params:
      valCooperative.userName === 0
        ? {
            invoiceNumber,
            provinceId: valProvince.provinceId,
            statusId: valStatusCooperative,
            date1,
            date2,
            status: valStatusLoan,
            sortFilter: valSort,
            sortDir: valDir,
            pageSize,
            page: pageIndex,
          }
        : {
            invoiceNumber,
            provinceId: valProvince.provinceId,
            statusId: valStatusCooperative,
            cooperative: valCooperative.userName,
            date1,
            date2,
            status: valStatusLoan,
            sortFilter: valSort,
            sortDir: valDir,
            pageSize,
            page: pageIndex,
          },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const getReportListLoan = async (newParams) => {
    config.params = { ...config.params, ...newParams };
    setListReportLoan([]);
    setSubHeaderList([]);
    setIsLoading(true);
    await axios(config)
      .then((res) => {
        setIsLoading(false);
        setSubHeaderList(res.data.loanStatistics);

        setListReportLoan(res.data.cooperativeLoanFromList);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getReportListLoan();
  }, [mainPageState]);

  // get Excel
  const getDataExcel = () => {
    const data = {
      selectedCols,
      selectedColsWidth,
      provinceId: Number(valProvince.provinceId) || 0,
      statusId: valStatusCooperative,
      ...(valCooperative.userName
        ? { cooperative: valCooperative.userName }
        : {}),
      date1,
      date2,
      status: valStatusLoan,
      sortFilter: valSort,
      sortDir: valDir,
      fileExtenstion: ".xlsx",
    };
    setIsLoadingExcel(true);
    axios
      .post(mainDomain + "/api/Report/Invoice/Export", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const a = document.createElement("a");
        a.href = mainDomain + res.data;
        a.download = "";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setIsLoadingExcel(false);
      })
      .catch((err) => {
        setIsLoadingExcel(false);
        Toast.fire({
          icon: "error",
          text: err.response?.data ? err.response?.data : "خطای شبکه",
          customClass: {
            container: "toast-modal",
          },
        });
      });
  };

  // get PDF
  const getDataPDF = () => {
    const dataSelectedCols = new FormData();
    selectedCols.map((ev) => {
      dataSelectedCols.append("selectedCols", ev);
      return true;
    });
    const data = {
      selectedCols,
      selectedColsWidth,
      provinceId: Number(valProvince.provinceId) || 0,
      statusId: valStatusCooperative,
      ...(valCooperative.userName
        ? { cooperative: valCooperative.userName }
        : {}),
      date1,
      date2,
      status: valStatusLoan,
      sortFilter: valSort,
      sortDir: valDir,
      fileExtenstion: ".pdf",
    };

    setIsLoadingPdf(true);
    axios
      .post(mainDomain + "/api/Report/Invoice/Export", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const a = document.createElement("a");
        a.href = mainDomain + res.data;
        a.download = "";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setIsLoadingPdf(false);
      })
      .catch((err) => {
        setIsLoadingPdf(false);
        Toast.fire({
          icon: "error",
          text: err.response?.data ? err.response?.data : "خطای شبکه",
          customClass: {
            container: "toast-modal",
          },
        });
      });
  };

  // get Print
  const getDataPrint = () => {
    const data = {
      SelectedCols: selectedCols,
      SelectedColsWidth: selectedColsWidth,
      provinceId: valProvince.provinceId || 0,
      Date1: date1,
      Date2: date2,
      FileExtenstion: ".print",
    };
    setIsLoadingPrint(true);
    axios
      .post(mainDomain + "/api/Report/Invoice/Export", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setFormDetails(res.data);

        setIsLoadingPrint(false);
      })
      .catch((err) => {
        setIsLoadingPrint(false);
        Toast.fire({
          icon: "error",
          text: err.response?.data ? err.response?.data : "خطای شبکه",
          customClass: {
            container: "toast-modal",
          },
        });
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getReportListLoan();
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
          label="محدوده تاریخ"
          name="name"
        />
        {value && (
          <AiOutlineClose
            onClick={() => {
              setDate("");
              setDate1("");
              setDate2("");
              getReportListLoan({ date1: "", date2: "", page: 1 });
              setPageIndex(1);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
          />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="px-5">
        <div className="flex flex-wrap">
          <div className="sm:w-1/4 w-full px-2 sm:mt-0 mt-5">
            <Autocomplete
              size="small"
              disabled={listProvince.length === 0}
              className="w-full"
              value={valProvince}
              options={
                listProvince.length > 0
                  ? [{ title: "همه استان ها", id: 0 }, ...listProvince]
                  : [{ title: "همه استان ها", id: 0 }]
              }
              getOptionLabel={(option) => (option.title ? option.title : "")}
              onChange={(event, newValue) => {
                if (newValue) {
                  setValProvince(newValue);
                  getReportListLoan({
                    provinceId: newValue.provinceId,
                    page: 1,
                  });
                  setPageIndex(1);
                }
                if (!newValue) {
                  setValProvince("");
                  getReportListLoan({ provinceId: 0, page: 1 });
                  setPageIndex(1);
                }
              }}
              freeSolo
              renderOption={(props, option) => (
                <Box
                  key={option.id}
                  sx={{ fontSize: 12 }}
                  component="li"
                  {...props}
                >
                  {option.title ? option.title : ""}
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} label={"لیست استان ها"} />
              )}
            />
          </div>
          <div className="sm:w-1/4 w-full px-2 sm:mt-0 mt-5">
            <Autocomplete
              sx={{
                "& .MuiInputBase-input": {
                  textAlign: "start",
                  fontSize: "12px",
                  height: "1.45rem",
                },
              }}
              size="small"
              disabled={ListCooperative.length === 0}
              className="w-full"
              value={valCooperative}
              options={
                ListCooperative.length > 0
                  ? [
                      { title: "همه تشکل ها", userName: 0 },
                      ...ListCooperative.filter((e) =>
                        valProvince.provinceId
                          ? e.provinceId === Number(valProvince.provinceId)
                          : e
                      ),
                    ]
                  : [{ title: "همه تشکل ها", userName: 0 }]
              }
              getOptionLabel={(option) => (option.title ? option.title : "")}
              onChange={(event, newValue) => {
                if (newValue) {
                  if (newValue.userName !== 0) {
                    setValCooperative(newValue);
                    getReportListLoan({
                      cooperative: newValue.userName,
                      page: 1,
                    });
                    setPageIndex(1);
                  } else {
                    delete config.params.cooperative;
                    setValCooperative(newValue);
                    getReportListLoan({
                      page: 1,
                    });
                    setPageIndex(1);
                  }
                }
                if (!newValue) {
                  delete config.params.cooperative;
                  setValCooperative("");
                  getReportListLoan({
                    page: 1,
                  });
                  setPageIndex(1);
                }
              }}
              freeSolo
              renderOption={(props, option) => (
                <li {...props} key={option.title}>
                  <div className="text-start text-sm py-2">
                    {option.title ? option.title : ""}
                  </div>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: themeMode === "dark" ? "#fff5" : "#0005", // رنگ بوردر
                      },
                      "&:hover fieldset": {
                        borderColor: themeMode === "dark" ? "#fff" : "#000", // رنگ بوردر هنگام هاور
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "blue", // رنگ بوردر هنگام فوکوس
                      },
                      "& input": {
                        color: themeMode === "dark" ? "#fff" : "#000", // رنگ متن داخل
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: themeMode === "dark" ? "#fff" : "#000", // رنگ label
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "blue", // رنگ label هنگام فوکوس
                    },
                    "& .MuiAutocomplete-clearIndicator": {
                      color: themeMode === "dark" ? "#fff" : "#000", // رنگ ضربدر
                    },
                  }}
                  {...params}
                  label={"لیست تشکل ها"}
                />
              )}
            />
          </div>
          <div className="sm:w-1/4 w-full px-2 sm:mt-0 mt-5">
            <TextField
              sx={{ width: "100%" }}
              value={invoiceNumber}
              onKeyDown={handleKeyDown}
              onChange={(event) => {
                setInvoiceNumber(event.target.value);
              }}
              size="small"
              id="outlined-basic"
              label="شماره سریال"
              variant="outlined"
            />
          </div>
          <div className="sm:w-1/4 w-full px-2 sm:mt-0 mt-5">
            <DatePicker
              range
              numberOfMonths={2}
              mobileLabels={{
                OK: "",
                CANCEL: "",
              }}
              plugins={[
                <Footer
                  position="bottom"
                  format="dddd DD MMMM"
                  names={{
                    selectedDates: "تاریخ انتخابی",

                    selectDate: "انتخاب نشده",

                    separator: "-",
                  }}
                />,
              ]}
              dateSeparator=" تا "
              className={
                themeMode === "dark" ? "bg-dark rmdp-mobile" : "rmdp-mobile"
              }
              format="YYYY/MM/DD"
              render={<CustomMultipleInput />}
              calendarPosition="bottom-right"
              containerStyle={{
                width: "100%",
              }}
              inputClass="outline-none border rounded-lg w-full h-10 px-3 mt-5"
              locale={persianFa}
              calendar={persian}
              value={date}
              onChange={(event, { validatedValue }) => {
                setDate(event);
                setDate1(validatedValue[0]);
                if (validatedValue[1]) {
                  setDate2(validatedValue[1]);
                } else {
                  setDate2(validatedValue[0]);
                }

                getReportListLoan({
                  date1: validatedValue[0],
                  date2: validatedValue[1]
                    ? validatedValue[1]
                    : validatedValue[0],
                  page: 1,
                });
                setPageIndex(1);
              }}
            />
          </div>

          <div className="sm:w-1/5 w-full px-2 mt-5">
            <FormControl size="small" color="primary" className="w-full">
              <InputLabel
                color="primary"
                className="px-2"
                id="demo-simple-select-label"
              >
                وضعیت تعاونی
              </InputLabel>
              <Select
                size="small"
                className="w-full"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valStatusCooperative}
                label="وضعیت تعاونی"
                color="primary"
                onChange={(e) => {
                  setValStatusCooperative(e.target.value);
                  getReportListLoan({
                    statusId: e.target.value,
                    page: 1,
                  });
                  setPageIndex(1);
                }}
              >
                {listStatusCooperative.map((e) => (
                  <MenuItem sx={{ fontSize: "12px" }} key={e.id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="sm:w-1/5 w-full px-2 mt-5">
            <FormControl size="small" color="primary" className="w-full">
              <InputLabel
                color="primary"
                className="px-2"
                id="demo-simple-select-label"
              >
                وضعیت تسهیلات
              </InputLabel>
              <Select
                size="small"
                className="w-full"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valStatusLoan}
                label="وضعیت تسهیلات"
                color="primary"
                onChange={(e) => {
                  setValStatusLoan(e.target.value);
                  getReportListLoan({
                    status: e.target.value,
                    page: 1,
                  });
                  setPageIndex(1);
                }}
              >
                {listStatusLoan.map((e) => (
                  <MenuItem sx={{ fontSize: "12px" }} key={e.id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="sm:w-1/5 w-full px-2 mt-5">
            <FormControl size="small" color="primary" className="w-full">
              <InputLabel
                color="primary"
                className="px-2"
                id="demo-simple-select-label"
              >
                ترتیب نمایش
              </InputLabel>
              <Select
                size="small"
                className="w-full"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valSort}
                label=" ترتیب نمایش"
                color="primary"
                onChange={(e) => {
                  setValSort(e.target.value);
                  getReportListLoan({
                    sortFilter: e.target.value,
                    page: 1,
                  });
                  setPageIndex(1);
                }}
              >
                {listSort.map((e) => (
                  <MenuItem sx={{ fontSize: "12px" }} key={e.id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="sm:w-1/5 w-full px-2 mt-5">
            <FormControl size="small" color="primary" className="w-full">
              <InputLabel
                color="primary"
                className="px-2"
                id="demo-simple-select-label"
              >
                جهت ترتیب نمایش
              </InputLabel>
              <Select
                size="small"
                className="w-full"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valDir}
                label="جهت ترتیب نمایش"
                color="primary"
                onChange={(e) => {
                  setValDir(e.target.value);
                  getReportListLoan({
                    sortDir: e.target.value,
                    page: 1,
                  });
                  setPageIndex(1);
                }}
              >
                {listDir.map((e) => (
                  <MenuItem sx={{ fontSize: "12px" }} key={e.id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="sm:w-1/5 w-full px-2  mt-5">
            <FormControl size="small" color="primary" className="w-full">
              <InputLabel
                color="primary"
                className="px-2"
                id="demo-simple-select-label"
              >
                تعداد رکورد
              </InputLabel>
              <Select
                size="small"
                className="w-full"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pageSize}
                label=" تعداد رکورد"
                color="primary"
                onChange={(e) => {
                  setPageSize(e.target.value);
                  getReportListLoan({
                    pageSize: e.target.value,
                    page: 1,
                  });
                  setPageIndex(1);
                }}
              >
                {[25, 50, 75, 100].map((e) => (
                  <MenuItem sx={{ fontSize: "12px" }} key={e} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="py-3">
          <Divider />
        </div>

        {subHeaderList.length > 0 && (
          <div className="flex flex-wrap py-3">
            <div className="w-full px-2 flex flex-wrap">
              <div className="border rounded-lg p-3 w-full">
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
                    <FaChartSimple />
                    <span className="px-2">گزارش تسهیلات</span>
                  </div>
                  <div className="flex items-center">
                    <span>{subHeaderList[subHeaderList.length - 1].key}</span>

                    <span className="px-1">مورد</span>
                    <IoIosArrowDown
                      className={
                        open ? "rotate-180 duration-300" : "duration-300"
                      }
                    />
                  </div>
                </div>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <div className="flex flex-wrap">
                    <div className="flex flex-wrap py-2 xl:w-1/2 w-full">
                      {subHeaderList
                        .filter((e) => e.desc)
                        .map((item, index) => (
                          <div
                            key={item.desc}
                            className={
                              index % 2 === 0
                                ? "sm:w-1/2 w-full sm:pl-2 mt-3 "
                                : "sm:w-1/2 w-full sm:pr-2 mt-3 "
                            }
                          >
                            <div
                              className={
                                themeMode === "dark"
                                  ? "bg-slate-800 rounded-lg flex flex-col justify-start items-center px-3 pb-4 pt-1"
                                  : "bg-slate-100 rounded-lg flex flex-col justify-start items-center px-3 pb-4 pt-1"
                              }
                            >
                              <span className="font-semibold text-lg">
                                {item.desc === "101"
                                  ? "پرداخت شده"
                                  : item.desc === "102"
                                  ? "معوق شده"
                                  : item.desc === "103"
                                  ? "بازپرداخت شده"
                                  : item.desc === "104"
                                  ? "سررسید شده"
                                  : ""}
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
                                    src="/images/element-4.svg"
                                    alt=""
                                  />
                                  <span className="px-2 text-xs">تعداد</span>
                                </div>
                                <span className="text-xs font-semibold">
                                  {item.key}
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
                                  {item.value}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="xl:w-1/2 w-full px-2">
                      <div className=" p-3 h-full">
                        <div className="w-full flex flex-col items-center">
                          <img src="/images/20945314 1.svg" alt="" />
                          <div className="flex items-center sm:w-1/2 w-full mt-3">
                            <span className="text-sm px-2">تعداد</span>
                            <span className="text-lg font-bold text-orange-500">
                              {subHeaderList[subHeaderList.length - 1].key}
                            </span>
                          </div>
                          <div className="flex items-center sm:w-1/2 w-full mt-3">
                            <span className="text-sm px-2">مبلغ</span>
                            <span className="text-lg font-bold text-orange-500">
                              {subHeaderList[subHeaderList.length - 1].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
        )}
        {subHeaderList.length === 0 && (
          <div className="flex flex-wrap py-3">
            <div className="w-full px-2">
              <Skeleton variant="rounded" width={"100%"} height={50} />
            </div>
          </div>
        )}

        <TableReportLoan
          listReportLoan={listReportLoan}
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setPageIndex={setPageIndex}
          isLoading={isLoading}
          getReportListLoan={getReportListLoan}
          getDataExcel={getDataExcel}
          getDataPDF={getDataPDF}
          isLoadingExcel={isLoadingExcel}
          isLoadingPdf={isLoadingPdf}
          selectedField={selectedField}
          setSelectedField={setSelectedField}
          isLoadingPrint={isLoadingPrint}
          setIsLoadingPrint={setIsLoadingPrint}
          formDetails={formDetails}
          setFormDetails={setFormDetails}
          getDataPrint={getDataPrint}
        />
      </div>
    </>
  );
}
