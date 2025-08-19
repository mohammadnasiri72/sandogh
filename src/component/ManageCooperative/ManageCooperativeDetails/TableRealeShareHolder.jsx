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
import EditeShareHolder from "./EditeShareHolder";
import ConfirmDeleteShareHolder from "./ConfirmDeleteShareHolder";

TableRealeShareHolder.propTypes = {
  listShareHolder: PropTypes.array,
  isLoading: PropTypes.bool,
  getShareHolderList: PropTypes.func,
};
export default function TableRealeShareHolder({
  listShareHolder,
  isLoading,
  getShareHolderList,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const fontSize = useSelector((store) => store.setting.fontSize);
  return (
    <>
      {listShareHolder.length > 0 && (
        <TableContainer component={Paper} sx={{ maxHeight: "75vh" }}>
          <Table
            sx={{ minWidth: 650 }}
            style={{ maxHeight: "none", height: "auto" }}
            aria-label="sticky table"
          >
            <TableHead
              sx={{
                "& th": {
                  backgroundColor: themeMode === "dark" ? "#262b3c" : "#eff2f7",
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
                  <span className="font-bold whitespace-nowrap">نام </span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">
                    نام خانوادگی
                  </span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap"> نام پدر </span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">محل تولد</span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">
                    تاریخ تولد
                  </span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">شماره ملی</span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap"> ش ش</span>
                </TableCell>

                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">
                    شماره همراه
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
                  <span className="font-bold whitespace-nowrap">عملیات</span>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {listShareHolder.map((e) => (
                <TableRow
                  key={e.id}
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        themeMode === "dark" ? "rgb(51 65 85)" : "#f8f9fa",
                    },
                  }}
                >
                  <TableCell sx={{ fontSize: `${fontSize}px` }}>
                    {e.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.family}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.fatherName}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.placeBrith}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.brithDateFa}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.nationalCode}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.shSh}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.mobile}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      fontSize: `${fontSize}px`,
                      position: "sticky",
                      right: 0,
                      backgroundColor:
                        themeMode === "dark" ? "#2d3641" : "white",
                    }}
                  >
                    <div className="flex justify-center items-center">
                      <EditeShareHolder
                        id={e.id}
                        getShareHolderList={getShareHolderList}
                        legal={e.isLegal}
                      />

                      <ConfirmDeleteShareHolder
                        id={e.id}
                        getShareHolderList={getShareHolderList}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {listShareHolder.length === 0 && isLoading && (
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
      {listShareHolder.length === 0 && !isLoading && (
        <div className="mt-3 flex flex-col justify-center items-center">
          <span>موردی موجود نیست</span>
          <img className="w-56" src="/images/error-img.png" alt="" />
        </div>
      )}
    </>
  );
}
