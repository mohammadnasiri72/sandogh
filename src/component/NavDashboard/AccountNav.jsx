import { Avatar, Menu, MenuItem } from "@mui/material";
import "animate.css/animate.min.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiPowerOff } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { mainDomain } from "../../utils/mainDomain";
import ModalChangPass from "./ModalChangPass";
import ModalEditProfile from "./ModalEditProfile";

export default function AccountNav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [loader, setLoader] = useState(false);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeModeNavBar = useSelector((store) => store.setting.themeModeNavBar);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logOutHandler = () => {
    if (user.token) {
      setLoader(true);
      axios
        .post(
          mainDomain + "/api/Account/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then(() => {
          localStorage.removeItem("user");
          setLoader(false);
          navigate("/Auth/login");
        })
        .catch(() => {
          localStorage.removeItem("user");
          setLoader(false);
          navigate("/Auth/login");
        });
    } else {
      navigate("/Auth/login");
    }
  };

  return (
    <>
      <div className="">
        <div onClick={handleClick} className="cursor-pointer">
          <div
            className={
               themeModeNavBar === "dark"
                ? "flex items-center text-[#fffb]"
                : "flex items-center text-[#000b]"
            }
          >
            <Avatar
              alt={user.fullName}
              src={mainDomain + user.avatar}
              sx={{ width: 30, height: 30, boxShadow: "0px 0px 1px 0px #0005" }}
            />
            <div className="items-center px-1 lg:flex hidden">
              <span className="text-xs">{user.name + " " + user.family}</span>
              <MdKeyboardArrowDown />
            </div>
          </div>
        </div>
        <Menu
          sx={{ padding: 0, margin: 0 }}
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          className={
            anchorEl ? "animate__animated animate__custom-fadeInUpAccount " : ""
          }
          disableAutoFocusItem
          PaperProps={{
            sx: {
              padding: 0,
              margin: 0,
              width: width < 600 ? "100%" : "auto",
              "& .MuiList-root": { padding: 0, margin: 0 },
            },
          }}
        >
          <div className="sm:w-36 w-full">
            <ModalEditProfile setAnchorEl={setAnchorEl} />
            <ModalChangPass />

            {/* <Divider sx={{ padding: 0, margin: 0 }} /> */}
            <div
              className={
                themeMode === "dark"
                  ? "border-t border-[#fff2]"
                  : "border-t border-[#0002]"
              }
            >
              <MenuItem sx={{ padding: 2 }} onClick={logOutHandler}>
                {!loader && (
                  <div className="flex justify-start items-center">
                    <BiPowerOff className="text-red-500" />
                    <span className="text-xs text-red-500 px-1">خروج</span>
                  </div>
                )}
                {loader && (
                  <div className="flex justify-center w-full scale-50">
                    <SyncLoader color="rgb(239 68 68)" />
                  </div>
                )}
              </MenuItem>
            </div>
          </div>
        </Menu>
      </div>
    </>
  );
}
