import { Button, Dialog, Divider, IconButton, Slide } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

ModalDetailsFormTabTranscript.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  formDetails: PropTypes.string,
  typeId: PropTypes.number,
};
export default function ModalDetailsFormTabTranscript({
  open,
  setOpen,
  formDetails,
  typeId,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const fontSize = useSelector((store) => store.setting.fontSize);

  const formRef = useRef(null);

  const handlePrint = () => {
    // ۱. حذف استایل‌های پرینت قبلی (اگر وجود دارد)
    const existingPrintStyle = document.getElementById("print-style");
    if (existingPrintStyle) {
      existingPrintStyle.remove();
    }

    // ۲. ایجاد یک استایل جدید برای پرینت
    const style = document.createElement("style");
    style.id = "print-style";
    style.innerHTML = `
     @media print {
      @page {
         margin: 0px;
        size:${(typeId === 4) && "landscape"} ;
  }

  #loan-request-container{
    height: 100vh !important;
  }
  #loan-request-container .capital_sheet_bg {
    height: 100% !important;
  }

  body * {
    visibility: hidden;
  }
  .test{
    display: none;
  }

  #loan-request-container,
  #loan-request-container * {
    visibility: visible;
  }
  #loan-request-container {
    position: absolute;
    left: 0 !important;
    top: 0 !important;
     right: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    padding: 10px !important;
    
  }
   

  body::before,
  body::after,
  header,
  footer {
    display: none;
  }
}
    `;
    document.head.appendChild(style);

    // ۳. پرینت گرفتن
    window.print();

    // ۴. حذف استایل‌های پرینت بعد از پرینت
    setTimeout(() => {
      const printStyle = document.getElementById("print-style");
      if (printStyle) {
        printStyle.remove();
      }
    }, 100); // تاخیر ۱۰۰ میلی‌ثانیه قبل از حذف استایل
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
          <div className="px-4 flex gap-2">
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
            {formDetails && (
              <div
                style={{
                  fontSize: `${fontSize}px`,
                }}
                ref={formRef}
                id="loan-request-container"
                className="px-2"
                dangerouslySetInnerHTML={{ __html: formDetails }}
              />
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}
