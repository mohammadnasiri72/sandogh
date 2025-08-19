import { Outlet } from "react-router-dom";
import Page from "../../component/page";

export default function ManageReport() {
  return (
    <>
      <Page title="گزارش ها">
        
        <Outlet />
      </Page>
    </>
  );
}
