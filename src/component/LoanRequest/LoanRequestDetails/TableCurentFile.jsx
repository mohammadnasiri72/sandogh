import {
  Checkbox,
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
import SpeedDialFile from "../../LoanList/SpeedDialFile";

TableCurentFile.propTypes = {
  valItem: PropTypes.object,
  files: PropTypes.array,
  selectedFiles: PropTypes.array,
  setSelectedFiles: PropTypes.func,
};
export default function TableCurentFile({
  files,
  valItem,
  selectedFiles,
  setSelectedFiles,
}) {
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
                backgroundColor: themeMode === "dark" ? "#262b3c" : "#eff2f7",
                color: themeMode === "dark" ? "#fffb" : "#000b",
                fontSize: "12px",
                position: "sticky",
              },
            }}
          >
            <TableRow>
              <TableCell sx={{ color: "white" }}>
                <span className="font-bold whitespace-nowrap">فایل</span>
              </TableCell>

              <TableCell sx={{ color: "white" }} align="center">
                <span className="font-bold whitespace-nowrap">نوع</span>
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                <span className="font-bold whitespace-nowrap">توضیح</span>
              </TableCell>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={
                    selectedFiles.length > 0 &&
                    selectedFiles.length < files.length
                  }
                  checked={
                    files.length > 0 && selectedFiles.length === files.length
                  }
                  onChange={() => {
                    if (
                      files.length > 0 &&
                      selectedFiles.length === files.length
                    ) {
                      setSelectedFiles([]);
                    } else {
                      setSelectedFiles(files);
                    }
                  }}
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                />
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {files.map((e) => (
              <TableRow
                key={e.id}
                sx={{
                  backgroundColor:
                    selectedFiles.filter((ev) => ev === e).length !== 0
                      ? themeMode === "dark"
                        ? "rgb(51 65 85)"
                        : "#f8f9fa"
                      : "",
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
                  <span className=" truncate select-none">{valItem.title}</span>
                </TableCell>
                <TableCell align="center">
                  <span className=" truncate select-none">{e.fileDesc}</span>
                </TableCell>
                <TableCell padding="checkbox">
                  <Checkbox
                    onClick={() => {
                      if (selectedFiles.filter((ev) => ev === e).length === 0) {
                        setSelectedFiles([...selectedFiles, e]);
                      } else {
                        setSelectedFiles(
                          selectedFiles.filter((ev) => ev !== e)
                        );
                      }
                    }}
                    color="primary"
                    checked={selectedFiles.filter((ev) => ev === e).length > 0}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
