import {
  FormControl,
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
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { useSelector } from "react-redux";
import { mainDomain } from "../../utils/mainDomain";
import ModalVisitFormSupervisor from "./ModalVisitFormSupervisor";

export default function MainPageHomeDashboardSupervisor() {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const setting = useSelector((store) => store.setting.setting);
  const fontSize = useSelector((store) => store.setting.fontSize);
  const mainPageState = useSelector((store) => store.resetState.mainPageState);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  const [pageIndex, setPageIndex] = useState(1);
  const [listSupervisorLoan, setListSupervisorLoan] = useState([]);
  const [day, setDay] = useState(30);

  

  useEffect(() => {
    if (setting.length > 0) {
      setDay(
        Number(
          setting.find((ev) => ev.propertyKey === "site_supervisor_day")?.value
        )
      );
    }
  }, [setting]);

  //   get Loan list
  const config = {
    method: "get",
    url: `${mainDomain}/api/Loan/Supervisor`,
    params: {
      pageSize,
      page: pageIndex,
    },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const getLoanAdminList = async (newParams) => {
    config.params = { ...config.params, ...newParams };
    setListSupervisorLoan([]);
    setIsLoading(true);
    await axios(config)
      .then((res) => {
        setIsLoading(false);
        setListSupervisorLoan(res.data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getLoanAdminList();
  }, [mainPageState]);

  return (
    <>
      <div className="mt-10 px-3">
        <div className="w-44 px-2 mb-3">
          <FormControl size="small" color="primary" className="w-full">
            <InputLabel
              color="primary"
              className="px-2"
              id="demo-simple-select-label"
            >
              تعداد رکورد
            </InputLabel>
            <Select
              size="small"
              className="w-full"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pageSize}
              label=" تعداد رکورد"
              color="primary"
              onChange={(e) => {
                setPageSize(e.target.value);
                getLoanAdminList({
                  pageSize: e.target.value,
                  page: 1,
                });
                setPageIndex(1);
              }}
            >
              {[25, 50, 75, 100].map((e) => (
                <MenuItem sx={{ fontSize: "12px" }} key={e} value={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="px-5">
        {/* <div className="flex justify-end">
          <SelectFieldTableSupervisorLoan setSelectedField={setSelectedField} />
        </div> */}
        <div
          style={{
            borderColor: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
          }}
          className="border-2 p-2 relative rounded-lg"
        >
          {listSupervisorLoan.length > 0 && !isLoading && (
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
                        {/* {selectedField
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
                          ))} */}

                        <TableCell align="center" sx={{ color: "white" }}>
                          <span
                            style={{ fontWeight: 900 }}
                            className="whitespace-nowrap"
                          >
                            مانده ( روز )
                          </span>
                        </TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>
                          <span
                            style={{ fontWeight: 900 }}
                            className="whitespace-nowrap"
                          >
                            عنوان تشکل
                          </span>
                        </TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>
                          <span
                            style={{ fontWeight: 900 }}
                            className="whitespace-nowrap"
                          >
                            تاریخ سررسید
                          </span>
                        </TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>
                          <span
                            style={{ fontWeight: 900 }}
                            className="whitespace-nowrap"
                          >
                            تاریخ پرداخت
                          </span>
                        </TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>
                          <span
                            style={{ fontWeight: 900 }}
                            className="whitespace-nowrap"
                          >
                            شماره قرارداد
                          </span>
                        </TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>
                          <span
                            style={{ fontWeight: 900 }}
                            className="whitespace-nowrap"
                          >
                            مبلغ تسهیلات
                          </span>
                        </TableCell>

                        {/* {selectedField
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
                        */}

                        {/* {selectedField.map((field) => (
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
                        ))} */}

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
                      {listSupervisorLoan.length > 0 &&
                        listSupervisorLoan.map((e, index) => (
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

                            <TableCell sx={{ fontSize: `${fontSize}px` }}>
                              {e.formStatus !== 5 ? (
                                <span className="whitespace-nowrap flex justify-center">
                                  <span
                                    style={{
                                      animation:
                                        e.loanMaturityRemainDay < 60 &&
                                        e.loanMaturityRemainDay >= day
                                          ? "puls-red 1.5s infinite"
                                          : e.loanMaturityRemainDay < 90 &&
                                            e.loanMaturityRemainDay >= 60
                                          ? "puls-orange 1.5s infinite"
                                          : e.loanMaturityRemainDay >= 90
                                          ? "puls-green 1.5s infinite"
                                          : "",
                                    }}
                                    className={
                                      e.loanMaturityRemainDay < 60 &&
                                      e.loanMaturityRemainDay >= day
                                        ? "rounded-full w-10 h-10 flex justify-center items-center border-2 border-red-500 bg-red-200"
                                        : e.loanMaturityRemainDay < 90 &&
                                          e.loanMaturityRemainDay >= 60
                                        ? "rounded-full w-10 h-10 flex justify-center items-center border-2 border-orange-500 bg-orange-200"
                                        : e.loanMaturityRemainDay >= 90
                                        ? "rounded-full w-10 h-10 flex justify-center items-center border-2 border-emerald-500 bg-emerald-200"
                                        : "text-red-500"
                                    }
                                  >
                                    {e.loanMaturityRemainDay < day ? (
                                      <div className="whitespace-nowrap flex justify-center items-center">
                                        <IoIosClose className="text-lg" />
                                        <span>منقضی شده</span>
                                      </div>
                                    ) : (
                                      e.loanMaturityRemainDay
                                    )}
                                  </span>
                                </span>
                              ) : (
                                <div className="whitespace-nowrap flex justify-center items-center text-emerald-500">
                                  <MdDone className="text-sm" />
                                  <span className="px-1">ارسال شده</span>
                                </div>
                              )}
                            </TableCell>
                            <TableCell sx={{ fontSize: `${fontSize}px` }}>
                              <span className="whitespace-nowrap flex justify-center">
                                {e.cooperativeTitle}
                              </span>
                            </TableCell>
                            <TableCell sx={{ fontSize: `${fontSize}px` }}>
                              <span className="whitespace-nowrap flex justify-center">
                                {e.loanMaturityFa}
                              </span>
                            </TableCell>
                            <TableCell sx={{ fontSize: `${fontSize}px` }}>
                              <span className="whitespace-nowrap flex justify-center">
                                {e.paymentDateFa}
                              </span>
                            </TableCell>
                            <TableCell sx={{ fontSize: `${fontSize}px` }}>
                              <span className="whitespace-nowrap flex justify-center">
                                {e.contractNumber}
                              </span>
                            </TableCell>

                            <TableCell sx={{ fontSize: `${fontSize}px` }}>
                              <span className="whitespace-nowrap flex justify-center">
                                {e.amount.toLocaleString()}
                              </span>
                            </TableCell>

                            {/* {selectedField.map((field) => (
                              <TableCell
                                key={field.id}
                                align="center"
                                sx={{
                                  whiteSpace: "nowrap",
                                  fontSize: `${fontSize}px`,
                                }}
                              >
                                {field.id === 1 ? (
                                  e.id
                                ) : field.id === 2 ? (
                                  e.meetingDateFa
                                ) : field.id === 3 ? (
                                  e.meetingNumber
                                ) : field.id === 4 ? (
                                  e.contractNumber
                                ) : field.id === 5 ? (
                                  e.contractDateFa
                                ) : field.id === 6 ? (
                                  e.paymentDateFa
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
                            ))} */}

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
                              <ModalVisitFormSupervisor Supervisor={e} day={day}/>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {listSupervisorLoan[0].total > pageSize && (
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
                          }}
                          count={
                            listSupervisorLoan.length > 0
                              ? Math.ceil(
                                  listSupervisorLoan[0].total / pageSize
                                )
                              : 1
                          }
                        />
                      </Stack>
                      <span className="text-xs">
                        {listSupervisorLoan.length > 0 &&
                          listSupervisorLoan[0].total}
                        رکورد
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {listSupervisorLoan.length === 0 && !isLoading && (
            <div className="mt-3 flex flex-col justify-center items-center">
              <span>موردی موجود نیست</span>
              <img className="w-56" src="/images/error-img.png" alt="" />
            </div>
          )}
          {listSupervisorLoan.length === 0 && isLoading && (
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
