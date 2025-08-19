import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setValTab } from "../../redux/slice/adminLoan";

TabManageLoan.propTypes = {
  setValue: PropTypes.func,
  value: PropTypes.number,
  getLoanAdminList: PropTypes.func,
  getLoanRequestAdminList: PropTypes.func,
  setPageIndex: PropTypes.func,
  numrecord: PropTypes.number,
  numPayed: PropTypes.number,
  numOverdue: PropTypes.number,
  numRePayed: PropTypes.number,
  numDueDate: PropTypes.number,
  numPending: PropTypes.number,
  numConfirm: PropTypes.number,
  numReject: PropTypes.number,
  numArchive: PropTypes.number,
  setBoxPosition: PropTypes.func,
  setFlagDel: PropTypes.func,
};

export default function TabManageLoan({
  getLoanAdminList,
  getLoanRequestAdminList,
  setPageIndex,
  numPayed,
  numrecord,
  numOverdue,
  numRePayed,
  numDueDate,
  numPending,
  numConfirm,
  numReject,
  // numArchive,
  setFlagDel,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const value = useSelector((store) => store.adminLoan.valTab);
  const tabRefs = useRef([]);

  const disPatch = useDispatch();

  return (
    <>
      <div className="w-full px-5 mt-3 relative">
        <div
          style={{ background: themeColor.bgColor }}
          className="flex xl:justify-around justify-start py-2 rounded-lg overflow-x-auto overflow-y-hidden whitespace-nowrap px-3"
        >
          <Button
            ref={(el) => (tabRefs.current[0] = el)}
            onClick={() => {
              disPatch(setValTab(0));
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
              minWidth: 100,
              fontWeight: value === 0 ? 900 : "",
            }}
          >
            درحال بررسی ( {numPending} )
          </Button>

          <Button
            ref={(el) => (tabRefs.current[1] = el)}
            onClick={() => {
              setFlagDel((e) => !e);
              disPatch(setValTab(1));
              getLoanRequestAdminList({
                statusId: 4,
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
              minWidth: 150,
              
              fontWeight: value === 1 ? 900 : "",
            }}
          >
            تایید ( {numConfirm} ) / رد شده ( {numReject} )
          </Button>

          <Button
            ref={(el) => (tabRefs.current[2] = el)}
            onClick={() => {
              disPatch(setValTab(2));
              getLoanAdminList({
                page: 1,
                status: 100,
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
              minWidth: 100,
              fontWeight: value === 2 ? 900 : "",
            }}
          >
            ثبت شده ( {numrecord} )
          </Button>
          <Button
            ref={(el) => (tabRefs.current[3] = el)}
            onClick={() => {
              disPatch(setValTab(3));
              getLoanAdminList({
                page: 1,
                status: 101,
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
              minWidth: 100,
              fontWeight: value === 3 ? 900 : "",
            }}
          >
            پرداخت شده ( {numPayed} )
          </Button>
          <Button
            ref={(el) => (tabRefs.current[4] = el)}
            onClick={() => {
              disPatch(setValTab(4));
              getLoanAdminList({
                page: 1,
                status: 104,
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
              minWidth: 100,
              fontWeight: value === 4 ? 900 : "",
            }}
          >
            سررسید شده ( {numDueDate} )
          </Button>
          <Button
            ref={(el) => (tabRefs.current[7] = el)}
            onClick={() => {
              disPatch(setValTab(7));
              getLoanAdminList({
                page: 1,
                status: 102,
              });
              setPageIndex(1);
            }}
            size="small"
            sx={{
              bgcolor: value === 7 ? "#fff" : "",
              color: value === 7 ? "#161c24" : themeColor.color,
              py: 1,
              px: 2,
              m: 0,
              whiteSpace: "nowrap",
              minWidth: 100,
              fontWeight: value === 7 ? 900 : "",
            }}
          >
            معوق شده ( {numOverdue} )
          </Button>
          <Button
            ref={(el) => (tabRefs.current[5] = el)}
            onClick={() => {
              disPatch(setValTab(5));
              getLoanAdminList({
                page: 1,
                status: 103,
              });
              setPageIndex(1);
            }}
            size="small"
            sx={{
              bgcolor: value === 5 ? "#fff" : "",
              color: value === 5 ? "#161c24" : themeColor.color,
              py: 1,
              px: 2,
              m: 0,
              whiteSpace: "nowrap",
              minWidth: 150,
              fontWeight: value === 5 ? 900 : "",
            }}
          >
            باز پرداخت شده ( {numRePayed} )
          </Button>
          {/* <Button
            ref={(el) => (tabRefs.current[6] = el)}
            onClick={() => {
              disPatch(setValTab(6));
              getLoanRequestAdminList({
                statusId: 5,
                page: 1,
              });
              setPageIndex(1);
            }}
            size="small"
            sx={{
              bgcolor: value === 6 ? "#fff" : "",
              color: value === 6 ? "#161c24" : themeColor.color,
              py: 1,
              px: 2,
              m: 0,
              whiteSpace: "nowrap",
              minWidth: 100,
              fontWeight: value === 6 ? 900 : "",
            }}
          >
            آرشیو شده ({numArchive})
          </Button> */}
         
        </div>
        {tabRefs.current[value] && (
          <div
            style={{
              left:
                tabRefs.current[value].offsetLeft +
                tabRefs.current[0].scrollWidth / 2 +
                "px",
            }}
            className={
              themeMode === "dark"
                ? "absolute bottom-0 translate-y-[175%] duration-300 justify-center items-center flex-col bg-[#161c24] z-[5] xl:flex hidden"
                : "absolute bottom-0 translate-y-[175%] duration-300 justify-center items-center flex-col bg-white z-[5] xl:flex hidden"
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
                {" "}
                <path
                  d="M25.5001 11L17.2427 2.7426C14.8995 0.399462 11.1006 0.399463 8.75739 2.74261L0.5 11"
                  stroke="#F79231"
                  strokeWidth="1"
                  strokeLinecap="round"
                />{" "}
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
