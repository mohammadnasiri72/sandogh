import {
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
} from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import DownloadExelTableReportLoan from "./DownloadExelTableReportLoan";
import DownloadPDFTableReportLoan from "./DownloadPDFTableReportLoan";
import SelectFieldTableReportLoan from "./SelectFieldTableReportLoan";

TableReportLoan.propTypes = {
  listReportLoan: PropTypes.array,
  pageIndex: PropTypes.number,
  pageSize: PropTypes.number,
  setPageIndex: PropTypes.func,
  isLoading: PropTypes.bool,
  getReportListLoan: PropTypes.func,
  setSelectedCols: PropTypes.func,
  getDataExcel: PropTypes.func,
  getDataPDF: PropTypes.func,
  isLoadingExcel: PropTypes.bool,
  isLoadingPdf: PropTypes.bool,
  selectedField: PropTypes.array,
  setSelectedField: PropTypes.func,
};
export default function TableReportLoan({
  listReportLoan,
  pageIndex,
  pageSize,
  setPageIndex,
  isLoading,
  getReportListLoan,
  getDataExcel,
  getDataPDF,
  isLoadingExcel,
  isLoadingPdf,
  selectedField,
  setSelectedField,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const fontSize = useSelector((store) => store.setting.fontSize);
  const themeColor = useSelector((store) => store.setting.themeColor);

  return (
    <>
      <div className="p-2">
        <div className="flex justify-between items-center">
          <div className="flex ">
            {listReportLoan.length > 0 && (
              <div className="px-1">
                <DownloadExelTableReportLoan
                  getDataExcel={getDataExcel}
                  isLoadingExcel={isLoadingExcel}
                />
              </div>
            )}
            {listReportLoan.length === 0 && isLoading &&(
              <div className="px-1">
                <Skeleton variant="rounded" width={110} height={35} />
              </div>
            )}
            {listReportLoan.length > 0 && (
              <div className="px-1">
                <DownloadPDFTableReportLoan
                  getDataPDF={getDataPDF}
                  isLoadingPdf={isLoadingPdf}
                />
              </div>
            )}
            {listReportLoan.length === 0 && isLoading && (
              <div className="px-1">
                <Skeleton variant="rounded" width={110} height={35} />
              </div>
            )}
          </div>
          {listReportLoan.length > 0 && (
            <SelectFieldTableReportLoan setSelectedField={setSelectedField} />
          )}
          {listReportLoan.length === 0 && isLoading && (
            <div className="px-1 pb-2">
              <Skeleton variant="rounded" width={35} height={35} />
            </div>
          )}
        </div>
        <div
          style={{
            borderColor: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
          }}
          className="border-2 p-2 relative rounded-lg"
        >
          {listReportLoan.length > 0 && (
            <div>
              <div>
                <TableContainer component={Paper} sx={{ maxHeight: "75vh" }}>
                  <Table
                    style={{ maxHeight: "none", height: "auto" }}
                    aria-label="sticky table"
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
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {listReportLoan.map((e, index) => (
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {listReportLoan[0].total > pageSize && (
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
                          siblingCount={0}
                          size="small"
                          page={pageIndex}
                          onChange={(e, value) => {
                            setPageIndex(value);
                            getReportListLoan({ page: value });
                          }}
                          count={
                            listReportLoan.length > 0
                              ? Math.ceil(listReportLoan[0].total / pageSize)
                              : 1
                          }
                        />
                      </Stack>
                      <span className="text-xs">
                        {listReportLoan.length > 0 && listReportLoan[0].total}
                        رکورد
                      </span>
                    </div>
                  </div>
                  // <div className="absolute border rounded-lg shadow-md bg-white z-50 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-2 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 w-11/12 xl:w-1/2">
                  //   <div className="flex justify-center items-center sm:w-auto w-full">
                  //     <span className="whitespace-nowrap text-sm select-none px-2">
                  //       برو به صفحه
                  //     </span>
                  //     <input
                  //       ref={inpRef}
                  //       value={valNum}
                  //       onChange={(e) => {
                  //         if (
                  //           Number(e.target.value) >= 1 &&
                  //           Number(e.target.value) <=
                  //             Math.ceil(listReportLoan[0].total / pageSize)
                  //         ) {
                  //           setValNum(e.target.value);
                  //         }
                  //         if (e.target.value === "") {
                  //           setValNum("");
                  //         }
                  //       }}
                  //       className="outline-none border w-8 h-8 number-input rounded-xl text-center"
                  //       type="text"
                  //     />
                  //     <div className="flex flex-col items-center justify-center text-orange-500 px-2">
                  //       <FaSortUp
                  //         onClick={() => {
                  //           if (
                  //             valNum <
                  //             Math.ceil(listReportLoan[0].total / pageSize)
                  //           ) {
                  //             setValNum((e) => Number(e) + 1);
                  //             inpRef.current.focus();
                  //           }
                  //         }}
                  //         className="cursor-pointer text-xs"
                  //       />
                  //       <FaSortDown
                  //         onClick={() => {
                  //           if (valNum > 1) {
                  //             setValNum((e) => Number(e) - 1);
                  //             inpRef.current.focus();
                  //           }
                  //         }}
                  //         className="cursor-pointer text-xs"
                  //       />
                  //     </div>
                  //   </div>
                  //   <div className="flex justify-center items-center text-orange-500 sm:w-auto w-full">
                  //     <FaAngleRight
                  //       onClick={() => {
                  //         if (
                  //           valNum <
                  //           Math.ceil(listReportLoan[0].total / pageSize)
                  //         ) {
                  //           setValNum((e) => Number(e) + 1);
                  //           getReportListLoan({ page: valNum });
                  //           setPageIndex(Number(valNum) + 1);
                  //         }
                  //       }}
                  //       className="text-xs cursor-pointer"
                  //     />
                  //     <span className="text-sm px-3 select-none">
                  //       صفحه {pageIndex}
                  //     </span>
                  //     <FaAngleLeft
                  //       onClick={() => {
                  //         if (valNum > 1) {
                  //           setValNum((e) => Number(e) - 1);
                  //           getReportListLoan({ page: valNum });
                  //           setPageIndex(Number(valNum) - 1);
                  //         }
                  //       }}
                  //       className="text-xs cursor-pointer"
                  //     />
                  //   </div>
                  //   <div className="flex justify-center items-center sm:w-auto w-full">
                  //     <span className="whitespace-nowrap text-sm select-none">
                  //       رکورد در صفحه
                  //     </span>
                  //     <div dir="ltr">
                  //       <select
                  //         value={pageSize}
                  //         onChange={(e) => {
                  //           setPageSize(e.target.value);
                  //           getReportListLoan({
                  //             page: 1,
                  //             pageSize: e.target.value * 25,
                  //           });
                  //           setPageIndex(1);
                  //         }}
                  //         name=""
                  //         id=""
                  //         className="bg-white border rounded-lg px-1"
                  //       >
                  //         <option value={25}>25</option>
                  //         <option value={50}>50</option>
                  //         <option value={75}>75</option>
                  //         <option value={100}>100</option>
                  //       </select>
                  //     </div>
                  //   </div>
                  // </div>
                )}
              </div>
            </div>
          )}
          {listReportLoan.length === 0 && !isLoading && (
            <div>موردی موجود نیست</div>
          )}
          {listReportLoan.length === 0 && isLoading && (
            <div>
              <div className="w-full px-4 py-2">
                <Skeleton variant="rounded" width={"100%"} height={60} />
              </div>
              <div className="w-full px-4 py-2">
                <Skeleton variant="rounded" width={"100%"} height={60} />
              </div>
              <div className="w-full px-4 py-2">
                <Skeleton variant="rounded" width={"100%"} height={60} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
