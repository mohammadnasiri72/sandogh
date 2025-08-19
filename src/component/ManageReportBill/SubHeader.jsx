import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { BiCopyAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import BoxSubHeader from "./BoxSubHeader";

SubHeader.propTypes = {
  subHeaderList: PropTypes.array,
  isLoading: PropTypes.bool,
};
export default function SubHeader({ subHeaderList, isLoading }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  return (
    <>
      {subHeaderList.length > 0 && (
        <div className="flex flex-wrap items-stretch ">
          <div className="flex flex-wrap px-1 sm:w-2/3 w-full">
            {subHeaderList
              .filter(
                (e) =>
                  e.desc === "101" ||
                  e.desc === "102" ||
                  e.desc === "103" ||
                  e.desc === "104"
              )
              .map((item, index) => (
                <div className="p-1 sm:w-1/2 w-full" key={index}>
                  <BoxSubHeader item={item} />
                </div>
              ))}
          </div>
          <div className="sm:w-1/3 w-full">
            <div className="py-1 w-full px-3 h-full">
              <div
                className={
                  themeMode === "dark"
                    ? "bg-slate-700 p-3 rounded-lg mini-stats-wid cursor-default border border-[#0001] h-full"
                    : "bg-white p-3 rounded-lg mini-stats-wid cursor-default border border-[#0001] h-full"
                }
              >
                <div className="flex justify-between px-2">
                  <div className="flex flex-col items-start justify-center">
                    <span className="text-[#6c757d] text-lg">مجموع</span>
                    <div className="flex flex-col">
                    <div className="flex items-center mt-10 text-lg">
                        <span className="text-xs">تعداد : </span>
                        <span className="px-1 font-semibold">
                          {subHeaderList.slice(1)
                            .find((e) => e.desc === "")
                            .key.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center mt-10 text-lg">
                        <span className="text-xs">مبلغ : </span>
                        <span className="px-1 font-semibold">
                          {subHeaderList.slice(1)
                            .find((e) => e.desc === "")
                            .value.toLocaleString()}
                        </span>
                      </div>
                     
                    </div>
                  </div>
                  <div className="mini-stat-icon bg-[#556ee6] rounded-full p-2 flex justify-center items-center w-12 h-12">
                    <BiCopyAlt className="text-2xl text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {subHeaderList.length === 0 && isLoading && (
        <div className="flex flex-wrap ">
          <div className="px-5 py-1 sm:w-1/2 lg:w-1/3 w-full">
            <Skeleton variant="rounded" width={"100%"} height={150} />
          </div>
          <div className="px-5 py-1 sm:w-1/2 lg:w-1/3 w-full">
            <Skeleton variant="rounded" width={"100%"} height={150} />
          </div>
          <div className="px-5 py-1 sm:w-1/2 lg:w-1/3 w-full">
            <Skeleton variant="rounded" width={"100%"} height={150} />
          </div>
          <div className="px-5 py-1 sm:w-1/2 lg:w-1/3 w-full">
            <Skeleton variant="rounded" width={"100%"} height={150} />
          </div>
          <div className="px-5 py-1 sm:w-1/2 lg:w-1/3 w-full">
            <Skeleton variant="rounded" width={"100%"} height={150} />
          </div>
        </div>
      )}
    </>
  );
}
