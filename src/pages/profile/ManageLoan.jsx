import MainPageManageLoan from "../../component/ManageLoan/MainPageManageLoan";
import Page from "../../component/page";

export default function ManageLoan() {
  return (
    <>
      <Page title="مدیریت تسهیلات">
        <div className="mt-5">
          <MainPageManageLoan />
        </div>
      </Page>
    </>
  );
}
