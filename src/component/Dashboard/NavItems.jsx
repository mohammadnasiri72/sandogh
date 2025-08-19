import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  styled,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import tinycolor from "tinycolor2";
import { setMainPageState } from "../../redux/slice/resetState";
import { mainDomain } from "../../utils/mainDomain";
import Loader from "../loader";
import sidebarConfig from "./navConfig";

export const ListItems = ({ item, setOpen, child }) => {
  const navigate = useNavigate();
  const url = useLocation();
  const isActive = url.pathname.includes(item.path);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const disPatch = useDispatch();
  const ListItemIconStyle = styled(ListItemIcon)({
    width: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": { width: "20px", height: "100%" },
    color: isActive
      ? themeMode === "dark"
        ? "#fff"
        : "#161c24"
      : themeColor.color,
  });

  const lightenColor = (hexColor, amount) => {
    return tinycolor(hexColor).lighten(amount).toHexString();
  };

  return (
    <>
      {item.path && (
        <ListItemButton
          disableRipple
          onClick={() => {
            if (setOpen) {
              setOpen(false);
            }
            if (url.pathname !== item.path) {
              navigate(item.path);
            }
            if (url.pathname === item.path) {
              disPatch(setMainPageState());
            }
          }}
          sx={{
            margin: 0,
            color: isActive
              ? themeMode === "dark"
                ? "#fff"
                : "#161c24"
              : themeColor.color,
            background: isActive
              ? themeMode === "dark"
                ? "#161c24"
                : "#fff"
              : child
              ? lightenColor(
                  themeColor.bgColor.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
                  9
                )
              : "",
            borderRadius: setOpen ? "10px" : child ? "10px" : "10px 0 0 10px",
            ml: setOpen ? 2 : child ? 5 : 3,
            mr: setOpen ? 2 : child ? 5 : 0,
            my: child ? 2 : 0,
            py: child ? 0 : "",
            px: 0,
            "&:hover": {
              background: isActive
                ? themeMode === "dark"
                  ? "#161c24"
                  : "#fff"
                : child
                ? themeMode === "dark"
                  ? "#161c24"
                  : "#fff"
                : "",
              color: child ? (themeMode === "dark" ? "#fff" : "#161c24") : "",
            },
            "&:hover .MuiListItemIcon-root": {
              color: child ? (themeMode === "dark" ? "#fff" : "#161c24") : "",
            },
          }}
        >
          {isActive && !setOpen && !child && (
            <div className="absolute top-0 left-0 -translate-y-full z-10">
              <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 25,0 A 25,25 0 0,1 0,25 L 25,25 Z"
                  fill={themeMode === "dark" ? "#161c24" : "#fff"}
                  transform="scale(-1, 1) translate(-25, 0)"
                />
              </svg>
            </div>
          )}
          {isActive && !setOpen && !child && (
            <div className="absolute bottom-0 left-0 translate-y-full rotate-90 z-10">
              <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 25,0 A 25,25 0 0,1 0,25 L 25,25 Z"
                  fill={themeMode === "dark" ? "#161c24" : "#fff"}
                  transform="scale(-1, 1) translate(-25, 0)"
                />
              </svg>
            </div>
          )}

          {item.icon && <ListItemIconStyle>{item.icon}</ListItemIconStyle>}
          <ListItemText
            primary={item.title}
            sx={{
              "& .MuiListItemText-primary": {
                fontSize: "14px",
                fontWeight: isActive ? 700 : "",
              },
              whiteSpace: "nowrap",
            }}
          />
        </ListItemButton>
      )}
      {item.phone && (
        <ListItemButton
          disableRipple
          component="a"
          href={`tel:${item.phone}`}
          sx={{
            margin: 0,

            borderRadius: setOpen ? "10px" : child ? "10px" : "10px 0 0 10px",
            ml: setOpen ? 2 : child ? 5 : 3,
            mr: setOpen ? 2 : child ? 5 : 0,
            my: child ? 2 : 0,
            py: child ? 0 : "",
            px: 0,

            color: child ? themeColor.color : "",
            background: isActive
              ? themeMode === "dark"
                ? "#161c24"
                : "#fff"
              : child
              ? lightenColor(
                  themeColor.bgColor.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
                  9
                )
              : "",
            "&:hover": {
              background: isActive
                ? themeMode === "dark"
                  ? "#161c24"
                  : "#fff"
                : child
                ? themeMode === "dark"
                  ? "#161c24"
                  : "#fff"
                : "",
              color: child ? (themeMode === "dark" ? "#fff" : "#161c24") : "",
            },
            "&:hover .MuiListItemIcon-root": {
              color: child ? (themeMode === "dark" ? "#fff" : "#161c24") : "",
            },
          }}
        >
          {isActive && !setOpen && !child && (
            <div className="absolute top-0 left-0 -translate-y-full z-10">
              <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 25,0 A 25,25 0 0,1 0,25 L 25,25 Z"
                  fill={themeMode === "dark" ? "#161c24" : "#fff"}
                  transform="scale(-1, 1) translate(-25, 0)"
                />
              </svg>
            </div>
          )}
          {isActive && !setOpen && !child && (
            <div className="absolute bottom-0 left-0 translate-y-full rotate-90 z-10">
              <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 25,0 A 25,25 0 0,1 0,25 L 25,25 Z"
                  fill={themeMode === "dark" ? "#161c24" : "#fff"}
                  transform="scale(-1, 1) translate(-25, 0)"
                />
              </svg>
            </div>
          )}

          {item.icon && <ListItemIconStyle>{item.icon}</ListItemIconStyle>}
          <ListItemText
            primary={item.title}
            sx={{
              "& .MuiListItemText-primary": {
                fontSize: "14px",
                fontWeight: isActive ? 700 : "",
              },
              whiteSpace: "nowrap",
            }}
          />
        </ListItemButton>
      )}
      {item.email && (
        <ListItemButton
          disableRipple
          component="a"
          href={`mailto:${item.email}`}
          sx={{
            margin: 0,

            borderRadius: setOpen ? "10px" : child ? "10px" : "10px 0 0 10px",
            ml: setOpen ? 2 : child ? 5 : 3,
            mr: setOpen ? 2 : child ? 5 : 0,
            my: child ? 2 : 0,
            py: child ? 0 : "",
            px: 0,

            color: child ? themeColor.color : "",
            background: isActive
              ? themeMode === "dark"
                ? "#161c24"
                : "#fff"
              : child
              ? lightenColor(
                  themeColor.bgColor.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
                  9
                )
              : "",
            "&:hover": {
              background: isActive
                ? themeMode === "dark"
                  ? "#161c24"
                  : "#fff"
                : child
                ? themeMode === "dark"
                  ? "#161c24"
                  : "#fff"
                : "",
              color: child ? (themeMode === "dark" ? "#fff" : "#161c24") : "",
            },
            "&:hover .MuiListItemIcon-root": {
              color: child ? (themeMode === "dark" ? "#fff" : "#161c24") : "",
            },
          }}
        >
          {isActive && !setOpen && !child && (
            <div className="absolute top-0 left-0 -translate-y-full z-10">
              <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 25,0 A 25,25 0 0,1 0,25 L 25,25 Z"
                  fill={themeMode === "dark" ? "#161c24" : "#fff"}
                  transform="scale(-1, 1) translate(-25, 0)"
                />
              </svg>
            </div>
          )}
          {isActive && !setOpen && !child && (
            <div className="absolute bottom-0 left-0 translate-y-full rotate-90 z-10">
              <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 25,0 A 25,25 0 0,1 0,25 L 25,25 Z"
                  fill={themeMode === "dark" ? "#161c24" : "#fff"}
                  transform="scale(-1, 1) translate(-25, 0)"
                />
              </svg>
            </div>
          )}

          {item.icon && <ListItemIconStyle>{item.icon}</ListItemIconStyle>}
          <ListItemText
            style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            primary={item.title}
            sx={{
              "& .MuiListItemText-primary": {
                fontSize: "14px",
                fontWeight: isActive ? 700 : "",
              },
              whiteSpace: "nowrap",
            }}
          />
        </ListItemButton>
      )}
    </>
  );
};
ListItems.propTypes = {
  item: PropTypes.object.isRequired,
  setOpen: PropTypes.func,
  child: PropTypes.bool,
};

