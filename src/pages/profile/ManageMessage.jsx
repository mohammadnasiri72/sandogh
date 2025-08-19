import MainPageManageMessage from "../../component/ManageMessage/MainPageManageMessage";
import Page from "../../component/page";

export default function ManageMessage() {
  return (
    <>
      <Page title="مدیریت پیامها">
        <div className="mt-10">
            <MainPageManageMessage />
        </div>
      </Page>
    </>
  );
}
