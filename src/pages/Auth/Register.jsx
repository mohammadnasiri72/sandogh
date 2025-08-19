import MainPageForgotPassword from "../../component/Auth/MainPageForgotPassword";
import Page from "../../component/page";

export default function ForgotPassword() {
  return (
    <>
    <div className="bg-blue-500 min-h-screen">

      <Page title="فراموشی رمز">
        <MainPageForgotPassword />
      </Page>
    </div>
    </>
  );
}
