import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";

ChangFontSize.propTypes = {
  fontSize: PropTypes.number,
  setFontSize: PropTypes.func,
};
export default function ChangFontSize({ fontSize, setFontSize }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const fontSizeObj = JSON.parse(localStorage.getItem("fontSizetable")) || {};
  useEffect(() => {
    localStorage.setItem(
      "fontSizetable",
      JSON.stringify({
        ...fontSizeObj,
        fontSizetable1: fontSize,
      })
    );
  }, [fontSize]);
  return (
    <>
      <div className="flex h-8">
        <button
          onClick={() => {
            setFontSize((e) => Number(e) + 1);
          }}
          className={
            themeMode === "dark"
              ? "text-2xl bg-slate-500 flex items-center justify-center px-3 py-1 hover:bg-slate-600 duration-300"
              : "text-2xl bg-slate-100 flex items-center justify-center px-3 py-1 hover:bg-slate-200 duration-300"
          }
        >
          +
        </button>
        <span
          className={
            themeMode === "dark"
              ? "flex justify-center items-center text-end bg-slate-500 outline-none "
              : "flex justify-center items-center text-end bg-slate-100 outline-none "
          }
        >
          <span className="-translate-x-1/3">px</span>
        </span>
        <input
          value={`${fontSize}`}
          onChange={(e) => {
            setFontSize(e.target.value);
          }}
          className={
            themeMode === "dark"
              ? "w-10 flex justify-center items-center text-center bg-slate-500 outline-none"
              : "w-10 flex justify-center items-center text-center bg-slate-100 outline-none"
          }
          type="text"
        />

        <button
          onClick={() => {
            setFontSize((e) => Number(e) - 1);
          }}
          className={
            themeMode === "dark"
              ? "text-2xl bg-slate-500 flex items-center justify-center px-3 py-1 hover:bg-slate-600 duration-300"
              : "text-2xl bg-slate-100 flex items-center justify-center px-3 py-1 hover:bg-slate-200 duration-300"
          }
        >
          -
        </button>
      </div>
    </>
  );
}
