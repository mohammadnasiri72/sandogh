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
import { SyncLoader } from "react-spinners";
import Loader from "../../loader";
import SpeedDialFile from "../../ManageLoanRequest/SpeedDialFile";
import ModalDeleteFile from "./ModalDeleteFile";

TableFileUploaded.propTypes = {
  listFileUploaded: PropTypes.array,
  setFlag: PropTypes.func,
  optionItemId: PropTypes.array,
  isLoadingFile: PropTypes.bool,
  isLoading: PropTypes.bool,
  uploadProgress: PropTypes.number,
};
export default function TableFileUploaded({
  listFileUploaded,
  setFlag,
  optionItemId,
  isLoadingFile,
  isLoading,
  uploadProgress,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const fontSize = useSelector((store) => store.setting.fontSize);
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
                  fontSize: `${fontSize}px`,
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
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">عملیات</span>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {listFileUploaded.map((e) => (
                <TableRow
                  key={e.id}
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        themeMode === "dark" ? "rgb(51 65 85)" : "#f8f9fa",
                    },
                  }}
                >
                  <TableCell
                    sx={{ position: "relative", fontSize: `${fontSize}px` }}
                  >
                    <SpeedDialFile e={e} />
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {optionItemId.find((ev) => ev.id === e.itemId).title}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.fileDesc ? e.fileDesc : "---"}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    <ModalDeleteFile id={e.id} setFlag={setFlag} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {listFileUploaded.length === 0 && isLoadingFile && (
        <div className="flex justify-center w-full py-5">
          <SyncLoader
            color={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
          />
        </div>
      )}
      {listFileUploaded.length === 0 && !isLoadingFile && (
        <div className="flex flex-col items-center pb-2">
          <img className="w-52" src="/images/20943566 1.png" alt="" />
          <span>فایلی موجود نیست</span>
        </div>
      )}
      {uploadProgress === 100 && isLoading && <Loader />}
    </>
  );
}
