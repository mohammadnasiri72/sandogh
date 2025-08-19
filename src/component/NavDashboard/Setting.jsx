import { Box, Divider, Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import ThemeFont from "./ThemeFont";
import ThemeLayout from "./ThemeLayout";
import ThemeMode from "./ThemeMode";
import ThemeModeNavBar from "./ThemeModeNavBar";
import ThemePaleteHeader from "./ThemePaleteHeader";
import ThemFontSize from "./ThemFontSize";
import ResetSetting from "./ResetSetting";

export default function Setting() {
  const [open, setOpen] = useState(false);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeModeNavBar = useSelector((store) => store.setting.themeModeNavBar);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 280,
        bgcolor: themeMode == "dark" ? "#2a3042" : "",
        height: "100%",
        overflowX: "hidden",
      }}
      role="presentation"
    >
      <div className="flex justify-between items-center px-5 pt-5">
        <span
          className={themeMode === "dark" ? "text-[#fffb]" : "text-[#000b]"}
        >
          تنظیمات
        </span>
        <IoCloseCircleSharp
          onClick={toggleDrawer()}
          className={
            themeMode === "dark"
              ? "text-3xl cursor-pointer text-[#fffb]"
              : "text-3xl cursor-pointer text-[#000b]"
          }
        />
      </div>
      <div className="flex justify-center mt-5">
        <Divider className="w-5/6" />
      </div>
      <div className="lg:block hidden">
        <ThemeLayout />
        <div className="flex justify-center mt-5">
          <Divider className="w-5/6" />
        </div>
      </div>
      <ThemeMode />
      <div className="flex justify-center mt-5">
        <Divider className="w-5/6" />
      </div>
      <ThemeModeNavBar />
      <div className="flex justify-center mt-5">
        <Divider className="w-5/6" />
      </div>
      <ThemeFont />
      <div className="flex justify-center mt-5">
        <Divider className="w-5/6" />
      </div>
      <ThemFontSize />  
      <div className="flex justify-center mt-1">
        <Divider className="w-5/6" />
      </div>
      <ThemePaleteHeader />
      <div className="flex justify-center mt-1">
        <Divider className="w-5/6" />
      </div>
      <ResetSetting />
    </Box>
  );
  return (
    <>
      <div className="">
        <IconButton
          sx={{
            "&:hover": { backgroundColor: "transparent" },
          }}
          onClick={toggleDrawer(true)}
        >
          {/* <MdOutlineSettings className="cursor-pointer text-2xl" /> */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M2.42859 15.0057V12.9942C2.42859 11.8057 3.40002 10.8228 4.60002 10.8228C6.66859 10.8228 7.5143 9.35996 6.4743 7.56568C5.88002 6.5371 6.2343 5.19996 7.2743 4.60568L9.25145 3.47425C10.1543 2.93711 11.32 3.25711 11.8572 4.15996L11.9829 4.3771C13.0114 6.17139 14.7029 6.17139 15.7429 4.3771L15.8686 4.15996C16.4057 3.25711 17.5714 2.93711 18.4743 3.47425L20.4514 4.60568C21.4914 5.19996 21.8457 6.5371 21.2514 7.56568C20.2114 9.35996 21.0572 10.8228 23.1257 10.8228C24.3143 10.8228 25.2972 11.7942 25.2972 12.9942V15.0057C25.2972 16.1942 24.3257 17.1771 23.1257 17.1771C21.0572 17.1771 20.2114 18.64 21.2514 20.4342C21.8457 21.4742 21.4914 22.8 20.4514 23.3942L18.4743 24.5257C17.5714 25.0628 16.4057 24.7428 15.8686 23.84L15.7429 23.6228C14.7143 21.8285 13.0229 21.8285 11.9829 23.6228L11.8572 23.84C11.32 24.7428 10.1543 25.0628 9.25145 24.5257L7.2743 23.3942C6.2343 22.8 5.88002 21.4628 6.4743 20.4342C7.5143 18.64 6.66859 17.1771 4.60002 17.1771C3.40002 17.1771 2.42859 16.1942 2.42859 15.0057Z"
              fill={themeModeNavBar === "dark" ? "#fff" : "#1787B0"}
            />
            <path
              d="M13.8571 17.7142C15.9085 17.7142 17.5714 16.0513 17.5714 13.9999C17.5714 11.9486 15.9085 10.2856 13.8571 10.2856C11.8058 10.2856 10.1428 11.9486 10.1428 13.9999C10.1428 16.0513 11.8058 17.7142 13.8571 17.7142Z"
              fill={themeModeNavBar === "dark" ? "#fff" : "#1787B0"}
            />
          </svg>
        </IconButton>
        <Box>
          <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
            {DrawerList}
          </Drawer>
        </Box>
      </div>
    </>
  );
}
