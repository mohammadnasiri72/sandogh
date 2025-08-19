import { Button, Dialog, Divider, IconButton, Slide } from "@mui/material";
import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { mainDomain } from "../../../utils/mainDomain";
import "./LoanRequestForm.css";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalVisitForm() {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const loanId = useSelector((store) => store.adminLoanRequest.loanId);
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [formDetails, setFormDetails] = useState("");

  useEffect(() => {
    axios
      .get(mainDomain + `/api/LoanRequest/${loanId}/Form`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setFormDetails(res.data);
      })
      .catch(() => {});
  }, [loanId]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Button
        size="large"
        onClick={handleClickOpen}
        sx={{
          fontSize: "12px",
          transition: "0.6s",
          color: "#fff",
          backgroundColor: "#34c38f",
          "&:hover": {
            backgroundColor: "#2ca67a",
          },
          boxShadow: "none",
        }}
      >
        <div className="flex items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M16.24 3.65002H7.76C5.29 3.65002 3.29 5.66002 3.29 8.12002V17.53C3.29 19.99 5.3 22 7.76 22H16.23C18.7 22 20.7 19.99 20.7 17.53V8.12002C20.71 5.65002 18.7 3.65002 16.24 3.65002Z"
              fill="#fff"
            />
            <path
              d="M14.35 2H9.65C8.61 2 7.76 2.84 7.76 3.88V4.82C7.76 5.86 8.6 6.7 9.64 6.7H14.35C15.39 6.7 16.23 5.86 16.23 4.82V3.88C16.24 2.84 15.39 2 14.35 2Z"
              fill="#fff"
            />
            <path
              d="M15 12.95H8C7.59 12.95 7.25 12.61 7.25 12.2C7.25 11.79 7.59 11.45 8 11.45H15C15.41 11.45 15.75 11.79 15.75 12.2C15.75 12.61 15.41 12.95 15 12.95Z"
              fill="#fff"
            />
            <path
              d="M12.38 16.95H8C7.59 16.95 7.25 16.61 7.25 16.2C7.25 15.79 7.59 15.45 8 15.45H12.38C12.79 15.45 13.13 15.79 13.13 16.2C13.13 16.61 12.79 16.95 12.38 16.95Z"
              fill="#fff"
            />
          </svg>
          <span className="px-1 whitespace-nowrap">فرم درخواست تسهیلات</span>
        </div>
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          sx: { background: themeMode === "dark" ? "rgb(15 23 42)" : "#fff" },
        }}
      >
        <div
          style={{
            position: "fixed",
            backgroundColor: "white",
            left: 0,
            right: 0,
            background: themeMode === "dark" ? "rgb(2 6 23)" : "#fff",
          }}
          className={
            themeMode === "dark"
              ? "flex justify-between items-center px-4 py-2 shadow-lg"
              : "flex justify-between items-center px-4 py-2 shadow-lg"
          }
        >
          <div className="px-4 flex">
            <Button
              size="large"
              onClick={handlePrint}
              sx={{
                fontSize: "12px",
                transition: "0.6s",
                color: themeColor.color,
                background: themeColor.bgColor,
                boxShadow: "none",
              }}
            >
              <div className="flex items-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 15V19C16 20.66 14.66 22 13 22H11C9.34 22 8 20.66 8 19V15H16Z"
                    fill={themeColor.color}
                  />
                  <path
                    d="M7 7V5C7 3.34 8.34 2 10 2H14C15.66 2 17 3.34 17 5V7H7Z"
                    fill={themeColor.color}
                  />
                  <path
                    opacity="0.4"
                    d="M18 7H6C4 7 3 8 3 10V15C3 17 4 18 6 18H8V15H16V18H18C20 18 21 17 21 15V10C21 8 20 7 18 7ZM10 11.75H7C6.59 11.75 6.25 11.41 6.25 11C6.25 10.59 6.59 10.25 7 10.25H10C10.41 10.25 10.75 10.59 10.75 11C10.75 11.41 10.41 11.75 10 11.75Z"
                    fill={themeColor.color}
                  />
                  <path
                    d="M10.75 11C10.75 11.41 10.41 11.75 10 11.75H7C6.59 11.75 6.25 11.41 6.25 11C6.25 10.59 6.59 10.25 7 10.25H10C10.41 10.25 10.75 10.59 10.75 11Z"
                    fill={themeColor.color}
                  />
                  <path
                    d="M17 15.75H7C6.59 15.75 6.25 15.41 6.25 15C6.25 14.59 6.59 14.25 7 14.25H17C17.41 14.25 17.75 14.59 17.75 15C17.75 15.41 17.41 15.75 17 15.75Z"
                    fill={themeColor.color}
                  />
                </svg>

                <span className="px-1 whitespace-nowrap">پرینت</span>
              </div>
            </Button>
          </div>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <IoCloseSharp />
          </IconButton>
        </div>
        <Divider />

        <div className="">
          <div className="px-2 mt-20">
            <div
              id="loan-request-container"
              className="px-2 text-xs"
              dangerouslySetInnerHTML={{ __html: formDetails }}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}
