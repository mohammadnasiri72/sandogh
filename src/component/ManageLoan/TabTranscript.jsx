/* eslint-disable no-dupe-keys */
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Chip,
  Button,
  CircularProgress,
  Box,
  Typography,
  Autocomplete,
  TextField,
  Tooltip,
  IconButton,
  Skeleton,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { mainDomain } from "../../utils/mainDomain";
import ModalDetailsFormTabTranscript from "./ModalDetailsFormInvoiceTabTranscript";
import Swal from "sweetalert2";
import SpeedDialFileTab from "./SpeedDialFileTab";
import { useSelector } from "react-redux";
import { CheckCircleIcon } from "lucide-react";

TabTranscript.propTypes = {
  loan: PropTypes.object,
  ListCooperative: PropTypes.array,
};

function TabTranscript({ loan, ListCooperative }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flagForm, setFlagForm] = useState(false);
  const [flagFile, setFlagFile] = useState(false);
  const [typeId, setTypeId] = useState(0);
  const [formDetails, setFormDetails] = useState("");
  const [open, setOpen] = useState(false);
  const [listForm, setListForm] = useState([]);
  const [listFiles, setListFiles] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCooperative, setSelectedCooperative] = useState(null);
  const [confirmPostSign, setConfirmPostSign] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);

  

  const closeConfirmDialog = () => {
    setConfirmPostSign(false);
  };

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  // دریافت لیست فرم‌ها
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(mainDomain + `/api/Form/Loan/${loan.id}/SignTypes`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setListForm(res.data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [loan.id, user.token, flagForm]);

  // دریافت لیست فایل‌های ضمیمه
  useEffect(() => {
    setIsLoadingFiles(true);
    axios
      .get(
        mainDomain + `/api/CooperativeFile/LoanRequest/${loan.loanRequestId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
      .then((res) => {
        setIsLoadingFiles(false);
        setListFiles(res.data);
      })
      .catch(() => {
        setIsLoadingFiles(false);
      });
  }, [loan.id, user.token, flagFile]);

  // هندل کردن انتخاب یک آیتم (هم برای فرم‌ها هم برای فایل‌ها)
  const handleSelectItem = (id, typeId) => {
    const isSelected = selectedItems.some(
      (item) => item.id === id && item.typeId === typeId,
    );
    if (isSelected) {
      setSelectedItems(
        selectedItems.filter(
          (item) => !(item.id === id && item.typeId === typeId),
        ),
      );
    } else {
      setSelectedItems([...selectedItems, { id: id, typeId: typeId }]);
    }
  };

  // هندل کردن انتخاب همه فرم‌ها
  const handleSelectAllForms = () => {
    const formItems = listForm.map((form) => ({ id: form.formId, typeId: 1 }));
    const otherItems = selectedItems.filter((item) => item.typeId !== 1);
    const allFormSelected = formItems.every((item) =>
      selectedItems.some(
        (selected) =>
          selected.id === item.id && selected.typeId === item.typeId,
      ),
    );

    if (allFormSelected) {
      setSelectedItems(otherItems);
    } else {
      setSelectedItems([...otherItems, ...formItems]);
    }
  };

  // هندل کردن انتخاب همه فایل‌ها
  const handleSelectAllFiles = () => {
    const fileItems = listFiles.map((file) => ({ id: file.id, typeId: 2 }));
    const otherItems = selectedItems.filter((item) => item.typeId !== 2);
    const allFileSelected = fileItems.every((item) =>
      selectedItems.some(
        (selected) =>
          selected.id === item.id && selected.typeId === item.typeId,
      ),
    );

    if (allFileSelected) {
      setSelectedItems(otherItems);
    } else {
      setSelectedItems([...otherItems, ...fileItems]);
    }
  };

  // بررسی انتخاب همه فرم‌ها
  const isAllFormsSelected = () => {
    if (listForm.length === 0) return false;
    return listForm.every((form) =>
      selectedItems.some(
        (item) => item.id === form.formId && item.typeId === 1,
      ),
    );
  };

  // بررسی انتخاب همه فایل‌ها
  const isAllFilesSelected = () => {
    if (listFiles.length === 0) return false;
    return listFiles.every((file) =>
      selectedItems.some((item) => item.id === file.id && item.typeId === 2),
    );
  };

  // بررسی انتخاب یک آیتم
  const isItemSelected = (id, typeId) => {
    return selectedItems.some(
      (item) => item.id === id && item.typeId === typeId,
    );
  };

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
      case null:
        return "error";
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
      case null:
        return "امضاء نشده";
      case -1:
        return "در انتظار امضاء";
      case 1:
        return "امضاء شده";
      default:
        return "نامشخص";
    }
  };

  const sendToSignHandler = (id) => {
    axios
      .post(
        mainDomain + `/api/Form/${id}/SendToSign`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
      .then(() => {
        setFlagForm((e) => !e);
        setFlagFile((e) => !e);
        Toast.fire({
          icon: "success",
          text: "فرم برای امضا به مدیر عامل ارجا داده شد لطفا منتظر تایید مدیر عامل بمانید",
          customClass: {
            container: "toast-modal",
          },
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          text: err.response ? err.response.data : "خطای شبکه",
          customClass: {
            container: "toast-modal",
          },
        });
      });
  };

  // تابع ارسال اسناد به تعاونی
  const referDocHandler = () => {
    if (!selectedCooperative) {
      Toast.fire({
        icon: "warning",
        text: "لطفا ابتدا تعاونی مورد نظر را انتخاب کنید",
        customClass: {
          container: "toast-modal",
        },
      });
      return;
    }

    if (selectedItems.length === 0) {
      Toast.fire({
        icon: "warning",
        text: "لطفا حداقل یک مورد را انتخاب کنید",
        customClass: {
          container: "toast-modal",
        },
      });
      return;
    }

    setConfirmPostSign(true);
  };

  const postFormSign = () => {
    setIsSubmitting(true);
    axios
      .post(
        mainDomain + `/api/ReferDoc/Cooperative/${selectedCooperative}`,
        selectedItems,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
      .then(() => {
        setIsSubmitting(false);
        setConfirmPostSign(false)
        Toast.fire({
          icon: "success",
          text: "اسناد با موفقیت ارسال شد",
          customClass: {
            container: "toast-modal",
          },
        });
        setSelectedItems([]);
        setSelectedCooperative(null);
        setFlagForm((e) => !e);
        setFlagFile((e) => !e);
      })
      .catch((err) => {
        setIsSubmitting(false);
        Toast.fire({
          icon: "error",
          text: err.response ? err.response.data : "خطای شبکه",
          customClass: {
            container: "toast-modal",
          },
        });
      });
  };

  // کامپوننت اسکلتون برای جدول فرم‌ها
  const FormTableSkeleton = () => (
    <TableBody>
      {[1, 2, 3].map((item) => (
        <TableRow key={item}>
          <TableCell padding="checkbox">
            <Skeleton variant="rounded" width={20} height={20} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={150} height={30} />
          </TableCell>
          <TableCell align="center">
            <Skeleton
              variant="rounded"
              width={80}
              height={28}
              sx={{ mx: "auto" }}
            />
          </TableCell>
          <TableCell align="center">
            <Skeleton
              variant="rounded"
              width={70}
              height={30}
              sx={{ mx: "auto" }}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  // کامپوننت اسکلتون برای جدول فایل‌ها
  const FileTableSkeleton = () => (
    <TableBody>
      {[1, 2, 3].map((item) => (
        <TableRow key={item}>
          <TableCell padding="checkbox">
            <Skeleton variant="rounded" width={20} height={20} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={120} height={30} />
          </TableCell>
          <TableCell align="center">
            <Skeleton
              variant="text"
              width={100}
              height={30}
              sx={{ mx: "auto" }}
            />
          </TableCell>
          <TableCell align="center">
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              sx={{ mx: "auto" }}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  return (
    <>
      <Box sx={{ px: 3, pt: 2 }}>
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div className="sm:w-2/3 w-full px-1">
            <Autocomplete
              sx={{
                "& .MuiAutocomplete-option": { textAlign: "justify" },
                "& .MuiInputBase-input": {
                  textAlign: "start",
                  fontSize: "12px",
                  height: "1.45rem",
                },
              }}
              size="small"
              disabled={ListCooperative.length === 0}
              className="w-full"
              value={
                selectedCooperative
                  ? ListCooperative.find((c) => c.id === selectedCooperative) ||
                    null
                  : null
              }
              options={ListCooperative.length > 0 ? ListCooperative : []}
              getOptionLabel={(option) => (option.title ? option.title : "")}
              onChange={(event, newValue) => {
                setSelectedCooperative(newValue ? newValue.id : null);
              }}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  <div className="text-start text-sm py-2">
                    {option.title ? option.title : ""}
                  </div>
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="انتخاب تعاونی" />
              )}
            />
          </div>
          <div className="sm:w-1/3 w-full px-1 sm:mt-0 mt-3">
            <Button
              size="large"
              onClick={referDocHandler}
              disabled={isLoading}
              className="bg-slate-800"
              sx={{
                fontSize: "12px",
                transition: "0.6s",
                color: themeColor.color,
                background: themeColor.bgColor,
                width: "100%",
                boxShadow: "none",
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : (
                "ارسال"
              )}
            </Button>
          </div>
        </div>
      </Box>

      <Box sx={{ p: 3 }}>
        <div className="flex justify-between items-center">
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 600, color: "#1e293b" }}
          >
            فرم‌های تسهیلات
          </Typography>
          <Tooltip title="بازخوانی">
            <IconButton
              onClick={() => {
                setFlagForm((e) => !e);
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
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            overflow: "hidden",
            mb: 4,
          }}
        >
          <Table sx={{ minWidth: 400 }} aria-label="فرم‌های تسهیلات">
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: "#f8fafc",
                  "& .MuiTableCell-root": {
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#1e293b",
                    borderBottom: "2px solid #e2e8f0",
                  },
                }}
              >
                <TableCell padding="checkbox" sx={{ width: 50 }}>
                  <Checkbox
                    checked={isAllFormsSelected()}
                    onChange={handleSelectAllForms}
                    sx={{
                      color: "#1787B0",
                      "&.Mui-checked": {
                        color: "#1787B0",
                      },
                    }}
                  />
                </TableCell>
                <TableCell>عنوان فرم</TableCell>
                <TableCell align="center" sx={{ width: 100 }}>
                  وضعیت امضا
                </TableCell>
                <TableCell align="center" sx={{ width: 50 }}>
                  عملیات
                </TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <FormTableSkeleton />
            ) : (
              <TableBody>
                {listForm.length > 0 ? (
                  listForm.map((form, index) => (
                    <TableRow
                      key={`form-${form.formId}`}
                      hover
                      sx={{
                        "&:hover": {
                          bgcolor: "#fefce8",
                        },
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                        bgcolor:
                          index % 2 === 0 ? "transparent" : "rgba(0,0,0,0.01)",
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected(form.formId, 1)}
                          onChange={() => handleSelectItem(form.formId, 1)}
                          sx={{
                            color: "#1787B0",
                            "&.Mui-checked": {
                              color: "#1787B0",
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#334155",
                        }}
                      >
                        <Box
                          component="span"
                          sx={{
                            cursor: "pointer",
                            "&:hover": {
                              color: "#1787B0",
                              textDecoration: "underline",
                            },
                          }}
                          onClick={() => {
                            
                            setTypeId(form.fromTypeId)
                            setFormDetails(form.body ? form.body : "");
                            setOpen(true);
                          }}
                        >
                          {getFormName(form.fromTypeId)}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={getSignStatusText(form.formSignStatusId)}
                          size="small"
                          sx={{
                            bgcolor:
                              getSignStatusColor(form.formSignStatusId) ===
                              "success"
                                ? "#dcfce7"
                                : getSignStatusColor(form.formSignStatusId) ===
                                    "warning"
                                  ? "#fef9c3"
                                  : getSignStatusColor(
                                        form.formSignStatusId,
                                      ) === "error"
                                    ? "#fee2e2"
                                    : "#f1f5f9",
                            color:
                              getSignStatusColor(form.formSignStatusId) ===
                              "success"
                                ? "#166534"
                                : getSignStatusColor(form.formSignStatusId) ===
                                    "warning"
                                  ? "#854d0e"
                                  : getSignStatusColor(
                                        form.formSignStatusId,
                                      ) === "error"
                                    ? "#991b1b"
                                    : "#475569",
                            fontWeight: 500,
                            fontSize: "12px",
                            height: "28px",
                            borderRadius: "8px",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          disabled={form.formSignStatusId}
                          variant="contained"
                          size="small"
                          onClick={() => {
                            sendToSignHandler(form.formId);
                          }}
                          sx={{
                            bgcolor: "#1787B0",
                            "&:hover": {
                              bgcolor: "#0f5e7a",
                            },
                            textTransform: "none",
                            fontSize: "13px",
                            fontWeight: 500,
                            borderRadius: "8px",
                            px: 2,
                            py: 0.5,
                            boxShadow: "none",
                            "&:hover": {
                              boxShadow: "0 2px 8px rgba(23,135,176,0.3)",
                            },
                          }}
                        >
                          درخواست
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                      <Typography variant="body1" color="text.secondary">
                        هیچ فرمی برای نمایش وجود ندارد
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>

        <div className="flex justify-between items-center">
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 600, color: "#1e293b" }}
          >
            فایل‌های ضمیمه
          </Typography>
          <Tooltip title="بازخوانی">
            <IconButton
              onClick={() => {
                setFlagFile((e) => !e);
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
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          <Table sx={{ minWidth: 400 }} aria-label="فایل‌های ضمیمه">
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: "#f8fafc",
                  "& .MuiTableCell-root": {
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#1e293b",
                    borderBottom: "2px solid #e2e8f0",
                  },
                }}
              >
                <TableCell padding="checkbox" sx={{ width: 50 }}>
                  <Checkbox
                    checked={isAllFilesSelected()}
                    onChange={handleSelectAllFiles}
                    sx={{
                      color: "#1787B0",
                      "&.Mui-checked": {
                        color: "#1787B0",
                      },
                    }}
                  />
                </TableCell>
                <TableCell>نام فایل</TableCell>

                <TableCell align="center" sx={{ width: 100 }}>
                  عملیات
                </TableCell>
              </TableRow>
            </TableHead>
            {isLoadingFiles ? (
              <FileTableSkeleton />
            ) : (
              <TableBody>
                {listFiles.length > 0 ? (
                  listFiles.map((file, index) => (
                    <TableRow
                      key={`file-${file.id}`}
                      hover
                      sx={{
                        "&:hover": {
                          bgcolor: "#fefce8",
                        },
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                        bgcolor:
                          index % 2 === 0 ? "transparent" : "rgba(0,0,0,0.01)",
                        position: "relative",
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected(file.id, 2)}
                          onChange={() => handleSelectItem(file.id, 2)}
                          sx={{
                            color: "#1787B0",
                            "&.Mui-checked": {
                              color: "#1787B0",
                            },
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "12px",
                            color: "#64748b",
                            maxWidth: "200px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          title={file.fileDesc}
                        >
                          {file.fileDesc || "بدون توضیحات"}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ position: "relative", height: "80px" }}
                      >
                        <SpeedDialFileTab e={file} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                      <Typography variant="body1" color="text.secondary">
                        هیچ فایل ضمیمه‌ای وجود ندارد
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>

      <ModalDetailsFormTabTranscript
        open={open}
        setOpen={setOpen}
        formDetails={formDetails}
        typeId={typeId}
      />

      {/* دیالوگ تایید/رد */}
      <Dialog
        open={confirmPostSign}
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
            color: "#10b981",
          }}
        >
          ارسال فرم
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText sx={{ mt: 0 }} id="alert-dialog-slide-description">
            آیا از ارسال فرم مطمئن هستید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor:
              themeMode === "dark" ? "rgb(30 41 59)" : "rgb(241 245 249)",
          }}
        >
          <Button
            onClick={postFormSign}
            sx={{
              minWidth: "35px",
              transition: "0.6s",
              color: "#10b981",
              backgroundColor:
                themeMode === "dark" ? "rgb(51 65 85)" : "#ecfdf5",
              "&:hover": {
                backgroundColor: "#10b981",
                color: "white",
              },
              boxShadow: "none",
            }}
          >
            <div className="flex items-center">
              <span>تایید</span>
              <CheckCircleIcon className="mr-1" />
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
        {isSubmitting && (
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

export default TabTranscript;
