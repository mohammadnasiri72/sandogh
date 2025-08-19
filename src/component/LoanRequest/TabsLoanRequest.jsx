import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { setValuetabs } from "../../redux/slice/loanRequest";
import { useDispatch } from "react-redux";

TabsLoanRequest.propTypes = {
  getLoanRequestList: PropTypes.func,
  setPageIndex: PropTypes.func,
  statistics: PropTypes.array,
};

export default function TabsLoanRequest({
  getLoanRequestList,
  setPageIndex,
  statistics,
}) {
  const themeColor = useSelector((store) => store.setting.themeColor);
  const value = useSelector((store) => store.loanRequest.valuetabs);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const tabRefs = useRef([]);
  const disPatch = useDispatch();
  return (
    <>
      <div className="w-full px-5 mt-3 relative">
        <div
          style={{ background: themeColor.bgColor }}
          className="flex sm:justify-around justify-start py-2 rounded-lg overflow-x-auto overflow-y-hidden whitespace-nowrap px-3"
        >
          {/* <Button
            ref={(el) => (tabRefs.current[0] = el)}
            onClick={() => {
              disPatch(setValuetabs(0));
              getLoanRequestList({
                statusId: 1,
                page: 1,
              });
              setPageIndex(1);
            }}
            size="small"
            sx={{
              bgcolor: value === 0 ? "#fff" : "",
              color: value === 0 ? "#161c24" : themeColor.color,
              py: 1,
              px: 2,
              m: 0,
              whiteSpace: "nowrap",
              minWidth: 130,
            }}
          >
            {`منتظر ارسال مدارک (${
              statistics.length > 0
                ? statistics.find((e) => e.status === 1).number
                : 0
            })`}
          </Button> */}
          <Button
            ref={(el) => (tabRefs.current[1] = el)}
            onClick={() => {
              disPatch(setValuetabs(1));
              getLoanRequestList({
                statusId: 2,
                page: 1,
              });
              setPageIndex(1);
            }}
            size="small"
            sx={{
              bgcolor: value === 1 ? "#fff" : "",
              color: value === 1 ? "#161c24" : themeColor.color,
              py: 1,
              px: 2,
              m: 0,
              whiteSpace: "nowrap",
              minWidth: 130,
            }}
          >
            {`در حال بررسی (${
              statistics.length > 0
                ? statistics.find((e) => e.status === 2).number
                : 0
            })`}
          </Button>
          <Button
            ref={(el) => (tabRefs.current[2] = el)}
            onClick={() => {
              disPatch(setValuetabs(2));
              getLoanRequestList({
                statusId: 4,
                page: 1,
              });
              setPageIndex(1);
            }}
            size="small"
            sx={{
              bgcolor: value === 2 ? "#fff" : "",
              color: value === 2 ? "#161c24" : themeColor.color,
              py: 1,
              px: 2,
              m: 0,
              whiteSpace: "nowrap",
              minWidth: 130,
            }}
          >
            {`تایید شده (${
              statistics.length > 0
                ? statistics.find((e) => e.status === 4).number
                : 0
            })`}
          </Button>
          <Button
            ref={(el) => (tabRefs.current[3] = el)}
            onClick={() => {
              disPatch(setValuetabs(3));
              getLoanRequestList({
                statusId: 3,
                page: 1,
              });
              setPageIndex(1);
            }}
            size="small"
            sx={{
              bgcolor: value === 3 ? "#fff" : "",
              color: value === 3 ? "#161c24" : themeColor.color,
              py: 1,
              px: 2,
              m: 0,
              whiteSpace: "nowrap",
              minWidth: 130,
            }}
          >
            {`رد شده (${
              statistics.length > 0
                ? statistics.find((e) => e.status === 3).number
                : 0
            })`}
          </Button>
          <Button
            ref={(el) => (tabRefs.current[4] = el)}
            onClick={() => {
              disPatch(setValuetabs(4));
              getLoanRequestList({
                statusId: 5,
                page: 1,
              });
              setPageIndex(1);
            }}
            size="small"
            sx={{
              bgcolor: value === 4 ? "#fff" : "",
              color: value === 4 ? "#161c24" : themeColor.color,
              py: 1,
              px: 2,
              m: 0,
              whiteSpace: "nowrap",
              minWidth: 130,
            }}
          >
            {`آرشیو شده (${
              statistics.length > 0
                ? statistics.find((e) => e.status === 5).number
                : 0
            })`}
          </Button>
        </div>
        {tabRefs.current[value] && (
          <div
            style={{
              left:
                tabRefs.current[value].offsetLeft +
                tabRefs.current[value].scrollWidth / 2 +
                "px",
            }}
            className={
              themeMode === "dark"
                ? "absolute bottom-0 translate-y-[175%] duration-300 justify-center items-center flex-col bg-[#161c24] z-[5] sm:flex hidden"
                : "absolute bottom-0 translate-y-[175%] duration-300 justify-center items-center flex-col bg-white z-[5] sm:flex hidden"
            }
          >
            <div className="translate-y-1">
              <svg
                width="26"
                height="11.5"
                viewBox="0 0 26 11.5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.5001 11L17.2427 2.7426C14.8995 0.399462 11.1006 0.399463 8.75739 2.74261L0.5 11"
                  stroke="#F79231"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <svg
              width="39"
              height="17.25"
              viewBox="0 0 39 17.25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.2501 16.5L25.864 4.1139C22.3492 0.599077 16.651 0.59908 13.1362 4.11392L0.75 16.5"
                stroke={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </div>
    </>
  );
}
