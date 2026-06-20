import AttachFileIcon from "@mui/icons-material/AttachFile";
import ClearIcon from "@mui/icons-material/Clear";
import DescriptionIcon from "@mui/icons-material/Description";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Collapse,
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
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";
import ModalDetailsFormTabTranscript from "../ManageLoan/ModalDetailsFormInvoiceTabTranscript";
import SpeedDialFileTabReferdoc from "./SpeedDialFileTabReferdoc";

export default function MainPageDocumentList() {
  const [groupedData, setGroupedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [formDetails, setFormDetails] = useState("");
  const [typeId, setTypeId] = useState(0);
  const [expandedRows, setExpandedRows] = useState({});


  const user = JSON.parse(localStorage.getItem("user"));

  const mainPageState = useSelector((store) => store.resetState.mainPageState);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);

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
      .get(mainDomain + `/api/ReferDoc/Cooperative/${0}?pageSize=${500}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        // گروه‌بندی داده‌ها بر اساس شماره قرارداد
        const grouped = groupByContractNumber(res.data);
        setGroupedData(grouped);
        setFilteredData(grouped);
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

  // تابع گروه‌بندی بر اساس شماره قرارداد
  const groupByContractNumber = (data) => {
    const groups = {};

    data.forEach((item) => {
      const contractNumber =
        item.loanInfo?.contractNumber || "بدون شماره قرارداد";

      if (!groups[contractNumber]) {
        groups[contractNumber] = {
          contractNumber: contractNumber,
          cooperativeTitle: item.loanInfo?.cooperativeTitle || "",
          loanMaturityFa: item.loanInfo?.loanMaturityFa || "",
          paymentDateFa: item.loanInfo?.paymentDateFa || "",
          amount: item.loanInfo?.amount || 0,
          items: [],
          // اطلاعات نمونه برای نمایش در ردیف اصلی
          sampleItem: item,
        };
      }

      groups[contractNumber].items.push(item);
    });

    // تبدیل به آرایه و مرتب‌سازی بر اساس شماره قرارداد
    return Object.values(groups).sort((a, b) =>
      a.contractNumber.localeCompare(b.contractNumber),
    );
  };

  useEffect(() => {
    fetchData();
  }, [mainPageState]);

  // فیلتر کردن داده‌ها
  useEffect(() => {
    let filtered = [...groupedData];

    // فیلتر بر اساس جستجو
    if (searchTerm) {
      filtered = filtered.filter((group) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          group.contractNumber?.toLowerCase().includes(searchLower) ||
          group.cooperativeTitle?.toLowerCase().includes(searchLower) ||
          group.items.some(
            (item) =>
              item.title?.toLowerCase().includes(searchLower) ||
              item.loanInfo?.contractNumber
                ?.toLowerCase()
                .includes(searchLower),
          )
        );
      });
    }

    // فیلتر بر اساس نوع (فرم/فایل) - فقط گروه‌هایی که حداقل یک آیتم با نوع مورد نظر دارند
    if (typeFilter !== "all") {
      filtered = filtered.filter((group) => {
        return group.items.some((item) => {
          if (typeFilter === "form") return item.typeId === 1;
          if (typeFilter === "file") return item.typeId === 2;
          return true;
        });
      });
    }

    setFilteredData(filtered);
    setPage(1);
    // بستن تمام ردیف‌های باز هنگام تغییر فیلتر
    setExpandedRows({});
  }, [searchTerm, typeFilter, groupedData]);

  // تابع برای دریافت آیکون نوع سند
  const getTypeIcon = (typeId) => {
    if (typeId === 1) {
      return <DescriptionIcon sx={{ color: "#1787B0", fontSize: 18 }} />;
    }
    return <AttachFileIcon sx={{ color: "#10b981", fontSize: 18 }} />;
  };

  // تابع برای دریافت متن نوع سند
  const getTypeText = (typeId) => {
    return typeId === 1 ? "فرم" : "فایل";
  };

  // تابع برای مشاهده فرم
  const handleViewForm = (body, formTypeId) => {
    if (body) {
      setFormDetails(body);
      setTypeId(formTypeId);
      setOpen(true);
    } else {
      Toast.fire({
        icon: "warning",
        text: "محتوایی برای نمایش وجود ندارد",
        customClass: { container: "toast-modal" },
      });
    }
  };

  // تابع برای باز/بسته کردن ردیف
  const toggleRow = (contractNumber) => {
    setExpandedRows((prev) => ({
      ...prev,
      [contractNumber]: !prev[contractNumber],
    }));
  };

  // صفحه‌بندی
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  // کامپوننت اسکلتون
  const TableSkeleton = () => (
    <TableBody>
      {[1, 2, 3, 4, 5].map((item) => (
        <TableRow key={item}>
          <TableCell>
            <Skeleton variant="text" width={150} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={120} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={100} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={100} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={120} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={80} />
          </TableCell>
          <TableCell>
            <Skeleton
              variant="rounded"
              width={100}
              height={36}
              sx={{ mx: "auto" }}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  // کامپوننت نمایش آیتم‌های داخل گروه

  const GroupItems = ({ items }) => {
    return (
      <TableBody>
        {items.map((item, index) => (
          <TableRow
            key={item.id}
            hover
            sx={{
              "&:hover": {
                bgcolor: "#fefce8",
              },
              bgcolor: index % 2 === 0 ? "rgba(0,0,0,0.01)" : "transparent",
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
                  fontSize: "14px",
                  fontWeight: 500,
                  color: item.typeId === 1 ? "#1787B0" : "#10b981",
                  cursor: item.typeId === 1 ? "pointer" : "default",
                  "&:hover": {
                    textDecoration: item.typeId === 1 ? "underline" : "none",
                  },
                }}
                onClick={() => {
                  if (item.typeId === 1 && item.body) {
                    handleViewForm(item.body, item.formTypeId);
                  }
                }}
              >
                {item.title}
              </Typography>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                fontWeight: "bold",
                color: themeMode === "dark" ? "#fffa" : "#1e293b",
                whiteSpace: "nowrap",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontSize: "14px"}}
              >
                {item.createdFa?.slice(0, 10) +
                  " - " +
                  item.createdFa?.slice(10) || "نامشخص"}
              </Typography>
            </TableCell>
            <TableCell align="center">
              {item.typeId === 1 ? (
                <Tooltip title="مشاهده فرم">
                  <IconButton
                    onClick={() => {
                      if (item.body) {
                        handleViewForm(item.body, item.formTypeId);
                      }
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
        ))}
      </TableBody>
    );
  };
  GroupItems.propTypes = {
    items: PropTypes.array,
  };

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
            تعداد کل: {filteredData.length} گروه
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
                    bgcolor: themeMode === "dark" ? "#2d3641" : "#f8fafc",
                    "& .MuiTableCell-root": {
                      fontWeight: 700,
                      fontSize: "13px",
                      color: themeMode === "dark" ? "#fffa" : "#475569",
                      borderBottom:
                        themeMode === "dark"
                          ? "2px solid #fff1"
                          : "2px solid #e2e8f0",
                    },
                  }}
                >
                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    عنوان تشکل
                  </TableCell>
                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    شماره قرارداد
                  </TableCell>
                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    تاریخ سررسید
                  </TableCell>
                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    تاریخ پرداخت
                  </TableCell>
                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    مبلغ تسهیلات
                  </TableCell>
                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    تعداد اسناد
                  </TableCell>
                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    عملیات
                  </TableCell>
                </TableRow>
              </TableHead>
              {loading ? (
                <TableSkeleton />
              ) : (
                <TableBody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((group) => {
                      const isExpanded =
                        expandedRows[group.contractNumber] || false;
                      const formItems = group.items.filter(
                        (item) => item.typeId === 1,
                      );
                      const fileItems = group.items.filter(
                        (item) => item.typeId === 2,
                      );

                      return (
                        <>
                          {/* ردیف اصلی گروه */}
                          <TableRow
                            hover
                            sx={{
                              bgcolor: isExpanded
                                ? themeMode === "dark"
                                  ? "#2d3641"
                                  : "#f0f7ff"
                                : "transparent",
                              "&:hover": {
                                bgcolor: isExpanded ? "#e3f0ff" : "#f8fafc",
                              },
                              borderBottom:
                                themeMode === "dark"
                                  ? "2px solid #fff1"
                                  : "2px solid #e2e8f0",
                            }}
                          >
                            <TableCell align="center">
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: "bold",
                                  color:
                                    themeMode === "dark" ? "#fffa" : "#1e293b",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {group.cooperativeTitle}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: "bold", color: "#1787B0" }}
                              >
                                {group.contractNumber}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography
                                variant="body2"
                                sx={{
                                  color:
                                    themeMode === "dark" ? "#fffa" : "#64748b",
                                }}
                              >
                                {group.loanMaturityFa}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography
                                variant="body2"
                                sx={{
                                  color:
                                    themeMode === "dark" ? "#fffa" : "#64748b",
                                }}
                              >
                                {group.paymentDateFa}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: "bold",
                                  color:
                                    themeMode === "dark" ? "#fffa" : "#1e293b",
                                }}
                              >
                                {group.amount.toLocaleString()}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 1,
                                  justifyContent: "center",
                                }}
                              >
                                {formItems.length > 0 && (
                                  <Tooltip title={`${formItems.length} فرم`}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                      }}
                                    >
                                      <DescriptionIcon
                                        sx={{ color: "#1787B0", fontSize: 18 }}
                                      />
                                      <Typography
                                        variant="caption"
                                        sx={{ color: "#1787B0" }}
                                      >
                                        {formItems.length}
                                      </Typography>
                                    </Box>
                                  </Tooltip>
                                )}
                                {fileItems.length > 0 && (
                                  <Tooltip title={`${fileItems.length} فایل`}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                      }}
                                    >
                                      <AttachFileIcon
                                        sx={{ color: "#10b981", fontSize: 18 }}
                                      />
                                      <Typography
                                        variant="caption"
                                        sx={{ color: "#10b981" }}
                                      >
                                        {fileItems.length}
                                      </Typography>
                                    </Box>
                                  </Tooltip>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => toggleRow(group.contractNumber)}
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
                            </TableCell>
                          </TableRow>

                          {/* ردیف‌های باز شده (آکاردئون) */}
                          <TableRow>
                            <TableCell
                              colSpan={7}
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
                                        ? "#2d3641"
                                        : "#fafcff",
                                  }}
                                >
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      mb: 2,
                                      color:
                                        themeMode === "dark"
                                          ? "#fffa"
                                          : "#475569",
                                    }}
                                  >
                                    اسناد مربوط به قرارداد{" "}
                                    {group.contractNumber}
                                  </Typography>
                                  <Table size="small">
                                    <TableHead>
                                      <TableRow
                                        sx={{
                                          bgcolor:
                                            themeMode === "dark"
                                              ? "#2d3641"
                                              : "#f1f5f9",
                                        }}
                                      >
                                        <TableCell
                                          sx={{
                                            fontWeight: 600,
                                            fontSize: "12px",
                                            width: "60px",
                                          }}
                                        >
                                          نوع
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            fontWeight: 600,
                                            fontSize: "12px",
                                          }}
                                        >
                                          عنوان
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            fontWeight: 600,
                                            fontSize: "12px",
                                          }}
                                        >
                                          تاریخ ارسال
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            fontWeight: 600,
                                            fontSize: "12px",
                                            width: "100px",
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
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
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
        {filteredData.length > rowsPerPage && (
          <Stack spacing={2} sx={{ mt: 3, alignItems: "center" }}>
            <Pagination
              count={Math.ceil(filteredData.length / rowsPerPage)}
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
