import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { AiFillDollarCircle } from "react-icons/ai";
import { IoListCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalVisitForm from "../LoanList/ModalVisitForm";

TableLoanSet.propTypes = {
  listLoan: PropTypes.array,
};
export default function TableLoanSet({ listLoan }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);

  const Navigate = useNavigate();

  return (
    <>
      {listLoan.length > 0 && (
        <div className="w-full px-2">
          <div className="border rounded-lg p-3 h-full w-full">
            <div
              style={{ background: themeColor.bgColor }}
              className="p-3 rounded-lg flex justify-between"
            >
              <div
                style={{ color: themeColor.color }}
                className="flex items-center"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M16.24 3.65002H7.76C5.29 3.65002 3.29 5.66002 3.29 8.12002V17.53C3.29 19.99 5.3 22 7.76 22H16.23C18.7 22 20.7 19.99 20.7 17.53V8.12002C20.71 5.65002 18.7 3.65002 16.24 3.65002Z"
                    fill="#fff"
                  />
                  <path
                    d="M14.35 2H9.65C8.61 2 7.76 2.84 7.76 3.88V4.82C7.76 5.86 8.6 6.7 9.64 6.7H14.35C15.39 6.7 16.23 5.86 16.23 4.82V3.88C16.24 2.84 15.39 2 14.35 2Z"
                    fill="#fff"
                  />
                  <path
                    d="M15 12.95H8C7.59 12.95 7.25 12.61 7.25 12.2C7.25 11.79 7.59 11.45 8 11.45H15C15.41 11.45 15.75 11.79 15.75 12.2C15.75 12.61 15.41 12.95 15 12.95Z"
                    fill="#fff"
                  />
                  <path
                    d="M12.38 16.95H8C7.59 16.95 7.25 16.61 7.25 16.2C7.25 15.79 7.59 15.45 8 15.45H12.38C12.79 15.45 13.13 15.79 13.13 16.2C13.13 16.61 12.79 16.95 12.38 16.95Z"
                    fill="#fff"
                  />
                </svg>
                <span className="font-bold text-xs px-2">فایل های قرارداد</span>
              </div>
            </div>
            <div className="flex flex-wrap">
              {listLoan.map((item, index) => (
                <div
                  key={item.desc}
                  className={
                    index % 2 === 0
                      ? "sm:w-1/2 w-full sm:pl-2 mt-3 flex"
                      : "sm:w-1/2 w-full sm:pr-2 mt-3 flex"
                  }
                >
                  <div
                    className={
                      themeMode === "dark"
                        ? "bg-slate-800 rounded-lg flex flex-col justify-start items-center px-3 pb-4 pt-1 w-full"
                        : "bg-slate-100 rounded-lg flex flex-col justify-start items-center px-3 pb-4 pt-1 w-full"
                    }
                  >
                    {/* <span className="font-semibold">
                      {item.amount.toLocaleString()}
                    </span> */}
                    <div className="mt-1">
                      {item.formStatus >= 2 && item.status === 100 && (
                        <ModalVisitForm loan={item} />
                      )}
                    </div>
                    <div
                      className={
                        themeMode === "dark"
                          ? "rounded-lg bg-slate-900 flex justify-between p-1  w-full mt-2"
                          : "rounded-lg bg-white flex justify-between p-1  w-full mt-2"
                      }
                    >
                      <div className="flex items-center">
                        <AiFillDollarCircle />
                        <span className="px-2 text-xs">مبلغ تسهیلات</span>
                      </div>
                      <span className="text-xs font-semibold">
                        {item.amount.toLocaleString()}
                      </span>
                    </div>
                    <div
                      className={
                        themeMode === "dark"
                          ? "rounded-lg bg-slate-900 flex justify-between p-1  w-full mt-2"
                          : "rounded-lg bg-white flex justify-between p-1  w-full mt-2"
                      }
                    >
                      <div className="flex items-center">
                        <IoListCircle />
                        <span className="px-2 text-xs">شماره قرارداد</span>
                      </div>
                      <span className="text-xs font-semibold">
                        {item.contractNumber}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {
              <div className="mt-2">
                <Button
                  onClick={() => {
                    Navigate("/profile/LoanList", {
                      state: { myData: 2 },
                    });
                  }}
                  sx={{
                    background: themeColor.bgColor,
                    color: themeColor.color,
                    px: 3,
                  }}
                >
                  مشاهده لیست
                </Button>
              </div>
            }
          </div>
        </div>
      )}
    </>
  );
}
