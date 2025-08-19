import { useDispatch, useSelector } from "react-redux";
import {
  toggleThemeMode,
  toggleThemeModeNavBar,
} from "../../redux/slice/setting";
import { useEffect } from "react";

export default function ThemeMode() {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem("mode", themeMode);
  }, [themeMode]);
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
            حالت چیدمان
          </span>
        </div>
        <div className="flex justify-start items-center px-5 mt-3">
          <div className="px-1">
            <button
              onClick={() => {
                dispatch(toggleThemeMode("light"));
                dispatch(toggleThemeModeNavBar("light"));
              }}
              style={{
                background: themeMode === "dark" ? "#32394e" : themeColor.bgColor,
                color: themeMode === "dark" ? "#fff8" : themeColor.color,
              }}
              className="rounded-md px-2 py-1 text-[15px]"
            >
              روشن
            </button>
          </div>
          <div className="px-1">
            <button
              onClick={() => {
                dispatch(toggleThemeMode("dark"));
                dispatch(toggleThemeModeNavBar("dark"));
              }}
              style={{
                background: themeMode === "dark" ? themeColor.bgColor : "#eff2f7",
                color: themeMode === "dark" ? themeColor.color : "#000a",
              }}
              className="rounded-md px-2 py-1 text-[15px]"
            >
              تاریک
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