export const ChildrenAccordion = ({ item, setOpenMenu }) => {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [open, setOpen] = useState(false);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const handleClick = () => {
    setOpen(!open);
  };
  const url = useLocation();
  const isActive = url.pathname.includes(item.path);
  useEffect(() => {
    if (isActive) {
      setOpen(true);
    }
  }, [isActive]);

  const ListItemIconStyle = styled(ListItemIcon)({
    width: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": { width: "20px", height: "100%" },
    color: isActive
      ? themeMode === "dark"
        ? "#fff"
        : "#161c24"
      : themeColor.color,
  });

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          margin: 0,
          paddingLeft: 0,
          ml: setOpenMenu ? 2 : 3,
          mr: setOpenMenu ? 2 : 0,
          borderRadius: setOpenMenu ? "10px" : "10px 0 0 10px",
          color: isActive
            ? themeMode === "dark"
              ? "#fff"
              : "#161c24"
            : themeColor.color,
          background: isActive
            ? themeMode === "dark"
              ? "#161c24"
              : "#fff"
            : "",
          "&:hover": {
            background: isActive
              ? themeMode === "dark"
                ? "#161c24"
                : "#fff"
              : "",
          },
        }}
      >
        <ListItemIconStyle>{item.icon}</ListItemIconStyle>
        <ListItemText
          primary={item.title}
          sx={{
            "& .MuiListItemText-primary": { fontSize: "14px" },
            whiteSpace: "nowrap",
          }}
        />
        {isActive && !setOpenMenu && (
          <div className="absolute top-0 left-0 -translate-y-full z-10">
            <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 25,0 A 25,25 0 0,1 0,25 L 25,25 Z"
                fill={themeMode === "dark" ? "#161c24" : "#fff"}
                transform="scale(-1, 1) translate(-25, 0)"
              />
            </svg>
          </div>
        )}
        {isActive && !setOpenMenu && (
          <div className="absolute bottom-0 left-0 translate-y-full rotate-90 z-10">
            <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 25,0 A 25,25 0 0,1 0,25 L 25,25 Z"
                fill={themeMode === "dark" ? "#161c24" : "#fff"}
                transform="scale(-1, 1) translate(-25, 0)"
              />
            </svg>
          </div>
        )}
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.children.map((child) => (
            <div key={child.path}>
              {child.children ? (
                <ChildrenAccordion item={child.children} />
              ) : (
                <ListItems item={child} setOpen={setOpenMenu} child />
              )}
            </div>
          ))}
        </List>
      </Collapse>
    </>
  );
};
ChildrenAccordion.propTypes = {
  item: PropTypes.object.isRequired,
  setOpenMenu: PropTypes.object.isRequired,
};

