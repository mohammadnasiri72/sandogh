import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { mainDomain } from "../../utils/mainDomain";
import SelectFieldTableSupervisorLoan from "./SelectFieldTableSupervisorLoan";
import ModalVisitFormSupervisor from "./ModalVisitFormSupervisor";
import persian from "react-date-object/calendars/persian";
import persianFa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import { AiOutlineClose } from "react-icons/ai";
import PropTypes from "prop-types";
import DownloadPDFTableReportLoan from "../ManageReportLoan/DownloadPDFTableReportLoan";
import Swal from "sweetalert2";
import DownloadExelTableReportLoan from "../ManageReportLoan/DownloadExelTableReportLoan";
import PrintFormReportLoan from "./PrintFormReportLoan";

export default function MainPageManageReportSupervisor() {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const fontSize = useSelector((store) => store.setting.fontSize);
  const mainPageState = useSelector((store) => store.resetState.mainPageState);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);
  const [selectedField, setSelectedField] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [pageIndex, setPageIndex] = useState(1);
  const [listSupervisorLoan, setListSupervisorLoan] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [valProvince, setValProvince] = useState({
    title: "همه استان ها",
    id: 0,
  });
  const [date, setDate] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [SelectedCols, setSelectedCols] = useState([]);
  const [SelectedColsWidth, setSelectedColsWidth] = useState([]);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [isLoadingExcel, setIsLoadingExcel] = useState(false);
  const [isLoadingPrint, setIsLoadingPrint] = useState(false);
  const [formDetails, setFormDetails] = useState("");

  useEffect(() => {
    setSelectedCols(selectedField.map((item) => item.title));
    setSelectedColsWidth(selectedField.map((item) => item.width));
  }, [selectedField]);

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

  useEffect(() => {
    setIsLoading(true);
    setListSupervisorLoan([]);
    axios
      .get(mainDomain + "/api/Report/Loan/Supervisor", {
        params: {
          ProvinceId: valProvince.provinceId ? valProvince.provinceId : 0,
          PageSize: pageSize,
          Date1: date1,
          Date2: date2,
          Page: pageIndex,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setListSupervisorLoan(res.data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [valProvince, pageSize, pageIndex, date, mainPageState]);

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
              // getReportListLoan({ date1: "", date2: "", page: 1 });
              setPageIndex(1);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
          />
        )}
      </div>
    );
  }

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  // get PDF
  const getDataPDF = () => {
    const dataSelectedCols = new FormData();
    SelectedCols.map((ev) => {
      dataSelectedCols.append("selectedCols", ev);
      return true;
    });
    const data = {
      SelectedCols,
      SelectedColsWidth,
      provinceId: valProvince.provinceId || 0,
      Date1: date1,
      Date2: date2,
      FileExtenstion: ".pdf",
    };

    setIsLoadingPdf(true);
    axios
      .post(mainDomain + "/api/Report/Loan/Supervisor/Export", data, {
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

  // get Excel
  const getDataExcel = () => {
    const data = {
      SelectedCols,
      SelectedColsWidth,
      provinceId: valProvince.provinceId || 0,
      Date1: date1,
      Date2: date2,
      FileExtenstion: ".xlsx",
    };
    setIsLoadingExcel(true);
    axios
      .post(mainDomain + "/api/Report/Loan/Supervisor/Export", data, {
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

  // get Print
  const getDataPrint = () => {
    const data = {
      SelectedCols,
      SelectedColsWidth,
      provinceId: valProvince.provinceId || 0,
      Date1: date1,
      Date2: date2,
      FileExtenstion: ".print",
    };
    setIsLoadingPrint(true);
    axios
      .post(mainDomain + "/api/Report/Loan/Supervisor/Export", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        // const a = document.createElement("a");
        // a.href = mainDomain + res.data;
        // a.download = "";
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a);
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

  return (
    <>
      <div className="px-3 flex flex-wrap">
        <div className="sm:w-1/3 w-full px-2">
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
                setPageIndex(1);
              }
              if (!newValue) {
                setValProvince("");
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
        <div className="sm:w-1/3 w-full px-2 sm:mt-0 mt-5">
          <DatePicker
            range
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

              // getReportListLoan({
              //   date1: validatedValue[0],
              //   date2: validatedValue[1]
              //     ? validatedValue[1]
              //     : validatedValue[0],
              //   page: 1,
              // });
              setPageIndex(1);
            }}
          />
        </div>
        <div className="w-36 px-2 sm:-mb-10 sm:mt-0 mt-5">
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
      <div className="px-5">
        <div className="flex justify-between">
          <div className="flex justify-center items-center gap-2">
            <DownloadPDFTableReportLoan
              getDataPDF={getDataPDF}
              isLoadingPdf={isLoadingPdf}
            />
            <DownloadExelTableReportLoan
              getDataExcel={getDataExcel}
              isLoadingExcel={isLoadingExcel}
            />
            <PrintFormReportLoan
              getDataPrint={getDataPrint}
              formDetails={formDetails}
              setFormDetails={setFormDetails}
              isLoadingPrint={isLoadingPrint}
            />
          </div>
          <SelectFieldTableSupervisorLoan setSelectedField={setSelectedField} />
        </div>
        <div
          style={{
            borderColor: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
          }}
          className="border-2 p-2 relative rounded-lg"
        >
          {listSupervisorLoan.length > 0 && !isLoading && (
            <div>
              <div className="relative">
                <TableContainer component={Paper} sx={{ maxHeight: "75vh" }}>
                  <Table
                    style={{ maxHeight: "none", height: "auto" }}
                    aria-label="sticky table"
                  >
                    <TableHead
                      sx={{
                        "& th": {
                          backgroundColor:
                            themeMode === "dark" ? "#262b3c" : "#f4f8ff",
                          color: themeMode === "dark" ? "#fffb" : "#000b",
                          fontSize: `${fontSize}px`,
                          position: "sticky",
                        },
                      }}
                    >
                      <TableRow
                        sx={{
                          position: "sticky",
                          top: 0,
                          backgroundColor: "transparent",
                          zIndex: "2",
                        }}
                      >
                        {selectedField
                          // .filter((e) => e.id === 1)
                          .map((field) => (
                            <TableCell
                              key={field.id}
                              sx={{ color: "white" }}
                              align="center"
                            >
                              <span className="font-bold whitespace-nowrap">
                                {field.title}
                              </span>
                            </TableCell>
                          ))}
                        <TableCell
                          sx={{
                            position: "sticky",
                            right: 0,
                            backgroundColor: "transparent",
                          }}
                          align="center"
                        >
                          <span
                            style={{ fontWeight: 900 }}
                            className="whitespace-nowrap"
                          >
                            عملیات
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listSupervisorLoan.length > 0 &&
                        listSupervisorLoan.map((e, index) => (
                          <TableRow
                            key={e.id}
                            sx={{
                              "&:hover": {
                                backgroundColor:
                                  themeMode === "dark"
                                    ? "rgb(51 65 85)"
                                    : "#f8f9fa",
                              },
                            }}
                          >
                            {/* <TableCell sx={{ fontSize: `${fontSize}px` }}>
                              <span className="pr-2">
                                {(pageIndex - 1) * pageSize + index + 1}
                              </span>
                            </TableCell> */}

                            {/* {selectedField
                              .filter((e) => e.id === 1)
                              .map((field) => (
                                <TableCell
                                  key={field.id}
                                  align="center"
                                  sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: `${fontSize}px`,
                                  }}
                                >
                                  {field.id === 1 ? e.id : ""}
                                </TableCell>
                              ))} */}

                            {selectedField.map((field) => (
                              <TableCell
                                key={field.id}
                                align="center"
                                sx={{
                                  whiteSpace: "nowrap",
                                  fontSize: `${fontSize}px`,
                                }}
                              >
                                <span className="whitespace-nowrap">
                                  {field.id === 1 ? (
                                    (pageIndex - 1) * pageSize + index + 1
                                  ) : field.id === 2 ? (
                                    e.id
                                  ) : field.id === 2.5 ? (
                                    listProvince?.find(
                                      (ev) =>
                                        ev.provinceId === String(e.provinceId)
                                    ).title
                                  ) : field.id === 3 ? (
                                    e.cooperativeTitle
                                  ) : field.id === 4 ? (
                                    e.statusId === 1 ? (
                                      "سهامدار"
                                    ) : e.statusId === 2 ? (
                                      "غیر سهامدار"
                                    ) : (
                                      "بخش دولتی"
                                    )
                                  ) : field.id === 5 ? (
                                    e.meetingDateFa
                                  ) : field.id === 6 ? (
                                    e.meetingNumber
                                  ) : field.id === 7 ? (
                                    e.contractNumber
                                  ) : field.id === 8 ? (
                                    e.contractDateFa
                                  ) : field.id === 9 ? (
                                    e.paymentDateFa
                                  ) : field.id === 10 ? (
                                    e.amount.toLocaleString()
                                  ) : field.id === 11 ? (
                                    e.wagePercent
                                  ) : field.id === 12 ? (
                                    e.contractTerm
                                  ) : field.id === 13 ? (
                                    e.loanMaturityFa
                                  ) : field.id === 14 ? (
                                    e.amountKg.toLocaleString()
                                  ) : field.id === 15 ? (
                                    e.priceKg.toLocaleString()
                                  ) : field.id === 16 ? (
                                    e.wage.toLocaleString()
                                  ) : field.id === 17 ? (
                                    e.amountRefund.toLocaleString()
                                  ) : field.id === 18 ? (
                                    e.amountGuarantee.toLocaleString()
                                  ) : field.id === 19 ? (
                                    e.toll.toLocaleString()
                                  ) : field.id === 20 ? (
                                    e.tax.toLocaleString()
                                  ) : field.id === 21 ? (
                                    e.sumTollTax.toLocaleString()
                                  ) : field.id === 22 ? (
                                    e.receiptDateFa
                                  ) : field.id === 23 ? (
                                    e.status === 101 ? (
                                      <span className="text-xs px-2 rounded-full bg-teal-50 text-teal-500">
                                        پرداخت
                                      </span>
                                    ) : e.status === 102 ? (
                                      <span className="text-xs px-2 rounded-full bg-red-50 text-red-500">
                                        معوق
                                      </span>
                                    ) : e.status === 103 ? (
                                      <span className="text-xs px-2 rounded-full bg-emerald-50 text-emerald-500">
                                        وصول
                                      </span>
                                    ) : (
                                      <span className="text-xs px-2 rounded-full bg-blue-50 text-blue-500">
                                        سررسید
                                      </span>
                                    )
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </TableCell>
                            ))}

                            {/* <TableCell sx={{ fontSize: `${fontSize}px` }}>
                              <span className="whitespace-nowrap flex justify-center">
                                {e.cooperativeTitle}
                              </span>
                            </TableCell> */}
                            {/* {selectedField
                              .filter(
                                (e) =>
                                  e.id === 2 ||
                                  e.id === 3 ||
                                  e.id === 4 ||
                                  e.id === 5 ||
                                  e.id === 6
                              )
                              .map((field) => (
                                <TableCell
                                  key={field.id}
                                  align="center"
                                  sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: `${fontSize}px`,
                                  }}
                                >
                                  {field.id === 2
                                    ? e.meetingDateFa
                                    : field.id === 3
                                    ? e.meetingNumber
                                    : field.id === 4
                                    ? e.contractNumber
                                    : field.id === 5
                                    ? e.contractDateFa
                                    : e.paymentDateFa}
                                </TableCell>
                              ))} */}

                            {/* <TableCell sx={{ fontSize: `${fontSize}px` }}>
                              <span className="whitespace-nowrap flex justify-center">
                                {e.amount.toLocaleString()}
                              </span>
                            </TableCell> */}

                            {/* {selectedField
                              .filter((e) => e.id > 6)
                              .map((field) => (
                                <TableCell
                                  key={field.id}
                                  align="center"
                                  sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: `${fontSize}px`,
                                  }}
                                >
                                  {field.id === 2 ? (
                                    e.meetingDateFa
                                  ) : field.id === 3 ? (
                                    e.contractNumber
                                  ) : field.id === 4 ? (
                                    e.contractDateFa
                                  ) : field.id === 5 ? (
                                    e.paymentDateFa
                                  ) : field.id === 6 ? (
                                    e.wagePercent
                                  ) : field.id === 7 ? (
                                    e.wagePercent
                                  ) : field.id === 8 ? (
                                    e.contractTerm
                                  ) : field.id === 9 ? (
                                    e.loanMaturityFa
                                  ) : field.id === 10 ? (
                                    e.amountKg.toLocaleString()
                                  ) : field.id === 11 ? (
                                    e.priceKg.toLocaleString()
                                  ) : field.id === 12 ? (
                                    e.wage.toLocaleString()
                                  ) : field.id === 13 ? (
                                    e.amountRefund.toLocaleString()
                                  ) : field.id === 14 ? (
                                    e.amountGuarantee.toLocaleString()
                                  ) : field.id === 15 ? (
                                    e.toll.toLocaleString()
                                  ) : field.id === 16 ? (
                                    e.tax.toLocaleString()
                                  ) : field.id === 17 ? (
                                    e.sumTollTax.toLocaleString()
                                  ) : field.id === 18 ? (
                                    e.receiptDateFa
                                  ) : field.id === 19 ? (
                                    e.status === 100 ? (
                                      <span className="text-white bg-slate-500 rounded-full px-2 select-none">
                                        ثبت
                                      </span>
                                    ) : e.status === 101 ? (
                                      <span className="text-white bg-emerald-500 rounded-full px-2 select-none">
                                        پرداخت شده
                                      </span>
                                    ) : e.status === 102 ? (
                                      <span className="text-white bg-red-500 rounded-full px-2 select-none">
                                        معوق شده
                                      </span>
                                    ) : e.status === 103 ? (
                                      <span className="text-white bg-yellow-500 rounded-full px-2 select-none">
                                        باز پرداخت شده
                                      </span>
                                    ) : e.status === 104 ? (
                                      <span className="text-white bg-teal-500 rounded-full px-2 select-none">
                                        سررسید شده
                                      </span>
                                    ) : (
                                      ""
                                    )
                                  ) : (
                                    ""
                                  )}
                                </TableCell>
                              ))} */}

                            <TableCell
                              sx={{
                                position: "sticky",
                                right: 0,
                                backgroundColor:
                                  themeMode === "dark" ? "#2d3641" : "white",
                                fontSize: `${fontSize}px`,
                              }}
                              align="center"
                            >
                              <ModalVisitFormSupervisor Supervisor={e} />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {listSupervisorLoan[0].total > pageSize && (
                  <div
                    className={
                      themeMode === "dark"
                        ? " mx-auto absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-lg p-2 bg-slate-700 shadow-md z-10 w-full sm:w-auto"
                        : " mx-auto absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-lg p-2 bg-[#f4f8ff] shadow-md z-10 w-full sm:w-auto"
                    }
                  >
                    <div className="flex justify-center items-center">
                      <Stack spacing={2}>
                        <Pagination
                          size="small"
                          siblingCount={0}
                          page={pageIndex}
                          onChange={(e, value) => {
                            setPageIndex(value);
                            // getLoanAdminList({ page: value });
                          }}
                          count={
                            listSupervisorLoan.length > 0
                              ? Math.ceil(
                                  listSupervisorLoan[0].total / pageSize
                                )
                              : 1
                          }
                        />
                      </Stack>
                      <span className="text-xs">
                        {listSupervisorLoan.length > 0 &&
                          listSupervisorLoan[0].total}
                        رکورد
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {listSupervisorLoan.length === 0 && !isLoading && (
            <div className="mt-3 flex flex-col justify-center items-center">
              <span>موردی موجود نیست</span>
              <img className="w-56" src="/images/error-img.png" alt="" />
            </div>
          )}
          {listSupervisorLoan.length === 0 && isLoading && (
            <div className="mt-2">
              <div className="mt-2 px-2">
                <Skeleton width={"100%"} height={80} variant="rounded" />
              </div>
              <div className="mt-2 px-2">
                <Skeleton width={"100%"} height={80} variant="rounded" />
              </div>
              <div className="mt-2 px-2">
                <Skeleton width={"100%"} height={80} variant="rounded" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
