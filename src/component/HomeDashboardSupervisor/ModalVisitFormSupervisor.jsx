import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Tooltip,
} from "@mui/material";
import { Spin } from "antd";
import axios from "axios";
import PropTypes from "prop-types";
import { forwardRef, useEffect, useRef, useState } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

ModalVisitFormSupervisor.propTypes = {
  Supervisor: PropTypes.object,
  day: PropTypes.number,
};
export default function ModalVisitFormSupervisor({ Supervisor, day }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);
  const [formDetails, setFormDetails] = useState("");
  const [formId, setFormId] = useState(0);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [flag, setFlag] = useState(false);

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
      formRef.current.querySelectorAll("input").forEach((input) => {
        if (input.type === "radio" || input.type === "checkbox") {
          if (input.checked) {
            input.setAttribute("checked", "checked");
          } else {
            input.removeAttribute("checked");
            // setAllow(false)
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
        formTypeId: 5,
        body: formRef.current.innerHTML,
        description: "",
      };
      setIsLoadingConfirm(true);
      axios
        .post(mainDomain + `/api/Form/Loan/${Supervisor.id}/Supervisor`, data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          setFlag((e) => !e);

          Toast.fire({
            icon: "success",
            text: "فرم ناظر با موفقیت ذخیره شد",
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
        })
        .finally(() => {
          setIsLoadingConfirm(false);
          setOpenConfirm(false);
        });
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

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      axios
        .get(mainDomain + `/api/Form/Loan/${Supervisor.id}/Supervisor`, {
          // .get(mainDomain + `/api/Form/Loan/${Supervisor.id}/${5}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setFormDetails(res.data.body);
          setFormId(res.data.formId);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [open, flag]);

  const handleClose = () => {
    setOpen(false);
    setFormDetails("");
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="px-1">
          <Tooltip
            title={
              Supervisor.loanMaturityRemainDay >= day
                ? "مشاهده فرم"
                : "منقضی شده"
            }
          >
            <IconButton
              onClick={() => {
                if (Supervisor.loanMaturityRemainDay >= day) {
                  setOpen(true);
                }
              }}
              sx={{
                backgroundColor:
                  Supervisor.loanMaturityRemainDay >= day
                    ? "#34c38f"
                    : "#cdcdcd",
                "&:hover": {
                  backgroundColor:
                    Supervisor.loanMaturityRemainDay >= day
                      ? "#2ca67a"
                      : "#cdcdcd",
                },
                cursor:
                  Supervisor.loanMaturityRemainDay >= day ? "" : "default",
              }}
            >
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
            </IconButton>
          </Tooltip>
        </div>
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
            {formId === 0 && (
              <Button
                size="large"
                onClick={() => {
                  setOpenConfirm(true);
                  // handleSubmit()
                }}
                sx={{
                  fontSize: "12px",
                  transition: "0.6s",
                  color: "#fff",
                  background: "rgb(16 185 129)",
                  boxShadow: "none",
                }}
              >
                <div className="flex items-center">
                  <span className="px-1 whitespace-nowrap">ارسال</span>
                </div>
              </Button>
            )}
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
            {isLoading && (
              <div className="flex justify-center items-center w-full h-96">
                <SyncLoader
                  color={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                />
              </div>
            )}
            {formDetails && (
              <div>
                <div
                  ref={formRef}
                  id="loan-request-container"
                  className="px-2 text-xs"
                  dangerouslySetInnerHTML={{ __html: formDetails }}
                />
              </div>
            )}
          </div>
        </div>
        <Dialog
          open={openConfirm}
          keepMounted
          onClose={handleCloseConfirm}
          aria-describedby="alert-dialog-slide-description"
          PaperProps={{
            sx: { width: "500px", maxWidth: "none" },
            className: open
              ? "animate__animated animate__custom-fadeInUpDel"
              : "",
          }}
        >
          <DialogTitle sx={{ fontSize: 30, color: "rgb(16 185 129)" }}>
            {"ارسال فرم"}
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText
              sx={{ mt: 0 }}
              id="alert-dialog-slide-description"
            >
              آیا از ارسال فرم مطمئن هستید؟
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              bgcolor:
                themeMode === "dark" ? "rgb(30 41 59)" : "rgb(241 245 249)",
            }}
          >
            <Button
              onClick={handleSubmit}
              sx={{
                minWidth: "35px",
                transition: "0.6s",
                color: "white",
                backgroundColor:
                  themeMode === "dark" ? "rgb(51 65 85)" : "rgb(16 185 129)",
                "&:hover": {
                  backgroundColor: "rgb(5 150 105)",
                  color: "white",
                },
                boxShadow: "none",
              }}
            >
              {isLoadingConfirm ? (
                <div className="flex items-center">
                  <Spin className="spin-confirm" size="small" />
                  <span className="px-1">در حال ارسال</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <AiOutlineFileDone className="text-xl" />
                  <span className="px-1">ارسال</span>
                </div>
              )}
            </Button>
            <Button
              onClick={handleCloseConfirm}
              sx={{
                minWidth: "35px",
                transition: "0.6s",
                color: "#74788d",
                backgroundColor:
                  themeMode === "dark" ? "rgb(51 65 85)" : "#f1f1f3",
                "&:hover": {
                  backgroundColor: "#74788d",
                  color: "white",
                },
                boxShadow: "none",
              }}
            >
              <div className="flex items-center">
                <span>انصراف</span>
              </div>
            </Button>
          </DialogActions>
        </Dialog>
      </Dialog>
    </>
  );
}
