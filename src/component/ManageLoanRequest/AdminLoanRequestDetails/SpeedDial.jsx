import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import { mainDomain } from "../../../utils/mainDomain";

BasicSpeedDial.propTypes = {
  item: PropTypes.object,
};
export default function BasicSpeedDial({ item }) {
  const fileUrl = item.fileUrl;
  const [open, setOpen] = useState(false);
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const actions = [
    { icon: <VisibilityIcon />, name: "نمایش فایل" },
    {
      icon: isLoadingDownload ? (
        <SyncLoader className="scale-50" />
      ) : (
        <CloudDownloadIcon />
      ),
      name: "دانلود",
    },
    { icon: <PrintIcon />, name: "پرینت" },
  ];

  const handleDownload = () => {
    const lastSlashIndex = fileUrl.lastIndexOf("/");
    const fileName = fileUrl.substring(lastSlashIndex + 1);
    setIsLoadingDownload(true);
    axios
      .get(mainDomain + "/api/CooperativeFile/Download", {
        params: {
          filePath: fileUrl,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        responseType: "blob",
      })
      .then((response) => {
        setIsLoadingDownload(false);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("خطا در دانلود فایل:", error);
        setIsLoadingDownload(false);
      });
  };

  const handlePrint = (fileUrl) => {
    const lastSlashIndex = fileUrl.lastIndexOf("/");
    const fileName = fileUrl.substring(lastSlashIndex + 1);

    let contentToPrint = "";
    if (fileName.endsWith(".pdf")) {
      contentToPrint = `<embed src="${
        mainDomain + fileUrl
      }" width="100%" height="100%" type="application/pdf" />`;
    } else {
      contentToPrint = ` <html> <head><title>Print</title></head> <body> <img src="${fileUrl}" alt="فرمت غیر قابل پخش" /> </body> </html> `;
    }
    const newWindow = window.open("", "_blank", "width=800,height=600");
    newWindow.document.write(contentToPrint);
    newWindow.document.close();
    newWindow.onload = () => {
      newWindow.print();
    };
  };

  const handleView = (fileUrl) => {
    window.open(mainDomain + fileUrl, "newwindow", "width=800,height=600");
  };

  return (
    <Box sx={{ transform: "translateZ(0px)" }}>
      <SpeedDial
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={"Right"}
        ariaLabel="SpeedDial basic example"
        // sx={{
        //   "& .MuiSpeedDialAction-fab": {
        //     "& .MuiSvgIcon-root": {
        //       fontSize: "25px",
        //     },
        //   },
        //   "& .MuiFab-primary": { width: "40px", height: "40px" },
        //   "& .MuiSpeedDialIcon-icon": { fontSize: "20px" },
        //   "& .MuiSpeedDialIcon-openIcon": { fontSize: "20px" },
        // }}
        sx={{
          "& .MuiFab-primary": { width: "40px", height: "40px" },
          "& .MuiSpeedDialIcon-icon": { fontSize: "20px" },
          "& .MuiSpeedDialIcon-openIcon": { fontSize: "20px" },
          position: "absolute",
          top: -8,
          left: 16,
          "& .MuiSpeedDial-root.MuiSpeedDial-open .MuiSpeedDial-actions": {
            display: "flex",
            flexDirection: "column",
          },
        }}
        icon={
          <SpeedDialIcon icon={<AttachFileIcon />} openIcon={<EditIcon />} />
        }
      >
        {actions.map((action) => (
          <SpeedDialAction
            onClick={() => {
              if (action.name === "نمایش فایل") {
                handleView();
              }
              if (action.name === "دانلود") {
                if (!isLoadingDownload) {
                  handleDownload();
                }
              }
              if (action.name === "پرینت") {
                handlePrint();
              }
            }}
            sx={{
              backgroundColor: "white",
              transition: "0.4s",
              "&:hover": { backgroundColor: "rgb(226 232 240)" },
            }}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      {/* {!open && (
        <div>
          {item.status === 1 && (
            <div className="absolute top-1/2 left-6 -translate-y-1/2">
              <span className="text-teal-500 bg-teal-50 rounded-full px-2 select-none">
                جدید
              </span>
            </div>
          )}
          {item.status === 2 && (
            <div className="absolute top-1/2 -left-6 -translate-y-1/2">
              <span className="text-yellow-600 bg-yellow-50 rounded-full px-2 select-none">
                در حال بررسی
              </span>
            </div>
          )}
          {item.status === 3 && (
            <div className="absolute top-1/2 -left-6 -translate-y-1/2">
              <span className="text-red-600 bg-red-50 rounded-full px-2 select-none">
                رد شده
              </span>
            </div>
          )}
          {item.status === 4 && (
            <div className="absolute top-1/2 -left-6 -translate-y-1/2">
              <span className="text-emerald-600 bg-emerald-50 rounded-full px-2 select-none">
                تایید شده
              </span>
            </div>
          )}
          {item.status === 5 && (
            <div className="absolute top-1/2 -left-6 -translate-y-1/2">
              <span className="text-orange-600 bg-orange-50 rounded-full px-2 select-none">
                آرشیو شده
              </span>
            </div>
          )}
        </div>
      )} */}
    </Box>
  );
}
