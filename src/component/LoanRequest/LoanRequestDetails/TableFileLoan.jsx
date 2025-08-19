import {
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
} from "@mui/material";
import PropTypes from "prop-types";
import { MdOutlineFilePresent } from "react-icons/md";
import { useSelector } from "react-redux";
import { mainDomain } from "../../../utils/mainDomain";
import ConfirmDeleteDoc from "./ConfirmDeleteDoc";
import VisitDetailCheq from "./VisitDetailCheq";
import VisitDetailLetter from "./VisitDetailLetter";

TableFileLoan.propTypes = {
  loanDocs: PropTypes.array,
  setFlag: PropTypes.func,
  loading: PropTypes.bool,
  activeStep: PropTypes.number,
};
export default function TableFileLoan({
  loanDocs,
  setFlag,
  loading,
  activeStep,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const loanRequestData = useSelector(
    (store) => store.loanRequest.loanRequestData
  );
  const handleView = (fileUrl) => {
    window.open(mainDomain + fileUrl, "_blank");
  };


  return (
    <>
      <TableContainer component={Paper}>
        <Table
          style={{ maxHeight: "none", height: "auto" }}
          aria-label="sticky table"
        >
          <TableHead
            sx={{
              "& th": {
                backgroundColor: themeMode === "dark" ? "#262b3c" : "#eff2f7",
                color: themeMode === "dark" ? "#fffb" : "#000b",
                fontSize: "12px",
                position: "sticky",
              },
            }}
          >
            <TableRow>
              <TableCell>
                <span className="font-bold whitespace-nowrap">فایل ارسالی</span>
              </TableCell>

              <TableCell align="center">
                <span className="font-bold whitespace-nowrap">وضعیت</span>
              </TableCell>
              {loanDocs[0]?.statusDesc && (
                <TableCell align="center">
                  <span className="font-bold whitespace-nowrap">توضیحات</span>
                </TableCell>
              )}
              <TableCell
                sx={{
                  position: "sticky",
                  right: 0,
                  backgroundColor: "transparent",
                }}
                align="center"
              >
                <span className="font-bold whitespace-nowrap">عملیات</span>
              </TableCell>
            </TableRow>
          </TableHead>
          {loanDocs.length > 0 && (
            <TableBody>
              {loanDocs.map((e) => (
                <TableRow
                  key={e.id}
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        themeMode === "dark" ? "rgb(51 65 85)" : "#f8f9fa",
                    },
                  }}
                >
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <a
                      className="text-teal-400 hover:text-teal-500 duration-300"
                      download
                      target="_blank"
                      rel="noreferrer"
                      href={mainDomain + e.fileUrl}
                    >
                      <div className="flex flex-col items-start justify-center">
                        <div className="flex items-center">
                          <MdOutlineFilePresent />
                          <span>فایل ضمیمه</span>
                        </div>
                        <span>{loanDocs[0].fileDesc}</span>
                      </div>
                    </a>
                  </TableCell>

                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    {e.status === 1 && (
                      <span className="text-teal-600 bg-teal-50 rounded-full px-2 select-none">
                        جدید
                      </span>
                    )}
                    {e.status === 2 && (
                      <span className="text-yellow-600 bg-yellow-50 rounded-full px-2 select-none">
                        در حال بررسی
                      </span>
                    )}
                    {e.status === 3 && (
                      <span className="text-red-600 bg-red-50 rounded-full px-2 select-none">
                        رد شده
                      </span>
                    )}
                    {e.status === 4 && (
                      <span className="text-emerald-600 bg-emerald-50 rounded-full px-2 select-none">
                        تایید شده
                      </span>
                    )}
                    {e.status === 5 && (
                      <span className="text-orange-600 bg-orange-50 rounded-full px-2 select-none">
                        آرشیو شده
                      </span>
                    )}
                  </TableCell>
                  {e.statusDesc && (
                    <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                      <span
                        className={
                          e.status === 3
                            ? "text-red-500"
                            : e.status === 4
                            ? "text-emerald-500"
                            : ""
                        }
                      >
                        {e.statusDesc ? e.statusDesc : "---"}
                      </span>
                    </TableCell>
                  )}
                  <TableCell
                    align="center"
                    sx={{
                      position: "sticky",
                      right: 0,
                      backgroundColor:
                        themeMode === "dark" ? "#2d3641" : "white",
                    }}
                  >
                    <div className="flex items-center justify-center">
                      {loanRequestData.loanRequestItems[activeStep].title.slice(
                        0,
                        2
                      ) !== "چک" &&
                        loanRequestData.loanRequestItems[
                          activeStep
                        ].title.slice(0, 12) !== "نامه درخواست" && (
                          <div className="px-1">
                            <Tooltip title="مشاهده فایل">
                              <IconButton
                                onClick={() => {
                                  handleView(e.fileUrl);
                                }}
                                sx={{
                                  "&:hover": {
                                    backgroundColor: "transparent",
                                  },
                                }}
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    opacity="0.4"
                                    d="M21.25 9.06449C18.94 5.46842 15.56 3.39795 12 3.39795C10.22 3.39795 8.49 3.91309 6.91 4.87402C5.33 5.84487 3.91 7.2615 2.75 9.06449C1.75 10.6198 1.75 13.146 2.75 14.7013C5.06 18.3073 8.44 20.3679 12 20.3679C13.78 20.3679 15.51 19.8527 17.09 18.8918C18.67 17.9209 20.09 16.5043 21.25 14.7013C22.25 13.1559 22.25 10.6198 21.25 9.06449ZM12 15.8901C9.76 15.8901 7.96 14.097 7.96 11.8879C7.96 9.6787 9.76 7.88561 12 7.88561C14.24 7.88561 16.04 9.6787 16.04 11.8879C16.04 14.097 14.24 15.8901 12 15.8901Z"
                                    fill="#1787B0"
                                  />
                                  <path
                                    d="M12 9.05457C10.43 9.05457 9.15002 10.3226 9.15002 11.8878C9.15002 13.4432 10.43 14.7112 12 14.7112C13.57 14.7112 14.86 13.4432 14.86 11.8878C14.86 10.3325 13.57 9.05457 12 9.05457Z"
                                    fill="#1787B0"
                                  />
                                </svg>
                              </IconButton>
                            </Tooltip>
                          </div>
                        )}
                      {loanRequestData.loanRequestItems[activeStep].title.slice(
                        0,
                        2
                      ) === "چک" && <VisitDetailCheq loanDocs={e} />}

                      {loanRequestData.loanRequestItems[activeStep].title.slice(
                        0,
                        12
                      ) === "نامه درخواست" && (
                        <VisitDetailLetter
                          loanDocs={e}
                          activeStep={activeStep}
                          setFlag={setFlag}
                        />
                      )}

                      {/* {(e.status === 1 || e.typeId === 2) &&
                        (loanRequestData.loanRequestDto.status === 1 ||
                          e.status === 1) || ((loanRequestData.loanRequestDto.status === 1 ||
                            loanRequestData.loanRequestDto.status === 2) &&
                            e.status === 3) && (
                          <div className="flex justify-center items-center">
                            <ConfirmDeleteDoc setFlag={setFlag} id={e.id} />
                          </div>
                        )} */}
                      {(e.status === 1 || e.status === 3 || ( e.typeId===2 && e.status !==2)) && (
                        <div className="flex justify-center items-center">
                          <ConfirmDeleteDoc setFlag={setFlag} id={e.id} />
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}

          {loanDocs.length === 0 && !loading && (
            <TableBody>
              <TableRow
                sx={{
                  bgcolor: themeMode === "dark" ? "rgb(30 41 59)" : "#eff4fa",
                }}
              >
                <TableCell colSpan={8}>
                  <div className="flex justify-center text-red-500">
                    <span>موردی ثبت نشده است</span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {loanDocs.length === 0 && loading && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4}>
                  <Skeleton width={"100%"} height={70} variant="rounded" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>
                  <Skeleton width={"100%"} height={70} variant="rounded" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>
                  <Skeleton width={"100%"} height={70} variant="rounded" />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
