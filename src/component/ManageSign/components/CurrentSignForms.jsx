// CurrentSignForms.jsx
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    alpha,
    Box,
    Button,
    Chip,
    CircularProgress,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Pagination,
    Paper,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
    setListFormToSign,
    setLoadingSign,
} from "../../../redux/slice/formToSign";
import { mainDomain } from "../../../utils/mainDomain";
import ModalDetailsFormTabTranscript from "../../ManageLoan/ModalDetailsFormInvoiceTabTranscript";

function CurrentSignForms() {
  const user = JSON.parse(localStorage.getItem("user"));
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const fontSize = useSelector((store) => store.setting.fontSize);
  const listFormToSign = useSelector(
    (store) => store.formToSign.listFormToSign,
  );
  const loadingSign = useSelector((store) => store.formToSign.loadingSign);

  const dispatch = useDispatch();

  const [submitLoading, setSubmitLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formDetails, setFormDetails] = useState("");
  const [typeId, setTypeId] = useState(null);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [groupedData, setGroupedData] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: "",
    formId: null,
    formName: "",
    isBulk: false,
    groupContractNumber: "",
    formIds: [],
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const groupByContractNumber = (data) => {
    const groups = {};
    data.forEach((item) => {
      const contractNumber =
        item.loanInfo?.contractNumber || "بدون شماره قرارداد";
      if (!groups[contractNumber]) {
        groups[contractNumber] = {
          contractNumber: contractNumber,
          cooperativeTitle: item.loanInfo?.cooperativeTitle || "",
          contractDateFa: item.loanInfo?.contractDateFa || "",
          amount: item.loanInfo?.amount || 0,
          items: [],
        };
      }
      groups[contractNumber].items.push(item);
    });
    return Object.values(groups).sort((a, b) =>
      a.contractNumber.localeCompare(b.contractNumber),
    );
  };

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

  const fetchData = () => {
    dispatch(setLoadingSign(true));
    axios
      .get(mainDomain + "/api/Form/WatingSign", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        dispatch(setListFormToSign(res.data));
        const grouped = groupByContractNumber(res.data);
        setGroupedData(grouped);
        setTotalRecords(res.data.length);
        dispatch(setLoadingSign(false));
      })
      .catch(() => {
        dispatch(setLoadingSign(false));
        Toast.fire({
          icon: "error",
          text: "خطا در دریافت اطلاعات",
          customClass: { container: "toast-modal" },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openConfirmDialog = (
    formId,
    formName,
    type,
    isBulk = false,
    groupContractNumber = "",
    formIds = [],
  ) => {
    setConfirmDialog({
      open: true,
      type: type,
      formId: formId,
      formName: formName,
      isBulk: isBulk,
      groupContractNumber: groupContractNumber,
      formIds: formIds,
    });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({
      open: false,
      type: "",
      formId: null,
      formName: "",
      isBulk: false,
      groupContractNumber: "",
      formIds: [],
    });
  };

  const handleConfirm = () => {
    setSubmitLoading(true);
    setSelectedFormId(confirmDialog.formId);

    if (confirmDialog.isBulk) {
      const formIds = confirmDialog.formIds;
      const promises = formIds.map((id) =>
        axios.post(
          mainDomain + `/api/Form/${id}/ConfirmSign`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        ),
      );

      Promise.all(promises)
        .then(() => {
          setSubmitLoading(false);
          Toast.fire({
            icon: "success",
            text: `همه ${formIds.length} فرم با موفقیت تایید شدند`,
            customClass: { container: "toast-modal" },
          });
          closeConfirmDialog();
          fetchData();
        })
        .catch((err) => {
          setSubmitLoading(false);
          Toast.fire({
            icon: "error",
            text: err.response ? err.response.data : "خطا در تایید فرم‌ها",
            customClass: { container: "toast-modal" },
          });
        });
    } else {
      axios
        .post(
          mainDomain + `/api/Form/${confirmDialog.formId}/ConfirmSign`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        )
        .then(() => {
          setSubmitLoading(false);
          Toast.fire({
            icon: "success",
            text: "فرم با موفقیت تایید شد",
            customClass: { container: "toast-modal" },
          });
          closeConfirmDialog();
          fetchData();
        })
        .catch((err) => {
          setSubmitLoading(false);
          Toast.fire({
            icon: "error",
            text: err.response ? err.response.data : "خطا در تایید فرم",
            customClass: { container: "toast-modal" },
          });
        });
    }
  };

  const handleReject = () => {
    setSubmitLoading(true);
    setSelectedFormId(confirmDialog.formId);

    if (confirmDialog.isBulk) {
      const formIds = confirmDialog.formIds;
      const promises = formIds.map((id) =>
        axios.post(
          mainDomain + `/api/Form/${id}/RejectSign`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        ),
      );

      Promise.all(promises)
        .then(() => {
          setSubmitLoading(false);
          Toast.fire({
            icon: "success",
            text: `همه ${formIds.length} فرم با موفقیت رد شدند`,
            customClass: { container: "toast-modal" },
          });
          closeConfirmDialog();
          fetchData();
        })
        .catch((err) => {
          setSubmitLoading(false);
          Toast.fire({
            icon: "error",
            text: err.response ? err.response.data : "خطا در رد فرم‌ها",
            customClass: { container: "toast-modal" },
          });
        });
    } else {
      axios
        .post(
          mainDomain + `/api/Form/${confirmDialog.formId}/RejectSign`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        )
        .then(() => {
          setSubmitLoading(false);
          Toast.fire({
            icon: "success",
            text: "فرم با موفقیت رد شد",
            customClass: { container: "toast-modal" },
          });
          closeConfirmDialog();
          fetchData();
        })
        .catch((err) => {
          setSubmitLoading(false);
          Toast.fire({
            icon: "error",
            text: err.response ? err.response.data : "خطا در رد فرم",
            customClass: { container: "toast-modal" },
          });
        });
    }
  };

  const toggleRow = (contractNumber) => {
    setExpandedRows((prev) => ({
      ...prev,
      [contractNumber]: !prev[contractNumber],
    }));
  };

  const GroupItems = ({ items }) => {
    return (
      <TableBody>
        {items.map((item) => (
          <TableRow
            key={item.id}
            hover
            sx={{
              "&:hover": {
                bgcolor: alpha("#fef3c7", 0.3),
              },
              bgcolor: "transparent",
              transition: "background-color 0.2s",
            }}
          >
            <TableCell>
              <Typography
                onClick={() => {
                  setTypeId(item.typeId);
                  setFormDetails(item.body);
                  setOpen(true);
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
                {getFormName(item.typeId)}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Chip
                label={getSignStatusText(item.signStatusId)}
                size="small"
                sx={{
                  bgcolor:
                    getSignStatusColor(item.signStatusId) === "success"
                      ? "#dcfce7"
                      : getSignStatusColor(item.signStatusId) === "warning"
                        ? "#fef9c3"
                        : "#f1f5f9",
                  color:
                    getSignStatusColor(item.signStatusId) === "success"
                      ? "#166534"
                      : getSignStatusColor(item.signStatusId) === "warning"
                        ? "#854d0e"
                        : "#475569",
                  fontWeight: 600,
                  fontSize: "11px",
                  height: "24px",
                  borderRadius: "12px",
                }}
              />
            </TableCell>
            <TableCell align="center">
              <div className="flex gap-1 justify-center">
                <Button
                  variant="contained"
                  size="small"
                  disabled={submitLoading && selectedFormId === item.id}
                  onClick={() =>
                    openConfirmDialog(
                      item.id,
                      getFormName(item.typeId),
                      "confirm",
                      false,
                      "",
                      [],
                    )
                  }
                  sx={{
                    bgcolor: "#10b981",
                    "&:hover": {
                      bgcolor: "#059669",
                    },
                    "&.Mui-disabled": {
                      bgcolor: "#94a3b8",
                    },
                    textTransform: "none",
                    fontSize: "11px",
                    fontWeight: 600,
                    borderRadius: "8px",
                    px: 1.5,
                    py: 0.4,
                    boxShadow: "none",
                    minWidth: "50px",
                  }}
                >
                  تایید
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  disabled={submitLoading && selectedFormId === item.id}
                  onClick={() =>
                    openConfirmDialog(
                      item.id,
                      getFormName(item.typeId),
                      "reject",
                      false,
                      "",
                      [],
                    )
                  }
                  sx={{
                    bgcolor: "#ef4444",
                    "&:hover": {
                      bgcolor: "#dc2626",
                    },
                    "&.Mui-disabled": {
                      bgcolor: "#94a3b8",
                    },
                    textTransform: "none",
                    fontSize: "11px",
                    fontWeight: 600,
                    borderRadius: "8px",
                    px: 1.5,
                    py: 0.4,
                    boxShadow: "none",
                    minWidth: "50px",
                  }}
                >
                  رد
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };
  GroupItems.propTypes = {
    items: PropTypes.array,
  };

  // صفحه‌بندی داده‌ها
  const paginatedData = groupedData.slice(
    (pageIndex - 1) * pageSize,
    pageIndex * pageSize,
  );

  return (
    <>
      <div className="px-5">
        <div
          style={{
            borderColor: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
          }}
          className="border-2 p-2 relative rounded-lg mt-6"
        >
          {loadingSign ? (
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
            </div>
          ) : listFormToSign.length > 0 ? (
            <div>
              <TableContainer component={Paper} sx={{ maxHeight: "75vh" }}>
                <Table
                  style={{ maxHeight: "none", height: "auto" }}
                  aria-label="فرم‌های منتظر امضا"
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
                      <TableCell align="center" sx={{ color: "white" }}>
                        <span className="font-bold whitespace-nowrap">
                          تعداد فرم‌ها
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
                    {paginatedData.map((group) => {
                      const isExpanded =
                        expandedRows[group.contractNumber] || false;
                      const formIds = group.items.map((item) => item.id);

                      return (
                        <>
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
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 500,
                                  color:
                                    themeMode === "dark" ? "#fffa" : "#1e293b",
                                }}
                              >
                                {group.cooperativeTitle}
                              </Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ fontSize: `${fontSize}px` }}>
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: 600,
                                  color: "#1787B0",
                                }}
                              >
                                {group.contractNumber}
                              </Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ fontSize: `${fontSize}px` }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  color:
                                    themeMode === "dark" ? "#fffa" : "#64748b",
                                }}
                              >
                                {group.contractDateFa}
                              </Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ fontSize: `${fontSize}px` }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 500,
                                  color:
                                    themeMode === "dark" ? "#fffa" : "#1e293b",
                                }}
                              >
                                {group.amount.toLocaleString()}
                              </Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ fontSize: `${fontSize}px` }}>
                              <Chip
                                label={`${group.items.length} فرم`}
                                size="small"
                                sx={{
                                  bgcolor: alpha("#1787B0", 0.1),
                                  color: "#1787B0",
                                  fontWeight: 600,
                                  fontSize: "11px",
                                  borderRadius: "8px",
                                }}
                              />
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
                                <Button
                                  disabled={submitLoading}
                                  onClick={() => toggleRow(group.contractNumber)}
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
                            <TableCell colSpan={6} sx={{ p: 0, borderBottom: "none" }}>
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
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      mb: 2,
                                    }}
                                  >
                                    <Typography
                                      variant="subtitle2"
                                      sx={{
                                        color:
                                          themeMode === "dark"
                                            ? "#fffa"
                                            : "#475569",
                                      }}
                                    >
                                      فرم‌های مربوط به قرارداد{" "}
                                      {group.contractNumber}
                                    </Typography>
                                    {group.items.length > 1 && (
                                      <div className="flex gap-2 items-center">
                                        <Button
                                          variant="contained"
                                          size="small"
                                          disabled={submitLoading}
                                          onClick={() =>
                                            openConfirmDialog(
                                              null,
                                              `${group.items.length} فرم از قرارداد ${group.contractNumber}`,
                                              "confirm",
                                              true,
                                              group.contractNumber,
                                              formIds,
                                            )
                                          }
                                          startIcon={
                                            <CheckCircleIcon fontSize="small" />
                                          }
                                          sx={{
                                            bgcolor: "#10b981",
                                            whiteSpace: "nowrap",
                                            "&:hover": {
                                              bgcolor: "#059669",
                                            },
                                            "&.Mui-disabled": {
                                              bgcolor: "#94a3b8",
                                            },
                                            textTransform: "none",
                                            fontSize: "11px",
                                            fontWeight: 600,
                                            borderRadius: "8px",
                                            px: 1.5,
                                            py: 0.4,
                                            boxShadow: "none",
                                            minWidth: "70px",
                                          }}
                                        >
                                          تایید همه
                                        </Button>
                                        <Button
                                          variant="contained"
                                          size="small"
                                          disabled={submitLoading}
                                          onClick={() =>
                                            openConfirmDialog(
                                              null,
                                              `${group.items.length} فرم از قرارداد ${group.contractNumber}`,
                                              "reject",
                                              true,
                                              group.contractNumber,
                                              formIds,
                                            )
                                          }
                                          startIcon={
                                            <CancelIcon fontSize="small" />
                                          }
                                          sx={{
                                            bgcolor: "#ef4444",
                                            whiteSpace: "nowrap",
                                            "&:hover": {
                                              bgcolor: "#dc2626",
                                            },
                                            "&.Mui-disabled": {
                                              bgcolor: "#94a3b8",
                                            },
                                            textTransform: "none",
                                            fontSize: "11px",
                                            fontWeight: 600,
                                            borderRadius: "8px",
                                            px: 1.5,
                                            py: 0.4,
                                            boxShadow: "none",
                                            minWidth: "70px",
                                          }}
                                        >
                                          رد همه
                                        </Button>
                                      </div>
                                    )}
                                  </Box>
                                  <Table size="small">
                                    <TableHead>
                                      <TableRow sx={{ bgcolor: themeMode === "dark" ? '#2c3d4a' : "#f1f5f9" }}>
                                        <TableCell
                                          sx={{
                                            fontWeight: 600,
                                            fontSize: "12px",
                                          }}
                                        >
                                          عنوان فرم
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            fontWeight: 600,
                                            fontSize: "12px",
                                            width: 120,
                                          }}
                                        >
                                          وضعیت
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            fontWeight: 600,
                                            fontSize: "12px",
                                            width: 180,
                                          }}
                                        >
                                          عملیات
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <GroupItems items={group.items} />
                                  </Table>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </>
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
                        page={pageIndex}
                        siblingCount={0}
                        onChange={(e, value) => {
                          setPageIndex(value);
                        }}
                        count={Math.ceil(totalRecords / pageSize)}
                      />
                    </Stack>
                    <span className="text-xs">
                      {totalRecords} رکورد
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-3 flex flex-col justify-center items-center">
              <span>موردی موجود نیست</span>
              <img className="w-56" src="/images/error-img.png" alt="" />
            </div>
          )}
        </div>
      </div>

      {/* مودال نمایش جزئیات فرم */}
      <ModalDetailsFormTabTranscript
        open={open}
        setOpen={setOpen}
        formDetails={formDetails}
        typeId={typeId}
      />

      {/* دیالوگ تایید/رد */}
      <Dialog
        open={confirmDialog.open}
        keepMounted
        onClose={closeConfirmDialog}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: { width: "500px", maxWidth: "none" },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: 30,
            color: confirmDialog.type === "confirm" ? "#10b981" : "#f46a6a",
          }}
        >
          {confirmDialog.type === "confirm" ? "تایید فرم" : "رد فرم"}
          {confirmDialog.isBulk && " (جمعی)"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText sx={{ mt: 0 }} id="alert-dialog-slide-description">
            {confirmDialog.isBulk ? (
              <>
                آیا از تایید <strong>همه {confirmDialog.formName}</strong> مطمئن
                هستید؟
                <br />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: "block" }}
                >
                  تعداد فرم‌ها: {confirmDialog.formIds.length} مورد
                </Typography>
              </>
            ) : (
              `آیا از ${confirmDialog.type === "confirm" ? "تایید" : "رد"} "${confirmDialog.formName}" مطمئن هستید؟`
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor:
              themeMode === "dark" ? "rgb(30 41 59)" : "rgb(241 245 249)",
          }}
        >
          <Button
            onClick={
              confirmDialog.type === "confirm" ? handleConfirm : handleReject
            }
            sx={{
              minWidth: "35px",
              transition: "0.6s",
              color: confirmDialog.type === "confirm" ? "#10b981" : "#f46a6a",
              backgroundColor:
                themeMode === "dark"
                  ? "rgb(51 65 85)"
                  : confirmDialog.type === "confirm"
                    ? "#ecfdf5"
                    : "#fef0f0",
              "&:hover": {
                backgroundColor:
                  confirmDialog.type === "confirm" ? "#10b981" : "#f46a6a",
                color: "white",
              },
              boxShadow: "none",
            }}
          >
            <div className="flex items-center">
              <span>{confirmDialog.type === "confirm" ? "تایید" : "رد"}</span>
              {confirmDialog.type === "confirm" ? (
                <CheckCircleIcon className="mr-1" />
              ) : (
                <CancelIcon className="px-1" />
              )}
            </div>
          </Button>
          <Button
            onClick={closeConfirmDialog}
            sx={{
              minWidth: "35px",
              transition: "0.6s",
              color: "#74788d",
              backgroundColor:
                themeMode === "dark" ? "rgb(51 65 85)" : "#f1f1f3",
              "&:hover": {
                backgroundColor: "#74788d",
                color: "white",
              },
              boxShadow: "none",
            }}
          >
            <div className="flex items-center">
              <span>انصراف</span>
            </div>
          </Button>
        </DialogActions>
        {submitLoading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(255,255,255,0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <CircularProgress sx={{ color: "#1787B0" }} />
          </Box>
        )}
      </Dialog>
    </>
  );
}

export default CurrentSignForms;