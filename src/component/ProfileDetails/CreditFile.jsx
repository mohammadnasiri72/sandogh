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
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { MdClose, MdDone } from "react-icons/md";
import { useSelector } from "react-redux";
import { mainDomain } from "../../utils/mainDomain";
import ModalDownloadFile from "./ModalDownloadFile";

CreditFile.propTypes = {
  flag: PropTypes.bool,
};
export default function CreditFile({ flag }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [listCreditFile, setListCreditFile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const fontSize = useSelector((store) => store.setting.fontSize);

  useEffect(() => {
    setIsLoading(true);
    setListCreditFile([]);
    axios
      .get(mainDomain + `/api/Cooperative/Current/CreditFile`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setListCreditFile(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [flag]);

  return (
    <>
      {listCreditFile.length > 0 && (
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
                  fontSize: `${fontSize}px`,
                  position: "sticky",
                },
              }}
            >
              <TableRow>
                <TableCell sx={{ color: "white" }}>
                  <span className="font-bold whitespace-nowrap">
                    آگهی تاسیس
                  </span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">
                    آگهی تغییرات
                  </span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">
                    مدارک شناسایی
                  </span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">
                    صورتهای مالی
                  </span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">
                    فرم احراز هویت
                  </span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">
                    وکالت توثیق سهام
                  </span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">
                    ضریب اعتباری
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
              {listCreditFile.map((e) => (
                <TableRow
                  key={e}
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        themeMode === "dark" ? "rgb(51 65 85)" : "#f8f9fa",
                    },
                  }}
                >
                  <TableCell sx={{ fontSize: `${fontSize}px` }}>
                    {e.foundedAdDateFa}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.changesAdDateFa}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    <div className="flex justify-center items-center">
                      {e.identificationDocs ? (
                        <MdDone className="text-2xl text-emerald-500" />
                      ) : (
                        <MdClose className="text-2xl text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    <div className="flex justify-center items-center">
                      {e.finanicalForms}
                    </div>
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    <div className="flex justify-center items-center">
                      {e.authForms ? (
                        <MdDone className="text-2xl text-emerald-500" />
                      ) : (
                        <MdClose className="text-2xl text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    <div className="flex justify-center items-center">
                      {e.powerAttorney ? (
                        <MdDone className="text-2xl text-emerald-500" />
                      ) : (
                        <MdClose className="text-2xl text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.creditFactor}
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
                    <div className="flex justify-center items-center">
                      <ModalDownloadFile id={e.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {listCreditFile.length === 0 && isLoading && (
        <div className="mt-2">
          <div className="mt-2 px-2">
            <Skeleton width={"100%"} height={80} variant="rounded" />
          </div>
          <div className="mt-2 px-2">
            <Skeleton width={"100%"} height={80} variant="rounded" />
          </div>
          <div className="mt-2 px-2">
            <Skeleton width={"100%"} height={80} variant="rounded" />
          </div>
        </div>
      )}
      {listCreditFile.length === 0 && !isLoading && (
        <div className="mt-3 flex flex-col justify-center items-center">
          <span>موردی موجود نیست</span>
          <img className="w-56" src="/images/error-img.png" alt="" />
        </div>
      )}
    </>
  );
}