export const ListItemsColaps = ({ item, overMenu, setOpen }) => {
  const [show, setShow] = useState(false);
  const url = useLocation();
  const isActive = url.pathname.includes(item.path);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);

  const ListItemIconStyle = styled(ListItemIcon)({
    display: "flex",
    alignItems: "center",
    padding: 2,
    margin: 2,
    justifyContent: "center",
    "& svg": { width: "25px", height: "100%" },
    color: themeColor.color,
    opacity: isActive ? 1 : 0.5,
  });

  const handleMouseEnter = () => {
    setShow(true);
  };
  const handleMouseLeave = () => {
    setShow(false);
  };
  const navigate = useNavigate();
  const disPatch = useDispatch();
  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex justify-center items-center w-full cursor-pointer relative"
      >
        {/* {overMenu && (
          <ListItemButton
            sx={{
              margin: 0,
              color: isActive ? colorHeader.main : colorHeader.main,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: "auto",
                marginRight: "0.5rem",
                color: isActive ? colorHeader.main : colorHeader.main,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              sx={{ "& .MuiListItemText-primary": { fontSize: "14px" } }}
              primary={item.title}
            />
            <FaAngleLeft />
          </ListItemButton>
        )} */}
        {!overMenu && (
          <ListItemButton
            sx={{ display: "flex", justifyContent: "center" }}
            onClick={() => {
              if (!item.children) {
                if (setOpen) {
                  setOpen(false);
                }
                if (url.pathname !== item.path) {
                  navigate(item.path);
                }
                if (url.pathname === item.path) {
                  disPatch(setMainPageState());
                }
              }
            }}
          >
            <ListItemIconStyle sx={{ zIndex: "4565465465" }}>
              {item.icon}
            </ListItemIconStyle>
          </ListItemButton>
        )}
        <div
          style={{
            background: themeColor.bgColor,
          }}
          className={
            show
              ? "absolute top-0 bottom-0 left-0 min-w-44 py-0 -translate-x-full duration-500 opacity-100 visible"
              : "absolute top-0 bottom-0 left-6 min-w-44 py-0 -translate-x-full duration-500 opacity-0 invisible"
          }
        >
          <List
            sx={{
              width: "100%",
              height: "100%",
              margin: 0,
              padding: 0,
              bgcolor: themeColor.bgColor,
            }}
            subheader={
              item.children && (
                <ListSubheader
                  sx={{
                    background: themeColor.bgColor,
                    color: themeColor.color,
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {item.title}
                </ListSubheader>
              )
            }
          >
            {item.children &&
              item.children.map((e) => (
                <div key={e.path}>
                  {!e.children && e.path && (
                    <ListItemButton
                      onClick={() => {
                        if (!url.pathname.includes(e.path)) {
                          navigate(e.path);
                        }
                        if (url.pathname.includes(e.path)) {
                          disPatch(setMainPageState());
                        }
                      }}
                      sx={{
                        background: themeColor.bgColor,
                        color: themeColor.color,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "auto",
                          marginRight: "0.5rem",
                          color: themeColor.color,
                          opacity: url.pathname.includes(e.path) ? 1 : 0.5,
                        }}
                      >
                        {e.icon}
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          "& .MuiListItemText-primary": { fontSize: "14px" },
                          color: themeColor.color,
                          opacity: url.pathname.includes(e.path) ? 1 : 0.5,
                        }}
                        primary={e.title}
                      />
                    </ListItemButton>
                  )}
                  {!e.children && e.phone && (
                    <ListItemButton
                      component="a"
                      href={`tel:${item.phone}`}
                      sx={{
                        background: themeColor.bgColor,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "auto",
                          marginRight: "0.5rem",
                          color: themeColor.color,
                        }}
                      >
                        {e.icon}
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          "& .MuiListItemText-primary": { fontSize: "14px" },
                          color: url.pathname.includes(e.path)
                            ? themeMode === "dark"
                              ? "#161c24"
                              : "#fff"
                            : themeColor.color,
                        }}
                        primary={e.title}
                      />
                    </ListItemButton>
                  )}
                  {!e.children && e.email && (
                    <ListItemButton
                      component="a"
                      href={`mailto:${item.phone}`}
                      sx={{
                        background: themeColor.bgColor,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "auto",
                          marginRight: "0.5rem",
                          color: themeColor.color,
                        }}
                      >
                        {e.icon}
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          "& .MuiListItemText-primary": { fontSize: "14px" },
                          color: url.pathname.includes(e.path)
                            ? themeMode === "dark"
                              ? "#161c24"
                              : "#fff"
                            : themeColor.color,
                        }}
                        primary={e.title}
                      />
                    </ListItemButton>
                  )}
                  {e.children && <ListItemsColaps item={e} overMenu />}
                </div>
              ))}
            {!item.children && item.path && (
              <ListItemButton
                sx={{
                  height: "100%",
                }}
                onClick={() => {
                  if (!isActive) {
                    navigate(item.path);
                  }
                  if (setOpen) {
                    setOpen(false);
                  }
                }}
              >
                <ListItemText
                  primary={item.title}
                  sx={{
                    "& .MuiListItemText-primary": { fontSize: "14px" },
                    color: themeColor.color,
                    opacity: isActive ? 1 : 0.5,
                  }}
                />
              </ListItemButton>
            )}
            {!item.children && item.phone && (
              <ListItemButton component="a" href={`tel:${item.phone}`}>
                <ListItemText
                  primary={item.title}
                  sx={{
                    "& .MuiListItemText-primary": { fontSize: "14px" },
                    color: url.pathname.includes(item.path)
                      ? themeMode === "dark"
                        ? "#161c24"
                        : "#fff"
                      : themeColor.color,
                  }}
                />
              </ListItemButton>
            )}
            {!item.children && item.email && (
              <ListItemButton component="a" href={`mailto:${item.email}`}>
                <ListItemText
                  primary={item.title}
                  sx={{
                    "& .MuiListItemText-primary": { fontSize: "14px" },
                    color: url.pathname.includes(item.path)
                      ? themeMode === "dark"
                        ? "#161c24"
                        : "#fff"
                      : themeColor.color,
                  }}
                />
              </ListItemButton>
            )}
          </List>
        </div>
      </div>
    </>
  );
};
ListItemsColaps.propTypes = {
  item: PropTypes.object.isRequired,
  overMenu: PropTypes.bool,
  setOpen: PropTypes.func,
};

