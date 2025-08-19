import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleThemeDirection } from "../../redux/slice/setting";

export default function ToggleLang() {
  const Lang = [
    { id: "fa", title: "فارسی", icon: "/images/flags/iran.png", dir: "rtl" },
    { id: "en", title: "انگلیسی", icon: "/images/flags/us.jpg", dir: "ltr" },
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuItemSelected, setMenuItemSelected] = React.useState(Lang[0]);

  const themeDirection = useSelector((store) => store.setting.themeDirection);
  const open = Boolean(anchorEl);
  const dispach = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="px-2 mt-1">
      <IconButton onClick={handleClick}>
        <div className="w-5 h-5 flex justify-center items-center">
          <img className="w-full" src={menuItemSelected.icon} alt="" />
        </div>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        className={
          anchorEl ? "animate__animated animate__custom-fadeInUpLang " : ""
        }
      >
        {Lang.map((e) => (
          <MenuItem
            selected={themeDirection === "rtl" ? e.id === "fa" : e.id === "en"}
            key={e.id}
            onClick={() => {
              dispach(toggleThemeDirection(e.dir));
              handleClose();
              setMenuItemSelected(e);
            }}
          >
            <div className="flex justify-start items-center">
              <img className="w-5" src={e.icon} alt="" />
              <span className="text-xs px-1">{e.title}</span>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
