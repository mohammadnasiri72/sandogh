import MainPageLogin from "../../component/Auth/MainPageLogin";
import Page from "../../component/page";

export default function Login() {
  return (
    <>
      <div className="bg-blue-500 min-h-screen">
        <Page title="ورود">
          <MainPageLogin />
        </Page>
      </div>
    </>
  );
}
