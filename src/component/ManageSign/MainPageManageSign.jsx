/* eslint-disable no-dupe-keys */
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  alpha,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  setListFormToSign,
  setLoadingSign,
} from "../../redux/slice/formToSign";
import { mainDomain } from "../../utils/mainDomain";
import ModalDetailsFormTabTranscript from "../ManageLoan/ModalDetailsFormInvoiceTabTranscript";

function MainPageManageSign() {
  const user = JSON.parse(localStorage.getItem("user"));
  const themeMode = useSelector((store) => store.setting.themeMode);
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
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: "", // "confirm" or "reject"
    formId: null,
    formName: "",
  });

  const themeColor = useSelector((store) => store.setting.themeColor);

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  // تابع برای دریافت نام فرم
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

  // تابع برای دریافت رنگ وضعیت امضا
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

  // تابع برای دریافت متن وضعیت امضا
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

  // دریافت لیست فرم‌های منتظر امضا
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

  // باز کردن دیالوگ تایید
  const openConfirmDialog = (formId, formName, type) => {
    setConfirmDialog({
      open: true,
      type: type,
      formId: formId,
      formName: formName,
    });
  };

  // بستن دیالوگ تایید
  const closeConfirmDialog = () => {
    setConfirmDialog({
      open: false,
      type: "",
      formId: null,
      formName: "",
    });
  };

  // تابع تایید فرم
  const handleConfirm = () => {
    setSubmitLoading(true);
    setSelectedFormId(confirmDialog.formId);
    closeConfirmDialog();
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
  };

  // تابع رد فرم
  const handleReject = () => {
    setSubmitLoading(true);
    setSelectedFormId(confirmDialog.formId);
    closeConfirmDialog();
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
  };  

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Card
          sx={{
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          {/* هدر کارت */}
          <Box
            sx={{
              p: 2.5,
              background: `linear-gradient(135deg, ${alpha(
                "#1787B0",
                0.12,
              )} 0%, ${alpha("#1787B0", 0.05)} 100%)`,
              borderBottom: `2px solid ${alpha("#1787B0", 0.2)}`,
            }}
          >
            {/* <Button
          onClick={handleClickOpen}
          sx={{
            fontSize: "12px",
            transition: "0.6s",
            color: themeColor.color,
            background: themeColor.bgColor,

            boxShadow: "none",
          }}
        >
          <div className="flex items-center">
            <FaPlus />
            <span className="px-1">افزودن</span>
          </div>
        </Button> */}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DescriptionIcon sx={{ color: "#1787B0", fontSize: 28 }} />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#1e293b" }}
                >
                  فرم‌های منتظر امضا
                </Typography>
                <Chip
                  label={`${listFormToSign.length} مورد`}
                  size="small"
                  sx={{
                    color: themeColor.color,
                    background: themeColor.bgColor,
                    fontWeight: 500,
                    borderRadius: "8px",
                  }}
                />
              </div>
              <Tooltip title="بازخوانی">
                <IconButton
                  onClick={() => {
                    fetchData();
                  }}
                  size="small"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z"
                      fill="#1787B0"
                    />
                  </svg>
                </IconButton>
              </Tooltip>
            </div>
          </Box>

          {loadingSign ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={12}
            >
              <CircularProgress sx={{ color: "#1787B0" }} />
            </Box>
          ) : listFormToSign.length > 0 ? (
            <TableContainer component={Paper} elevation={0}>
              <Table sx={{ minWidth: 500 }} aria-label="فرم‌های منتظر امضا">
                <TableHead>
                  <TableRow
                    sx={{
                      bgcolor: "#f8fafc",
                      "& .MuiTableCell-root": {
                        fontWeight: 700,
                        fontSize: "13px",
                        color: "#475569",
                        borderBottom: "2px solid #e2e8f0",
                      },
                    }}
                  >
                    <TableCell>عنوان فرم</TableCell>
                    <TableCell align="center" sx={{ width: 120 }}>
                      وضعیت
                    </TableCell>
                    <TableCell align="center" sx={{ width: 200 }}>
                      عملیات
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listFormToSign.map((form, index) => (
                    <TableRow
                      key={form.id}
                      hover
                      sx={{
                        "&:hover": {
                          bgcolor: alpha("#fef3c7", 0.5),
                        },
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                        bgcolor:
                          index % 2 === 0
                            ? "transparent"
                            : alpha("#f1f5f9", 0.5),
                        transition: "background-color 0.2s",
                      }}
                    >
                      <TableCell>
                        <Typography
                          onClick={() => {                            
                            setTypeId(form.typeId);
                            setFormDetails(form.body);
                            setOpen(true);
                          }}
                          sx={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#1787B0",
                            cursor: "pointer",
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          {getFormName(form.typeId)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={getSignStatusText(form.signStatusId)}
                          size="small"
                          sx={{
                            bgcolor:
                              getSignStatusColor(form.signStatusId) ===
                              "success"
                                ? "#dcfce7"
                                : getSignStatusColor(form.signStatusId) ===
                                    "warning"
                                  ? "#fef9c3"
                                  : "#f1f5f9",
                            color:
                              getSignStatusColor(form.signStatusId) ===
                              "success"
                                ? "#166534"
                                : getSignStatusColor(form.signStatusId) ===
                                    "warning"
                                  ? "#854d0e"
                                  : "#475569",
                            fontWeight: 600,
                            fontSize: "11px",
                            height: "26px",
                            borderRadius: "12px",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex gap-2 justify-center">
                          <Button
                            variant="contained"
                            size="small"
                            disabled={
                              submitLoading && selectedFormId === form.id
                            }
                            onClick={() =>
                              openConfirmDialog(
                                form.id,
                                getFormName(form.typeId),
                                "confirm",
                              )
                            }
                            startIcon={<CheckCircleIcon />}
                            sx={{
                              bgcolor: "#10b981",
                              "&:hover": {
                                bgcolor: "#059669",
                              },
                              "&.Mui-disabled": {
                                bgcolor: "#94a3b8",
                              },
                              textTransform: "none",
                              fontSize: "12px",
                              fontWeight: 600,
                              borderRadius: "10px",
                              px: 2,
                              py: 0.6,
                              boxShadow: "none",
                              "&:hover": {
                                boxShadow: "0 2px 8px rgba(16,185,129,0.3)",
                              },
                            }}
                          >
                            تایید
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            disabled={
                              submitLoading && selectedFormId === form.id
                            }
                            onClick={() =>
                              openConfirmDialog(
                                form.id,
                                getFormName(form.typeId),
                                "reject",
                              )
                            }
                            startIcon={<CancelIcon />}
                            sx={{
                              bgcolor: "#ef4444",
                              "&:hover": {
                                bgcolor: "#dc2626",
                              },
                              "&.Mui-disabled": {
                                bgcolor: "#94a3b8",
                              },
                              textTransform: "none",
                              fontSize: "12px",
                              fontWeight: 600,
                              borderRadius: "10px",
                              px: 2,
                              py: 0.6,
                              boxShadow: "none",
                              "&:hover": {
                                boxShadow: "0 2px 8px rgba(239,68,68,0.3)",
                              },
                            }}
                          >
                            رد
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                py: 8,
              }}
            >
              <DescriptionIcon sx={{ fontSize: 60, color: "#cbd5e1" }} />
              <Typography variant="body1" color="text.secondary">
                هیچ فرم منتظر امضایی وجود ندارد
              </Typography>
            </Box>
          )}
        </Card>
      </Box>

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
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText sx={{ mt: 0 }} id="alert-dialog-slide-description">
            {confirmDialog.type === "confirm"
              ? `آیا از تایید "${confirmDialog.formName}" مطمئن هستید؟`
              : `آیا از رد "${confirmDialog.formName}" مطمئن هستید؟`}
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

export default MainPageManageSign;
