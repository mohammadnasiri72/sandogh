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
import DownloadExelTableReportBank from "./DownloadExelTableReportBank";
import DownloadPDFTableReportBank from "./DownloadPDFTableReportBank";
import SelectFieldTableReportBank from "./SelectFieldTableReportBank";

TableReportBank.propTypes = {
  listReportBank: PropTypes.array,
  pageIndex: PropTypes.number,
  pageSize: PropTypes.number,
  setPageIndex: PropTypes.func,
  isLoading: PropTypes.bool,
  getReportListLoan: PropTypes.func,
  setSelectedCols: PropTypes.func,
  isLoadingExcel: PropTypes.bool,
  isLoadingPdf: PropTypes.bool,
  getDataExcel: PropTypes.func,
  getDataPDF: PropTypes.func,
  selectedField: PropTypes.array,
  setSelectedField: PropTypes.func,
};
export default function TableReportBank({
  listReportBank,
  pageIndex,
  pageSize,
  setPageIndex,
  isLoading,
  getReportListLoan,
  isLoadingExcel,
  isLoadingPdf,
  getDataExcel,
  getDataPDF,
  selectedField,
  setSelectedField,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const fontSize = useSelector((store) => store.setting.fontSize);
  const themeColor = useSelector((store) => store.setting.themeColor);

  return (
    <>
      <div className="px-5">
        <div className="flex justify-between">
          <div className="flex justify-center items-center">
            <div className="px-1">
              <DownloadExelTableReportBank
                getDataExcel={getDataExcel}
                isLoadingExcel={isLoadingExcel}
              />
            </div>
            <div className="px-1">
              <DownloadPDFTableReportBank
                getDataPDF={getDataPDF}
                isLoadingPdf={isLoadingPdf}
              />
            </div>
          </div>
          <SelectFieldTableReportBank setSelectedField={setSelectedField} />
        </div>
        <div
          style={{
            borderColor: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
          }}
          className="border-2 p-2 relative rounded-lg"
        >
          {listReportBank.length > 0 && (
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
                      {listReportBank.map((e, index) => (
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
                                  ? e.province
                                  : field.id === 4
                                  ? e.provinceId
                                  : field.id === 5
                                  ? e.cooperative
                                  : field.id === 6
                                  ? e.statusId === 1
                                    ? "سهامدار"
                                    : e.statusId === 2
                                    ? "غیر سهامدار"
                                    : "بخش دولتی"
                                  : field.id === 7
                                  ? e.name
                                  : field.id === 8
                                  ? e.branchId
                                  : field.id === 9
                                  ? e.accountNumber
                                  : field.id === 10
                                  ? e.shebaNumber
                                  : field.id === 11
                                  ? e.modifiedFa
                                  : ""}
                              </span>
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {listReportBank[0].total > pageSize && (
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
                            getReportListLoan({ page: value });
                          }}
                          count={
                            listReportBank.length > 0
                              ? Math.ceil(listReportBank[0].total / pageSize)
                              : 1
                          }
                        />
                      </Stack>
                      <span className="text-xs">
                        {listReportBank.length > 0 && listReportBank[0].total}
                        رکورد
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {listReportBank.length === 0 && !isLoading && (
            <div>موردی موجود نیست</div>
          )}
          {listReportBank.length === 0 && isLoading && (
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
