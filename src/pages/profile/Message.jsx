import MainPageMessage from "../../component/Message/MainPageMessage";
import Page from "../../component/page";

export default function Message() {
  return (
    <>
      <Page title="پیامها">
        <div className="mt-10">
        <MainPageMessage />
        </div>
      </Page>
    </>
  );
}
