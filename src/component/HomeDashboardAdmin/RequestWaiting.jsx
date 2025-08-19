import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { CiStopwatch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

RequestWaiting.propTypes = {
  dataDashboard: PropTypes.object,
};
export default function RequestWaiting({ dataDashboard }) {
  const Navigate = useNavigate();
  return (
    <>
      <div className=" mt-3 py-4 flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-center">
            <CiStopwatch className="text-5xl" />
          </div>
          <div>
            <span className="font-semibold text-2xl">
              {dataDashboard.loanRequestPendingCount}
            </span>
            <span> درخواست منتظر بررسی </span>
          </div>
          <div>
            <span className=" text-xs">درخواست های تسهیلات منتظر بررسی</span>
          </div>
        </div>
        <div>
          <Button
            onClick={() => {
              Navigate("/profile/AdminLoanRequest", { state: { myData: 1 } });
            }}
            sx={{ mt: 1, mr: 1 }}
          >
            بررسی لیست
          </Button>
        </div>
      </div>
    </>
  );
}
