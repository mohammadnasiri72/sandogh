import MainPageManageCapital from "../../component/ManageCapital/MainPageManageCapital";
import Page from "../../component/page";

export default function ManageCapital() {
  return (
    <>
      <Page title="مدیریت سرمایه">
        <div className="mt-5">
          <MainPageManageCapital />
        </div>
      </Page>
    </>
  );
}
