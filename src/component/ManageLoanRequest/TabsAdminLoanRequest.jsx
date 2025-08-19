import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setValTabs } from "../../redux/slice/adminLoanRequest";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

TabsAdminLoanRequest.propTypes = {
  getLoanRequestAdminList: PropTypes.func,
  setPageIndex: PropTypes.func,
  numPending: PropTypes.number,
  numReject: PropTypes.number,
  numConfirm: PropTypes.number,
  numArchive: PropTypes.number,
};

export default function TabsAdminLoanRequest({
  getLoanRequestAdminList,
  setPageIndex,
  numPending,
  numReject,
  numConfirm,
  numArchive,
}) {
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const tabRefs = useRef([]);
  const value = useSelector((store) => store.adminLoanRequest.valTabs);
  const disPatch = useDispatch();

  return (
    <>
   

      <div className="w-full px-5 mt-3 relative">
        <div
          style={{ background: themeColor.bgColor }}
          className="flex sm:justify-around justify-start py-2 rounded-lg overflow-x-auto overflow-y-hidden whitespace-nowrap px-3"
        >
          <Button
            ref={(el) => (tabRefs.current[0] = el)}
            onClick={() => {
              disPatch(setValTabs(0));
              getLoanRequestAdminList({
                statusId: 2,
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
            درحال بررسی ({numPending})
          </Button>
          <Button
            ref={(el) => (tabRefs.current[2] = el)}
            onClick={() => {
              disPatch(setValTabs(2));
              getLoanRequestAdminList({
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
            تایید شده ({numConfirm})
          </Button>
          <Button
            ref={(el) => (tabRefs.current[1] = el)}
            onClick={() => {
              disPatch(setValTabs(1));
              getLoanRequestAdminList({
                statusId: 3,
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
            رد شده ({numReject})
          </Button>
          <Button
            ref={(el) => (tabRefs.current[3] = el)}
            onClick={() => {
              disPatch(setValTabs(3));
              getLoanRequestAdminList({
                statusId: 5,
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
            آرشیو شده ({numArchive})
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
