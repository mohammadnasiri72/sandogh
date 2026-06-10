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
import { setLoanId } from "../../redux/slice/loanRequest";
import ConfirmDeleteLoanRequest from "./ConfirmDeleteLoanRequest";
import SelectFieldTable from "./SelectFieldTable";

TableLoanRequest.propTypes = {
  listLoanRequest: PropTypes.array,
  listLoanRequestCancel: PropTypes.array,
  isLoading: PropTypes.bool,
  pageSize: PropTypes.number,
  pageIndex: PropTypes.number,
  getLoanRequestList: PropTypes.func,
  setPageIndex: PropTypes.func,
  setPageState: PropTypes.func,
  valTab: PropTypes.number,
};
export default function TableLoanRequest({
  listLoanRequest,
  isLoading,
  pageSize,
  pageIndex,
  getLoanRequestList,
  setPageIndex,
  listLoanRequestCancel,
  valTab,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const fontSize = useSelector((store) => store.setting.fontSize);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const [selectedField, setSelectedField] = useState([]);
  const disPatch = useDispatch();
  const Navigate = useNavigate();
  const goToDetail = (id) => {
    disPatch(setLoanId(id));
    Navigate(`/profile/LoanList/${id}`);
  };

  

  return (
    <>
      <div className="px-5">
        <div className="flex justify-end">
          <SelectFieldTable setSelectedField={setSelectedField} />
        </div>
        <div
          style={{
            borderColor: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
          }}
          className="border-2 p-2 relative rounded-lg"
        >
          {(listLoanRequest.length > 0 || listLoanRequestCancel.length > 0) && (
            <div>
              <div>
                <TableContainer component={Paper}>
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
                      <TableRow>
                        <TableCell sx={{ color: "white" }}>
                          <span className="font-bold whitespace-nowrap">
                            ردیف
                          </span>
                        </TableCell>
                        {selectedField.map((field) => (
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

                        <TableCell
                          sx={{
                            position: "sticky",
                            right: 0,
                            backgroundColor: "transparent",
                          }}
                          align="center"
                        >
                          <span className="font-bold whitespace-nowrap">
                            عملیات
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {/* {valTab === 1 && (
                      <TableRow>
                        <TableCell
                          style={{
                            fontWeight: "bolder",
                            color: "green",
                            whiteSpace: "nowrap",
                          }}
                        >
                          تایید شده
                        </TableCell>
                      </TableRow>
                    )} */}
                    <TableBody>
                      {listLoanRequest.map((e, index) => (
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

                          {selectedField.map((field) => (
                            <TableCell
                              key={field.id}
                              align="center"
                              sx={{
                                whiteSpace: "nowrap",
                                fontSize: `${fontSize}px`,
                              }}
                            >
                              {field.id === 1 ? (
                                e.code
                              ) : field.id === 2 ? (
                                e.title
                              ) : field.id === 3 ? (
                                e.amount.toLocaleString()
                              ) : field.id === 4 ? (
                                e.inputType +
                                " / " +
                                e.volume.toLocaleString() +
                                "kg"
                              ) : field.id === 5 ? (
                                e.status === 1 ? (
                                  <span className="text-teal-600 bg-teal-50 rounded-full px-2 select-none">
                                    منتظر ارسال مدرک
                                  </span>
                                ) : e.status === 2 ? (
                                  <span className="text-yellow-600 bg-yellow-50 rounded-full px-2 select-none">
                                    در حال بررسی
                                  </span>
                                ) : e.status === 3 ? (
                                  <span className="text-red-600 bg-red-50 rounded-full px-2 select-none">
                                    رد شده
                                  </span>
                                ) : e.status === 4 ? (
                                  <span className="text-emerald-600 bg-emerald-50 rounded-full px-2 select-none">
                                    تایید شده
                                  </span>
                                ) : e.status === 5 ? (
                                  <span className="text-orange-600 bg-orange-50 rounded-full px-2 select-none">
                                    آرشیو شده
                                  </span>
                                ) : (
                                  ""
                                )
                              ) : field.id === 6 ? (
                                e.createdFa.slice(0, 11)
                              ) : field.id === 7 ? (
                                e.modifiedFa.slice(0, 11)
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
                            <div className="justify-start items-center flex">
                              <div className="px-1">
                                <Tooltip title="مشاهده جزئیات">
                                  <IconButton
                                    onClick={() => {
                                      goToDetail(e.id);
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
                              {/* {e.status === 4 && (
                                <ModalDetailsFormContract loan={e} />
                              )} */}
                              {e.status !== 2 && e.status !== 4 && (
                                <ConfirmDeleteLoanRequest
                                  id={e.id}
                                  getLoanRequestList={getLoanRequestList}
                                />
                              )}

                             
                            </div>
                            {/* <div className="sm:hidden flex">
                              <ActionResponsive goToDetail={goToDetail} e={e} />
                            </div> */}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    {listLoanRequestCancel && valTab === 1 && (
                      <>
                        {/* <TableRow>
                          <TableCell
                            style={{
                              fontWeight: "bolder",
                              color: "red",
                              whiteSpace: "nowrap",
                            }}
                          >
                            رد شده
                          </TableCell>
                        </TableRow> */}
                        <TableBody>
                          {listLoanRequestCancel.map((e, index) => (
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

                              {selectedField.map((field) => (
                                <TableCell
                                  key={field.id}
                                  align="center"
                                  sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: `${fontSize}px`,
                                  }}
                                >
                                  {field.id === 1 ? (
                                    e.code
                                  ) : field.id === 2 ? (
                                    e.title
                                  ) : field.id === 3 ? (
                                    e.amount.toLocaleString()
                                  ) : field.id === 4 ? (
                                    e.inputType +
                                    " / " +
                                    e.volume.toLocaleString() +
                                    "kg"
                                  ) : field.id === 5 ? (
                                    e.status === 1 ? (
                                      <span className="text-teal-600 bg-teal-50 rounded-full px-2 select-none">
                                        منتظر ارسال مدرک
                                      </span>
                                    ) : e.status === 2 ? (
                                      <span className="text-yellow-600 bg-yellow-50 rounded-full px-2 select-none">
                                        در حال بررسی
                                      </span>
                                    ) : e.status === 3 ? (
                                      <span className="text-red-600 bg-red-50 rounded-full px-2 select-none">
                                        رد شده
                                      </span>
                                    ) : e.status === 4 ? (
                                      <span className="text-emerald-600 bg-emerald-50 rounded-full px-2 select-none">
                                        تایید شده
                                      </span>
                                    ) : e.status === 5 ? (
                                      <span className="text-orange-600 bg-orange-50 rounded-full px-2 select-none">
                                        آرشیو شده
                                      </span>
                                    ) : (
                                      ""
                                    )
                                  ) : field.id === 6 ? (
                                    e.createdFa.slice(0, 11)
                                  ) : field.id === 7 ? (
                                    e.modifiedFa.slice(0, 11)
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
                                <div className="justify-start items-center flex">
                                  <div className="px-1">
                                    <Tooltip title="مشاهده جزئیات">
                                      <IconButton
                                        onClick={() => {
                                          goToDetail(e.id);
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
                                  {/* {e.status === 4 && (
                                    <ModalDetailsFormContract loan={e} />
                                  )} */}
                                  {e.status !== 2 && e.status !== 4 && (
                                    <ConfirmDeleteLoanRequest
                                      id={e.id}
                                      getLoanRequestList={getLoanRequestList}
                                    />
                                  )}

                                  
                                </div>
                                {/* <div className="sm:hidden flex">
                              <ActionResponsive goToDetail={goToDetail} e={e} />
                            </div> */}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </>
                    )}
                  </Table>
                </TableContainer>
                {listLoanRequest.length > pageSize && (
                  <div className="flex justify-center items-center mt-2">
                    <Stack spacing={2}>
                      <Pagination
                        page={pageIndex}
                        onChange={(e, value) => {
                          setPageIndex(value);
                          getLoanRequestList({ page: value });
                        }}
                        count={
                          listLoanRequest.length > 0
                            ? Math.ceil(listLoanRequest[0].totalRows / pageSize)
                            : 0
                        }
                      />
                    </Stack>
                    <span className="text-xs">
                      {listLoanRequest.length > 0 &&
                        listLoanRequest[0].totalRows}{" "}
                      رکورد
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {listLoanRequest.length === 0 &&
            listLoanRequestCancel.length === 0 &&
            isLoading && (
              <div>
                <div className="p-3">
                  <Skeleton width={"100%"} height={70} variant="rounded" />
                </div>
                <div className="p-3">
                  <Skeleton width={"100%"} height={70} variant="rounded" />
                </div>
                <div className="p-3">
                  <Skeleton width={"100%"} height={70} variant="rounded" />
                </div>
              </div>
            )}
          {listLoanRequest.length === 0 &&
            listLoanRequestCancel.length === 0 &&
            !isLoading && (
              <div className="mt-3 flex flex-col justify-center items-center">
                <span>موردی موجود نیست</span>
                <img className="w-56" src="/images/error-img.png" alt="" />
              </div>
            )}
        </div>
      </div>
    </>
  );
}
