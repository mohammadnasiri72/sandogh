import {
  IconButton,
  Pagination,
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCooperativeId, setNumPages } from "../../redux/slice/cooperative";
import ConfirmDelete from "./ConfirmDelete";
import UserAccount from "./UserAccount";
import ActionResponsive from "./ActionResponsive";

TableCooperative.propTypes = {
  getCooperativeList: PropTypes.func,
};

export default function TableCooperative({ getCooperativeList }) {
  const numPages = useSelector((store) => store.cooperative.numPages);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const showFieldTable = useSelector(
    (store) => store.cooperative.showFieldTable
  );
  const listCooperative = useSelector(
    (store) => store.cooperative.listCooperative
  );
  const dispatch = useDispatch();
  const valRecordCooperative = useSelector(
    (store) => store.cooperative.valRecordCooperative
  );
  const isLoading = useSelector((store) => store.cooperative.isLoading);

  const Navigate = useNavigate();
  const themeMode = useSelector((store) => store.setting.themeMode);
  const fontSize = useSelector((store) => store.setting.fontSize);

  const goToDetail = (id) => {
    dispatch(setCooperativeId(id));
    Navigate(`/profile/AdminCooperative/${id}`);
  };

  return (
    <>
      <div className="px-2 test">
        <div
          style={{
            borderColor: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
          }}
          className="border-2 relative rounded-lg"
        >
          <div className="">
            <div className="p-3">
              {listCooperative.length > 0 && (
                <TableContainer
                  sx={{
                    maxHeight: "75vh",
                  }}
                >
                  <Table
                    sx={{ minWidth: 650, position: "relative" }}
                    stickyHeader
                    aria-label="sticky table"
                  >
                    <TableHead
                      sx={{
                        "& th": {
                          backgroundColor:
                            themeMode === "dark" ? "#262b3c" : "#ecf3ff",
                          color: themeMode === "dark" ? "#fffb" : "#000b",
                          fontSize: `${fontSize}px`,
                        },
                        "& tr": {
                          borderRadius: "20px !important",
                        },
                      }}
                    >
                      <TableRow>
                        <TableCell align="center">
                          <span
                            style={{ fontWeight: 900 }}
                            className="whitespace-nowrap"
                          >
                            اولویت
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          <span
                            style={{ fontWeight: 900 }}
                            className=" whitespace-nowrap"
                          >
                            استان
                          </span>
                        </TableCell>
                        {showFieldTable.length > 0 &&
                          showFieldTable.map((field) => (
                            <TableCell key={field.id} align="center">
                              <span
                                style={{ fontWeight: 900 }}
                                className=" whitespace-nowrap"
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
                      {listCooperative.length > 0 &&
                        listCooperative.map((cooperative) => (
                          <TableRow
                            key={cooperative.id}
                            sx={{
                              "&:hover": {
                                backgroundColor:
                                  themeMode === "dark"
                                    ? "rgb(51 65 85)"
                                    : "#f8f9fa",
                              },
                            }}
                          >
                            <TableCell
                              sx={{ fontSize: `${fontSize}px` }}
                              align="center"
                            >
                              <span className="whitespace-nowrap">
                                {cooperative.priority}
                              </span>
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: `${fontSize}px` }}
                              align="center"
                            >
                              <span className="whitespace-nowrap">
                                {cooperative.province}
                              </span>
                            </TableCell>

                            {showFieldTable.length > 0 &&
                              showFieldTable.map((field) => (
                                <TableCell
                                  sx={{ fontSize: `${fontSize}px` }}
                                  key={field.id}
                                  align="center"
                                >
                                  <span className="whitespace-nowrap">
                                    {field.id === 1
                                      ? cooperative.title
                                      : field.id === 2
                                      ? cooperative.memberDateFa
                                      : field.id === 3
                                      ? cooperative.registerNumber
                                      : field.id === 4
                                      ? cooperative.registerDateFa
                                      : field.id === 5
                                      ? cooperative.registerPlace
                                      : field.id === 6
                                      ? cooperative.nationalId
                                      : field.id === 7
                                      ? cooperative.shareholderCode
                                      : field.id === 8
                                      ? cooperative.economicCode
                                      : field.id === 9
                                      ? cooperative.mobile
                                      : field.id === 10
                                      ? cooperative.tel
                                      : field.id === 11
                                      ? cooperative.fax
                                      : cooperative.status}
                                  </span>
                                </TableCell>
                              ))}

                            <TableCell
                              sx={{
                                position: "sticky",
                                right: 0,
                                backgroundColor:
                                  themeMode === "dark" ? "#161c24" : "white",
                                // border:'none'
                              }}
                              align="center"
                            >
                              <div className="justify-center items-center sm:flex hidden">
                                <div className="px-1">
                                  <Tooltip title="مشاهده جزئیات">
                                    <IconButton
                                      onClick={() => {
                                        goToDetail(cooperative.id);
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
                                <div className="px-1">
                                  <UserAccount
                                    nationalId={cooperative.nationalId}
                                  />
                                </div>

                                <ConfirmDelete
                                  id={cooperative.id}
                                  getCooperativeList={getCooperativeList}
                                />
                              </div>
                              <div className="sm:hidden flex">
                                <ActionResponsive
                                  cooperative={cooperative}
                                  goToDetail={goToDetail}
                                  getCooperativeList={getCooperativeList}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {listCooperative.length === 0 && isLoading && (
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
              {listCooperative.length === 0 && !isLoading && (
                <div className="mt-3 flex flex-col justify-center items-center">
                  <span>موردی موجود نیست</span>
                  <img className="w-56" src="/images/error-img.png" alt="" />
                </div>
              )}
            </div>
          </div>
          {listCooperative[0]?.totalRows > valRecordCooperative * 25 && (
            <div
              className={
                themeMode === "dark"
                  ? "mx-auto absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-lg p-2 bg-slate-700 shadow-md z-10 w-11/12 sm:w-auto"
                  : "mx-auto absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-lg p-2 bg-[#f4f8ff] shadow-md z-10 w-11/12 sm:w-auto"
              }
            >
              <div className="flex justify-center items-center">
                <Stack spacing={2}>
                  <Pagination
                    size="small"
                    siblingCount={0}
                    page={numPages}
                    onChange={(e, value) => {
                      dispatch(setNumPages(value));

                      getCooperativeList({ page: value });
                    }}
                    count={
                      listCooperative[0].totalRows
                        ? Math.ceil(
                            listCooperative[0].totalRows /
                              (valRecordCooperative * 25)
                          )
                        : 0
                    }
                  />
                </Stack>
                <span className="text-xs">
                  {listCooperative[0].totalRows} رکورد
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
