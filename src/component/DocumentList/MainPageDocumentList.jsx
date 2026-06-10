import AttachFileIcon from "@mui/icons-material/AttachFile";
import ClearIcon from "@mui/icons-material/Clear";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
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
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";
import ModalDetailsFormTabTranscript from "../ManageLoan/ModalDetailsFormInvoiceTabTranscript";
import SpeedDialFileTabReferdoc from "./SpeedDialFileTabReferdoc";

export default function MainPageDocumentList() {
  const [listSign, setListSign] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [formDetails, setFormDetails] = useState("");
  const [typeId, setTypeId] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  const mainPageState = useSelector((store) => store.resetState.mainPageState);
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

  // دریافت لیست اسناد
  const fetchData = () => {
    setLoading(true);
    axios
      .get(mainDomain + `/api/ReferDoc/Cooperative/${0}?pageSize=${100}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setListSign(res.data);
        setFilteredList(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        Toast.fire({
          icon: "error",
          text: "خطا در دریافت اطلاعات",
          customClass: { container: "toast-modal" },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [mainPageState]);

  // فیلتر کردن داده‌ها
  useEffect(() => {
    let filtered = [...listSign];

    // فیلتر بر اساس جستجو
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.cooperativeTitle
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    // فیلتر بر اساس نوع (فرم/فایل)
    if (typeFilter !== "all") {
      filtered = filtered.filter((item) => {
        if (typeFilter === "form") return item.typeId === 1;
        if (typeFilter === "file") return item.typeId === 2;
        return true;
      });
    }

    setFilteredList(filtered);
    setPage(1);
  }, [searchTerm, typeFilter, listSign]);

  // تابع برای دریافت آیکون نوع سند
  const getTypeIcon = (typeId) => {
    if (typeId === 1) {
      return <DescriptionIcon sx={{ color: "#1787B0" }} />;
    }
    return <AttachFileIcon sx={{ color: "#10b981" }} />;
  };

  // تابع برای دریافت متن نوع سند
  const getTypeText = (typeId) => {
    return typeId === 1 ? "فرم" : "فایل";
  };

  // تابع برای مشاهده فرم
  const handleViewForm = (body) => {
    if (body) {
      setFormDetails(body);
      setOpen(true);
    } else {
      Toast.fire({
        icon: "warning",
        text: "محتوایی برای نمایش وجود ندارد",
        customClass: { container: "toast-modal" },
      });
    }
  };

  // صفحه‌بندی
  const paginatedData = filteredList.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );


  // کامپوننت اسکلتون
  const TableSkeleton = () => (
    <TableBody>
      {[1, 2, 3, 4, 5].map((item) => (
        <TableRow key={item}>
          <TableCell>
            <Skeleton variant="text" width={80} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={150} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={200} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={120} />
          </TableCell>
          <TableCell>
            <Skeleton
              variant="rounded"
              width={80}
              height={28}
              sx={{ mx: "auto" }}
            />
          </TableCell>
          <TableCell>
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
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: 700, color: "#1e293b" }}
        >
          رونوشت‌ها
        </Typography>

        {/* فیلترها */}
        <Paper
          sx={{
            p: 2,
            mb: 3,
            borderRadius: "16px",
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            size="small"
            placeholder="جستجو..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 200, flex: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchTerm("")}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>نوع سند</InputLabel>
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              label="نوع سند"
            >
              <MenuItem value="all">همه</MenuItem>
              <MenuItem value="form">فرم</MenuItem>
              <MenuItem value="file">فایل</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="body2" sx={{ color: "#64748b" }}>
            تعداد کل: {filteredList.length} مورد
          </Typography>
        </Paper>

        {/* جدول اسناد */}
        <div
          style={{
            borderColor: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
          }}
          className="border-2 p-2 relative rounded-lg"
        >
          <TableContainer component={Paper} sx={{ maxHeight: "75vh" }}>
            <Table sx={{ minWidth: 700 }} aria-label="رونوشت‌ها">
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
                  <TableCell
                    align="center"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    نوع
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    عنوان
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    عنوان تشکل
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    تاریخ سررسید
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    تاریخ پرداخت
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    شماره قرارداد
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    مبلغ تسهیلات
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    تاریخ ارسال
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    عملیات
                  </TableCell>
                </TableRow>
              </TableHead>
              {loading ? (
                <TableSkeleton />
              ) : (
                <TableBody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item, index) => (
                      <TableRow
                        key={item.id}
                        hover
                        sx={{
                          "&:hover": {
                            bgcolor: "#fefce8",
                          },
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                          bgcolor:
                            index % 2 === 0
                              ? "transparent"
                              : "rgba(0,0,0,0.01)",
                          opacity: item.seen ? 0.7 : 1,
                        }}
                      >
                        <TableCell>
                          <Tooltip title={getTypeText(item.typeId)}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              {getTypeIcon(item.typeId)}
                            </Box>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              whiteSpace: "nowrap",
                              fontSize: "14px",
                              fontWeight: 500,
                              color: item.typeId === 1 ? "#1787B0" : "#10b981",
                              cursor: item.typeId === 1 ? "pointer" : "default",
                              "&:hover": {
                                textDecoration:
                                  item.typeId === 1 ? "underline" : "none",
                              },
                            }}
                            onClick={() => {
                              setTypeId(item.formTypeId);

                              if (item.typeId === 1 && item.body) {
                                handleViewForm(item.body);
                              }
                            }}
                          >
                            {item.title}
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "14px",
                              color: "#64748b",
                              fontWeight: "bold",
                            }}
                          >
                            {item.loanInfo.cooperativeTitle}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "14px",
                              color: "#64748b",
                              fontWeight: "bold",
                            }}
                          >
                            {item.loanInfo.loanMaturityFa}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "14px",
                              color: "#64748b",
                              fontWeight: "bold",
                            }}
                          >
                            {item.loanInfo.paymentDateFa}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "14px",
                              color: "#64748b",
                              fontWeight: "bold",
                            }}
                          >
                            {item.loanInfo.meetingNumber}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "14px",
                              color: "#64748b",
                              fontWeight: "bold",
                            }}
                          >
                            {item.loanInfo.amount.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "14px",
                              color: "#64748b",
                              fontWeight: "bold",
                            }}
                          >
                            {item.createdFa.slice(0, 10) +
                              " - " +
                              item.createdFa.slice(10) || "نامشخص"}
                          </Typography>
                        </TableCell>

                        <TableCell align="center" className="relative">
                          {item.typeId === 1 ? (
                            <Tooltip title="مشاهده فرم">
                              <IconButton
                                onClick={() => {
                                  setTypeId(item.formTypeId);
                                  handleViewForm(item.body);
                                }}
                                disabled={!item.body}
                                sx={{
                                  color: "#1787B0",
                                  "&:hover": {
                                    bgcolor: "rgba(23,135,176,0.1)",
                                  },
                                  "&.Mui-disabled": {
                                    color: "#cbd5e1",
                                  },
                                }}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <SpeedDialFileTabReferdoc e={item} />
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <DescriptionIcon
                            sx={{ fontSize: 60, color: "#cbd5e1" }}
                          />
                          <Typography variant="body1" color="text.secondary">
                            هیچ سندی یافت نشد
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </div>

        {/* صفحه‌بندی */}
        {filteredList.length > rowsPerPage && (
          <Stack spacing={2} sx={{ mt: 3, alignItems: "center" }}>
            <Pagination
              count={Math.ceil(filteredList.length / rowsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </Stack>
        )}
      </Box>

      <ModalDetailsFormTabTranscript
        open={open}
        setOpen={setOpen}
        formDetails={formDetails}
        typeId={typeId}
      />
    </>
  );
}
