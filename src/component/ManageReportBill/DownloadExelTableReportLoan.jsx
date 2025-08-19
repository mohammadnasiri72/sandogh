import { Button, CircularProgress } from "@mui/material";
import "jspdf-autotable";
import PropTypes from "prop-types";
import { BsFiletypeXlsx } from "react-icons/bs";

DownloadExelTableReportLoan.propTypes = {
  getDataExcel: PropTypes.func,
  isLoadingExcel: PropTypes.bool,
};
export default function DownloadExelTableReportLoan({
  getDataExcel,
  isLoadingExcel,
}) {
  const downloadExcel = () => {
    getDataExcel();
  };

  return (
    <>
      <div className=" flex justify-start items-center">
        <Button
          disabled={isLoadingExcel}
          onClick={downloadExcel}
          sx={{
            fontSize: "12px",
            minWidth: "35px",
            transition: "0.6s",
            color: "#fff",
            backgroundColor: "rgb(251 146 60)",
            "&:hover": {
              backgroundColor: "rgb(249 115 22)",
            },
            boxShadow: "none",
            borderRadius: "10px",
          }}
        >
          {!isLoadingExcel && (
            <div className="flex items-center">
              <span className="px-1 whitespace-nowrap">خروجی اکسل</span>
              <BsFiletypeXlsx className="text-xl" />
            </div>
          )}
          {isLoadingExcel && (
            <div className="flex items-center justify-center">
              <span className="text-white">درحال دانلود</span>
              <div className="scale-50 w-5 h-5 -mt-2 text-white">
                <CircularProgress sx={{ color: "white" }} />
              </div>
            </div>
          )}
        </Button>
      </div>
    </>
  );
}
