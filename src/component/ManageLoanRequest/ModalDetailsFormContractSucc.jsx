import { Button, Dialog, Divider, IconButton, Slide } from "@mui/material";
import axios from "axios";
import { forwardRef, useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { mainDomain } from "../../utils/mainDomain";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

ModalDetailsFormContractSucc.propTypes = {
  
  loan: PropTypes.object,
};
export default function ModalDetailsFormContractSucc({ loan }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const fontSize = useSelector((store) => store.setting.fontSize);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);
  const [formDetails, setFormDetails] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [formId, setFormId] = useState(0);
  const [open, setOpen] = useState(0);

  const formRef = useRef(null);

  // import sweet alert 2
    const Toast = Swal.mixin({
      toast: true,
      position: "top-start",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: "toast-modal",
    });
  

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      axios
      .get(mainDomain + `/api/Form/Loan/${loan.loanId}/${2}`, {
          // .get(mainDomain + `/api/Form/Request/${loan.id}/${2}`, {
            headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setFormDetails(res.data.body);
          setFormId(res.data.formId);
        })
        .catch((err) => {
          setIsLoading(false);
          setErrMessage(err.response?.data);
          
        });
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setFormDetails("");
  };
  const handleOpen = () => {
    setOpen(true);
  };


  const handleSubmit = () => {
    const data = {
      formId,
      formTypeId: 2,
      body: formRef.current.innerHTML,
      description: "",
    };

    axios
      .post(mainDomain + `/api/Form/Loan/${loan.loanId}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        // setFlag((e) => !e);
        Toast.fire({
          icon: "success",
          text: "فرم قرارداد با موفقیت ذخیره شد",
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
  };

  return (
    <>
     <div>
        <Button
          disabled={!loan.loanId}
          style={{ background: loan.loanId ? "#34c38f" : "#d5d5d5" }}
          className="flex items-center"
          onClick={handleOpen}
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
              d="M10.81 16.95C10.62 16.95 10.43 16.88 10.28 16.73L8.78 15.23C8.49 14.94 8.49 14.46 8.78 14.17C9.07 13.88 9.55 13.88 9.84 14.17L10.81 15.14L14.28 11.67C14.57 11.38 15.05 11.38 15.34 11.67C15.63 11.96 15.63 12.44 15.34 12.73L11.34 16.73C11.2 16.88 11 16.95 10.81 16.95Z"
              fill="#fff"
            />
          </svg>
          <span className="text-[#fff]">فرم قرارداد</span>
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
            {
                loan.status !==5 &&
            <Button
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
            </Button>
            }
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
            {!isLoading &&!formDetails && errMessage && <span>{typeof errMessage === "string" ?   errMessage : 'آیتمی یافت نشد'}</span>}
            {!isLoading &&!formDetails && !errMessage && <span>آیتمی یافت نشد</span>}
          </div>
        </div>
      </Dialog>
    </>
  );
}
