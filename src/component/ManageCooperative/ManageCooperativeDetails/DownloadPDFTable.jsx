import { Button } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PropTypes from "prop-types";
import { FaRegFilePdf } from "react-icons/fa6";
import font from "./../../../assets/fonts/pdf/font";

DownloadPDFTable.propTypes = {
  listCapital: PropTypes.array,
};
export default function DownloadPDFTable({ listCapital }) {
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.addFileToVFS("YekanBakhFaNum-Medium.woff", font);
    doc.addFont("YekanBakhFaNum-Medium.woff", "YekanBakh", "normal");
    doc.setFont("YekanBakh");
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.text("تغییرات سهام", pageWidth - 20, 10, { align: "center" });
    doc.autoTable({
      head: [
        [
          "درصد سهم از کل سهام",
          "مبلغ کل سهام (ریال)",
          "تعداد سهم ",
          "تاریخ ثبت ",
          "سرمایه صندوق",
          "مرحله",
        ],
      ],
      body: listCapital.map((row, index) => [
        row.percentShare,
        row.totalShares.toLocaleString(),
        row.sharesNumber.toLocaleString(),
        row.registerDateFa,
        row.capital.toLocaleString(),
        index !== 0 ? index : "سرمایه اولیه",
      ]),
      styles: { font: "YekanBakh", halign: "right" },
      headStyles: { halign: "center" },
      columnStyles: {
        0: { halign: "center" },
        1: { halign: "center" },
        2: { halign: "center" },
        3: { halign: "center" },
        4: { halign: "center" },
        5: { halign: "right" },
      },
    });
    doc.save("table.pdf");
  };

  return (
    <>
      <div className=" flex justify-start items-center px-1">
        <Button
          onClick={downloadPdf}
          sx={{
            fontSize: "12px",
            minWidth: "35px",
            height:'35px',
            transition: "0.6s",
            borderRadius: "10px",
            color: "#fff",
            backgroundColor: "rgb(251 146 60)",
            "&:hover": {
              backgroundColor: "rgb(249 115 22)",
            },
            boxShadow: "none",
          }}
        >
          <div className="flex items-center">
            <span className="px-1">خروجی pdf</span>
            <FaRegFilePdf className="text-xl" />
          </div>
        </Button>
      </div>
    </>
  );
}
