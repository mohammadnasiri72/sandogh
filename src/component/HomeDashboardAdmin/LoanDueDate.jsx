import { Button, Divider } from "@mui/material";
import PropTypes from "prop-types";
import { FaRegCircleDot } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

LoanDueDate.propTypes = {
  dataDashboard: PropTypes.object,
};
export default function LoanDueDate({ dataDashboard }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const Navigate = useNavigate();
  return (
    <>
      <div>
        <div className="flex py-2">
          <span>
            تسهیلات سررسید شده ({dataDashboard.cooperativeMaturedLoans.length})
          </span>
        </div>
        {dataDashboard.cooperativeMaturedLoans.map((e) => (
          <div key={e.id}>
            <div className="">
              <div className="flex items-start px-5">
                {/* <FaRegCircleDot className="text-teal-500" /> */}
                <div>
                  <div
                    className={
                      themeMode === "dark"
                        ? "flex text-[#fff8] py-2"
                        : "flex text-[#0008] py-2"
                    }
                  >
                    <FaRegCircleDot className="text-teal-500" />
                    <span className="px-2">تاریخ سر رسید:</span>
                    <span>{e.loanMaturityFa}</span>
                  </div>
                  <div
                    onClick={() => {
                      Navigate("/profile/AdminLoanList/edit", {
                        state: { myData: 4, page: 1, loanId: e.id },
                      });
                    }}
                    className="flex py-2 cursor-pointer hover:text-teal-500 duration-300"
                  >
                    <span className="text-justify">{e.cooperativeTitle}</span>
                  </div>
                  <div className="flex text-teal-500 py-2">
                    <span className="px-2">مبلغ :</span>
                    <span>{e.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Divider />
            </div>
          </div>
        ))}
        <div className="">
          <Button
            onClick={() => {
              Navigate("/profile/AdminLoanList", {
                state: { myData: 4 },
              });
            }}
            sx={{ mr: 1 }}
          >
            بارگیری بیشتر
          </Button>
        </div>
      </div>
    </>
  );
}
