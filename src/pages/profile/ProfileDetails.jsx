import Page from "../../component/page";
import MainPageProfileDetails from "../../component/ProfileDetails/MainPageProfileDetails";

export default function ProfileDetails() {
  return (
    <>
      <Page title="جزئیات پروفایل">
        <div className="mt-10">
        <MainPageProfileDetails />
        </div>
      </Page>
    </>
  );
}
