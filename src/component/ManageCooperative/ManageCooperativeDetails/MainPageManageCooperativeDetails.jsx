import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import * as React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setCooperativeId } from "../../../redux/slice/cooperative";
import BasicInfoCooperative from "./BasicInfoCooperative";
import CooperativeBank from "./CooperativeBank";
import CooperativeCapital from "./CooperativeCapital";
import CooperativeMember from "./CooperativeMember";
import CooperativeShareHolder from "./CooperativeShareHolder";
import CreditFileCooperative from "./CreditFileCooperative";

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

MainPageManageCooperativeDetails.propTypes = {
  getCooperativeList: PropTypes.func,
};

export default function MainPageManageCooperativeDetails() {
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [value, setValue] = React.useState(0);
  const [flag, setFlag] = React.useState(false);
  const cooperativeId = useSelector((store) => store.cooperative.cooperativeId);
  const tabRefs = React.useRef([]);
  const url = useLocation();
  const dispatch = useDispatch();
  React.useEffect(() => {
    const id = url.pathname.substring(url.pathname.lastIndexOf("/") + 1);
    dispatch(setCooperativeId(id));
  }, []);

  const Navigate = useNavigate();

  return (
    <>
      <div className="px-5 flex justify-start mt-5">
        <Button
          onClick={() => {
            // setStatePage(0);
            // getCooperativeList();
            Navigate("/profile/AdminCooperative");
          }}
          sx={{
            transition: "0.6s",
            color: themeColor.color,
            background: themeColor.bgColor,

            boxShadow: "none",
          }}
        >
          <div className="flex items-center">
            <FaArrowLeftLong />
            <span className="p-1 text-xs ">بازگشت به لیست</span>
          </div>
        </Button>
      </div>
      {cooperativeId !== 0 && (
        <div className="w-full px-5 mt-3 relative">
          <div
            style={{ background: themeColor.bgColor }}
            className="flex sm:justify-around justify-start py-2 rounded-lg overflow-x-auto overflow-y-hidden whitespace-nowrap px-3"
          >
            <Button
              ref={(el) => (tabRefs.current[0] = el)}
              onClick={() => {
                setValue(0);

                setFlag((e) => !e);
              }}
              size="small"
              sx={{
                bgcolor: value === 0 ? "#fff" : "",
                color: value === 0 ?"#161c24" : themeColor.color,
                py: 1,
                px: 2,
                m: 0,
                whiteSpace: "nowrap",
                minWidth: 130,
              }}
            >
              اطلاعات پایه
            </Button>
            <Button
              ref={(el) => (tabRefs.current[1] = el)}
              onClick={() => {
                setValue(1);
                setFlag((e) => !e);
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
              پرونده اعتباری
            </Button>
            <Button
              ref={(el) => (tabRefs.current[2] = el)}
              onClick={() => {
                setValue(2);
                setFlag((e) => !e);
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
              اطلاعات بانکی
            </Button>
            <Button
              ref={(el) => (tabRefs.current[3] = el)}
              onClick={() => {
                setValue(3);
                setFlag((e) => !e);
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
              اعضای هیئت مدیره
            </Button>
            <Button
              ref={(el) => (tabRefs.current[4] = el)}
              onClick={() => {
                setValue(4);
                setFlag((e) => !e);
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
              سهامداران متقاضی
            </Button>
            <Button
              ref={(el) => (tabRefs.current[5] = el)}
              onClick={() => {
                setValue(5);
                setFlag((e) => !e);
              }}
              size="small"
              sx={{
                bgcolor: value === 5 ? "#fff" : "",
                color: value === 5 ? "#161c24" : themeColor.color,
                py: 1,
                px: 2,
                m: 0,
                whiteSpace: "nowrap",
                minWidth: 130,
              }}
            >
              تغییرات سهام
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
                  ? "absolute bottom-0 translate-y-[105%] duration-300 justify-center items-center flex-col bg-[#161c24] z-[5] sm:flex hidden"
                  : "absolute bottom-0 translate-y-[105%] duration-300 justify-center items-center flex-col bg-white z-[5] sm:flex hidden"
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
      )}
      <div className="px-5">
        <div
          style={{
            borderColor: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
          }}
          className="border-2 p-2 relative rounded-lg mt-7"
        >
          {value === 0 && (
            <BasicInfoCooperative flag={flag} setFlag={setFlag} />
          )}
          {value === 1 && (
            <CreditFileCooperative flag={flag} setFlag={setFlag} />
          )}
          {value === 2 && <CooperativeBank flag={flag} setFlag={setFlag} />}
          {value === 3 && <CooperativeMember flag={flag} setFlag={setFlag} />}
          {value === 4 && (
            <CooperativeShareHolder flag={flag} setFlag={setFlag} />
          )}
          {value === 5 && <CooperativeCapital flag={flag} setFlag={setFlag} />}
        </div>
      </div>
    </>
  );
}
