import { Menu } from "@mui/material";
import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useSelector } from "react-redux";

export default function SearchBoxRes() {
  const [anchorEl, setAnchorEl] = useState(null);
  const themeModeNavBar = useSelector((store) => store.setting.themeModeNavBar);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="md:hidden block">
        <HiMagnifyingGlass
          onClick={handleClick}
          className={
            themeModeNavBar === "dark"
              ? "cursor-pointer text-xl text-white"
              : "cursor-pointer text-xl"
          }
        />
      </div>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={
          anchorEl ? "animate__animated animate__custom-fadeInUp " : ""
        }
        disableAutoFocusItem
        PaperProps={{
          sx: {
            padding: 0,
            margin: 0,
            backgroundColor: themeModeNavBar === "dark" ? "rgb(30 41 59)" : "",
            width: "100%",
            "& .MuiList-root": { padding: 0, margin: 0 },
          },
        }}
      >
        <div className=" w-full p-3">
          <div className="flex justify-between items-stretch border">
            <input
              className={
                themeMode === "dark" || themeModeNavBar === "dark"
                  ? "outline-none py-2 w-full px-1 text-xs bg-[#43495a]"
                  : "outline-none py-2 w-full px-1 text-xs"
              }
              type="text"
              name=""
              id=""
              placeholder="جستجو..."
            />
            <div className=" w-10 flex justify-center items-center cursor-pointer bg-[#556ee6] text-white">
              <PiMagnifyingGlassBold />
            </div>
          </div>
        </div>
      </Menu>
    </>
  );
}
