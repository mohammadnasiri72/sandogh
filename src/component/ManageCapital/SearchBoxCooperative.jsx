import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useSelector } from "react-redux";

SearchBoxCooperative.propTypes = {
  getCapitalList: PropTypes.func,
  setListCapital: PropTypes.func,
};

function SearchBoxCooperative({
  getCapitalList,
  setListCapital,
}) {
  const [query, setQuery] = useState("");
  const btnSearch = useRef(null);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  return (
    <>
      <div
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            btnSearch.current.click();
          }
        }}
        className={
          themeMode === "dark"
            ? "flex  rounded-full border border-[#fff5]"
            : "flex  rounded-full border border-[#0005]"
        }
      >
        <input
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value === "") {
              getCapitalList({ find: ""});
            }
          }}
          placeholder="جستجو..."
          type="text"
          value={query}
          name=""
          id=""
          className="outline-none text-sm px-3 py-2 rounded-full w-full bg-transparent"
        />
        <div
          style={{ background: themeColor.bgColor, color: themeColor.color }}
          ref={btnSearch}
          onClick={() => {
            setListCapital([]);
            getCapitalList({ find: query, page: 1 });
          }}
          className="w-10 flex justify-center items-center cursor-pointer text-white rounded-l-full"
        >
          <PiMagnifyingGlassBold />
        </div>
      </div>
    </>
  );
}

export default SearchBoxCooperative;
