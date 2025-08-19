import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa6";
import { useSelector } from "react-redux";

NumberCooperative.propTypes = {
  dataDashboard: PropTypes.object,
};
export default function NumberCooperative({ dataDashboard }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  return (
    <>
      <div className="py-4">
        <div className="flex justify-center py-3">
          <FaUser className="text-4xl text-blue-500" />
        </div>
        <span className="text-blue-500 text-3xl">
          {dataDashboard.cooperativeCount}
        </span>
        <div className={themeMode === "dark" ? "text-[#fff8]" : "text-[#0008]"}>
          تشکل های عضو صندوق عشایر
        </div>
      </div>
    </>
  );
}
