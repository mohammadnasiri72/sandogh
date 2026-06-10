import {
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { MagnifyingGlass } from "react-loader-spinner";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import ModalDetailsFormTabTranscript from "../ManageLoan/ModalDetailsFormInvoiceTabTranscript";
import SpeedDialFile from "./SpeedDialFile";

// import sweet alert 2
const Toast = Swal.mixin({
  toast: true,
  position: "top-start",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: "toast-modal",
});

TableFileVisited.propTypes = {
  listFileUploaded: PropTypes.array,
  listFileUploaded2: PropTypes.array,
  setFlag: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default function TableFileVisited({
  listFileUploaded,
  listFileUploaded2,
  isLoading,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [open, setOpen] = useState(false);
  const [formDetails, setFormDetails] = useState("");
  const [typeId, setTypeId] = useState(0);

  return (
    <>
      {(listFileUploaded.length > 0 || listFileUploaded2.length > 0) && (
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
              {listFileUploaded2.map((e) => (
                <TableRow
                  key={e.id}
                  sx={{
                    position: "relative",
                    "&:hover": {
                      backgroundColor:
                        themeMode === "dark" ? "rgb(51 65 85)" : "#f8f9fa",
                    },
                  }}
                >
                  <TableCell>
                    <Tooltip title="مشاهده">
                      <IconButton
                        onClick={() => {
                          if (e.body) {
                            setFormDetails(e.body);
                            setTypeId(e.formTypeId);
                            setOpen(true);
                          } else {
                            Toast.fire({
                              icon: "warning",
                              text: "محتوایی برای نمایش وجود ندارد",
                              customClass: { container: "toast-modal" },
                            });
                          }
                        }}
                      >
                        <FaEye className="text-teal-600" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">{e.title}</TableCell>
                </TableRow>
              ))}
              {listFileUploaded.map((e) => (
                <TableRow
                  key={e.id}
                  sx={{
                    position: "relative",
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
      {listFileUploaded.length === 0 &&
        listFileUploaded2.length === 0 &&
        !isLoading && (
          <div className="mt-3 flex flex-col justify-center items-center">
            <span>موردی موجود نیست</span>
            <img className="w-56" src="/images/error-img.png" alt="" />
          </div>
        )}
      {listFileUploaded.length === 0 &&
        listFileUploaded2.length === 0 &&
        isLoading && (
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

      <ModalDetailsFormTabTranscript
        open={open}
        setOpen={setOpen}
        formDetails={formDetails}
        typeId={typeId}
      />
    </>
  );
}
