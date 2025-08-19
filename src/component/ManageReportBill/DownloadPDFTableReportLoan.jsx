import { Button, CircularProgress } from "@mui/material";
import "jspdf-autotable";
import PropTypes from "prop-types";
import { FaRegFilePdf } from "react-icons/fa6";

DownloadPDFTableReportLoan.propTypes = {
  getDataPDF: PropTypes.func,
  isLoadingPdf: PropTypes.bool,
};
export default function DownloadPDFTableReportLoan({
  getDataPDF,
  isLoadingPdf,
}) {
  const downloadPdf = () => {
    getDataPDF();
  };
  return (
    <>
      <div className=" flex justify-start items-center">
        <Button
          disabled={isLoadingPdf}
          onClick={downloadPdf}
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
          {!isLoadingPdf && (
            <div className="flex items-center">
              <span className="px-1 whitespace-nowrap">خروجی pdf</span>
              <FaRegFilePdf className="text-xl" />
            </div>
          )}
          {isLoadingPdf && (
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
