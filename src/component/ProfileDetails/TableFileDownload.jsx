import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import SpeedDialFile from "./SpeedDialFile";

TableFileDownload.propTypes = {
  listFile: PropTypes.array,
  listFileItem: PropTypes.array,
};
export default function TableFileDownload({ listFile, listFileItem }) {
  const themeMode = useSelector((store) => store.setting.themeMode);

  return (
    <>
      <TableContainer component={Paper}>
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
                fontSize: "12px",
                position: "sticky",
              },
            }}
          >
            <TableRow>
              <TableCell sx={{ color: "white" }}>
                <span className="font-bold whitespace-nowrap">فایل ارسالی</span>
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                <span className="font-bold whitespace-nowrap">نوع</span>
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                <span className="font-bold whitespace-nowrap">توضیح</span>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {listFile.map((e) => (
              <TableRow
                key={e}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      themeMode === "dark" ? "rgb(51 65 85)" : "#f8f9fa",
                  },
                }}
              >
                <TableCell sx={{ position: "relative" }}>
                  <SpeedDialFile e={e} />
                </TableCell>
                <TableCell align="center">
                  {listFileItem.find((ev) => ev.id === e.itemId)?.title}
                </TableCell>
                <TableCell align="center">{e.fileDesc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
