import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function FullScreenNav() {
  const [fullscreen, setFullscreen] = useState(false);
   const themeModeNavBar = useSelector((store) => store.setting.themeModeNavBar);
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };
  return (
    <>
      <div className="">
        <Tooltip title={!fullscreen ? "تمام صفحه" : "خروج از تمام صفحه"}>
          <IconButton
            sx={{
              "&:hover": { backgroundColor: "transparent" },
            }}
            onClick={toggleFullScreen}
          >
            {/* <BiFullscreen className="text-xl cursor-pointer" /> */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.537 6.57129V11.1427C25.537 13.3484 23.7427 15.1427 21.537 15.1427H19.8227V14.2856C19.8227 10.9713 17.137 8.28557 13.8227 8.28557H12.9656V6.57129C12.9656 4.36557 14.7599 2.57129 16.9656 2.57129H21.537C23.7541 2.57129 25.537 4.36557 25.537 6.57129Z"
                fill={themeModeNavBar === "dark" ? "#fff" : "#1787B0"}
              />
              <path
                opacity="0.4"
                d="M13.8227 8.28564H12.9655H8.39409C5.23981 8.28564 2.67981 10.8456 2.67981 13.9999V19.7142C2.67981 22.8685 5.23981 25.4285 8.39409 25.4285H14.1084C17.2627 25.4285 19.8227 22.8685 19.8227 19.7142V15.1428V14.2856C19.8227 10.9714 17.137 8.28564 13.8227 8.28564Z"
                fill={themeModeNavBar === "dark" ? "#fff" : "#1787B0"}
              />
            </svg>
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
}
