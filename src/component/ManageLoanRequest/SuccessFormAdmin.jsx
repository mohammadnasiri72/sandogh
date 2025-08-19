import { IconButton } from "@mui/material";
import { Dropdown, Menu, Progress } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import ConfirmPrimary from "./ConfirmPrimary";
import FinalConfirm from "./FinalConfirm";
import ModalDetailsFormContractAdmin from "./ModalDetailsFormContractAdmin";
import ModalDetailsFormLoanRequestAdmin from "./ModalDetailsFormLoanRequestAdmin";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoanId } from "../../redux/slice/adminLoan";

SuccessFormAdmin.propTypes = {
  loan: PropTypes.object,
  getLoanRequestAdminList: PropTypes.func,
  getLoanAdminList: PropTypes.func,
  setPageIndex: PropTypes.func,
};
export default function SuccessFormAdmin({
  loan,
  getLoanRequestAdminList,
  setPageIndex,
  getLoanAdminList,
}) {
  const [openFormLoanRequest, setOpenFormLoanRequest] = useState(false);
  const [openFormContract, setOpenFormContract] = useState(false);
  const [openConfirmPrimary, setOpenConfirmPrimary] = useState(false);
  const [openFinalConfirm, setOpenFinalConfirm] = useState(false);

  const Navigate = useNavigate();
  const disPatch = useDispatch();

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "0":
        if (!loan.loanId) {
          setOpenConfirmPrimary(true);
        } else {
          disPatch(setLoanId(loan.loanId));
          Navigate(`/profile/AdminLoanList/${loan.loanId}`);
        }
        break;
      case "1":
        setOpenFormLoanRequest(true);
        break;
      case "2":
        setOpenFormContract(true);
        break;
      case "3":
        setOpenFinalConfirm(true);
        break;

      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item
        key="0"
        style={{ backgroundColor: loan.loanId ? "rgb(167 243 208)" : "" }}
      >
        <div className="flex justify-start items-center">
          <span>ثبت اولیه</span>
        </div>
      </Menu.Item>
      <Menu.Item
        key="1"
        disabled={!loan.loanId}
        style={{
          backgroundColor: loan.loanFormStatus > 0 ? "rgb(167 243 208)" : "",
        }}
      >
        <div className="flex justify-start items-center">
          <span>فرم درخواست تسهیلات</span>
        </div>
      </Menu.Item>
      <Menu.Item
        key="2"
        disabled={!loan.loanId}
        style={{
          backgroundColor: loan.loanFormStatus > 1 ? "rgb(167 243 208)" : "",
        }}
      >
        <div className="flex justify-start items-center">
          <span>فرم قرارداد</span>
        </div>
      </Menu.Item>
      <Menu.Item
        key="3"
        disabled={loan.loanFormStatus < 2}
        style={{
          backgroundColor: loan.loanFormStatus > 2 ? "rgb(167 243 208)" : "",
        }}
      >
        <div className="flex justify-start items-center">
          <span>ثبت نهایی</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {/* <Dropdown overlay={menu} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Tooltip title="مراحل ثبت تسهیلات">
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
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
                  fill="#34c38f"
                />
                <path
                  d="M14.35 2H9.65C8.61 2 7.76 2.84 7.76 3.88V4.82C7.76 5.86 8.6 6.7 9.64 6.7H14.35C15.39 6.7 16.23 5.86 16.23 4.82V3.88C16.24 2.84 15.39 2 14.35 2Z"
                  fill="#34c38f"
                />
                <path
                  d="M15 12.95H8C7.59 12.95 7.25 12.61 7.25 12.2C7.25 11.79 7.59 11.45 8 11.45H15C15.41 11.45 15.75 11.79 15.75 12.2C15.75 12.61 15.41 12.95 15 12.95Z"
                  fill="#34c38f"
                />
                <path
                  d="M12.38 16.95H8C7.59 16.95 7.25 16.61 7.25 16.2C7.25 15.79 7.59 15.45 8 15.45H12.38C12.79 15.45 13.13 15.79 13.13 16.2C13.13 16.61 12.79 16.95 12.38 16.95Z"
                  fill="#34c38f"
                />
              </svg>
            </IconButton>
          </Tooltip>
        </a>
      </Dropdown> */}
      <Dropdown overlay={menu} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <IconButton
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Progress
              type="circle"
              percent={
                !loan.loanId
                  ? 0
                  : loan.loanFormStatus === 0
                  ? 25
                  : loan.loanFormStatus === 1
                  ? 50
                  : loan.loanFormStatus === 2
                  ? 75
                  : 100
              }
              steps={{ count: 4, gap: 7 }}
              trailColor="rgba(0, 0, 0, 0.06)"
              strokeWidth={10}
              strokeColor="#34c38f"
              width={40}
              format={() => (
                <div className="flex justify-center items-center">
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
                      fill="#34c38f"
                    />
                    <path
                      d="M14.35 2H9.65C8.61 2 7.76 2.84 7.76 3.88V4.82C7.76 5.86 8.6 6.7 9.64 6.7H14.35C15.39 6.7 16.23 5.86 16.23 4.82V3.88C16.24 2.84 15.39 2 14.35 2Z"
                      fill="#34c38f"
                    />
                    <path
                      d="M15 12.95H8C7.59 12.95 7.25 12.61 7.25 12.2C7.25 11.79 7.59 11.45 8 11.45H15C15.41 11.45 15.75 11.79 15.75 12.2C15.75 12.61 15.41 12.95 15 12.95Z"
                      fill="#34c38f"
                    />
                    <path
                      d="M12.38 16.95H8C7.59 16.95 7.25 16.61 7.25 16.2C7.25 15.79 7.59 15.45 8 15.45H12.38C12.79 15.45 13.13 15.79 13.13 16.2C13.13 16.61 12.79 16.95 12.38 16.95Z"
                      fill="#34c38f"
                    />
                  </svg>
                </div>
              )}
            />
          </IconButton>
        </a>
      </Dropdown>

      <ConfirmPrimary
        open={openConfirmPrimary}
        setOpen={setOpenConfirmPrimary}
        id={loan.id}
        cooperativeId={loan.cooperativeId}
        getLoanRequestAdminList={getLoanRequestAdminList}
        setPageIndex={setPageIndex}
      />

      <ModalDetailsFormLoanRequestAdmin
        open={openFormLoanRequest}
        setOpen={setOpenFormLoanRequest}
        loan={loan}
        getLoanRequestAdminList={getLoanRequestAdminList}
      />
      <ModalDetailsFormContractAdmin
        open={openFormContract}
        setOpen={setOpenFormContract}
        loan={loan}
        getLoanRequestAdminList={getLoanRequestAdminList}
      />
      <FinalConfirm
        loan={loan}
        open={openFinalConfirm}
        setOpen={setOpenFinalConfirm}
        getLoanAdminList={getLoanAdminList}
        getLoanRequestAdminList={getLoanRequestAdminList}
      />
    </>
  );
}
