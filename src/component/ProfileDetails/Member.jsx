import {
  Chip,
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

Member.propTypes = {
  flag: PropTypes.bool,
};
export default function Member({ flag }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [listMember, setListMember] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listposition, setListposition] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const fontSize = useSelector((store) => store.setting.fontSize);

  useEffect(() => {
    setIsLoading(true);
    setListMember([]);
    axios
      .get(mainDomain + `/api/Cooperative/Current/Member`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setListMember(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [flag]);

  useEffect(() => {
    axios
      .get(mainDomain + `/api/BasicInfo/Position`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setListposition(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {listMember.length > 0 && (
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
                  <span className="font-bold whitespace-nowrap">نام </span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">
                    {" "}
                    نام خانوادگی{" "}
                  </span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap"> نام پدر </span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">
                    {" "}
                    محل تولد{" "}
                  </span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">
                    تاریخ تولد
                  </span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">
                    {" "}
                    شماره ملی
                  </span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap"> ش ش</span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">تحصیلات</span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap">
                    شماره همراه
                  </span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap"> حق امضا</span>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <span className="font-bold whitespace-nowrap"> سمت</span>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {listMember.map((e) => (
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
                    {e.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.family}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.fatherName}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.placeBrith}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.brithDateFa}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.nationalCode}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.shSh}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.education}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    {e.mobile}
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    <div className="flex justify-center">
                      {e.signedRight ? (
                        <MdDone className="text-2xl text-emerald-500" />
                      ) : (
                        <MdClose className="text-2xl text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell sx={{ fontSize: `${fontSize}px` }} align="center">
                    <div className="flex justify-center flex-col items-center gap-1">
                      {listposition.length > 0 &&
                        listposition
                          .filter((item) =>
                            e.positionIdList
                              .split(",")
                              .map(Number)
                              .includes(item.id)
                          )
                          .map((ev) => <Chip key={ev.id} label={ev.title} />)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {listMember.length === 0 && isLoading && (
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
      {listMember.length === 0 && !isLoading && (
        <div className="mt-3 flex flex-col justify-center items-center">
          <span>موردی موجود نیست</span>
          <img className="w-56" src="/images/error-img.png" alt="" />
        </div>
      )}
    </>
  );
}
