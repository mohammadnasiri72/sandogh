import { Button, Dialog, Divider, IconButton, Slide } from "@mui/material";
import axios from "axios";
import { forwardRef, useEffect, useRef, useState } from "react";
import { IoCloseSharp, IoSaveOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { mainDomain } from "../../utils/mainDomain";
import { SyncLoader } from "react-spinners";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import ConfirmDeleteForm from "./confirmDeleteForm";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

ModalDetailsFormContract.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  flag: PropTypes.bool,
  setFlag: PropTypes.func,
  status: PropTypes.number,
  loanId: PropTypes.number,
  getLoanAdminList: PropTypes.func,
  LoanEdited: PropTypes.object,
};
export default function ModalDetailsFormContract({
  open,
  setOpen,
  flag,
  setFlag,
  status,
  loanId,
  getLoanAdminList,
  LoanEdited
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const fontSize = useSelector((store) => store.setting.fontSize);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);
  const [formDetails, setFormDetails] = useState("");
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
    const data = {
      formId,
      formTypeId: 2,
      body: formRef.current.innerHTML,
      description: "",
    };

    axios
      // .post(mainDomain + `/api/LoanForm/${loanId}`, data, {
      .post(mainDomain + `/api/Form/Loan/${loanId}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        if (getLoanAdminList) {
          getLoanAdminList();
        }
        setFlag((e) => !e);
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

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      axios
        .get(mainDomain + `/api/Form/Loan/${loanId}/${2}`, {
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
            {status === 100 && (
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
                   <IoSaveOutline className="text-lg"/>
                  <span className="px-1 whitespace-nowrap">ذخیره</span>
                </div>
              </Button>
            )}
            {status === 100 && LoanEdited?.formStatus >= 2 && (
              <ConfirmDeleteForm
                setFlagDel={setFlag}
                id={formId}
                getLoanAdminList={getLoanAdminList}
              />
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
        </div>
      </Dialog>
    </>
  );
}
