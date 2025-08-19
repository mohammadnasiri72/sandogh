import { Button, Dialog, Divider, IconButton, Slide } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { forwardRef, useEffect, useRef, useState } from "react";
import { FaPrint } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

ModalFormCapitalAll.propTypes = {
  valStep: PropTypes.number,
};
export default function ModalFormCapitalAll({ valStep }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const fontSize = useSelector((store) => store.setting.fontSize);
  //   const cooperativeId = useSelector((store) => store.cooperative.cooperativeId);
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [formDetails, setFormDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formId, setFormId] = useState(0);


  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const formRef = useRef(null);

  const handleSubmit = () => {
    let newState = true;
    const forms = document.querySelectorAll("form.form-req");
    forms.forEach((form) => {
      const radios = form.querySelectorAll('input[type="radio"]');
      let isChecked = false;
      radios.forEach((radio) => {
        if (radio.checked) {
          isChecked = true;
        }
      });
      if (!isChecked) {
        newState = false;
      }
    });
    const textInputs = document.querySelectorAll('input[type="text"].form-req');
    const textAreas = document.querySelectorAll("textarea.form-req");
    const selects = document.querySelectorAll("select.form-req");
    textInputs.forEach((input) => {
      if (input.value.trim() === "") {
        newState = false;
      }
    });

    textAreas.forEach((textarea) => {
      if (textarea.value.trim() === "") {
        newState = false;
      }
    });

    selects.forEach((select) => {
      if (select.selectedIndex === 0) {
        newState = false;
      }
    });
    if (newState) {
      if (formRef.current.innerHTML) {
        formRef.current.querySelectorAll("input").forEach((input) => {
          if (input.type === "radio" || input.type === "checkbox") {
            if (input.checked) {
              input.setAttribute("checked", "checked");
            } else {
              input.removeAttribute("checked");
            }
          } else {
            input.setAttribute("value", input.value);
          }
        });
        formRef.current.querySelectorAll("textarea").forEach((textarea) => {
          textarea.textContent = textarea.value;
        });
        formRef.current.querySelectorAll("select").forEach((select) => {
          Array.from(select.options).forEach((option) => {
            if (option.selected) {
              option.setAttribute("selected", "selected");
            } else {
              option.removeAttribute("selected");
            }
          });
        });

        setFormDetails(formRef.current.innerHTML);

        const data = {
          formId,
          formTypeId: 6,
          body: formRef.current.innerHTML,
          description: "",
        };

        axios
          //   .post(mainDomain + `/api/Capital/${id}/certificate`, data, {
          .post(mainDomain + `/api/Capital/${valStep}/certificates`, data, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then(() => {
            // setFlag((e) => !e);
            Toast.fire({
              icon: "success",
              text: "فرم برگ سهام با موفقیت ذخیره شد",
              customClass: {
                container: "toast-modal",
              },
            });
          })
          .catch((err) => {
            Toast.fire({
              icon: "error",
              text: err.response ? err.response.data : "خطای شبکه",
              customClass: {
                container: "toast-modal",
              },
            });
          });
      }
    } else {
      Toast.fire({
        icon: "error",
        text: "لطفا مقادیر اجباری فرم را وارد کنید",
        customClass: {
          container: "toast-modal",
        },
      });
    }
  };

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      axios
        // .get(mainDomain + `/api/Capital/${id}/certificate`, {
        .get(mainDomain + `/api/Capital/${valStep}/certificates`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setFormDetails(res.data);

          setFormId(res.data.formId);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  // const handlePrint = () => {
  //   window.print();
  // };
  const handlePrint = () => {
    const existingPrintStyle = document.getElementById("print-style");
    if (existingPrintStyle) {
      existingPrintStyle.remove();
    }

    const style = document.createElement("style");
    style.id = "print-style";
    style.innerHTML = `
     @media print {
     
      @page {
         margin: 0;
        size: landscape;
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
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    padding: 0px !important;
     height: 100vh !important;
      
  }
     @supports (-moz-appearance: none) {
        #loan-request-container {
            height: 113.3vh !important; /* برای فایرفاکس */
        }
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
    window.print();
    setTimeout(() => {
      const printStyle = document.getElementById("print-style");
      if (printStyle) {
        printStyle.remove();
      }
    }, 100); 
  };

  return (
    <>
      <div className="flex justify-start items-center sm:w-auto w-full test">
        <Button
          className="w-full"
          onClick={handleClickOpen}
          sx={{
            fontSize: "12px",
            // minWidth: "35px",
            transition: "0.6s",
            color: "#fff",
            background: "#34c38f",
            boxShadow: "none",
          }}
        >
          <div className="flex items-center">
            <FaPrint />
            <span className="px-1">پرینت فرم های برگ سهام</span>
          </div>
        </Button>
      </div>

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
              ? "flex justify-between items-center px-4 py-2 shadow-lg test"
              : "flex justify-between items-center px-4 py-2 shadow-lg test"
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
            {/* <Button
              size="large"
              onClick={handleSubmit}
              sx={{
                fontSize: "12px",
                transition: "0.6s",
                color: "#fff",
                background: "rgb(16 185 129)",
                boxShadow: "none",
              }}
            >
              <div className="flex items-center">
                <span className="px-1 whitespace-nowrap">ذخیره</span>
              </div>
            </Button> */}
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

        {/* <div className="">
          <div className="px-2 mt-20">
            <div
              id="loan-request-container"
              className="px-2 text-xs"
              dangerouslySetInnerHTML={{ __html: formDetails }}
            />
          </div>
        </div> */}
        <div className="">
          <div className="px-2 mt-20">
            {isLoading && (
              <div className="flex justify-center items-center w-full h-96 test">
                <SyncLoader
                  color={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                />
              </div>
            )}
            {formDetails && (
              <div
              style={{
                fontSize: `${fontSize}px`,
              }}
                ref={formRef}
                id="loan-request-container"
                className="px-2 formCapital"
                dangerouslySetInnerHTML={{ __html: formDetails }}
              />
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}
