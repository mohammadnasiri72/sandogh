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

TableSubHeader.propTypes = {
  listSubHeaderReportCapital: PropTypes.array,
};
export default function TableSubHeader({ listSubHeaderReportCapital }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const fontSize = useSelector((store) => store.setting.fontSize);

  return (
    <>
    <div className="px-5">

      <div className="border p-2 relative border-orange-500 rounded-lg">
        {listSubHeaderReportCapital.length > 0 && (
          <TableContainer component={Paper}>
            <Table
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
                <TableRow>
                  <TableCell sx={{ color: "white" }}>
                    <span className="font-bold whitespace-nowrap">نوع</span>
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    <span className="font-bold whitespace-nowrap">
                      مجموع سهام
                    </span>
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    <span className="font-bold whitespace-nowrap">
                      مجموع سرمایه (ریال)
                    </span>
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    <span className="font-bold whitespace-nowrap">
                      مجموع تغییرات سهام
                    </span>
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    <span className="font-bold whitespace-nowrap">
                      مجموع درصد سهام
                    </span>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {listSubHeaderReportCapital.map((e) => (
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
                      <span className="pr-2">{e.desc}</span>
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      {e.sumShares.toLocaleString()}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      <span className="whitespace-nowrap">
                        {e.sumCapital.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      <span className="whitespace-nowrap">
                        {e.sumChangeCapital.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: `${fontSize}px` }}
                      align="center"
                    >
                      <span className="whitespace-nowrap">
                        {e.sumPercentShare}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
    </>
  );
}
