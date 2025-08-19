import { IconButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeColapsDashboard } from "../../redux/slice/isColaps";
import NavItems from "../Dashboard/NavItems";

export default function MenuResponsive() {
  const [open, setOpen] = React.useState(false);
  const photoHeader = useSelector((store) => store.setting.photoHeader);
  const themeModeNavBar = useSelector((store) => store.setting.themeModeNavBar);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const disPatch = useDispatch();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    disPatch(changeColapsDashboard(false));
  };

  return (
    <div className="mt-2">
      <IconButton onClick={toggleDrawer(true)}>
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.4286 6.28557H3.85714C3.38857 6.28557 3 5.897 3 5.42843C3 4.95986 3.38857 4.57129 3.85714 4.57129H24.4286C24.8971 4.57129 25.2857 4.95986 25.2857 5.42843C25.2857 5.897 24.8971 6.28557 24.4286 6.28557Z"
            fill={themeModeNavBar === "dark" ? "#fff" : "#1787B0"}
          />
          <path
            opacity="0.4"
            d="M24.4285 11.9999H13.6057C13.1371 11.9999 12.7485 11.6114 12.7485 11.1428C12.7485 10.6742 13.1371 10.2856 13.6057 10.2856H24.4285C24.8971 10.2856 25.2857 10.6742 25.2857 11.1428C25.2857 11.6114 24.8971 11.9999 24.4285 11.9999Z"
            fill={themeModeNavBar === "dark" ? "#fff" : "#1787B0"}
          />
          <path
            d="M24.4286 17.7143H3.85714C3.38857 17.7143 3 17.3257 3 16.8571C3 16.3886 3.38857 16 3.85714 16H24.4286C24.8971 16 25.2857 16.3886 25.2857 16.8571C25.2857 17.3257 24.8971 17.7143 24.4286 17.7143Z"
            fill={themeModeNavBar === "dark" ? "#fff" : "#1787B0"}
          />
          <path
            opacity="0.4"
            d="M24.4285 23.4284H13.6057C13.1371 23.4284 12.7485 23.0398 12.7485 22.5713C12.7485 22.1027 13.1371 21.7141 13.6057 21.7141H24.4285C24.8971 21.7141 25.2857 22.1027 25.2857 22.5713C25.2857 23.0398 24.8971 23.4284 24.4285 23.4284Z"
            fill={themeModeNavBar === "dark" ? "#fff" : "#1787B0"}
          />
        </svg>
      </IconButton>
      <Drawer
        sx={{
          width: "16rem",
        }}
        open={open}
        onClose={toggleDrawer(false)}
      >
        <div
          className="h-screen overflow-y-auto"
          style={{
            background: themeColor.bgColor,
          }}
        >
          <div
            style={{
              backgroundImage: `url('${photoHeader}')`,
            }}
            className={
              photoHeader
                ? "absolute box-seting inset-0  opacity-50 h-full"
                : "absolute inset-0  opacity-50 h-full"
            }
          ></div>
          <div className="w-64  z-30">
            <NavItems setOpen={setOpen} />
          </div>
        </div>
      </Drawer>
    </div>
  );
}
