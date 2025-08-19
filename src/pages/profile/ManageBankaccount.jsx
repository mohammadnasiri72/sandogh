import MainPageManageBankaccount from "../../component/ManageReportBankaccount/MainPageManageBankaccount";
import Page from "../../component/page";

export default function ManageBankaccount() {
  return (
    <>
      <Page title="گزارش حساب بانکی">
        <div className="mt-10">
            <MainPageManageBankaccount />
        </div>
      </Page>
    </>
  );
}
