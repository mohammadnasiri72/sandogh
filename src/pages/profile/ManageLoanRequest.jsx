import MainPageManageLoanRequest from "../../component/ManageLoanRequest/MainPageManageLoanRequest";
import Page from "../../component/page";

export default function ManageLoanRequest() {
  return (
    <>
      <Page title="مدیریت درخواست ها">
        <div className="mt-5">
          <MainPageManageLoanRequest />
        </div>
      </Page>
    </>
  );
}
