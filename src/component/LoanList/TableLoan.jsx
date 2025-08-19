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
import { useState } from "react";
import { useSelector } from "react-redux";
import ModalVisitForm from "./ModalVisitForm";
import SelectFieldTableLoan from "./SelectFieldTableLoan";
import VisitFile from "./VisitFile";
// import VisitFile from "./VisitFile";

TableLoan.propTypes = {
  listLoan: PropTypes.array,
  isLoading: PropTypes.bool,
  pageSize: PropTypes.number,
  pageIndex: PropTypes.number,
  setPageIndex: PropTypes.func,
  getLoanList: PropTypes.func,
  valTab: PropTypes.number,
};
export default function TableLoan({
  listLoan,
  isLoading,
  pageSize,
  pageIndex,
  setPageIndex,
  getLoanList,
  valTab,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const fontSize = useSelector((store) => store.setting.fontSize);
  const [selectedField, setSelectedField] = useState([]);

  return (
    <>
      <div className="px-5">
        <div className="flex justify-end">
          <SelectFieldTableLoan setSelectedField={setSelectedField} />
        </div>
        <div
          style={{
            borderColor: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
          }}
          className="border-2 p-2 relative rounded-lg"
        >
          {listLoan.length > 0 && (
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
                        <TableCell sx={{ color: "white" }}>
                          <span className="font-bold whitespace-nowrap">
                            ردیف
                          </span>
                        </TableCell>

                        {selectedField
                          .filter((e) => e.id <= 6)
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

                        <TableCell align="center" sx={{ color: "white" }}>
                          <span className="font-bold whitespace-nowrap">
                            مبلغ تسهیلات
                          </span>
                        </TableCell>

                        {selectedField
                          .filter((e) => e.id > 6)
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
                        {(valTab === 2 || valTab === 5) && (
                          <TableCell sx={{ color: "white" }} align="center">
                            <span className="font-bold whitespace-nowrap">
                              فایل قرارداد
                            </span>
                          </TableCell>
                        )}
                        {(valTab === 3 || valTab === 5) && (
                          <TableCell sx={{ color: "white" }} align="center">
                            <span className="font-bold whitespace-nowrap">
                              فایل های ضمیمه
                            </span>
                          </TableCell>
                        )}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {listLoan.map((e, index) => (
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
                          <TableCell sx={{ fontSize: `${fontSize}px` }}>
                            <span className="pr-2">
                              {(pageIndex - 1) * pageSize + index + 1}
                            </span>
                          </TableCell>

                          {selectedField
                            .filter((field) => field.id <= 6)
                            .map((field) => (
                              <TableCell
                                key={field.id}
                                align="center"
                                sx={{
                                  whiteSpace: "nowrap",
                                  fontSize: `${fontSize}px`,
                                }}
                              >
                                {field.id === 1
                                  ? e.id
                                  : field.id === 2
                                    ? e.meetingDateFa
                                    : field.id === 3
                                      ? e.meetingNumber
                                      : field.id === 4
                                        ? e.contractNumber
                                        : field.id === 5
                                          ? e.paymentDateFa
                                          : field.id === 6
                                            ? e.contractDateFa
                                            : ""}
                              </TableCell>
                            ))}

                          <TableCell sx={{ fontSize: `${fontSize}px` }}>
                            <span className="whitespace-nowrap flex justify-center">
                              {e.amount.toLocaleString()}
                            </span>
                          </TableCell>

                          {selectedField
                            .filter((field) => field.id > 6)
                            .map((field) => (
                              <TableCell
                                key={field.id}
                                align="center"
                                sx={{
                                  whiteSpace: "nowrap",
                                  fontSize: `${fontSize}px`,
                                }}
                              >
                                {field.id === 7 ? (
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
                            ))}

                          {(valTab === 2 || valTab === 5) && (
                            <TableCell
                              sx={{ fontSize: `${fontSize}px` }}
                              align="center"
                            >
                              <div className="flex justify-center items-center">
                                {/* {e.status !== 100 && e.loanRequestId > 0 && (
                                <VisitFile id={e.loanRequestId} />
                              )} */}
                                {e.loanRequestId > 0 && (
                                  <ModalVisitForm loan={e} />
                                )}
                              </div>
                            </TableCell>
                          )}
                          {(valTab === 3 || valTab === 5) && (
                            <TableCell
                              sx={{ fontSize: `${fontSize}px` }}
                              align="center"
                            >
                              <div className="flex justify-center items-center">
                                {e.status !== 100 && e.loanRequestId > 0 && (
                                  <VisitFile id={e.loanRequestId} />
                                )}
                              </div>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {listLoan[0].total > pageSize && (
                  <div className="flex justify-center items-center mt-2">
                    <Stack spacing={2}>
                      <Pagination
                        page={pageIndex}
                        onChange={(e, value) => {
                          setPageIndex(value);
                          getLoanList({ page: value });
                        }}
                        count={
                          listLoan.length > 0
                            ? Math.ceil(listLoan[0].total / pageSize)
                            : 1
                        }
                      />
                    </Stack>
                    <span className="text-xs">
                      {listLoan.length > 0 && listLoan[0].total}
                      رکورد
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {listLoan.length === 0 && !isLoading && (
            <div className="mt-3 flex flex-col justify-center items-center">
              <span>موردی موجود نیست</span>
              <img className="w-56" src="/images/error-img.png" alt="" />
            </div>
          )}
          {listLoan.length === 0 && isLoading && (
            <div>
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
