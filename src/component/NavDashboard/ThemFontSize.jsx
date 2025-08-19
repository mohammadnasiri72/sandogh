import { Box, Slider } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changFontSize } from "../../redux/slice/setting";
import { useEffect } from "react";

export default function ThemFontSize() {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const fontSize = useSelector((store) => store.setting.fontSize);
  const themeColor = useSelector((store) => store.setting.themeColor);

  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.style.setProperty('--dynamic-line-height', `${fontSize * 1.75}px`);
  }, [fontSize]);
  return (
    <>
      <div className="mt-4">
        <div className="flex justify-start px-4">
          <span
            className={
              themeMode === "dark"
                ? "text-[#fffb] text-sm"
                : "text-[#000b] text-sm"
            }
          >
            اندازه فونت جداول
          </span>
        </div>
        <div className="px-5">
          <Box sx={{ width: "100%" }}>
            <Slider
              sx={{
                color: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
              }}
              onChange={(e) => {
                dispatch(changFontSize(e.target.value));
              }}
              aria-label="Small steps"
              defaultValue={fontSize}
              value={fontSize}
              step={1}
              marks
              min={10}
              max={30}
              valueLabelDisplay="auto"
            />
          </Box>
        </div>
      </div>
    </>
  );
}
