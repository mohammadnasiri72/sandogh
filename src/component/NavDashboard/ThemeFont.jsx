import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changFontFamily } from "../../redux/slice/setting";
import { useEffect } from "react";

export default function ThemeFont() {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const font = useSelector((store) => store.setting.fontFamily);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem("fontFamily", font);
  }, [font]);

  return (
    <>
      <div className="flex justify-start px-4 mt-4">
        <span
          className={
            themeMode === "dark"
              ? "text-[#fffb] text-sm"
              : "text-[#000b] text-sm"
          }
        >
          انتخاب فونت
        </span>
      </div>

      <div className="flex justify-start items-center px-5 mt-1 flex-wrap">
        <div className="px-1 mt-2">
          <button
            onClick={() => {
              dispatch(changFontFamily("yekan"));
            }}
            style={{
              fontFamily: "yekan",
              background:
                font === "yekan"
                  ? themeColor.bgColor
                  : themeMode === "dark"
                  ? "#32394e"
                  : "#eff2f7",
              color:
                font === "yekan"
                  ? themeColor.color
                  : themeMode === "dark"
                  ? "#fffb"
                  : "#000b",
            }}
            className="rounded-md px-2 py-1 text-[15px]"
          >
            یکان
          </button>
        </div>
        <div className="px-1 mt-2">
          <button
            onClick={() => [dispatch(changFontFamily("Pelak"))]}
            style={{
              fontFamily: "Pelak",
              background:
                font === "Pelak"
                  ? themeColor.bgColor
                  : themeMode === "dark"
                  ? "#32394e"
                  : "#eff2f7",
              color:
                font === "Pelak"
                  ? themeColor.color
                  : themeMode === "dark"
                  ? "#fffb"
                  : "#000b",
            }}
            className="rounded-md px-2 py-1 text-[15px]"
          >
            پلاک
          </button>
        </div>
        <div className="px-1 mt-2">
          <button
            onClick={() => [dispatch(changFontFamily("IranianSans"))]}
            style={{
              fontFamily: "IranianSans",
              background:
                font === "IranianSans"
                  ? themeColor.bgColor
                  : themeMode === "dark"
                  ? "#32394e"
                  : "#eff2f7",
              color:
                font === "IranianSans"
                  ? themeColor.color
                  : themeMode === "dark"
                  ? "#fffb"
                  : "#000b",
            }}
            className="rounded-md px-2 py-1 text-[15px]"
          >
            ایران سنس
          </button>
        </div>
        <div className="px-1 mt-2">
          <button
            onClick={() => [dispatch(changFontFamily("Nazanin"))]}
            style={{
              fontFamily: "Nazanin",
              background:
                font === "Nazanin"
                  ? themeColor.bgColor
                  : themeMode === "dark"
                  ? "#32394e"
                  : "#eff2f7",
              color:
                font === "Nazanin"
                  ? themeColor.color
                  : themeMode === "dark"
                  ? "#fffb"
                  : "#000b",
            }}
            className="rounded-md px-2 py-1 text-[15px]"
          >
            نازنین
          </button>
        </div>
        <div className="px-1 mt-2">
          <button
            onClick={() => [dispatch(changFontFamily("Vazir"))]}
            style={{
              fontFamily: "Vazir",
              background:
                font === "Vazir"
                  ? themeColor.bgColor
                  : themeMode === "dark"
                  ? "#32394e"
                  : "#eff2f7",
              color:
                font === "Vazir"
                  ? themeColor.color
                  : themeMode === "dark"
                  ? "#fffb"
                  : "#000b",
            }}
            className="rounded-md px-2 py-1 text-[15px]"
          >
            وزیر
          </button>
        </div>
      </div>
    </>
  );
}
