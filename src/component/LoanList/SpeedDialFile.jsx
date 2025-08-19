import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { mainDomain } from "../../utils/mainDomain";

SpeedDialFile.propTypes = {
  e: PropTypes.object,
};
export default function SpeedDialFile({ e }) {
  const [open, setOpen] = useState(false);
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const themeColor = useSelector((store) => store.setting.themeColor);
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

  const handleDownload = (fileUrl) => {
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
        setIsLoadingDownload(false);
        console.error("خطا در دانلود فایل:", error);
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
    <>
      <SpeedDial
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={"Right"}
        ariaLabel="SpeedDial basic example"
        sx={{
          "& .MuiFab-primary": {
            width: "40px",
            height: "40px",
            background: themeColor.bgColor,
            color: themeColor.color,
          },
          "& .MuiFab-primary:hover": {
            background: themeColor.bgColor,
            color: themeColor.color,
          },
          "& .MuiSpeedDialIcon-icon": { fontSize: "20px" },
          "& .MuiSpeedDialIcon-openIcon": { fontSize: "20px" },

          position: "absolute",
          bottom: 0,
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
                handleView(e.fileUrl);
              }
              if (action.name === "دانلود") {
                if (!isLoadingDownload) {
                  handleDownload(e.fileUrl);
                }
              }
              if (action.name === "پرینت") {
                handlePrint(e.fileUrl);
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
    </>
  );
}
