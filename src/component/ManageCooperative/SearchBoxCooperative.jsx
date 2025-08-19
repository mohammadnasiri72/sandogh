import { useRef, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  setFind,
  setIsLoading,
  setListCooperative,
  setNumPages,
} from "../../redux/slice/cooperative";
import PropTypes from "prop-types";

SearchBoxCooperative.propTypes = { getCooperativeList: PropTypes.func };

function SearchBoxCooperative({ getCooperativeList }) {
  const find = useSelector((store) => store.cooperative.find);
  const [query, setQuery] = useState(find);
  const btnSearch = useRef(null);
  const dispatch = useDispatch();
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
            if (!e.target.value) {
              dispatch(setFind(''));
              dispatch(setListCooperative([]));
              dispatch(setIsLoading(true));
              getCooperativeList({ find: '', page: 1 });
              dispatch(setNumPages(1));
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
            dispatch(setFind(query));
            dispatch(setListCooperative([]));
            dispatch(setIsLoading(true));
            getCooperativeList({ find: query, page: 1 });
            dispatch(setNumPages(1));
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
