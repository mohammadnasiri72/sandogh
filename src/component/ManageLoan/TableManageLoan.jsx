import {
  IconButton,
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
  Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoanId } from "../../redux/slice/adminLoan";
import UploadFile from "../ManageLoanRequest/UploadFile";
import DatePaidConfirm from "./DatePaidConfirm";
import DateReceivedConfirm from "./DateReceivedConfirm";
import DropDownForm from "./DropDownForm";
import SelectFieldTableAdminLoan from "./SelectFieldTableAdminLoan";
import ModalBackLoan from "./modalBackLoan";

TableManageLoan.propTypes = {
  listAdminLoan: PropTypes.array,
  isLoading: PropTypes.bool,
  pageIndex: PropTypes.number,
  pageSize: PropTypes.number,
  setPageIndex: PropTypes.func,
  getLoanAdminList: PropTypes.func,
};
export default function TableManageLoan({
  listAdminLoan,
  isLoading,
  pageIndex,
  pageSize,
  setPageIndex,
  getLoanAdminList,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const fontSize = useSelector((store) => store.setting.fontSize);
  const [selectedField, setSelectedField] = useState([]);
  const [flag, setFlag] = useState(false);
  const valTab = useSelector((store) => store.adminLoan.valTab);
  const Navigate = useNavigate();
  const disPatch = useDispatch();
  const goToEdit = (id) => {
    disPatch(setLoanId(id));
    Navigate(`/profile/AdminLoanList/${id}`);
  };

  return (
    <>
      <div className="px-5 test">
        <div className="flex justify-end">
          <SelectFieldTableAdminLoan setSelectedField={setSelectedField} />
        </div>
        <div
          style={{
            borderColor: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
          }}
          className="border-2 p-2 relative rounded-lg"
        >
          {listAdminLoan.length > 0 && !isLoading && (
            <div>
              <div className="relative">
                <TableContainer component={Paper} sx={{ maxHeight: "75vh" }}>
                  <Table
                    style={{ maxHeight: "none", height: "auto" }}
                    aria-label="sticky table"
                  >
                    <TableHead
                      sx={{
                        "& th": {
                          backgroundColor:
                            themeMode === "dark" ? "#262b3c" : "#f4f8ff",
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
                          <span
                            style={{ fontWeight: 900 }}
                            className="whitespace-nowrap"
                          >
                            ردیف
                          </span>
                        </TableCell>
                        {/* {valTab === 2 && (
                          <TableCell align="center" sx={{ color: "white" }}>
                            <span
                              style={{ fontWeight: 900 }}
                              className="whitespace-nowrap"
                            >
                              وضعیت
                            </span>
                          </TableCell>
                        )} */}
                        {selectedField
                          .filter((e) => e.id === 1)
                          .map((field) => (
                            <TableCell
                              key={field.id}
                              align="center"
                              sx={{ color: "white" }}
                            >
                              <span
                                style={{ fontWeight: 900 }}
                                className="whitespace-nowrap"
                              >
                                کد
                              </span>
                            </TableCell>
                          ))}

                        <TableCell align="center" sx={{ color: "white" }}>
                          <span
                            style={{ fontWeight: 900 }}
                            className="whitespace-nowrap"
                          >
                            عنوان تشکل
                          </span>
                        </TableCell>
                        {selectedField
                          .filter(
                            (e) =>
                              e.id === 2 ||
                              e.id === 3 ||
                              e.id === 4 ||
                              e.id === 5 ||
                              e.id === 6
                          )
                          .map((field) => (
                            <TableCell
                              key={field.id}
                              sx={{ color: "white" }}
                              align="center"
                            >
                              <span
                                style={{ fontWeight: 900 }}
                                className="whitespace-nowrap"
                              >
                                {field.title}
                              </span>
                            </TableCell>
                          ))}
                        <TableCell align="center" sx={{ color: "white" }}>
                          <span
                            style={{ fontWeight: 900 }}
                            className="whitespace-nowrap"
                          >
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
                              <span
                                style={{ fontWeight: 900 }}
                                className="whitespace-nowrap"
                              >
                                {field.title}
                              </span>
                            </TableCell>
                          ))}

                        <TableCell
                          sx={{
                            position: "sticky",
                            right: 0,
                            backgroundColor: "transparent",
                          }}
                          align="center"
                        >
                          <span
                            style={{ fontWeight: 900 }}
                            className="whitespace-nowrap"
                          >
                            عملیات
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listAdminLoan.length > 0 &&
                        listAdminLoan.map((e, index) => (
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
                            {/* {valTab === 2 && (
                              <TableCell
                                align="center"
                                sx={{
                                  fontSize: `${fontSize}px`,
                                  position: "relative",
                                }}
                              >
                                <Flex
                                  gap="small"
                                  wrap
                                  style={{
                                    scale: "0.8",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                  }}
                                >
                                  <Tooltip
                                    title={
                                      e.formStatus === 1
                                        ? "فرم درخواست تسهیلات"
                                        : e.formStatus === 2
                                        ? "فرم قرارداد"
                                        : e.formStatus === 3
                                        ? "فرم دستور پرداخت"
                                        : e.formStatus === 4
                                        ? "فرم صورت حساب"
                                        : ""
                                    }
                                  >
                                    <IconButton
                                      sx={{
                                        "&:hover": {
                                          backgroundColor: "transparent",
                                        },
                                      }}
                                    >
                                      <Progress
                                        size="small"
                                        type="circle"
                                        percent={(e.formStatus / 4) * 100}
                                        steps={{ count: 4, gap: 7 }}
                                        trailColor="rgba(0, 0, 0, 0.06)"
                                        strokeWidth={20}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </Flex>
                              </TableCell>
                            )} */}

                            {selectedField
                              .filter((e) => e.id === 1)
                              .map((field) => (
                                <TableCell
                                  key={field.id}
                                  align="center"
                                  sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: `${fontSize}px`,
                                  }}
                                >
                                  {field.id === 1 ? e.id : ""}
                                </TableCell>
                              ))}

                            <TableCell sx={{ fontSize: `${fontSize}px` }}>
                              <span className="whitespace-nowrap flex justify-center">
                                {e.cooperativeTitle}
                              </span>
                            </TableCell>
                            {selectedField
                              .filter(
                                (e) =>
                                  e.id === 2 ||
                                  e.id === 3 ||
                                  e.id === 4 ||
                                  e.id === 5 ||
                                  e.id === 6
                              )
                              .map((field) => (
                                <TableCell
                                  key={field.id}
                                  align="center"
                                  sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: `${fontSize}px`,
                                  }}
                                >
                                  {field.id === 2
                                    ? e.meetingDateFa
                                    : field.id === 3
                                    ? e.meetingNumber
                                    : field.id === 4
                                    ? e.contractNumber
                                    : field.id === 5
                                    ? e.contractDateFa
                                    : e.paymentDateFa}
                                </TableCell>
                              ))}

                            <TableCell sx={{ fontSize: `${fontSize}px` }}>
                              <span className="whitespace-nowrap flex justify-center">
                                {e.amount.toLocaleString()}
                              </span>
                            </TableCell>

                            {selectedField
                              .filter((e) => e.id > 6)
                              .map((field) => (
                                <TableCell
                                  key={field.id}
                                  align="center"
                                  sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: `${fontSize}px`,
                                  }}
                                >
                                  {field.id === 2 ? (
                                    e.meetingDateFa
                                  ) : field.id === 3 ? (
                                    e.contractNumber
                                  ) : field.id === 4 ? (
                                    e.contractDateFa
                                  ) : field.id === 5 ? (
                                    e.paymentDateFa
                                  ) : field.id === 6 ? (
                                    e.wagePercent
                                  ) : field.id === 7 ? (
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

                            <TableCell
                              sx={{
                                position: "sticky",
                                right: 0,
                                backgroundColor:
                                  themeMode === "dark" ? "#2d3641" : "white",
                                fontSize: `${fontSize}px`,
                              }}
                              align="center"
                            >
                              <div className="flex justify-center items-center">
                                <div className="px-1">
                                  <Tooltip title="مشاهده جزئیات">
                                    <IconButton
                                      onClick={() => {
                                        goToEdit(e.id);
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
                                {(valTab === 3 || valTab === 5) && (
                                  <UploadFile id={e.loanRequestId} />
                                )}

                                {/* {!(e.formStatus === 0 && e.status > 100) && (
                                  <div className="px-1">
                                    <DropDownForm
                                      LoanEdited={e}
                                      flag={flag}
                                      setFlag={setFlag}
                                      getLoanAdminList={getLoanAdminList}
                                    />
                                  </div>
                                )} */}
                                <DropDownForm
                                  LoanEdited={e}
                                  flag={flag}
                                  setFlag={setFlag}
                                  getLoanAdminList={getLoanAdminList}
                                />

                                {valTab === 2 && (
                                  <DatePaidConfirm
                                    loan={e}
                                    getLoanAdminList={getLoanAdminList}
                                  />
                                )}
                                {(valTab === 4 || valTab === 7) && (
                                  <DateReceivedConfirm
                                    loan={e}
                                    getLoanAdminList={getLoanAdminList}
                                  />
                                )}
                                {(valTab === 2 ||
                                  valTab === 3 ||
                                  valTab === 4 ||
                                  valTab === 5 ||
                                  valTab === 7) && (
                                  <ModalBackLoan
                                    id={e.id}
                                    setFlagDel={setFlag}
                                    getLoanAdminList={getLoanAdminList}
                                  />
                                )}
                                {/* {valTab === 2 && (
                                  <ModalDel
                                    id={e.id}
                                    setFlagDel={setFlag}
                                    getLoanRequestAdminList={getLoanAdminList}
                                  />
                                )} */}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {listAdminLoan[0].total > pageSize && (
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
                          size="small"
                          siblingCount={0}
                          page={pageIndex}
                          onChange={(e, value) => {
                            setPageIndex(value);
                            getLoanAdminList({ page: value });
                          }}
                          count={
                            listAdminLoan.length > 0
                              ? Math.ceil(listAdminLoan[0].total / pageSize)
                              : 1
                          }
                        />
                      </Stack>
                      <span className="text-xs">
                        {listAdminLoan.length > 0 && listAdminLoan[0].total}
                        رکورد
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {listAdminLoan.length === 0 && !isLoading && (
            <div className="mt-3 flex flex-col justify-center items-center">
              <span>موردی موجود نیست</span>
              <img className="w-56" src="/images/error-img.png" alt="" />
            </div>
          )}
          {listAdminLoan.length === 0 && isLoading && (
            <div className="mt-2">
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
