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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { mainDomain } from "../../utils/mainDomain";
import DownloadExelTable from "../ManageCooperative/ManageCooperativeDetails/DownloadExelTable";
import DownloadPDFTable from "../ManageCooperative/ManageCooperativeDetails/DownloadPDFTable";
import PropTypes from "prop-types";
import ModalFormCapital from "../ManageCooperative/ManageCooperativeDetails/ModalFormCapital";

Capital.propTypes = {
  flag: PropTypes.bool,
};
export default function Capital({ flag }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [listCapital, setListCapital] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const fontSize = useSelector((store) => store.setting.fontSize);

  useEffect(() => {
    setIsLoading(true);
    setListCapital([]);
    axios
      .get(mainDomain + `/api/Cooperative/Current/Capital`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setListCapital(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [flag]);

  return (
    <>
      {listCapital.length > 0 && (
        <div>
          <div className="flex items-center justify-start">
            <ModalFormCapital listCapital={listCapital}/>
            <DownloadExelTable listCapital={listCapital} />
            <DownloadPDFTable listCapital={listCapital} />
          </div>
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
                    <span className="font-bold whitespace-nowrap">مرحله </span>
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    <span className="font-bold whitespace-nowrap">
                      سرمایه صندوق
                    </span>
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    <span className="font-bold whitespace-nowrap">
                      {" "}
                      تاریخ ثبت{" "}
                    </span>
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    <span className="font-bold whitespace-nowrap">
                      {" "}
                      تعداد سهم{" "}
                    </span>
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    <span className="font-bold whitespace-nowrap">
                      مبلغ کل سهام (ریال)
                    </span>
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    <span className="font-bold whitespace-nowrap">
                      درصد سهم از کل سهام
                    </span>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {listCapital.map((e, index) => (
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
                      <span className={index !== 0 ? "pr-2" : ""}>
                        {index !== 0 ? index : "سرمایه اولیه"}
                      </span>
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      {e.capital ? e.capital.toLocaleString() : "---"}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      {e.registerDateFa ? e.registerDateFa : "---"}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      {e.sharesNumber ? e.sharesNumber.toLocaleString() : "0"}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      {e.totalShares ? e.totalShares.toLocaleString() : "0"}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      {e.percentShare ? e.percentShare : "0"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {listCapital.length === 0 && isLoading && (
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
      {listCapital.length === 0 && !isLoading && (
        <div className="mt-3 flex flex-col justify-center items-center">
          <span>موردی موجود نیست</span>
          <img className="w-56" src="/images/error-img.png" alt="" />
        </div>
      )}
    </>
  );
}
