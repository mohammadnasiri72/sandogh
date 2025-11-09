import {
  Badge,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Menu,
} from "@mui/material";
import "animate.css/animate.min.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { LuClock4 } from "react-icons/lu";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mainDomain } from "../../utils/mainDomain";
import ModalDetailMessage from "./ModalDetailMessage";
import ModalResponseMessage from "./ModalResponseMessage";

export default function NotifficationNav() {
  const user = JSON.parse(localStorage.getItem("user"));
  const themeModeNavBar = useSelector((store) => store.setting.themeModeNavBar);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const [anchorEl, setAnchorEl] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [numMessageUnread, setNumMessageUnread] = useState(0);
  const [message, setMessage] = useState([]);
  const [openModalMessage, setOpenModalMessage] = useState(false);
  const [openModalMessageRes, setOpenModalMessageRes] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState({});
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [flag, setFlag] = useState(false);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const Navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setInterval(() => {
        setFlag((e) => !e);
      }, 120000);
    }, 120000);
  }, []);

  window.addEventListener("resize", () => {
    setWidth(window.innerWidth);
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (user.roles[0] !== "Supervisor") {
      axios
        .get(mainDomain + "/api/Message/Unseen", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setNumMessageUnread(res.data);
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            Navigate("/Auth/Login");
          }
          if (err?.response?.status === 500) {
            Navigate("/Auth/Login");
          }
          // Navigate("/Auth/Login");
        });
    }
  }, [flag]);

  useEffect(() => {
    if (anchorEl) {
      setIsLoading(true);
      axios
        .get(mainDomain + "/api/Message", {
          params: {
            type: "inbox",
            find: "",
            sortFilter: 1,
            pageSize: 3,
            page: 1,
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          setMessage(res.data);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [anchorEl]);

  return (
    <>
      <div className="">
        <IconButton
          sx={{
            "&:hover": { backgroundColor: "transparent" },
          }}
          onClick={handleClick}
        >
          <Badge
            badgeContent={numMessageUnread}
            color="error"
            className="cursor-pointer"
          >
            <span
              className={
                numMessageUnread > 0
                  ? "animate__animated animate__swing animate__infinite"
                  : ""
              }
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M22.3885 16.8456L21.2456 14.9484C21.0056 14.5256 20.7885 13.7256 20.7885 13.257V10.3656C20.7885 6.63985 17.7599 3.59985 14.0228 3.59985C10.2856 3.59985 7.25706 6.63985 7.25706 10.3656V13.257C7.25706 13.7256 7.03992 14.5256 6.79992 14.937L5.64563 16.8456C5.18849 17.6113 5.08563 18.457 5.37135 19.2341C5.64563 19.9999 6.29706 20.5941 7.14277 20.8799C9.35992 21.6341 11.6913 21.9999 14.0228 21.9999C16.3542 21.9999 18.6856 21.6341 20.9028 20.8913C21.7028 20.6284 22.3199 20.0227 22.6171 19.2341C22.9142 18.4456 22.8342 17.577 22.3885 16.8456Z"
                  fill={themeModeNavBar === "dark" ? "#fff" : "#1787B0"}
                />
                <path
                  d="M16.5714 4.07986C15.7829 3.77129 14.9257 3.59986 14.0229 3.59986C13.1314 3.59986 12.2743 3.75986 11.4857 4.07986C11.9771 3.15415 12.9486 2.57129 14.0229 2.57129C15.1086 2.57129 16.0686 3.15415 16.5714 4.07986Z"
                  fill={themeModeNavBar === "dark" ? "#fff" : "#1787B0"}
                />
                <path
                  d="M17.2342 23.1543C16.7542 24.48 15.4857 25.4285 14 25.4285C13.0971 25.4285 12.2057 25.0628 11.5771 24.4114C11.2114 24.0685 10.9371 23.6114 10.7771 23.1428C10.9257 23.1657 11.0742 23.1771 11.2342 23.2C11.4971 23.2342 11.7714 23.2685 12.0457 23.2914C12.6971 23.3485 13.36 23.3828 14.0228 23.3828C14.6742 23.3828 15.3257 23.3485 15.9657 23.2914C16.2057 23.2685 16.4457 23.2571 16.6742 23.2228C16.8571 23.2 17.04 23.1771 17.2342 23.1543Z"
                  fill={themeModeNavBar === "dark" ? "#fff" : "#1787B0"}
                />
              </svg>
            </span>
          </Badge>
        </IconButton>
      </div>
      <Menu
        slotProps={{
          paper: {
            style:
              width > 640
                ? { transform: anchorEl ? `translateX(${100}px)` : "" }
                : "",
          },
        }}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={
          anchorEl ? "animate__animated animate__custom-fadeInUp " : ""
        }
      >
        <div className="sm:w-96 w-full">
          <div className="flex justify-between px-5 pb-4 pt-1">
            <span className="text-xs">اعلانات</span>
            <span
              onClick={() => {
                if (user.roles[0] === "AdminCooperative") {
                  Navigate("/profile/AdminMessage");
                  handleClose();
                } else {
                  Navigate("/profile/Message");
                  handleClose();
                }
              }}
              className="text-xs text-blue-400 cursor-pointer duration-300 hover:text-blue-700"
            >
              مشاهده همه
            </span>
          </div>

          {message.length > 0 &&
            message.map((m) => (
              <List
                key={m.id}
                sx={{
                  width: "100%",
                }}
              >
                <ListItemButton
                  sx={{
                    bgcolor:
                      themeMode === "dark" && !m.seen
                        ? "rgb(30 41 59)"
                        : themeMode !== "dark" && !m.seen
                        ? "rgb(226 232 240)"
                        : "",
                  }}
                  onClick={() => {
                    setOpenModalMessage(true);
                    setId(m.id);
                  }}
                >
                  <ListItemIcon>
                    {/* <CiMail className="text-white bg-[#556ee6] rounded-full p-2 text-4xl" /> */}
                    <div className="">
                      {!m.seen && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 6.75C21.5188 6.75 22.75 5.51878 22.75 4C22.75 2.48122 21.5188 1.25 20 1.25C18.4812 1.25 17.25 2.48122 17.25 4C17.25 5.51878 18.4812 6.75 20 6.75Z"
                            fill="#1787B0"
                          />
                          <path
                            opacity="0.4"
                            d="M20 8C17.79 8 16 6.21 16 4C16 3.27 16.21 2.59 16.56 2H7C4.24 2 2 4.23 2 6.98V12.96V13.96C2 16.71 4.24 18.94 7 18.94H8.5C8.77 18.94 9.13 19.12 9.3 19.34L10.8 21.33C11.46 22.21 12.54 22.21 13.2 21.33L14.7 19.34C14.89 19.09 15.19 18.94 15.5 18.94H17C19.76 18.94 22 16.71 22 13.96V7.44C21.41 7.79 20.73 8 20 8Z"
                            fill="#1787B0"
                          />
                          <path
                            d="M12 12C11.44 12 11 11.55 11 11C11 10.45 11.45 10 12 10C12.55 10 13 10.45 13 11C13 11.55 12.56 12 12 12Z"
                            fill="#1787B0"
                          />
                          <path
                            d="M16 12C15.44 12 15 11.55 15 11C15 10.45 15.45 10 16 10C16.55 10 17 10.45 17 11C17 11.55 16.56 12 16 12Z"
                            fill="#1787B0"
                          />
                          <path
                            d="M8 12C7.44 12 7 11.55 7 11C7 10.45 7.45 10 8 10C8.55 10 9 10.45 9 11C9 11.55 8.56 12 8 12Z"
                            fill="#1787B0"
                          />
                        </svg>
                      )}
                      {m.seen && (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.53 21.47L21.79 20.73C22.17 20.15 22.4 19.45 22.4 18.7C22.4 16.66 20.74 15 18.7 15C16.66 15 15 16.66 15 18.7C15 20.74 16.66 22.4 18.7 22.4C19.45 22.4 20.15 22.17 20.73 21.79L21.47 22.53C21.62 22.68 21.81 22.75 22 22.75C22.19 22.75 22.38 22.68 22.53 22.53C22.82 22.24 22.82 21.76 22.53 21.47Z"
                            fill="#1787B0"
                          />
                          <path
                            opacity="0.4"
                            d="M2 12.97V6.99001C2 4.24001 4.24 2.01001 7 2.01001H17C19.76 2.01001 22 4.24001 22 7.00001V13.98C22 16.73 19.76 18.96 17 18.96H15.5C15.19 18.96 14.89 19.11 14.7 19.36L13.2 21.35C12.54 22.23 11.46 22.23 10.8 21.35L9.29999 19.36C9.12999 19.14 8.78 18.96 8.5 18.96H7C4.24 18.96 2 16.73 2 13.98V12.97Z"
                            fill="#1787B0"
                          />
                          <path
                            d="M12 12C11.44 12 10.99 11.55 10.99 11C10.99 10.45 11.44 10 11.99 10C12.54 10 12.99 10.45 12.99 11C12.99 11.55 12.56 12 12 12Z"
                            fill="#1787B0"
                          />
                          <path
                            d="M16 12C15.44 12 14.99 11.55 14.99 11C14.99 10.45 15.44 10 15.99 10C16.54 10 16.99 10.45 16.99 11C16.99 11.55 16.56 12 16 12Z"
                            fill="#1787B0"
                          />
                          <path
                            d="M8 12C7.44 12 6.98999 11.55 6.98999 11C6.98999 10.45 7.43999 10 7.98999 10C8.53999 10 8.98999 10.45 8.98999 11C8.98999 11.55 8.56 12 8 12Z"
                            fill="#1787B0"
                          />
                        </svg>
                      )}
                    </div>
                  </ListItemIcon>
                  <div className="flex flex-col items-start justify-center">
                    <span
                      className={
                        themeMode === "dark"
                          ? "text-sm text-[#fffb] font-medium"
                          : "text-sm text-[#000b] font-medium"
                      }
                    >
                      {m.title}
                    </span>
                    <p
                      className={
                        themeMode === "dark"
                          ? "text-xs text-[#fff8] mt-1"
                          : "text-xs text-[#0008] mt-1"
                      }
                    >
                      <div
                        className="text-[#777] text-justify px-2"
                        dangerouslySetInnerHTML={{ __html: m.body }}
                      />
                    </p>
                    <div
                      className={
                        themeMode === "dark"
                          ? "flex items-center text-[#fff8] mt-2"
                          : "flex items-center text-[#0008] mt-2"
                      }
                    >
                      <LuClock4 />
                      <span className="text-xs px-1">{m.createdFa}</span>
                    </div>
                  </div>
                </ListItemButton>
              </List>
            ))}
          {message.length === 0 && isLoading && (
            <div className="flex justify-center items-center">
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
          {message.length === 0 && !isLoading && (
            <div className="mt-3 flex flex-col justify-center items-center">
              <span>موردی موجود نیست</span>
              <img className="w-56" src="/images/error-img.png" alt="" />
            </div>
          )}
        </div>
      </Menu>
      <ModalDetailMessage
        open={openModalMessage}
        setOpen={setOpenModalMessage}
        openRes={openModalMessageRes}
        setOpenRes={setOpenModalMessageRes}
        setSelectedMessage={setSelectedMessage}
        id={id}
        listMessage={message}
        setListMessage={setMessage}
        setFlag={setFlag}
      />
      <ModalResponseMessage
        open={openModalMessageRes}
        setOpen={setOpenModalMessageRes}
        selectedMessage={selectedMessage}
      />
    </>
  );
}
