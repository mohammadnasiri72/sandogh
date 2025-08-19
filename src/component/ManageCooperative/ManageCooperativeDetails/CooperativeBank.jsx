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
import ConfirmDeleteBank from "./ConfirmDeleteBank";
import EditeBank from "./EditeBank";
import ModalAddBank from "./ModalAddBank";

CooperativeBank.propTypes = {
  flag: PropTypes.bool,
  setFlag: PropTypes.func,
};
export default function CooperativeBank({ flag, setFlag }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [listBank, setListBank] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const cooperativeId = useSelector((store) => store.cooperative.cooperativeId);
  const fontSize = useSelector((store) => store.setting.fontSize);

  useEffect(() => {
    setIsLoading(true);
    setListBank([]);
    axios
      .get(mainDomain + `/api/Cooperative/${cooperativeId}/Bank`, {
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
      <ModalAddBank setFlag={setFlag} />
      {listBank.length > 0 && (
        <TableContainer component={Paper} sx={{ maxHeight: "75vh" }}>
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
              <TableRow
                sx={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "transparent",
                  zIndex: "2",
                }}
              >
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
              {listBank.length > 0 &&
                listBank.map((e) => (
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
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      {e.branchId}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      {e.accountNumber}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      {e.shebaNumber}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      <div className="flex justify-center">
                        {e.isActive ? (
                          <MdDone className="text-2xl text-emerald-500" />
                        ) : (
                          <MdClose className="text-2xl text-red-500" />
                        )}
                      </div>
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
                        <EditeBank setFlag={setFlag} id={e.id} />

                        <ConfirmDeleteBank setFlag={setFlag} id={e.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {listBank.length === 0 && !isLoading && (
        <div className="flex justify-center flex-col items-center">
          <span>موردی ثبت نشده است</span>
          <img className="w-56" src="/images/error-img.png" alt="" />
        </div>
      )}
      {listBank.length === 0 && isLoading && (
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
