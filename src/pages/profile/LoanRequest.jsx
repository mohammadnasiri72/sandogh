import MainPageLoanRequest from "../../component/LoanRequest/MainPageLoanRequest";
import Page from "../../component/page";

export default function LoanRequest() {
  return (
    <>
      <Page title="درخواست تسهیلات">
        <div className="mt-10">
          <MainPageLoanRequest />
        </div>
      </Page>
    </>
  );
}
