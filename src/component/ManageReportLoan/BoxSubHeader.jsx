import PropTypes from "prop-types";
import { BiCopyAlt } from "react-icons/bi";
import { useSelector } from "react-redux";

BoxSubHeader.propTypes = {
  item: PropTypes.object,
};
export default function BoxSubHeader({ item }) {
  const themeMode = useSelector((store) => store.setting.themeMode);

  return (
    <>
      {/* <Box
        sx={{
          border: "1px solid grey",
          borderRadius: "8px",
          padding: "16px",
          backgroundColor: themeMode === "dark" ? "" : "#f9f9f9",
          width: "100%",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <div className="w-full flex justify-center">
          <img
            src={
              item.desc === "101"
                ? "/images/credit-card_677069.png"
                : item.desc === "102"
                ? "/images/credit-card_9213352.png"
                : item.desc === "103"
                ? "/images/payment-method_3815522.png"
                : item.desc === "104"
                ? "/images/credit-card_18229307.png"
                : "/images/currency_8358167.png"
            }
            alt=""
          />
        </div>

        <Typography variant="h6" gutterBottom>
          {item.desc === "101"
            ? "پرداخت شده"
            : item.desc === "102"
            ? "معوق شده"
            : item.desc === "103"
            ? "بازپرداخت شده"
            : item.desc === "104"
            ? "سررسید شده"
            : "مجموع"}
        </Typography>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="whitespace-nowrap"> تعداد معاملات </span>
            <Typography variant="h5" color="primary">
              {item.key}
            </Typography>
          </div>
          <div className="flex flex-col">
            <span className="whitespace-nowrap"> مبلغ سود معاملات </span>
            <span className="whitespace-nowrap text-emerald-500">
              {item.value} تومان
            </span>
          </div>
        </div>
      </Box> */}
      <div className="py-1 w-full px-3 ">
        <div
          className={
            themeMode === "dark"
              ? "bg-slate-700 p-3 rounded-lg mini-stats-wid cursor-default border border-[#0001]"
              : "bg-white p-3 rounded-lg mini-stats-wid cursor-default border border-[#0001]"
          }
        >
          <div className="flex justify-between px-2">
            <div className="flex flex-col items-start justify-center">
              <span className="text-[#6c757d] text-xs">
                {item.desc === "101"
                  ? "پرداخت شده"
                  : item.desc === "102"
                  ? "معوق شده"
                  : item.desc === "103"
                  ? "بازپرداخت شده"
                  : item.desc === "104"
                  ? "سررسید شده"
                  : ""}
              </span>
              <div className="flex flex-col">
                <div className="flex items-center mt-1">
                  <span className="text-xs">تعداد : </span>
                  <span className="px-1">{item.key.toLocaleString()}</span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-xs">مبلغ : </span>
                  <span className="px-1">{item.value.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="mini-stat-icon bg-[#556ee6] rounded-full p-2 flex justify-center items-center w-12 h-12">
              <BiCopyAlt className="text-2xl text-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
