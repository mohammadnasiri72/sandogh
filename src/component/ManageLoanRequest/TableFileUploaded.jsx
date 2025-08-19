import {
  Divider,
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
import ModalDeleteFile from "./ModalDeleteFile";
import SpeedDialFile from "./SpeedDialFile";

TableFileUploaded.propTypes = {
  listFileUploaded: PropTypes.array,
  setFlag: PropTypes.func,
};
export default function TableFileUploaded({ listFileUploaded, setFlag }) {
  const themeMode = useSelector((store) => store.setting.themeMode);

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          style={{ maxHeight: "none", height: "auto" }}
          aria-label="sticky table"
        >
          <TableHead
            sx={{
              "& th": {
                backgroundColor:
                  themeMode === "dark" ? "rgb(51 65 85)" : "rgb(226 232 240)",
                color: themeMode === "dark" ? "#fffb" : "#000b",
              },
            }}
          >
            <TableRow>
              <TableCell sx={{ color: "white" }}>
                <span className="font-bold whitespace-nowrap">فایل</span>
              </TableCell>

              <TableCell sx={{ color: "white" }} align="center">
                <span className="font-bold whitespace-nowrap">توضیح</span>
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                <span className="font-bold whitespace-nowrap">عملیات</span>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {listFileUploaded.map((e, index) => (
              <TableRow
                key={e.id}
                sx={{
                  position: "relative",
                  bgcolor:
                    index % 2 === 0
                      ? themeMode === "dark"
                        ? "rgb(30 41 59)"
                        : "#eff4fa"
                      : "",
                }}
              >
                <TableCell>
                  <SpeedDialFile e={e} />
                </TableCell>
                <TableCell align="center">{e.fileDesc}</TableCell>
                <TableCell align="center">
                  <ModalDeleteFile id={e.id} setFlag={setFlag} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
    </>
  );
}
