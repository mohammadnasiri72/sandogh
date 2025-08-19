import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleThemeModeNavBar } from "../../redux/slice/setting";

export default function ThemeModeNavBar() {
  const themeModeNavBar = useSelector((store) => store.setting.themeModeNavBar);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("modeNavBar", themeModeNavBar);
  }, [themeModeNavBar]);

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
            قالب با نوار بالا
          </span>
        </div>
        <div className="flex justify-start items-center px-5 mt-3">
          <div className="px-1">
            <button
              onClick={() => {
                dispatch(toggleThemeModeNavBar("light"));
              }}
              style={{
                background:
                  themeModeNavBar === "light"
                    ? themeColor.bgColor
                    : themeMode === "dark"
                    ? "#32394e"
                    : "#eff2f7",
                color:
                  themeModeNavBar === "light"
                    ? themeColor.color
                    : themeMode === "dark"
                    ? '#fff8'
                    : "#000b",
              }}
              className="rounded-md px-2 py-1 text-[15px]"
            >
              روشن
            </button>
          </div>
          <div className="px-1">
            <button
             style={{
              background:
                themeModeNavBar === "dark"
                  ? themeColor.bgColor
                  : themeMode === "dark"
                  ? "#32394e"
                  : "#eff2f7",
              color:
                themeModeNavBar === "dark"
                  ? themeColor.color
                  : themeMode === "dark"
                  ? '#fff8'
                  : "#000b",
            }}
              onClick={() => {
                dispatch(toggleThemeModeNavBar("dark"));
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
