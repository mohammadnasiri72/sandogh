import { Button, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { styled } from "@mui/styles";
import "animate.css/animate.min.css";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setMainPageState } from "../../redux/slice/resetState";
import { mainDomain } from "../../utils/mainDomain";
import Loader from "../loader";
import sidebarConfig from "./navConfig";

export default function NavItemHorizontal() {
  const themeColor = useSelector((store) => store.setting.themeColor);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
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
          navigate("/Auth/login");
          setLoader(false);
        })
        .catch(() => {
          // navigate("/Auth/login");
          setLoader(false);
        });
    } else {
      navigate("/Auth/login");
    }
  };
  return (
    <>
      {sidebarConfig.map((groupItem) => (
        <div className="flex gap-1 w-full h-full" key={groupItem.subheader}>
          {groupItem.items.map((item) => {
            return (
              (item.role === user.roles[0]|| item.role === user.roles[1] || item.role === "both") && (
                <div key={item.id}>
                  {!item.children &&
                    (item.role === user.roles[0]|| item.role === user.roles[1] || item.role === "both") && (
                      <ListItems item={item} />
                    )}
                  {item.children &&
                    (item.role === user.roles[0]|| item.role === user.roles[1] || item.role === "both") && (
                      <ListItemsChild item={item} />
                    )}
                </div>
              )
            );
          })}
          <MenuItem
            onClick={() => {
              logOutHandler();
            }}
            sx={{
              margin: 0,
              color: themeColor.color,
              opacity: 0.5,
              transition: "0.3s",
              fontWeight: 700,
              fontSize: "20px",
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <ListItemIcon
              sx={{
                width: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "& svg": { width: "20px", height: "100%" },
                color: themeColor.color,
              }}
            >
              <FiLogOut />
            </ListItemIcon>
            <ListItemText
              primary={"خروج"}
              sx={{
                "& .MuiListItemText-primary": { fontSize: "14px" },
                whiteSpace: "nowrap",
              }}
            />
          </MenuItem>
        </div>
      ))}
      {loader && <Loader />}
    </>
  );
}

export const ListItems = ({ item }) => {
  const themeColor = useSelector((store) => store.setting.themeColor);
  const url = useLocation();
  const navigate = useNavigate();
  const isActive = url.pathname.includes(item.path);

  const ListItemIconStyle = styled(ListItemIcon)({
    width: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      width: "20px",
      height: "100%",
      color: themeColor.color,
      opacity: isActive ? 1 : 0.5,
      transition: "0.3s",
      "&:hover": {
        opacity: 1,
      },
    },
  });
  const disPatch = useDispatch();
  return (
    <>
      <MenuItem
        onClick={() => {
          navigate(item.path);
          if (url.pathname === item.path) {
            disPatch(setMainPageState());
          }
        }}
        sx={{
          margin: 0,
          color: themeColor.color,
          opacity: isActive ? 1 : 0.5,
          transition: "0.3s",
          "&:hover": {
            opacity: 1,
          },
          height: "100%",
          fontSize: "14px",
        }}
      >
        <ListItemIconStyle>{item.icon}</ListItemIconStyle>
        {item.title}
      </MenuItem>
    </>
  );
};
ListItems.propTypes = { item: PropTypes.object.isRequired };

export const ListItemsChild = ({ item }) => {
  const themeColor = useSelector((store) => store.setting.themeColor);
  const navigate = useNavigate();
  const url = useLocation();
  const isActive = url.pathname.includes(item.path);
  const ListItemIconStyle = styled(ListItemIcon)({
    width: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      width: "20px",
      height: "100%",
      color: themeColor.color,
      opacity: isActive ? 1 : 0.5,
      transition: "0.3s",
      "&:hover": {
        opacity: 1,
      },
    },
  });

  return (
    <>
      <div className="container mx-auto flex justify-between items-center  h-full ">
        <div className="hidden md:flex space-x-4  h-full">
          <div className="relative group ">
            <MenuItem
              sx={{
                margin: 0,
                color: themeColor.color,
                opacity: isActive ? 1 : 0.5,
                transition: "0.3s",
                "&:hover": {
                  opacity: 1,
                },
                height: "100%",
                fontSize: "14px",
              }}
            >
              <ListItemIconStyle>{item.icon}</ListItemIconStyle>
              {item.title}
              <FaAngleDown className="px-1 text-xl" />
            </MenuItem>
            <div
              style={{ background: themeColor.bgColor }}
              className="-mt-1 animate__animated child absolute right-0 invisible group-hover:opacity-100 group-hover:visible w-48 rounded-sm shadow-lg opacity-0  transition-opacity duration-300 overflow-hidden px-2 py-1"
            >
              {item.children.map((over) => (
                <Button
                  onClick={() => {
                    if (over.path) {
                      navigate(over.path);
                    }
                    if (over.phone) {
                      window.location.href = `tel:${over.phone}`;
                    }
                    if (over.email) {
                      window.location.href = `mailto:${over.email}`;
                    }
                  }}
                  key={over.id}
                  sx={{
                    paddingY: 1,
                    paddingX: 1,
                    margin: 0,
                    width: "100%",
                    opacity: url.pathname === over.path ? 1 : 0.5,
                    transition: "0.3s",
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <div
                    style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                    className="text-xs flex justify-start items-center w-full"
                  >
                    <ListItemIcon
                      sx={{
                        width: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "& svg": {
                          width: "20px",
                          height: "100%",
                          color: themeColor.color,
                        },
                      }}
                    >
                      {over.icon}
                    </ListItemIcon>
                    <span
                      style={{
                        color: themeColor.color,
                      }}
                      className="lowercase"
                    >
                      {over.title}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
ListItemsChild.propTypes = { item: PropTypes.object.isRequired };
