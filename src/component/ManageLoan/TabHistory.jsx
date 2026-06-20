/* eslint-disable no-dupe-keys */
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {
  Box,
  IconButton,
  Paper,
  Skeleton,
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
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";
import ModalDetailsFormTabTranscript from "./ModalDetailsFormInvoiceTabTranscript";
import SpeedDialFileTab from "./SpeedDialFileTab";

TabHistory.propTypes = {
  cooperativeId: PropTypes.number,
};

function TabHistory({ cooperativeId }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [loadingForms, setLoadingForms] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [listFormsHistory, setListFormsHistory] = useState([]);
  const [listFilesHistory, setListFilesHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [formDetails, setFormDetails] = useState("");
  const [typeId, setTypeId] = useState(0);

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  // دریافت تاریخچه فرم‌ها و فایل‌ها
  const fetchHistory = () => {
    setLoadingForms(true);
    setLoadingFiles(true);
    axios
      .get(mainDomain + `/api/ReferDoc/Loan/${cooperativeId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        // جداسازی فرم‌ها (typeId === 1) و فایل‌ها (typeId === 2)
        const forms = res.data.filter((item) => item.typeId === 1);
        const files = res.data.filter((item) => item.typeId === 2);
        setListFormsHistory(forms);
        setListFilesHistory(files);
        setLoadingForms(false);
        setLoadingFiles(false);
      })
      .catch(() => {
        setLoadingForms(false);
        setLoadingFiles(false);
        Toast.fire({
          icon: "error",
          text: "خطا در دریافت اطلاعات",
          customClass: { container: "toast-modal" },
        });
      });
  };

  useEffect(() => {
    if (cooperativeId) {
      fetchHistory();
    }
  }, [cooperativeId]);

  

  

  // تابع برای دریافت آیکون فایل بر اساس پسوند
  const getFileIcon = (fileName) => {
    if (!fileName) return <InsertDriveFileIcon />;
  };

  // کامپوننت اسکلتون برای جدول فرم‌ها
  const FormTableSkeleton = () => (
    <TableBody>
      {[1, 2, 3].map((item) => (
        <TableRow key={item}>
          <TableCell>
            <Skeleton variant="text" width={150} height={30} />
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
              variant="rounded"
              width={80}
              height={28}
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
      <Box sx={{ p: 3 }}>
        { (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              overflow: "hidden",
              mb: 4,
            }}
          >
            <Table sx={{ minWidth: 400 }} aria-label="فرم‌های ارسال شده">
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
                  <TableCell>عنوان فرم</TableCell>
                  <TableCell align="center" sx={{ width: 200 }}>
                    نام تعاونی
                  </TableCell>
                  <TableCell align="center" sx={{ width: 100 }}>
                    تاریخ ارسال
                  </TableCell>

                  <TableCell align="center" sx={{ width: 100 }}>
                    عملیات
                  </TableCell>
                </TableRow>
              </TableHead>
              {loadingForms ? (
                <FormTableSkeleton />
              ) : (
                <TableBody>
                  {listFormsHistory.length > 0 ? (
                    listFormsHistory.map((form, index) => (
                      <TableRow
                        key={form.id}
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
                        }}
                      >
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
                              
                             setFormDetails(form.body);
                                setTypeId(form.formTypeId)
                                setOpen(true);
                            }}
                          >
                            {form.title}
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          {form.cooperativeTitle}
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "12px",
                              color: "#64748b",
                              fontWeight: "bold",
                            }}
                          >
                            {form.createdFa.slice(0, 10) +
                              "-" +
                              form.createdFa.slice(10) || "نامشخص"}
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Tooltip title="مشاهده">
                            <IconButton
                              onClick={() => {
                                if (form.body) {
                                  setFormDetails(form.body);
                                  setTypeId(form.formTypeId)
                                  setOpen(true);
                                } else {
                                  Toast.fire({
                                    icon: "warning",
                                    text: "محتوایی برای نمایش وجود ندارد",
                                    customClass: { container: "toast-modal" },
                                  });
                                }
                              }}
                            >
                              <FaEye className="text-teal-600" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                        <Typography variant="body1" color="text.secondary">
                          هیچ فرمی ارسال نشده است
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        )}

        { (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            <Table sx={{ minWidth: 400 }} aria-label="فایل‌های ارسال شده">
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
                  <TableCell>عنوان فایل</TableCell>
                  <TableCell align="center" sx={{ width: 200 }}>
                    نام تعاونی
                  </TableCell>
                  <TableCell align="center" sx={{ width: 120 }}>
                    تاریخ ارسال
                  </TableCell>

                  <TableCell align="center" sx={{ width: 100 }}>
                    عملیات
                  </TableCell>
                </TableRow>
              </TableHead>
              {loadingFiles ? (
                <FileTableSkeleton />
              ) : (
                <TableBody>
                  {listFilesHistory.length > 0 ? (
                    listFilesHistory.map((file, index) => (
                      <TableRow
                        key={file.id}
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
                          position: "relative",
                        }}
                      >
                        <TableCell
                          sx={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#334155",
                          }}
                        >
                          <div className="flex items-center gap-2">
                            {getFileIcon(file.link)}
                            <Box
                              component="span"
                              
                             
                            >
                              {file.title ||
                                file.link?.split("/").pop() ||
                                "فایل"}
                            </Box>
                          </div>
                        </TableCell>

                        <TableCell align="center">
                          {file.cooperativeTitle}
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "12px", color: "#64748b" }}
                          >
                            {file.createdFa.slice(0, 10) +
                              "-" +
                              file.createdFa.slice(10) || "نامشخص"}
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
                          هیچ فایلی ارسال نشده است
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </TableContainer>
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

export default TabHistory;
