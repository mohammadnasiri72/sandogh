import MainPageLoanList from "../../component/LoanList/MainPageLoanList";
import Page from "../../component/page";

export default function LoanList() {
  return (
    <>
      <Page title=" تسهیلات">
        <div className="mt-10">
        <MainPageLoanList />
        </div>
      </Page>
    </>
  );
}
