import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleThemeLayout } from "../../redux/slice/setting";

export default function ThemeLayout() {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeLayout = useSelector((store) => store.setting.themeLayout);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("layout", themeLayout);
  }, [themeLayout]);

  const checkScreenSize = () => {
    if (window.innerWidth < 1024) {
      dispatch(toggleThemeLayout("vertical"));
    }
  };
  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
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
            طرح بندی ها
          </span>
        </div>
        <div className="flex justify-start items-center px-5 mt-3">
          <div className="px-1">
            <button
              onClick={() => {
                dispatch(toggleThemeLayout("vertical"));
              }}
              style={{
                background:
                  themeLayout === "vertical"
                    ? themeColor.bgColor
                    : themeMode === "dark"
                    ? "#32394e"
                    : "#eff2f7",
                color:
                  themeLayout === "vertical"
                    ? themeColor.color
                    : themeMode === "dark"
                    ? "#fff8"
                    : "#000b",
              }}
              className="rounded-md px-2 py-1 text-[15px]"
            >
              عمودی
            </button>
          </div>
          <div className="px-1">
            <button
              onClick={() => {
                dispatch(toggleThemeLayout("horizontal"));
              }}
              style={{
                background:
                  themeLayout === "horizontal"
                    ? themeColor.bgColor
                    : themeMode === "dark"
                    ? "#32394e"
                    : "#eff2f7",
                color:
                  themeLayout === "horizontal"
                    ? themeColor.color
                    : themeMode === "dark"
                    ? "#fff8"
                    : "#000b",
              }}
              className="rounded-md px-2 py-1 text-[15px]"
            >
              افقی
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
