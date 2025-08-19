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
import { setLoanId } from "../../redux/slice/adminLoanRequest";
import ConfirmDeleteAdminLoanRequest from "./ConfirmDeleteAdminLoanRequest";
import ArchiveFormAdmin from "./FormLoanHandler";
import SelectFieldTableAdmin from "./SelectFieldTableAdmin";
import ShowFacilities from "./ShowFacilities";
import SuccessFormAdmin from "./SuccessFormAdmin";

TableAdminLoanRequest.propTypes = {
  listAdminLoanRequest: PropTypes.array,
  pageIndex: PropTypes.number,
  pageSize: PropTypes.number,
  isLoading: PropTypes.bool,
  setPageIndex: PropTypes.func,
  getLoanRequestAdminList: PropTypes.func,
  setFlagNumber: PropTypes.func,
  setFlagDel: PropTypes.func,
  listLoanRequestCancel: PropTypes.array,
  valTab: PropTypes.number,
  getLoanAdminList: PropTypes.func,
};
export default function TableAdminLoanRequest({
  listAdminLoanRequest,
  pageIndex,
  pageSize,
  isLoading,
  setPageIndex,
  getLoanRequestAdminList,
  setFlagDel,
  listLoanRequestCancel,
  valTab,
  getLoanAdminList
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const fontSize = useSelector((store) => store.setting.fontSize);
  const [selectedField, setSelectedField] = useState([]);
  const disPatch = useDispatch();
  const Navigate = useNavigate();
  const goToDetail = (id) => {
    disPatch(setLoanId(id));
    Navigate(`/profile/AdminLoanList/loanRequest/${id}`);
  };

  return (
    <>
      <div className="px-5 test">
        <div className="flex justify-end">
          <SelectFieldTableAdmin setSelectedField={setSelectedField} />
        </div>
        <div
          style={{
            borderColor: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
          }}
          className="border-2 p-2 relative rounded-lg"
        >
          <div>
            {(listAdminLoanRequest.length > 0 ||
              listLoanRequestCancel?.length > 0) && (
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
                          <span
                            style={{ fontWeight: 900 }}
                            className="whitespace-nowrap"
                          >
                            ردیف
                          </span>
                        </TableCell>
                        {selectedField.map((field) => (
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
                      {listAdminLoanRequest.length > 0 &&
                        listAdminLoanRequest.map((e, index) => (
                          <>
                            {/* {e.status === 4 && (
                              <TableCell
                                colSpan={8}
                                sx={{
                                  fontSize: `${fontSize}px`,
                                  p: 0,
                                  m: 0,
                                  border: "none",
                                }}
                              >
                                <StepFormTable
                                  loan={e}
                                  getLoanRequestAdminList={
                                    getLoanRequestAdminList
                                  }
                                  setPageIndex={setPageIndex}
                                />
                              </TableCell>
                            )} */}

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
                                    e.cooperativeTitle
                                  ) : field.id === 3 ? (
                                    e.title
                                  ) : field.id === 4 ? (
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
                                  ) : field.id === 5 ? (
                                    e.createdFa.slice(0, 11)
                                  ) : field.id === 6 ? (
                                    e.modifiedFa.slice(0, 11)
                                  ) : (
                                    ""
                                  )}
                                </TableCell>
                              ))}

                              <TableCell
                                sx={{
                                  position: "sticky",
                                  fontSize: `${fontSize}px`,
                                  right: 0,
                                  backgroundColor:
                                    themeMode === "dark" ? "#2d3641" : "white",
                                }}
                                align="center"
                              >
                                <div className="flex justify-start items-center">
                                  <div className="px-1">
                                    <Tooltip title="مشاهده جزئیات">
                                      {/* <Button
                                      onClick={() => {
                                        goToDetail(e.id);
                                      }}
                                      sx={{
                                        minWidth: "35px",
                                        transition: "0.6s",
                                        color: "#546de5",
                                        backgroundColor:
                                          themeMode === "dark"
                                            ? "rgb(51 65 85)"
                                            : "#edf0fd",
                                        "&:hover": {
                                          backgroundColor: "#556ee6",
                                          color: "white",
                                        },
                                        boxShadow: "none",
                                      }}
                                    >
                                      <FaEye className="text-xl" />
                                    </Button> */}
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

                                  {/* {(e.status === 4 || e.status === 5) && (
                                  <UploadFile
                                    id={e.id}
                                    cooperativeId={e.cooperativeId}
                                    getLoanRequestAdminList={
                                      getLoanRequestAdminList
                                    }
                                    setPageIndex={setPageIndex}
                                  />
                                )} */}

                                  {e.status === 5 && (
                                    <ShowFacilities
                                      status={e.loanStatus}
                                      loanId={e.loanId}
                                    />
                                  )}
                                  {/* {e.status === 4 && (
                                    <ConfirmPrimary
                                      id={e.id}
                                      cooperativeId={e.cooperativeId}
                                      getLoanRequestAdminList={
                                        getLoanRequestAdminList
                                      }
                                      setPageIndex={setPageIndex}
                                    />
                                  )} */}
                                  {e.status === 5 && (
                                    <ArchiveFormAdmin loan={e} />
                                  )}
                                  {e.status === 4 && (
                                    <SuccessFormAdmin
                                      loan={e}
                                      setPageIndex={setPageIndex}
                                      getLoanRequestAdminList={
                                        getLoanRequestAdminList
                                      }
                                      getLoanAdminList={getLoanAdminList}
                                    />
                                  )}
                                  {e.loanStatus !== 102 && (
                                    <ConfirmDeleteAdminLoanRequest
                                      id={e.id}
                                      getLoanRequestAdminList={
                                        getLoanRequestAdminList
                                      }
                                      setFlagDel={setFlagDel}
                                    />
                                  )}
                                  {/* {e.loanStatus !== 102 && e.status === 5 && (
                              <ShowFacilities />
                            )}
                            {e.loanStatus === 102 && e.status === 5 && (
                              <ShowOverdue />
                            )} */}
                                </div>
                              </TableCell>
                            </TableRow>
                          </>
                        ))}
                    </TableBody>
                    {listLoanRequestCancel && valTab === 1 && (
                      <TableBody>
                        {listLoanRequestCancel?.length > 0 &&
                          listLoanRequestCancel?.map((e, index) => (
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
                                    e.cooperativeTitle
                                  ) : field.id === 3 ? (
                                    e.title
                                  ) : field.id === 4 ? (
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
                                  ) : field.id === 5 ? (
                                    e.createdFa.slice(0, 11)
                                  ) : field.id === 6 ? (
                                    e.modifiedFa.slice(0, 11)
                                  ) : (
                                    ""
                                  )}
                                </TableCell>
                              ))}

                              <TableCell
                                sx={{
                                  position: "sticky",
                                  fontSize: `${fontSize}px`,
                                  right: 0,
                                  backgroundColor:
                                    themeMode === "dark" ? "#2d3641" : "white",
                                }}
                                align="center"
                              >
                                <div className="flex justify-start items-center">
                                  <div className="px-1">
                                    <Tooltip title="مشاهده جزئیات">
                                      {/* <Button
                                      onClick={() => {
                                        goToDetail(e.id);
                                      }}
                                      sx={{
                                        minWidth: "35px",
                                        transition: "0.6s",
                                        color: "#546de5",
                                        backgroundColor:
                                          themeMode === "dark"
                                            ? "rgb(51 65 85)"
                                            : "#edf0fd",
                                        "&:hover": {
                                          backgroundColor: "#556ee6",
                                          color: "white",
                                        },
                                        boxShadow: "none",
                                      }}
                                    >
                                      <FaEye className="text-xl" />
                                    </Button> */}
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

                                  {/* {(e.status === 4 || e.status === 5) && (
                                  <UploadFile
                                    id={e.id}
                                    cooperativeId={e.cooperativeId}
                                    getLoanRequestAdminList={
                                      getLoanRequestAdminList
                                    }
                                    setPageIndex={setPageIndex}
                                  />
                                )} */}

                                  {e.status === 5 && (
                                    <ShowFacilities
                                      status={e.loanStatus}
                                      loanId={e.loanId}
                                    />
                                  )}
                                  {/* {e.status === 4 && (
                                    <ConfirmPrimary
                                      id={e.id}
                                      cooperativeId={e.cooperativeId}
                                      getLoanRequestAdminList={
                                        getLoanRequestAdminList
                                      }
                                      setPageIndex={setPageIndex}
                                    />
                                  )} */}
                                  {e.status === 5 && (
                                    <ArchiveFormAdmin loan={e} />
                                  )}
                                  {/* {e.status === 4 && e.loanId && (
                                    <SuccessFormAdmin loan={e} />
                                  )} */}
                                  {e.loanStatus !== 102 && (
                                    <ConfirmDeleteAdminLoanRequest
                                      id={e.id}
                                      getLoanRequestAdminList={
                                        getLoanRequestAdminList
                                      }
                                      setFlagDel={setFlagDel}
                                    />
                                  )}
                                  {/* {e.loanStatus !== 102 && e.status === 5 && (
                              <ShowFacilities />
                            )}
                            {e.loanStatus === 102 && e.status === 5 && (
                              <ShowOverdue />
                            )} */}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </div>
            )}
            {listAdminLoanRequest.length > pageSize && (
              <div
                className={
                  themeMode === "dark"
                    ? "mx-auto absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-lg p-2 bg-slate-700 shadow-md z-10 w-full sm:w-auto"
                    : "mx-auto absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-lg p-2 bg-[#f4f8ff] shadow-md z-10 w-full sm:w-auto"
                }
              >
                <div className="flex justify-center items-center">
                  <Stack spacing={2}>
                    <Pagination
                      size="small"
                      page={pageIndex}
                      siblingCount={0}
                      onChange={(e, value) => {
                        setPageIndex(value);
                        getLoanRequestAdminList({ page: value });
                      }}
                      count={
                        listAdminLoanRequest.length > 0
                          ? Math.ceil(
                              listAdminLoanRequest[0].totalRows / pageSize
                            )
                          : 1
                      }
                    />
                  </Stack>
                  <span className="text-xs">
                    {listAdminLoanRequest.length > 0 &&
                      listAdminLoanRequest[0].total}
                    رکورد
                  </span>
                </div>
              </div>
            )}
          </div>
          {listAdminLoanRequest.length === 0 &&
            listLoanRequestCancel?.length === 0 &&
            isLoading && (
              <div>
                <div className="py-1">
                  <Skeleton animation="wave" variant="rounded" height={60} />
                </div>
                <div className="py-1">
                  <Skeleton animation="wave" variant="rounded" height={60} />
                </div>
                <div className="py-1">
                  <Skeleton animation="wave" variant="rounded" height={60} />
                </div>
                <div className="py-1">
                  <Skeleton animation="wave" variant="rounded" height={60} />
                </div>
              </div>
            )}
          {listAdminLoanRequest.length === 0 &&
            listLoanRequestCancel?.length === 0 &&
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
