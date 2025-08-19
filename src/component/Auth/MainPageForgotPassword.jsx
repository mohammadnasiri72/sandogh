import { CircularProgress, IconButton } from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { BiHome } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";
import { useSelector } from "react-redux";

const StyledInputUserName = styled.input`
  padding-right: 30px;
  color: #565656;
  &::placeholder {
    font-size: 12px;
    font-weight: 700;
    color: #888;
  }
`;

export default function MainPageForgotPassword() {
  const setting = useSelector((store) => store.setting.setting);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const btnLog = useRef(null);

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const handleSubmit = () => {
    if (!username) {
      Toast.fire({
        icon: "error",
        text: "لطفا نام کاربری را وارد کنید",
        customClass: {
          container: "toast-modal",
        },
      });
    }
    if (username) {
      const data = {
        username,
      };
      setIsLoading(true);
      axios
        .post(mainDomain + "/api/Account/ResetPassword", data)
        .then(() => {
          Toast.fire({
            icon: "success",
            text: "رمز عبور به شماره همراه شما ارسال شد",
            customClass: {
              container: "toast-modal",
            },
          });
          setIsLoading(false);
          setUsername("");
          navigate("/Auth/Login");
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
    }
  };

  return (
    <>
      <div
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            btnLog.current.click();
          }
        }}
      >
        <div className="flex justify-end w-full p-4">
          <IconButton
            sx={{ color: "#eee" }}
            onClick={() => {
              window.location.href = "https://www.sandoghashayeri.ir/";
            }}
          >
            <BiHome className="text-3xl" />
          </IconButton>
        </div>
        <div className="flex flex-col items-center mt-3 pb-5 px-3">
          <div className="w-full lg:w-1/3 sm:w-1/2 bg-white rounded-lg pb-4 relative">
            <div className="w-20 h-20 absolute top-0 right-1/2 translate-x-1/2 shadow-md bg-white rounded-lg rotate-45 p-2 -translate-y-1/2 cursor-pointer flex justify-center items-center">
              <img
                className="-rotate-45"
                src={
                  setting.length > 0
                    ? setting.find((e) => e.propertyKey === "site_logo")
                      ? setting.find((e) => e.propertyKey === "site_logo").value
                      : "/images/b 1.svg"
                    : "/images/b 1.svg"
                }
                alt=""
              />
            </div>
            <div className="pt-16 flex flex-col items-center">
              <span className="font-bold  text-blue-500 text-lg">
                فراموشی گذرواژه !
              </span>
              <p className="text-sm text-start text-blue-500">
                برای دریافت رمز لطفا مشخصات خود را وارد کنید
              </p>
            </div>
            <div className="flex flex-col items-start px-5 pt-4">
              <span
                style={{ fontWeight: 800 }}
                className=" text-sm px-1 text-[#565656]"
              >
                نام کاربری
              </span>
              <div className="mt-3 w-full relative">
                <FaUser className="absolute top-1/2 right-2 -translate-y-1/2 text-blue-700 bg-blue-300 rounded-full p-1 text-xl" />
                <StyledInputUserName
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className="w-full border rounded-md outline-none p-1 bg-transparent"
                  type="text"
                  placeholder="نام کاربری خود را وارد کنید"
                />
              </div>
            </div>
            <div className="px-5 mt-3">
              <button
                disabled={isLoading}
                type="submit"
                ref={btnLog}
                onClick={handleSubmit}
                className="w-full bg-orange-400 hover:bg-orange-500 duration-300 rounded-lg py-2 text-white"
              >
                {!isLoading && (
                  <span className="text-white">ارسال رمز جدید</span>
                )}
                {isLoading && (
                  <div className="flex items-center justify-center">
                    <span className="text-white">ارسال کردن</span>
                    <div className="scale-50 w-5 h-5 -mt-2 text-white">
                      <CircularProgress sx={{ color: "white" }} />
                    </div>
                  </div>
                )}
              </button>
            </div>
            <div
              onClick={() => {
                navigate("/Auth/login");
              }}
              className="flex justify-center items-center cursor-pointer mt-4"
            >
              <CiLogin className="text-[#0008]" />
              <span className="text-xs px-1 text-[#0008]">
                بازگشت به صفحه ورود
              </span>
            </div>
          </div>
          <div className="flex justify-between pt-2 flex-wrap sm:w-1/2 lg:w-1/3 w-full px-2">
            <a
              className="flex items-center text-xs text-white duration-300 hover:text-[#fffa]"
              href={`tel:${
                setting.find((e) => e.propertyKey === "site_tel")?.value
              }`}
            >
              <span className="px-1">
                {setting.find((e) => e.propertyKey === "site_tel")?.value}
              </span>
              <img className="w-4" src="/images/call-calling.png" alt="" />
            </a>
            <a
              className="flex items-center text-xs text-white duration-300 hover:text-[#fffa] "
              href={`mailto:${
                setting.find((e) => e.propertyKey === "site_email")?.value
              }`}
            >
              <span className="px-1">
                {setting.find((e) => e.propertyKey === "site_email")?.value}
              </span>
              <img className="w-5" src="/images/sms-notification.png" alt="" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
