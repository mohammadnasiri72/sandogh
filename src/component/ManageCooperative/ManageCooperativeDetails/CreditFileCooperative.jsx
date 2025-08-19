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
import { mainDomain } from "../../../utils/mainDomain";
import ConfirmDeleteCreditFile from "./ConfirmDeleteCreditFile";
import EditeCreditFile from "./EditeCreditFile";
import ModalAddCreditFile from "./ModalAddCreditFile";
import ModalUploadDoc from "./ModalUploadDoc";

CreditFileCooperative.propTypes = {
  flag: PropTypes.bool,
  setFlag: PropTypes.func,
};
export default function CreditFileCooperative({ flag, setFlag }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [listCreditFile, setListCreditFile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const cooperativeId = useSelector((store) => store.cooperative.cooperativeId);
  const fontSize = useSelector((store) => store.setting.fontSize);

  useEffect(() => {
    setIsLoading(true);
    setListCreditFile([]);
    axios
      .get(mainDomain + `/api/Cooperative/${cooperativeId}/CreditFile`, {
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
      <ModalAddCreditFile setFlag={setFlag} />
      {listCreditFile.length > 0 && (
        <TableContainer component={Paper} sx={{ maxHeight: "75vh" }}>
          <Table
            sx={{ minWidth: 650, position: "relative" }}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead
              sx={{
                "& th": {
                  backgroundColor: themeMode === "dark" ? "#262b3c" : "#eff2f7",
                  color: themeMode === "dark" ? "#fffb" : "#000b",
                  fontSize: `${fontSize}px`,
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
                <TableCell sx={{ color: "white" }} align="center">
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
              {listCreditFile.length > 0 &&
                listCreditFile.map((creditFile) => (
                  <TableRow
                    key={creditFile.id}
                    sx={{
                      "&:hover": {
                        backgroundColor:
                          themeMode === "dark" ? "rgb(51 65 85)" : "#f8f9fa",
                      },
                    }}
                  >
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      <span className="whitespace-nowrap">
                        {creditFile.foundedAdDateFa}
                      </span>
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      <span className="whitespace-nowrap">
                        {creditFile.changesAdDateFa}
                      </span>
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      <div className="flex justify-center items-center">
                        {creditFile.identificationDocs ? (
                          <MdDone className="text-2xl text-emerald-500" />
                        ) : (
                          <MdClose className="text-2xl text-red-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      <div className="flex justify-center items-center">
                        {creditFile.finanicalForms}
                      </div>
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      <div className="flex justify-center items-center">
                        {creditFile.authForms ? (
                          <MdDone className="text-2xl text-emerald-500" />
                        ) : (
                          <MdClose className="text-2xl text-red-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      <div className="flex justify-center items-center">
                        {creditFile.powerAttorney ? (
                          <MdDone className="text-2xl text-emerald-500" />
                        ) : (
                          <MdClose className="text-2xl text-red-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      {creditFile.creditFactor}
                    </TableCell>

                    <TableCell
                      sx={{
                        fontSize: `${fontSize}px`,
                        position: "sticky",
                        right: 0,
                        backgroundColor:
                          themeMode === "dark" ? "#2d3641" : "white",
                      }}
                      align="center"
                    >
                      <div className="flex justify-center items-center">
                        <EditeCreditFile setFlag={setFlag} id={creditFile.id} />

                        <ModalUploadDoc id={creditFile.id} />
                        <ConfirmDeleteCreditFile
                          setFlag={setFlag}
                          id={creditFile.id}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {listCreditFile.length === 0 && !isLoading && (
        <div className="flex justify-center flex-col items-center">
          <span>موردی ثبت نشده است</span>
          <img className="w-56" src="/images/error-img.png" alt="" />
        </div>
      )}
      {listCreditFile.length === 0 && isLoading && (
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
    </>
  );
}
