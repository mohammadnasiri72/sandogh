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
import { MdClose, MdDone } from "react-icons/md";
import { useSelector } from "react-redux";
import { mainDomain } from "../../utils/mainDomain";
import PropTypes from "prop-types";

Bank.propTypes = {
  flag: PropTypes.bool,
};
export default function Bank({ flag }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [listBank, setListBank] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const fontSize = useSelector((store) => store.setting.fontSize);

  useEffect(() => {
    setIsLoading(true);
    setListBank([]);
    axios
      .get(mainDomain + `/api/Cooperative/Current/Bank`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setListBank(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [flag]);

  return (
    <>
      {listBank.length > 0 && (
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
                  <span className="font-bold whitespace-nowrap">نام بانک</span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">شعبه</span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">
                    شماره حساب
                  </span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">شماره شبا</span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">فعال</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listBank.map((e) => (
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
                    {e.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.branchId}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.accountNumber}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.shebaNumber}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    <div className="flex justify-center">
                      {e.isActive ? (
                        <MdDone className="text-2xl text-emerald-500" />
                      ) : (
                        <MdClose className="text-2xl text-red-500" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {listBank.length === 0 && isLoading && (
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
      {listBank.length === 0 && !isLoading && (
        <div className="mt-3 flex flex-col justify-center items-center">
          <span>موردی موجود نیست</span>
          <img className="w-56" src="/images/error-img.png" alt="" />
        </div>
      )}
    </>
  );
}
