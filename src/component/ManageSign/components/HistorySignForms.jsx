// HistorySignForms.jsx
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Chip,
  Collapse,
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
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setLoadingSign } from "../../../redux/slice/formToSign";
import { mainDomain } from "../../../utils/mainDomain";
import ModalDetailsFormTabTranscript from "../../ManageLoan/ModalDetailsFormInvoiceTabTranscript";
import ModalDetailsHistory from "./ModalDetailsHistory";

function HistorySignForms() {
  const user = JSON.parse(localStorage.getItem("user"));
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const fontSize = useSelector((store) => store.setting.fontSize);

  const dispatch = useDispatch();

  const [historyData, setHistoryData] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [formsData, setFormsData] = useState({});
  const [loadingForms, setLoadingForms] = useState({});

  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const getFormName = (fromTypeId) => {
    switch (fromTypeId) {
      case 1:
        return "فرم درخواست تسهیلات";
      case 2:
        return "فرم قرارداد";
      case 3:
        return "فرم دستور پرداخت";
      case 4:
        return "فرم صورتحساب";
      case 7:
        return "فرم نامه مستندات";
      case 8:
        return "فرم نامه کسر 5 درصد";
      default:
        return "فرم نامشخص";
    }
  };

  const getSignStatusColor = (statusId) => {
    switch (statusId) {
      case -1:
        return "warning";
      case 1:
        return "success";
      default:
        return "default";
    }
  };

  const getSignStatusText = (statusId) => {
    switch (statusId) {
      case -1:
        return "در انتظار امضاء";
      case 1:
        return "امضاء شده";
      default:
        return "نامشخص";
    }
  };

  const fetchHistory = (page = 1) => {
    setIsLoading(true);
    dispatch(setLoadingSign(true));
    axios
      .get(
        mainDomain + `/api/Form/SignHistory?pageSize=${pageSize}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
      .then((res) => {
        setHistoryData(res.data);
        setTotalRecords(res.data.length > 0 ? res.data[0].total || 0 : 0);
        setIsLoading(false);
        dispatch(setLoadingSign(false));
        setExpandedRows({});
        setFormsData({});
        setLoadingForms({});
      })
      .catch(() => {
        setIsLoading(false);
        dispatch(setLoadingSign(false));
        Toast.fire({
          icon: "error",
          text: "خطا در دریافت اطلاعات",
          customClass: { container: "toast-modal" },
        });
      });
  };

  const fetchFormsByLoanId = (loanId) => {
    if (formsData[loanId]) {
      return;
    }

    setLoadingForms((prev) => ({ ...prev, [loanId]: true }));
    axios
      .get(mainDomain + `/api/Form/Loan/${loanId}/SignTypes`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setFormsData((prev) => ({ ...prev, [loanId]: res.data }));
        setLoadingForms((prev) => ({ ...prev, [loanId]: false }));
      })
      .catch(() => {
        setLoadingForms((prev) => ({ ...prev, [loanId]: false }));
        Toast.fire({
          icon: "error",
          text: "خطا در دریافت فرم‌ها",
          customClass: { container: "toast-modal" },
        });
      });
  };

  const toggleRow = (loanId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [loanId]: !prev[loanId],
    }));
    if (!expandedRows[loanId] && !formsData[loanId]) {
      fetchFormsByLoanId(loanId);
    }
  };

  const handlePageChange = (event, value) => {
    setPageIndex(value);
    fetchHistory(value);
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setPageIndex(1);
    fetchHistory(1);
  };

  useEffect(() => {
    fetchHistory(1);
  }, []);

  const FormItemsAccordion = ({ forms, isLoading }) => {
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedForm, setSelectedForm] = useState("");
    const [typeId, setTypeId] = useState(null);

    if (isLoading) {
      return (
        <Box sx={{ p: 2 }}>
          <Skeleton width="100%" height={40} />
          <Skeleton width="100%" height={40} sx={{ mt: 1 }} />
          <Skeleton width="100%" height={40} sx={{ mt: 1 }} />
        </Box>
      );
    }

    if (!forms || forms.length === 0) {
      return (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography color="text.secondary">
            هیچ فرمی برای این تعاونی یافت نشد
          </Typography>
        </Box>
      );
    }

    return (
      <>
        <div>
          <Table
            size="small"
            sx={{
              bgcolor: themeMode === "dark" ? "#1a1a2e" : "#fafafa",
            }}
          >
            <TableHead>
              <TableRow
                sx={{ bgcolor: themeMode === "dark" ? "#2c3d4a" : "#f1f5f9" }}
              >
                <TableCell
                  sx={{ fontWeight: 600, fontSize: "12px", width: "65%" }}
                >
                  عنوان فرم
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, fontSize: "12px", width: "35%" }}
                >
                  وضعیت امضا
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forms.map((form) => (
                <TableRow
                  key={form.formId}
                  hover
                  sx={{
                    "&:hover": {
                      bgcolor: alpha("#1787B0", 0.04),
                    },
                  }}
                >
                  <TableCell>
                    <Typography
                      onClick={() => {
                        setSelectedForm(form.body);
                        setTypeId(form.fromTypeId);
                        setOpenDetails(true);
                      }}
                      sx={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#1787B0",
                        cursor: "pointer",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {getFormName(form.fromTypeId)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={
                        form.formSignStatus ||
                        getSignStatusText(form.formSignStatusId)
                      }
                      size="small"
                      sx={{
                        bgcolor:
                          getSignStatusColor(form.formSignStatusId) ===
                          "success"
                            ? "#dcfce7"
                            : getSignStatusColor(form.formSignStatusId) ===
                                "warning"
                              ? "#fef9c3"
                              : "#f1f5f9",
                        color:
                          getSignStatusColor(form.formSignStatusId) ===
                          "success"
                            ? "#166534"
                            : getSignStatusColor(form.formSignStatusId) ===
                                "warning"
                              ? "#854d0e"
                              : "#475569",
                        fontWeight: 600,
                        fontSize: "11px",
                        height: "24px",
                        borderRadius: "12px",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <ModalDetailsFormTabTranscript
            open={openDetails}
            setOpen={setOpenDetails}
            formDetails={selectedForm}
            typeId={typeId}
          />
        </div>
      </>
    );
  };

  FormItemsAccordion.propTypes = {
    forms: PropTypes.array,
    isLoading: PropTypes.bool,
  };

  return (
    <div className="px-5">
      <div
        style={{
          borderColor: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
        }}
        className="border-2 p-2 relative rounded-lg mt-6"
      >
        {/* انتخابگر تعداد آیتم‌ها در هر صفحه */}
        <div className="flex justify-end items-center my-2 gap-2">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="page-size-select-label">تعداد در صفحه</InputLabel>
            <Select
              labelId="page-size-select-label"
              id="page-size-select"
              value={pageSize}
              label="تعداد در صفحه"
              onChange={handlePageSizeChange}
              sx={{
                borderRadius: "8px",
                "& .MuiSelect-select": {
                  py: 1,
                },
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={40}>40</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="caption" color="text.secondary">
            نمایش {historyData.length} از {totalRecords} رکورد
          </Typography>
        </div>

        {isLoading ? (
          <div>
            <div className="py-1">
              <Skeleton animation="wave" variant="rounded" height={60} />
            </div>
            <div className="py-1">
              <Skeleton animation="wave" variant="rounded" height={60} />
            </div>
            <div className="py-1">
              <Skeleton animation="wave" variant="rounded" height={60} />
            </div>
            <div className="py-1">
              <Skeleton animation="wave" variant="rounded" height={60} />
            </div>
          </div>
        ) : historyData.length === 0 ? (
          <div className="mt-3 flex flex-col justify-center items-center">
            <span>موردی موجود نیست</span>
            <img className="w-56" src="/images/error-img.png" alt="" />
          </div>
        ) : (
          <div>
            <TableContainer component={Paper} sx={{ maxHeight: "75vh" }}>
              <Table
                style={{ maxHeight: "none", height: "auto" }}
                aria-label="تاریخچه امضاها"
              >
                <TableHead
                  sx={{
                    "& th": {
                      backgroundColor:
                        themeMode === "dark" ? "#262b3c" : "#eff2f7",
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
                    <TableCell sx={{ color: "white" }}>
                      <span className="font-bold whitespace-nowrap">ردیف</span>
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      <span className="font-bold whitespace-nowrap">
                        عنوان تشکل
                      </span>
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      <span className="font-bold whitespace-nowrap">
                        شماره قرارداد
                      </span>
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      <span className="font-bold whitespace-nowrap">
                        تاریخ قرارداد
                      </span>
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      <span className="font-bold whitespace-nowrap">
                        مبلغ تسهیلات
                      </span>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        position: "sticky",
                        right: 0,
                        backgroundColor: "transparent",
                      }}
                    >
                      <span className="font-bold whitespace-nowrap">
                        عملیات
                      </span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historyData.map((item, index) => {
                    const isExpanded = expandedRows[item.id] || false;
                    const isLoadingForms = loadingForms[item.id];

                    return (
                      <React.Fragment key={item.id}>
                        <TableRow
                          hover
                          sx={{
                            bgcolor: isExpanded
                              ? alpha("#1787B0", 0.04)
                              : "transparent",
                            "&:hover": {
                              bgcolor: isExpanded
                                ? alpha("#1787B0", 0.08)
                                : alpha("#f1f5f9", 0.5),
                            },
                            borderBottom: isExpanded ? "none" : undefined,
                          }}
                        >
                          <TableCell sx={{ fontSize: `${fontSize}px` }}>
                            {(pageIndex - 1) * pageSize + index + 1}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontSize: `${fontSize}px` }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 500,
                                color:
                                  themeMode === "dark" ? "#fffa" : "#1e293b",
                              }}
                            >
                              {item.cooperativeTitle}
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontSize: `${fontSize}px` }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 600,
                                color: "#1787B0",
                              }}
                            >
                              {item.contractNumber}
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontSize: `${fontSize}px` }}
                          >
                            {item.contractDateFa}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontSize: `${fontSize}px` }}
                          >
                            {item.amount?.toLocaleString() || "۰"}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              position: "sticky",
                              right: 0,
                              backgroundColor:
                                themeMode === "dark" ? "#2d3641" : "white",
                            }}
                          >
                            <div className="flex justify-center items-center">
                               <ModalDetailsHistory cooperativeId={item.id}/>
                              <Button
                                onClick={() => toggleRow(item.id)}
                                variant="outlined"
                                size="small"
                                startIcon={
                                  isExpanded ? (
                                    <ExpandLessIcon />
                                  ) : (
                                    <ExpandMoreIcon />
                                  )
                                }
                                sx={{
                                  borderColor: isExpanded
                                    ? "#1787B0"
                                    : "#94a3b8",
                                  color: isExpanded ? "#1787B0" : "#64748b",
                                  borderRadius: "8px",
                                  textTransform: "none",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  whiteSpace: "nowrap",
                                  "&:hover": {
                                    borderColor: "#1787B0",
                                    bgcolor: "rgba(23,135,176,0.05)",
                                  },
                                }}
                              >
                                {isExpanded ? "بستن جزئیات" : "مشاهده جزئیات"}
                              </Button>
                              
                             
                            </div>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell
                            colSpan={6}
                            sx={{ p: 0, borderBottom: "none" }}
                          >
                            <Collapse
                              in={isExpanded}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box
                                sx={{
                                  p: 2,
                                  bgcolor:
                                    themeMode === "dark"
                                      ? "#2c3d4a"
                                      : alpha("#f8fafc", 0.5),
                                }}
                              >
                                <FormItemsAccordion
                                  forms={formsData[item.id]}
                                  isLoading={isLoadingForms}
                                />
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* صفحه‌بندی */}
            {totalRecords > pageSize && (
              <div
                className={
                  themeMode === "dark"
                    ? "mx-auto absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-lg p-2 bg-slate-700 shadow-md z-10 w-full sm:w-auto"
                    : "mx-auto absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-lg p-2 bg-[#f4f8ff] shadow-md z-10 w-full sm:w-auto"
                }
              >
                <div className="flex justify-center items-center">
                  <Stack spacing={2}>
                    <Pagination
                      size="small"
                      siblingCount={0}
                      page={pageIndex}
                      onChange={handlePageChange}
                      count={Math.ceil(totalRecords / pageSize)}
                    />
                  </Stack>
                  <span className="text-xs">{totalRecords} رکورد</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistorySignForms;
