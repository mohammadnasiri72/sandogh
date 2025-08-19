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
import { MagnifyingGlass } from "react-loader-spinner";
import { useSelector } from "react-redux";
import SpeedDialFile from "./SpeedDialFile";

TableFileVisited.propTypes = {
  listFileUploaded: PropTypes.array,
  setFlag: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default function TableFileVisited({ listFileUploaded, isLoading }) {
  const themeMode = useSelector((store) => store.setting.themeMode);

  return (
    <>
      {listFileUploaded.length > 0 && (
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
                  <span className="font-bold whitespace-nowrap">توضیح</span>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {listFileUploaded.map((e) => (
                <TableRow
                  key={e.id}
                  sx={{
                    position:'relative',
                    "&:hover": {
                      backgroundColor:
                        themeMode === "dark" ? "rgb(51 65 85)" : "#f8f9fa",
                    },
                  }}
                >
                  <TableCell>
                    <SpeedDialFile e={e} />
                  </TableCell>
                  <TableCell align="center">{e.fileDesc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {listFileUploaded.length === 0 && !isLoading && (
        <div className="mt-3 flex flex-col justify-center items-center">
          <span>موردی موجود نیست</span>
          <img className="w-56" src="/images/error-img.png" alt="" />
        </div>
      )}
      {listFileUploaded.length === 0 && isLoading && (
        <div className="mt-3 flex flex-col justify-center items-center">
          <span>لطفا صبر کنید</span>
          <MagnifyingGlass
            height="80"
            width="80"
            color="#556ee6"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      <Divider />
    </>
  );
}
