import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoMdReturnLeft } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import { TbFilePlus } from "react-icons/tb";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../../utils/mainDomain";
import TableCurentFile from "./TableCurentFile";

const useStyles = makeStyles({
  animatedDialog: { animation: `$fadeInUp 500ms` },
  "@keyframes fadeInUp": {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

ModalCurentFile.propTypes = {
  files: PropTypes.array,
  valItem: PropTypes.object,
  setFlag: PropTypes.func,
};
export default function ModalCurentFile({ files, valItem, setFlag }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const loanId = useSelector((store) => store.loanRequest.loanId);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFiles([]);
  };
  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const submitFormHandler = () => {
    setIsLoading(true);
    const requests = selectedFiles.map((item) => {
      const data = {
        requestId: loanId,
        itemId: valItem.id,
        isFromAvailableFiles: true,
        fileName: item.fileUrl,
        desc: item.fileDesc,
      };
      return axios.post(mainDomain + "/api/LoanRequest/Doc", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    });
    Promise.all(requests)
      .then(() => {
        setIsLoading(false);
        setFlag((e) => !e);
        Toast.fire({
          icon: "success",
          text: "عملیات با موفقیت انجام شد",
          customClass: {
            container: "toast-modal",
          },
        });
      })
      .catch((err) => {
        setIsLoading(false);
        Toast.fire({
          icon: "error",
          text: err.response ? err.response.data : "خطای شبکه",
          customClass: {
            container: "toast-modal",
          },
        });
      });
  };
  return (
    <>
      <Button
        onClick={handleClickOpen}
        sx={{
          fontSize: "12px",
          minWidth: "35px",
          transition: "0.6s",
          whiteSpace: "nowrap",
          color: "#fff",
          backgroundColor: "rgb(59 130 246)",
          "&:hover": {
            backgroundColor: "rgb(37 99 235)",
          },
          boxShadow: "none",
        }}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<TbFilePlus />}
      >
        انتخاب از فایلهای موجود
      </Button>
      <Dialog
        PaperProps={{
          className: classes.animatedDialog,
          sx: { minWidth: "600px", maxWidth: "none" },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div
          className={
            themeMode === "dark"
              ? "flex justify-between px-5 items-center py-2 bg-slate-700"
              : "flex justify-between px-5 items-center py-2 bg-slate-50"
          }
        >
          <span className="text-xl">{valItem.title}</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>

        <TableCurentFile
          files={files}
          valItem={valItem}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
        />

        <DialogActions>
          <div className="flex w-full justify-center">
            <div className="px-1">
              <Button
                size="large"
                onClick={submitFormHandler}
                disabled={isLoading || selectedFiles.length === 0}
                className="bg-slate-800"
                sx={{
                  fontSize: "12px",
                  transition: "0.6s",
                  color: "#fff",
                  backgroundColor:
                    selectedFiles.length === 0 ? "#0001" : "#556ee6",
                  "&:hover": {
                    backgroundColor: "#485ec4",
                  },
                  boxShadow: "none",
                }}
              >
                {!isLoading && (
                  <div className="flex items-center">
                    <MdOutlineDone />
                    <span className="px-1">تایید</span>
                  </div>
                )}
                {isLoading && (
                  <div className="flex justify-center items-center">
                    <div className="scale-50 w-10 h-6  text-white">
                      <CircularProgress sx={{ color: "#fff" }} />
                    </div>
                  </div>
                )}
              </Button>
            </div>
            <div className="px-1">
              <Button
                size="large"
                onClick={handleClose}
                disabled={isLoading}
                sx={{
                  fontSize: "12px",
                  transition: "0.6s",
                  color: "#fff",
                  backgroundColor: "#74788d",
                  "&:hover": {
                    backgroundColor: "#636678",
                  },
                  boxShadow: "none",
                }}
              >
                <div className="flex items-center">
                  <IoMdReturnLeft />
                  <span className="px-1">انصراف</span>
                </div>
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
