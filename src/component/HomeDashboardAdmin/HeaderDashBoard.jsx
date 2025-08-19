import InsertChartIcon from "@mui/icons-material/InsertChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PropTypes from "prop-types";
import { BiCopyAlt } from "react-icons/bi";
import { CiViewList } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RequestWaiting from "./RequestWaiting";

HeaderDashBoard.propTypes = {
  dataDashboard: PropTypes.array,
};
export default function HeaderDashBoard({ dataDashboard }) {
  const themeMode = useSelector((store) => store.setting.themeMode);

  const data = [
    {
      title: " تعداد تسهیلات پرداختی ",
      value: dataDashboard.loanCount,
      icon: <CiViewList />,
    },
    {
      title: " مبلغ کل تسهیلات پرداختی ",
      value: dataDashboard.loanAmountSum,
      icon: <TrendingUpIcon />,
    },

    {
      title: "مبلغ کل معوقات",
      value: dataDashboard.loanAmountDeyaledSum,
      icon: <InsertChartIcon />,
    },
    {
      title: "مبلغ سررسید شده ",
      value: dataDashboard.loanAmountMaturitySum,
      icon: <ShowChartIcon />,
    },
  ];
  const Navigate = useNavigate();
  return (
    <>
      <div className="flex flex-wrap ">
        <div
          className={
            themeMode === "dark"
              ? "md:w-1/3 w-full px-5 border border-[#fff5] rounded-md bg-slate-700"
              : "md:w-1/3 w-full px-5 border border-[#0002] rounded-md bg-white"
          }
        >
          <RequestWaiting dataDashboard={dataDashboard} />
        </div>
        <div className="flex flex-wrap md:w-2/3 w-full">
          {data.map((item, index) => (
            <div className="py-1 sm:w-1/2 w-full px-3 " key={index}>
              <div
                onClick={() => {
                  if (index === 3) {
                    Navigate("/profile/AdminLoanList", {
                      state: { myData: 4 },
                    });
                  }
                  if (index === 2) {
                    Navigate("/profile/AdminLoanList", {
                      state: { myData: 2 },
                    });
                  }
                }}
                style={{ cursor: index > 1 ? "pointer" : "" }}
                className={
                  themeMode === "dark"
                    ? "bg-slate-700 p-3 rounded-lg mini-stats-wid cursor-default border border-[#0001]"
                    : "bg-white p-3 rounded-lg mini-stats-wid cursor-default border border-[#0001]"
                }
              >
                <div className="flex justify-between px-2">
                  <div className="flex flex-col items-start justify-center">
                    <span className="text-[#6c757d] text-xs">{item.title}</span>
                    <span className="mt-1">{item.value.toLocaleString()}</span>
                  </div>
                  <div className="mini-stat-icon bg-[#556ee6] rounded-full p-2 flex justify-center items-center w-12 h-12">
                    <BiCopyAlt className="text-2xl text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
