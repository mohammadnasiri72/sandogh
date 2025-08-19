import { IconButton } from "@mui/material";
import { Dropdown, Menu, Progress } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import { MdDone } from "react-icons/md";
import ModalDetailsFormContract from "./ModalDetailsFormContract";
import ModalDetailsFormInvoice from "./ModalDetailsFormInvoice";
import ModalDetailsFormLoanRequest from "./ModalDetailsFormLoanRequest";
import ModalDetailsFormPaymentOrder from "./ModalDetailsFormPaymentOrder";
import { useSelector } from "react-redux";

DropDownForm.propTypes = {
  LoanEdited: PropTypes.object,
  flag: PropTypes.bool,
  setFlag: PropTypes.func,
  getLoanAdminList: PropTypes.func,
};
export default function DropDownForm({
  LoanEdited,
  flag,
  setFlag,
  getLoanAdminList,
}) {
  const [openFormLoanRequest, setOpenFormLoanRequest] = useState(false);
  const [openFormContract, setOpenFormContract] = useState(false);
  const [openFormPaymentOrder, setOpenFormPaymentOrder] = useState(false);
  const [openFormInvoice, setOpenFormInvoice] = useState(false);
  const valTab = useSelector((store) => store.adminLoan.valTab);

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "1":
        setOpenFormLoanRequest(true);
        break;
      case "2":
        setOpenFormContract(true);
        break;
      case "3":
        setOpenFormPaymentOrder(true);
        break;
      case "4":
        setOpenFormInvoice(true);
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      {/* {status === 100 && <Menu.Item key="1">فرم درخواست تسهیلات</Menu.Item>} */}
      <Menu.Item
        style={{
          backgroundColor:
            LoanEdited?.formStatus >= 1 ? "rgb(209 250 229)" : "",
        }}
        key="1"
      >
        <div className="flex justify-center items-center">
          {LoanEdited?.formStatus >= 1 && <MdDone />}
          <span>فرم درخواست تسهیلات</span>
        </div>
      </Menu.Item>
      <Menu.Item
        style={{
          backgroundColor:
            LoanEdited?.formStatus >= 2 ? "rgb(209 250 229)" : "",
        }}
        key="2"
      >
        <div className="flex justify-center items-center">
          {LoanEdited?.formStatus >= 2 && <MdDone />}
          <span>فرم قرارداد</span>
        </div>
      </Menu.Item>
      <Menu.Item
        style={{
          backgroundColor:
            LoanEdited?.formStatus >= 3 ? "rgb(209 250 229)" : "",
        }}
        key="3"
      >
        <div className="flex justify-center items-center">
          {LoanEdited?.formStatus >= 3 && <MdDone />}
          <span>فرم دستور پرداخت</span>
        </div>
      </Menu.Item>
      <Menu.Item
        style={{
          backgroundColor:
            LoanEdited?.formStatus >= 4 ? "rgb(209 250 229)" : "",
        }}
        key="4"
      >
        <div className="flex justify-center items-center">
          {LoanEdited?.formStatus >= 4 && <MdDone />}
          <span>فرم صورت حساب</span>
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Dropdown
        disabled={LoanEdited.formStatus === 0 && LoanEdited.status > 100}
        overlay={menu}
        trigger={["click"]}
      >
        <a onClick={(e) => e.preventDefault()}>
          <IconButton
            disabled={LoanEdited.formStatus === 0 && LoanEdited.status > 100}
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            {valTab !== 2 && (
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
                    fill={
                      LoanEdited.formStatus === 0 && LoanEdited.status > 100
                        ? "#3333"
                        : "#34c38f"
                    }
                  />
                  <path
                    d="M14.35 2H9.65C8.61 2 7.76 2.84 7.76 3.88V4.82C7.76 5.86 8.6 6.7 9.64 6.7H14.35C15.39 6.7 16.23 5.86 16.23 4.82V3.88C16.24 2.84 15.39 2 14.35 2Z"
                    fill={
                      LoanEdited.formStatus === 0 && LoanEdited.status > 100
                        ? "#3333"
                        : "#34c38f"
                    }
                  />
                  <path
                    d="M15 12.95H8C7.59 12.95 7.25 12.61 7.25 12.2C7.25 11.79 7.59 11.45 8 11.45H15C15.41 11.45 15.75 11.79 15.75 12.2C15.75 12.61 15.41 12.95 15 12.95Z"
                    fill={
                      LoanEdited.formStatus === 0 && LoanEdited.status > 100
                        ? "#3333"
                        : "#34c38f"
                    }
                  />
                  <path
                    d="M12.38 16.95H8C7.59 16.95 7.25 16.61 7.25 16.2C7.25 15.79 7.59 15.45 8 15.45H12.38C12.79 15.45 13.13 15.79 13.13 16.2C13.13 16.61 12.79 16.95 12.38 16.95Z"
                    fill={
                      LoanEdited.formStatus === 0 && LoanEdited.status > 100
                        ? "#3333"
                        : "#34c38f"
                    }
                  />
                </svg>
              </div>
            )}
            {valTab === 2 && (
              <Progress
                type="circle"
                percent={(LoanEdited.formStatus / 4) * 100}
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
            )}
            {/* <div className="flex items-center">
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
                </div> */}
          </IconButton>
        </a>
      </Dropdown>

      <ModalDetailsFormLoanRequest
        open={openFormLoanRequest}
        setOpen={setOpenFormLoanRequest}
        flag={flag}
        setFlag={setFlag}
        status={LoanEdited.status}
        loanId={LoanEdited.id}
        getLoanAdminList={getLoanAdminList}
        LoanEdited={LoanEdited}
      />

      <ModalDetailsFormContract
        open={openFormContract}
        setOpen={setOpenFormContract}
        flag={flag}
        setFlag={setFlag}
        status={LoanEdited.status}
        loanId={LoanEdited.id}
        getLoanAdminList={getLoanAdminList}
        LoanEdited={LoanEdited}
      />
      <ModalDetailsFormPaymentOrder
        open={openFormPaymentOrder}
        setOpen={setOpenFormPaymentOrder}
        flag={flag}
        setFlag={setFlag}
        status={LoanEdited.status}
        loanId={LoanEdited.id}
        getLoanAdminList={getLoanAdminList}
        LoanEdited={LoanEdited}
      />
      <ModalDetailsFormInvoice
        open={openFormInvoice}
        setOpen={setOpenFormInvoice}
        flag={flag}
        setFlag={setFlag}
        status={LoanEdited.status}
        loanId={LoanEdited.id}
        getLoanAdminList={getLoanAdminList}
        LoanEdited={LoanEdited}
      />
    </>
  );
}
