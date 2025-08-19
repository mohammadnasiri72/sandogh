import { Button, CircularProgress } from "@mui/material";
// import jsPDF from "jspdf";
import "jspdf-autotable";
import PropTypes from "prop-types";
// import PropTypes from "prop-types";
import { FaRegFilePdf } from "react-icons/fa6";
// import font from "./../../../assets/fonts/pdf/font";

DownloadPDFTableReportCapital.propTypes = {
  getDataPDF: PropTypes.func,
  isLoadingPdf: PropTypes.bool,
};
export default function DownloadPDFTableReportCapital({
  getDataPDF,
  isLoadingPdf,
}) {
  const downloadPdf = () => {
    getDataPDF();
  };

  return (
    <>
      <div className=" flex justify-start items-center px-1">
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
              <span className="px-1">خروجی pdf</span>
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