NavItems.propTypes = { setOpen: PropTypes.func };
export default function NavItems({ setOpen }) {
  const isColaps = useSelector((store) => store.colaps.isColaps);
  const user = JSON.parse(localStorage.getItem("user"));
  const themeColor = useSelector((store) => store.setting.themeColor);
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
          setLoader(false);
        });
    } else {
      navigate("/Auth/login");
    }
  };

  const isColorLight = (hexColor) => {
    // تبدیل hex به RGB
    const r = parseInt(hexColor.slice(1, 3), 16) / 255;
    const g = parseInt(hexColor.slice(3, 5), 16) / 255;
    const b = parseInt(hexColor.slice(5, 7), 16) / 255;

    // محاسبه luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // اگر luminance بیشتر از 0.5 باشد، رنگ روشن است
    return luminance > 0.8;
  };

  return (
    <>
      <div className="flex justify-center items-center w-full px-2">
        {!isColaps && (
          <div className="flex flex-col items-center justify-center">
            <List sx={{ width: "100%", padding: 0, margin: 0 , display:'flex' , flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
              <img
                className="w-20"
                // src="/images/file_2024-17-12--17-39-03 2.png"
                src={
                  isColorLight(themeColor.bgColor)
                    ? "/images/b 1.png"
                    : "/images/file_2024-17-12--17-39-03 2.png"
                }
                alt=""
              />
              <span
                style={{ color: themeColor.color }}
                className="whitespace-nowrap text-2xl font-semibold mt-2"
              >
                صندوق عشایری
              </span>
            </List>
          </div>
        )}
        {isColaps && (
          <div className="flex flex-col items-center justify-center mb-8">
            <img
              className="absolute top-1 w-12"
              src={
                isColorLight(themeColor.bgColor)
                  ? "/images/b 1.png"
                  : "/images/file_2024-17-12--17-39-03 2.png"
              }
              alt=""
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full mt-5">
        {sidebarConfig.map((groupItem) => (
          <div key={groupItem.subheader}>
            {groupItem.items.map((item) => (
              <List key={item.id} sx={{ width: "100%", padding: 0, margin: 0 }}>
                {!item.children &&
                  !isColaps &&
                  (item.role === user.roles[0] || item.role === "both") && (
                    <ListItems item={item} setOpen={setOpen} />
                  )}
                {item.children &&
                  !isColaps &&
                  (item.role === user.roles[0] || item.role === "both") && (
                    <ChildrenAccordion item={item} setOpenMenu={setOpen} />
                  )}
                {isColaps &&
                  (item.role === user.roles[0] || item.role === "both") && (
                    <ListItemsColaps item={item} setOpen={setOpen} />
                  )}
              </List>
            ))}
          </div>
        ))}
        {!isColaps && (
          <ListItemButton
            onClick={() => {
              logOutHandler();
            }}
            sx={{
              margin: 0,
              color: themeColor.color,
              fontWeight: 700,
              fontSize: "20px",
              ml: setOpen ? 2 : 3,
              mr: setOpen ? 2 : 0,
              borderRadius: setOpen ? "10px" : "10px 0 0 10px",
              paddingX: 0,
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
          </ListItemButton>
        )}
        {isColaps && (
          <ListItemButton
            sx={{ display: "flex", justifyContent: "center" }}
            onClick={() => {
              logOutHandler();
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
                opacity: 0.5,
                transition: "0.3s",
                "&:hover": {
                  // opacity: 1,
                  color: "red",
                },
              }}
            >
              <FiLogOut />
            </ListItemIcon>
          </ListItemButton>
        )}
      </div>
      {loader && <Loader />}
    </>
  );
}
