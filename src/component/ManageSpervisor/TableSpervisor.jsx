import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import ModalDeleteSpervisor from "./ModalDeleteSpervisor";
import ModalEditSpervisor from "./ModalEditSpervisor";
import UserAccount from "./UserAccount";
import ActionResponsive from "./ActionResponsive";

TableSpervisor.propTypes = {
  listSupervisor: PropTypes.array,
  listProvince: PropTypes.array,
  setflag: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default function TableSpervisor({
  listSupervisor,
  listProvince,
  setflag,
  isLoading,
}) {
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const fontSize = useSelector((store) => store.setting.fontSize);

  

  return (
    <>
      <div
        style={{
          borderColor: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
        }}
        className="border-2 relative rounded-lg"
      >
        <div className="">
          <div className="p-3">
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
                        className=" whitespace-nowrap"
                      >
                        استان
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{ fontWeight: 900 }}
                        className="whitespace-nowrap"
                      >
                        نام و نام خانوادگی
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{ fontWeight: 900 }}
                        className=" whitespace-nowrap"
                      >
                        کد ملی
                      </span>
                    </TableCell>

                    <TableCell align="center">
                      <span
                        style={{ fontWeight: 900 }}
                        className=" whitespace-nowrap"
                      >
                        شماره همراه
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{ fontWeight: 900 }}
                        className=" whitespace-nowrap"
                      >
                        نام بانک
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{ fontWeight: 900 }}
                        className=" whitespace-nowrap"
                      >
                       شماره حساب / شبا
                      </span>
                    </TableCell>
                    {/* <TableCell align="center">
                      <span
                        style={{ fontWeight: 900 }}
                        className=" whitespace-nowrap"
                      >
                        ایمیل
                      </span>
                    </TableCell> */}
                    {/* {showFieldTable.length > 0 &&
                          showFieldTable.map((field) => (
                            <TableCell key={field.id} align="center">
                              <span
                                style={{ fontWeight: 900 }}
                                className=" whitespace-nowrap"
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
                  {listSupervisor.length > 0 &&
                    listSupervisor.map((supervisor) => (
                      <TableRow
                        key={supervisor.id}
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
                          <span className={supervisor.statusId===2 ? "whitespace-nowrap text-red-500" : "whitespace-nowrap"}>
                            {/* {supervisor.province} */}
                            {
                              supervisor.statusId===2 ? 'ناظر کل':
                              listProvince.find(
                                (e) =>
                                  Number(e.provinceId) ===
                                  Number(supervisor.provinceId)
                              )?.title
                            }
                          </span>
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: `${fontSize}px` }}
                          align="center"
                        >
                          <span className="whitespace-nowrap">
                            {supervisor.name} {supervisor.family}
                          </span>
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: `${fontSize}px` }}
                          align="center"
                        >
                          <span className="whitespace-nowrap">
                            {supervisor.nationalId}
                          </span>
                        </TableCell>

                        <TableCell
                          sx={{ fontSize: `${fontSize}px` }}
                          align="center"
                        >
                          <span className="whitespace-nowrap">
                            {supervisor.mobile}
                          </span>
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: `${fontSize}px` }}
                          align="center"
                        >
                          <span className="whitespace-nowrap">
                            {supervisor.bankName ? supervisor.bankName : "---"}
                          </span>
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: `${fontSize}px` }}
                          align="center"
                        >
                          <span className="whitespace-nowrap">
                            {supervisor.bankAccountInfo ? supervisor.bankAccountInfo : "---"}
                          </span>
                        </TableCell>
                        {/* <TableCell
                          sx={{ fontSize: `${fontSize}px` }}
                          align="center"
                        >
                          <span className="whitespace-nowrap">
                            {supervisor.email ? supervisor.email : "---"}
                          </span>
                        </TableCell> */}

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
                            <ModalEditSpervisor
                              listProvince={listProvince}
                              supervisor={supervisor}
                              setflag={setflag}
                            />
                            <UserAccount nationalId={supervisor.nationalId}/>
                            <ModalDeleteSpervisor
                              id={supervisor.id}
                              setFlag={setflag}
                            />
                            
                          </div>
                          <div className="sm:hidden flex justify-center">
                            <ActionResponsive
                             supervisor={supervisor}
                             listProvince={listProvince}
                             setflag={setflag}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            {listSupervisor.length === 0 && isLoading && (
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
              </div>
            )}
            {listSupervisor.length === 0 && !isLoading && (
              <div className="mt-3 flex flex-col justify-center items-center">
                <span>موردی موجود نیست</span>
                <img className="w-56" src="/images/error-img.png" alt="" />
              </div>
            )}
          </div>
        </div>
       
      </div>
    </>
  );
}
