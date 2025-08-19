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
import ModalDetailMessage from "./ModalDetailMessage";
import ModalResponseMessage from "./ModalResponseMessage";
import { useState } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { MdDone } from "react-icons/md";

TableMessage.propTypes = {
  listMessage: PropTypes.array,
  pageIndex: PropTypes.number,
  pageSize: PropTypes.number,
  isLoading: PropTypes.bool,
  setPageIndex: PropTypes.func,
  getListMessage: PropTypes.func,
  setListMessage: PropTypes.func,
  valType: PropTypes.string,
};
export default function TableMessage({
  listMessage,
  pageIndex,
  pageSize,
  isLoading,
  setPageIndex,
  getListMessage,
  setListMessage,
  valType,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const fontSize = useSelector((store) => store.setting.fontSize);
  const [openRes, setOpenRes] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  return (
    <>
      <div className="p-5">
        <div
          style={{
            borderColor: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
          }}
          className="border-2 p-2 relative rounded-lg"
        >
          {listMessage.length > 0 && (
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
                        <span className="font-bold whitespace-nowrap">
                          ردیف
                        </span>
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        <span className="font-bold whitespace-nowrap">
                          فرستنده
                        </span>
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        <span className="font-bold whitespace-nowrap">
                          عنوان
                        </span>
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        <span className="font-bold whitespace-nowrap">
                          تاریخ ارسال
                        </span>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          position: "sticky",
                          right: 0,
                          backgroundColor: "transparent",
                        }}
                      >
                        <span className="font-bold whitespace-nowrap">
                          عملیات
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {listMessage.map((e, index) => (
                      <TableRow
                        key={e.id}
                        sx={{
                          "&:hover": {
                            backgroundColor:
                              e.seen || e.sender === "admin"
                                ? themeMode === "dark"
                                  ? "rgb(51 65 85)"
                                  : "#f8f9fa"
                                : "",
                          },
                          background:
                            e.seen || e.sender === "admin"
                              ? ""
                              : themeMode === "dark"
                              ? "rgb(15 23 42)"
                              : "rgb(226 232 240)",
                        }}
                      >
                        <TableCell sx={{ fontSize: `${fontSize}px` }}>
                          <div className="flex items-center ">
                            <span
                              className={
                                e.seen || e.sender === "admin"
                                  ? "px-1"
                                  : "px-1 font-extrabold"
                              }
                            >
                              {(pageIndex - 1) * pageSize + index + 1}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: `${fontSize}px` }}
                          align="center"
                        >
                          <span
                            className={
                              e.seen || e.sender === "admin"
                                ? " whitespace-nowrap"
                                : "font-extrabold whitespace-nowrap"
                            }
                          >
                            {e.cooperativeTitle ? e.cooperativeTitle : "مدیر"}
                          </span>
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: `${fontSize}px` }}
                          align="center"
                        >
                          <span
                            className={
                              e.seen || e.sender === "admin"
                                ? " whitespace-nowrap"
                                : "font-extrabold whitespace-nowrap"
                            }
                          >
                            {e.title}
                          </span>
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: `${fontSize}px` }}
                          align="center"
                        >
                          <div className="flex items-center">
                            {e.sender === "admin" && (
                              <div>
                                {e.seen && (
                                  <IoMdDoneAll className="text-emerald-500 px-1 text-2xl" />
                                )}
                                {!e.seen && (
                                  <MdDone className="text-slate-500" />
                                )}
                              </div>
                            )}
                            <span
                              className={
                                e.seen || e.sender === "admin"
                                  ? " whitespace-nowrap"
                                  : "font-extrabold whitespace-nowrap"
                              }
                            >
                              {e.createdFa}
                            </span>
                          </div>
                        </TableCell>
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
                          <ModalDetailMessage
                            notif={e}
                            id={e.id}
                            setOpenRes={setOpenRes}
                            openRes={openRes}
                            setSelectedMessage={setSelectedMessage}
                            setListMessage={setListMessage}
                            listMessage={listMessage}
                            valType={valType}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {listMessage[0].total > pageSize && (
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
                          getListMessage({ page: value });
                        }}
                        count={
                          listMessage.length > 0
                            ? Math.ceil(listMessage[0].total / pageSize)
                            : 1
                        }
                      />
                    </Stack>
                    <span className="text-xs">
                      {listMessage.length > 0 && listMessage[0].total}
                      رکورد
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {listMessage.length === 0 && !isLoading && (
            <div className="mt-3 flex flex-col justify-center items-center">
              <span>موردی موجود نیست</span>
              <img className="w-56" src="/images/error-img.png" alt="" />
            </div>
          )}
          {listMessage.length === 0 && isLoading && (
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
          <ModalResponseMessage
            open={openRes}
            setOpen={setOpenRes}
            selectedMessage={selectedMessage}
            getListMessage={getListMessage}
          />
        </div>
      </div>
    </>
  );
}
