import {
  Paper,
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
import ModalAddCapital from "./ModalAddCapital";
import ModalDeleteCapital from "./ModalDeleteCapital";
import ModalFormCapital from "./ModalFormCapital";

TableCapital.propTypes = {
  loading: PropTypes.bool,
  listCapital: PropTypes.array,
  listProvince: PropTypes.array,
  setListCapital: PropTypes.func,
  steps: PropTypes.number,
  setFlag: PropTypes.func,
};
export default function TableCapital({
  loading,
  listCapital,
  listProvince,
  setListCapital,
  steps,
  setFlag,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const fontSize = useSelector((store) => store.setting.fontSize);
  const themeColor = useSelector((store) => store.setting.themeColor);

  const totalsharesNumber = listCapital.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.sharesNumber;
  }, 0);

  const totalpercentShare = listCapital.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.percentShare;
  }, 0);


  return (
    <>
      <div className=" relative">
        {listCapital.length > 0 && (
          <div
            style={{
              borderColor:
                themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
            }}
            className="border-2 relative rounded-lg p-3"
          >
            {
              <div className="test">
                {
                  <TableContainer component={Paper} sx={{ maxHeight: "75vh" }}>
                    <Table
                      sx={{ minWidth: 650 }}
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
                          <TableCell align="center" sx={{ color: "white" }}>
                            <span className="font-bold whitespace-nowrap">
                              استان
                            </span>
                          </TableCell>
                          <TableCell align="center" sx={{ color: "white" }}>
                            <span className="font-bold whitespace-nowrap">
                              تشکل
                            </span>
                          </TableCell>
                          {/* <TableCell align="center" sx={{ color: "white" }}>
                            <span className="font-bold whitespace-nowrap">
                              آخرین سرمایه
                            </span>
                          </TableCell> */}
                          <TableCell align="center" sx={{ color: "white" }}>
                            <span className="font-bold whitespace-nowrap flex flex-col items-center justify-center">
                              <span>تعداد سهم</span>
                              <span className="text-emerald-500">
                                ({totalsharesNumber.toLocaleString()})
                              </span>
                            </span>
                          </TableCell>
                          <TableCell align="center" sx={{ color: "white" }}>
                            <span className="font-bold whitespace-nowrap flex flex-col items-center justify-center">
                              <span>سرمایه</span>
                              <span className="text-emerald-500">
                                (
                                {(
                                  totalsharesNumber * listCapital[0].fi
                                ).toLocaleString()}
                                )
                              </span>
                            </span>
                          </TableCell>
                          <TableCell align="center" sx={{ color: "white" }}>
                            <span className="font-bold whitespace-nowrap flex flex-col items-center justify-center">
                              <span>درصد</span>

                              <span className="text-emerald-500">
                                ({Math.round(totalpercentShare.toFixed(2))})
                              </span>
                            </span>
                          </TableCell>
                          {/* <TableCell align="center" sx={{ color: "white" }}>
                            <span className="font-bold whitespace-nowrap">
                              شماره سریال
                            </span>
                          </TableCell> */}
                          <TableCell align="center" sx={{ color: "white" }}>
                            <span className="font-bold whitespace-nowrap">
                              کد سهامدار
                            </span>
                          </TableCell>
                          <TableCell align="center" sx={{ color: "white" }}>
                            <span className="font-bold whitespace-nowrap">
                              از شماره
                            </span>
                          </TableCell>
                          <TableCell align="center" sx={{ color: "white" }}>
                            <span className="font-bold whitespace-nowrap">
                              تا شماره
                            </span>
                          </TableCell>
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
                        {listCapital
                          .filter(
                            (ev) =>
                              ev.sharesNumber !== 0 || ev.step === steps[0]
                          )
                          .map((e, index) => (
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
                                <span className="pr-2">{index + 1}</span>
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ fontSize: `${fontSize}px` }}
                              >
                                <span className="whitespace-nowrap">
                                  {
                                    listProvince.find(
                                      (ev) =>
                                        Number(ev.provinceId) === e.provinceId
                                    ).title
                                  }
                                </span>
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ fontSize: `${fontSize}px` }}
                              >
                                <span className="whitespace-nowrap">
                                  {e.cooperativeTitle}
                                </span>
                              </TableCell>
                              {/* <TableCell
                              align="center"
                              sx={{ fontSize: `${fontSize}px` }}
                            >
                              {e.capital.toLocaleString()}
                            </TableCell> */}
                              <TableCell
                                align="center"
                                sx={{ fontSize: `${fontSize}px` }}
                              >
                                <span className="whitespace-nowrap">
                                  {e.sharesNumber.toLocaleString()}
                                </span>
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ fontSize: `${fontSize}px` }}
                              >
                                <span className="whitespace-nowrap">
                                  {e.totalShares.toLocaleString()}
                                </span>
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ fontSize: `${fontSize}px` }}
                              >
                                <span className="whitespace-nowrap">
                                  {e.percentShare}
                                </span>
                              </TableCell>
                              {/* <TableCell
                              align="center"
                              sx={{ fontSize: `${fontSize}px` }}
                            >
                              <span className="whitespace-nowrap">
                                {e.serialNumber ? e.serialNumber : "---"}
                              </span>
                            </TableCell> */}
                              <TableCell
                                align="center"
                                sx={{ fontSize: `${fontSize}px` }}
                              >
                                <span className="whitespace-nowrap">
                                  {e.shareHolderCode
                                    ? e.shareHolderCode
                                    : "---"}
                                </span>
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ fontSize: `${fontSize}px` }}
                              >
                                <span className="whitespace-nowrap">
                                  {e.fromNumber ? e.fromNumber : "---"}
                                </span>
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{ fontSize: `${fontSize}px` }}
                              >
                                <span className="whitespace-nowrap">
                                  {e.toNumber ? e.toNumber : "---"}
                                </span>
                              </TableCell>
                              <TableCell
                                sx={{
                                  position: "sticky",
                                  right: 0,
                                  backgroundColor:
                                    themeMode === "dark" ? "#161c24" : "white",
                                }}
                                align="center"
                              >
                                <div className="flex items-center">
                                  <ModalAddCapital
                                    listCapital={listCapital}
                                    setListCapital={setListCapital}
                                    level={steps[0]}
                                    listProvince={listProvince}
                                    // province={
                                    //   listProvince.find(
                                    //     (ev) =>
                                    //       Number(ev.provinceId) === e.provinceId
                                    //   ).title
                                    // }
                                    item={e}
                                  />
                                  <ModalDeleteCapital
                                    id={e.id}
                                    setFlag={setFlag}
                                  />
                                  <ModalFormCapital
                                    id={e.id}
                                    totalShares={e.totalShares}
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                }
              </div>
            }
          </div>
        )}
        {listCapital.length === 0 && loading && (
          <div className="mt-5">
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
        {listCapital.length === 0 && !loading && (
          <div className="mt-20 flex flex-col justify-center items-center">
            <span>موردی موجود نیست</span>
            <img className="w-56" src="/images/error-img.png" alt="" />
          </div>
        )}
        {/* {listCapital[0]?.total > valRecordCooperative * 25 && (
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
                    setNumPages(value);
                    setListCapital([]);
                    setLoading(true);
                    getCapitalList({ page: value });
                  }}
                  count={
                    listCapital[0].total
                      ? Math.ceil(
                          listCapital[0].total / (valRecordCooperative * 25)
                        )
                      : 0
                  }
                />
              </Stack>
              <span className="text-xs">{listCapital[0].total} رکورد</span>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
}
