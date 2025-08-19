import {
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

TableReportCapital.propTypes = {
  listReportCapital: PropTypes.array,
  pageIndex: PropTypes.number,
  pageSize: PropTypes.number,
  setPageIndex: PropTypes.func,
  isLoading: PropTypes.bool,
  getReportListCapital: PropTypes.func,
  selectedField: PropTypes.array,
};
export default function TableReportCapital({
  listReportCapital,
  pageIndex,
  pageSize,
  setPageIndex,
  isLoading,
  getReportListCapital,
  selectedField,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const fontSize = useSelector((store) => store.setting.fontSize);
  const themeColor = useSelector((store) => store.setting.themeColor);

  

  return (
    <>
      <div className="px-5">
        <div
          style={{
            borderColor: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
          }}
          className="border-2 p-2 relative rounded-lg"
        >
          {listReportCapital.length > 0 && (
            <div>
              <div>
                <TableContainer component={Paper} sx={{ maxHeight: "75vh" }}>
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
                      <TableRow
                        sx={{
                          position: "sticky",
                          top: 0,
                          backgroundColor: "transparent",
                          zIndex: "2",
                        }}
                      >
                        {selectedField.map((field) => (
                          <TableCell
                            key={field.id}
                            sx={{ color: "white" }}
                            align="center"
                          >
                            <span className="font-bold whitespace-nowrap">
                              {field.title}
                            </span>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {listReportCapital.map((e, index) => (
                        <TableRow
                          key={e.id}
                          sx={{
                            "&:hover": {
                              backgroundColor:
                                themeMode === "dark"
                                  ? "rgb(51 65 85)"
                                  : "#f8f9fa",
                            },
                          }}
                        >
                          {selectedField.map((field) => (
                            <TableCell
                              key={field.id}
                              align="center"
                              sx={{
                                whiteSpace: "nowrap",
                                fontSize: `${fontSize}px`,
                              }}
                            >
                              <span className="whitespace-nowrap">
                                {field.id === 1
                                  ? (pageIndex - 1) * pageSize + index + 1
                                  : field.id === 2
                                  ? e.priority
                                  : field.id === 3
                                  ? e.cooperativeTitle
                                  : field.id === 4
                                  ? e.statusId === 1
                                    ? "سهامدار"
                                    : e.statusId === 2
                                    ? "غیر سهامدار"
                                    : "بخش دولتی"
                                  : field.id === 5
                                  ? e.step
                                  : field.id === 6
                                  ? e.capital.toLocaleString()
                                  : field.id === 7
                                  ? e.registerDateFa
                                  : field.id === 8
                                  ? e.sharesNumber
                                  : field.id === 9
                                  ? e.totalShares
                                  : field.id === 10
                                  ? e.capitalChange
                                  : field.id === 11
                                  ? e.percentShare
                                  : ""}
                              </span>
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {listReportCapital[0].total > pageSize && (
                  <div
                    className={
                      themeMode === "dark"
                        ? " mx-auto absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-lg p-2 bg-slate-700 shadow-md z-10 w-full sm:w-auto"
                        : " mx-auto absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-lg p-2 bg-[#f4f8ff] shadow-md z-10 w-full sm:w-auto"
                    }
                  >
                    <div className="flex justify-center items-center">
                      <Stack spacing={2}>
                        <Pagination
                          size="small"
                          siblingCount={0}
                          page={pageIndex}
                          onChange={(e, value) => {
                            setPageIndex(value);
                            getReportListCapital({ page: value });
                          }}
                          count={
                            listReportCapital.length > 0
                              ? Math.ceil(listReportCapital[0].total / pageSize)
                              : 1
                          }
                        />
                      </Stack>
                      <span className="text-xs">
                        {listReportCapital.length > 0 &&
                          listReportCapital[0].total}
                        رکورد
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {listReportCapital.length === 0 && !isLoading && (
            <div>موردی موجود نیست</div>
          )}
          {listReportCapital.length === 0 && isLoading && (
            <div>
              <div className="w-full px-4 py-2">
                <Skeleton variant="rounded" width={"100%"} height={60} />
              </div>
              <div className="w-full px-4 py-2">
                <Skeleton variant="rounded" width={"100%"} height={60} />
              </div>
              <div className="w-full px-4 py-2">
                <Skeleton variant="rounded" width={"100%"} height={60} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
