import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleColapsDashboard } from "../../redux/slice/isColaps";
import AccountNav from "./AccountNav";
import FullScreenNav from "./FullScreenNav";
import MenuResponsive from "./MenuResponsive";
import NotifficationNav from "./NotifficationNav";
import SearchBox from "./SearchBox";
import Setting from "./Setting";

export default function NavDashboard() {
  const themeDirection = useSelector((store) => store.setting.themeDirection);
  const themeModeNavBar = useSelector((store) => store.setting.themeModeNavBar);
  const isColaps = useSelector((store) => store.colaps.isColaps);
  const themeLayout = useSelector((store) => store.setting.themeLayout);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispach = useDispatch();
  return (
    <>
      <div
        style={{
          justifyContent: themeDirection === "rtl" ? "end" : "start",
          backgroundColor: themeModeNavBar === "dark" ? "#2a3042" : "#f5f8fe",
        }}
        className={
          themeLayout === "vertical"
            ? themeDirection === "rtl" && isColaps
              ? "fixed left-0 right-0 top-0  h-[4.5rem]  px-5 lg:pr-16 duration-300 z-10 shadow-md"
              : themeDirection === "rtl" && !isColaps
              ? "fixed left-0 right-0 top-0  h-[4.5rem]  px-5 lg:pr-64 duration-300 z-10 shadow-md"
              : themeDirection === "ltr" && isColaps
              ? "fixed left-0 right-0 top-0  h-[4.5rem]  px-5 lg:pl-16 duration-300 z-10 shadow-md"
              : "fixed left-0 right-0 top-0  h-[4.5rem]  px-5 lg:pl-64 duration-300 z-10 shadow-md"
            : "fixed left-0 right-0 top-0  h-[4.5rem]  px-5  duration-300 z-10 shadow-md"
        }
      >
        <div
          className={
            themeDirection === "rtl"
              ? "flex items-center justify-between h-full"
              : "flex flex-row-reverse items-center justify-between h-full"
          }
        >
          <div className="flex items-center">
            <div
              className={
                themeDirection === "rtl"
                  ? "pr-2 lg:block hidden"
                  : "pl-2 lg:block hidden"
              }
            >
              {themeLayout === "vertical" && (
                <IconButton
                  sx={{
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                  onClick={() => {
                    dispach(toggleColapsDashboard());
                  }}
                >
                  <span>
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
                  </span>
                </IconButton>
              )}
            </div>
            <div
              className={
                themeDirection === "rtl"
                  ? "pr-2 lg:hidden block"
                  : "pl-2 lg:hidden block"
              }
            >
              <MenuResponsive />
            </div>
            <SearchBox />
          </div>

          <div
            className={
              themeDirection === "rtl"
                ? "flex justify-center items-center"
                : "flex justify-center items-center flex-row-reverse"
            }
          >
            {/* <SearchBoxRes /> */}
            {/* <ToggleLang /> */}
            {/* <CustomizeNav /> */}
            <div
              className={
                themeModeNavBar === "dark"
                  ? "flex items-center bg-slate-800 border border-slate-500 rounded-lg px-2"
                  : "flex items-center bg-white border rounded-lg px-2"
              }
            >
              <FullScreenNav />
              {user.roles[0] !== "Supervisor" && <NotifficationNav />}
              <Setting />
              <AccountNav />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
