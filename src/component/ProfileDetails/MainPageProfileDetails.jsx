import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Bank from "./Bank";
import BasicInfo from "./BasicInfo";
import Capital from "./Capital";
import CreditFile from "./CreditFile";
import Member from "./Member";
import ShareHolder from "./ShareHolder";

export default function MainPageProfileDetails() {
  const mainPageState = useSelector((store) => store.resetState.mainPageState);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [value, setValue] = useState(0);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    setFlag((e) => !e);
  }, [mainPageState]);
  const tabRefs = useRef([]);

  return (
    <>
      <div className="w-full px-5 mt-3 relative test">
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
              color: value === 0 ? "#161c24" : themeColor.color,
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
      <div className="px-5">
        <div
          style={{
            borderColor: themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0],
          }}
          className="border-2 px-2 py-4 relative rounded-lg mt-7"
        >
          {value === 0 && <BasicInfo flag={flag} setFlag={setFlag} />}
          {value === 1 && <CreditFile flag={flag} setFlag={setFlag} />}
          {value === 2 && <Bank flag={flag} setFlag={setFlag} />}
          {value === 3 && <Member flag={flag} setFlag={setFlag} />}
          {value === 4 && <ShareHolder flag={flag} setFlag={setFlag} />}
          {value === 5 && <Capital flag={flag} setFlag={setFlag} />}
        </div>
      </div>
    </>
  );
}
