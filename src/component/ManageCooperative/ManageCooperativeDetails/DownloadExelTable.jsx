import { Button } from "@mui/material";
import "jspdf-autotable";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BsFiletypeXlsx } from "react-icons/bs";
import * as XLSX from "xlsx";

DownloadExelTable.propTypes = {
  listCapital: PropTypes.array,
};
export default function DownloadExelTable({ listCapital }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataExcel = [];
    listCapital.map((e, index) => {
      dataExcel.push({
        مرحله: index !== 0 ? index : "سرمایه اولیه",
        "سرمایه صندوق": e.capital,
        "تاریخ ثبت": e.registerDateFa,
        "تعداد سهم": e.sharesNumber,
        "مبلغ کل سهام (ریال)": e.totalShares,
        "درصد سهم از کل سهام": e.percentShare,
      });

      return true;
    });
    setData(dataExcel);
  }, [listCapital]);

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table.xlsx");
  };

  return (
    <>
      <div className=" flex justify-start items-center  px-1">
        <Button
          onClick={downloadExcel}
          sx={{
            fontSize: "12px",
            height:'35px',
            minWidth: "35px",
            transition: "0.6s",
            color: "#fff",
            borderRadius: "10px",
            backgroundColor: "rgb(251 146 60)",
            "&:hover": {
              backgroundColor: "rgb(249 115 22)",
            },
            boxShadow: "none",
          }}
        >
          <div className="flex items-center">
            <span className="px-1">خروجی اکسل</span>
            <BsFiletypeXlsx className="text-xl" />
          </div>
        </Button>
      </div>
    </>
  );
}
