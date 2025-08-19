import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { FaChartSimple } from "react-icons/fa6";
import { useSelector } from "react-redux";

SubHeaderCapital.propTypes = {
  listSubHeaderReportCapital: PropTypes.array,
};
export default function SubHeaderCapital({ listSubHeaderReportCapital }) {
  const themeColor = useSelector((store) => store.setting.themeColor);
  const themeMode = useSelector((store) => store.setting.themeMode);

  return (
    <>
      {listSubHeaderReportCapital.length > 0 && (
        <div className="flex flex-wrap px-3">
          <div className="md:w-1/2 w-full p-2">
            <div className="rounded-lg border p-3">
              <div
                style={{
                  background: themeColor.bgColor,
                  color: themeColor.color,
                }}
                className="rounded-lg p-2 flex justify-between items-center"
              >
                <div className="flex items-center">
                  <FaChartSimple />
                  <span className="px-2">
                    {listSubHeaderReportCapital[1].desc}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap w-full">
                <div className="px-1 w-full mt-2">
                  <div
                    className={
                      themeMode === "dark"
                        ? "rounded-lg bg-slate-700 px-3 py-1  flex justify-between items-center"
                        : "rounded-lg bg-slate-100 px-3 py-1  flex justify-between items-center"
                    }
                  >
                    <div className="flex items-center">
                      <img className="w-5" src="/images/element-4.svg" alt="" />
                      <span className="px-1 text-xs whitespace-nowrap">
                        مجموع سهام
                      </span>
                    </div>
                    <span className="whitespace-nowrap font-extrabold">
                      {listSubHeaderReportCapital[1].sumShares.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="px-1 w-full mt-2">
                  <div
                    className={
                      themeMode === "dark"
                        ? "rounded-lg bg-slate-700 px-3 py-1 flex justify-between items-center"
                        : "rounded-lg bg-slate-100 px-3 py-1 flex justify-between items-center"
                    }
                  >
                    <div className="flex items-center">
                      <img className="w-5" src="/images/element-4.svg" alt="" />
                      <span className="px-1 text-xs whitespace-nowrap">
                        مجموع سرمایه (ریال)
                      </span>
                    </div>
                    <span className="whitespace-nowrap font-extrabold">
                      {listSubHeaderReportCapital[1].sumCapital.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="px-1 w-full mt-2">
                  <div
                    className={
                      themeMode === "dark"
                        ? "rounded-lg bg-slate-700 px-3 py-1 flex justify-between items-center"
                        : "rounded-lg bg-slate-100 px-3 py-1 flex justify-between items-center"
                    }
                  >
                    <div className="flex items-center">
                      <img className="w-5" src="/images/element-4.svg" alt="" />
                      <span className="px-1 text-xs whitespace-nowrap">
                        مجموع تغییرات سهام
                      </span>
                    </div>
                    <span className="whitespace-nowrap font-extrabold">
                      {listSubHeaderReportCapital[1].sumChangeCapital.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="px-1 w-full mt-2">
                  <div
                    className={
                      themeMode === "dark"
                        ? "rounded-lg bg-slate-700 px-3 py-1 flex justify-between items-center"
                        : "rounded-lg bg-slate-100 px-3 py-1 flex justify-between items-center"
                    }
                  >
                    <div className="flex items-center">
                      <img className="w-5" src="/images/element-4.svg" alt="" />
                      <span className="px-1 text-xs whitespace-nowrap">
                        مجموع درصد سهام
                      </span>
                    </div>
                    <span className="whitespace-nowrap font-extrabold">
                      {
                        listSubHeaderReportCapital[1].sumPercentShare.toLocaleString()
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-3 mt-2">
              <div
                style={{
                  background: themeColor.bgColor,
                  color: themeColor.color,
                }}
                className="rounded-lg p-2 flex justify-between items-center"
              >
                <div className="flex items-center ">
                  <FaChartSimple />
                  <span className="px-2">
                    {listSubHeaderReportCapital[2].desc}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap w-full">
                <div className="px-1 w-full mt-2">
                  <div
                    className={
                      themeMode === "dark"
                        ? "rounded-lg bg-slate-700 px-3 py-1 flex justify-between items-center"
                        : "rounded-lg bg-slate-100 px-3 py-1 flex justify-between items-center"
                    }
                  >
                    <div className="flex items-center">
                      <img className="w-5" src="/images/element-4.svg" alt="" />
                      <span className="px-1 text-xs whitespace-nowrap">
                        مجموع سهام
                      </span>
                    </div>
                    <span className="whitespace-nowrap font-extrabold">
                      {listSubHeaderReportCapital[2].sumShares.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="px-1 w-full mt-2">
                  <div
                    className={
                      themeMode === "dark"
                        ? "rounded-lg bg-slate-700 px-3 py-1 flex justify-between items-center"
                        : "rounded-lg bg-slate-100 px-3 py-1 flex justify-between items-center"
                    }
                  >
                    <div className="flex items-center">
                      <img className="w-5" src="/images/element-4.svg" alt="" />
                      <span className="px-1 text-xs whitespace-nowrap">
                        مجموع سرمایه (ریال)
                      </span>
                    </div>
                    <span className="whitespace-nowrap font-extrabold">
                      {listSubHeaderReportCapital[2].sumCapital.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="px-1 w-full mt-2">
                  <div
                    className={
                      themeMode === "dark"
                        ? "rounded-lg bg-slate-700 px-3 py-1 flex justify-between items-center"
                        : "rounded-lg bg-slate-100 px-3 py-1 flex justify-between items-center"
                    }
                  >
                    <div className="flex items-center">
                      <img className="w-5" src="/images/element-4.svg" alt="" />
                      <span className="px-1 text-xs whitespace-nowrap">
                        مجموع تغییرات سهام
                      </span>
                    </div>
                    <span className="whitespace-nowrap font-extrabold">
                      {listSubHeaderReportCapital[2].sumChangeCapital.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="px-1 w-full mt-2">
                  <div
                    className={
                      themeMode === "dark"
                        ? "rounded-lg bg-slate-700 px-3 py-1 flex justify-between items-center"
                        : "rounded-lg bg-slate-100 px-3 py-1 flex justify-between items-center"
                    }
                  >
                    <div className="flex items-center">
                      <img className="w-5" src="/images/element-4.svg" alt="" />
                      <span className="px-1 text-xs whitespace-nowrap">
                        مجموع درصد سهام
                      </span>
                    </div>
                    <span className="whitespace-nowrap font-extrabold">
                      {
                        listSubHeaderReportCapital[2].sumPercentShare.toLocaleString()
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full p-2">
            <div className="rounded-lg border p-3 h-full">
              <div
                style={{
                  background: themeColor.bgColor,
                  color: themeColor.color,
                }}
                className="rounded-lg p-2 flex justify-between items-center"
              >
                <div className="flex items-center ">
                  <FaChartSimple />
                  <span className="px-2">
                    {listSubHeaderReportCapital[0].desc}
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-col items-center">
                <img className="w-80" src="/images/20945314 1.svg" alt="" />
                <div className="flex flex-wrap w-full">
                  <div className="px-1 w-full mt-2">
                    <div
                      className={
                        themeMode === "dark"
                          ? "rounded-lg bg-slate-700 px-3 py-1 flex justify-between items-center"
                          : "rounded-lg bg-slate-100 px-3 py-1 flex justify-between items-center"
                      }
                    >
                      <div className="flex items-center">
                        <img
                          className="w-5"
                          src="/images/element-4.svg"
                          alt=""
                        />
                        <span className="px-1 text-xs whitespace-nowrap">
                          مجموع سهام
                        </span>
                      </div>
                      <span className="whitespace-nowrap font-extrabold">
                        {listSubHeaderReportCapital[0].sumShares.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="px-1 w-full mt-2">
                    <div
                      className={
                        themeMode === "dark"
                          ? "rounded-lg bg-slate-700 px-3 py-1 flex justify-between items-center"
                          : "rounded-lg bg-slate-100 px-3 py-1 flex justify-between items-center"
                      }
                    >
                      <div className="flex items-center">
                        <img
                          className="w-5"
                          src="/images/element-4.svg"
                          alt=""
                        />
                        <span className="px-1 text-xs whitespace-nowrap">
                          مجموع سرمایه (ریال)
                        </span>
                      </div>
                      <span className="whitespace-nowrap font-extrabold">
                        {listSubHeaderReportCapital[0].sumCapital.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="px-1 w-full mt-2">
                    <div
                      className={
                        themeMode === "dark"
                          ? "rounded-lg bg-slate-700 px-3 py-1 flex justify-between items-center"
                          : "rounded-lg bg-slate-100 px-3 py-1 flex justify-between items-center"
                      }
                    >
                      <div className="flex items-center">
                        <img
                          className="w-5"
                          src="/images/element-4.svg"
                          alt=""
                        />
                        <span className="px-1 text-xs whitespace-nowrap">
                          مجموع تغییرات سهام
                        </span>
                      </div>
                      <span className="whitespace-nowrap font-extrabold">
                        {listSubHeaderReportCapital[0].sumChangeCapital.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="px-1 w-full mt-2">
                    <div
                      className={
                        themeMode === "dark"
                          ? "rounded-lg bg-slate-700 px-3 py-1 flex justify-between items-center"
                          : "rounded-lg bg-slate-100 px-3 py-1 flex justify-between items-center"
                      }
                    >
                      <div className="flex items-center">
                        <img
                          className="w-5"
                          src="/images/element-4.svg"
                          alt=""
                        />
                        <span className="px-1 text-xs whitespace-nowrap">
                          مجموع درصد سهام
                        </span>
                      </div>
                      <span className="whitespace-nowrap font-extrabold">
                        {
                          listSubHeaderReportCapital[0].sumPercentShare.toLocaleString()
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {listSubHeaderReportCapital.length === 0 && (
        <div className="flex flex-wrap px-3">
          <div className="md:w-1/2 w-full p-2">
            <div className="rounded-lg border p-3">
              <Skeleton variant="rounded" width={"100%"} height={180} />
            </div>
            <div className="rounded-lg border p-3 mt-2">
              <Skeleton variant="rounded" width={"100%"} height={180} />
            </div>
          </div>
          <div className="md:w-1/2 w-full p-2">
            <div className="rounded-lg border p-3 h-full">
              <Skeleton variant="rounded" width={"100%"} height={"100%"} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
