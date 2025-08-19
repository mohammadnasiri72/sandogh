import { Outlet } from "react-router-dom";
import MainPageDashboardLayout from "../../component/Dashboard/MainPageDashboardLayout";
import Page from "../../component/page";
import NavDashboard from "../../component/NavDashboard/NavDashboard";
import { useSelector } from "react-redux";

export default function DashboardLayout() {
  const isColaps = useSelector((store) => store.colaps.isColaps);
  const themeDirection = useSelector((store) => store.setting.themeDirection);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeLayout = useSelector((store) => store.setting.themeLayout);
  return (
    <>
      <div className={themeMode === "dark" ? "" : "#f8f8fb"}>
        <div
          className={
            themeLayout === "vertical"
              ? themeDirection === "rtl" && isColaps
                ? "lg:pr-16 duration-300 "
                : themeDirection === "rtl" && !isColaps
                ? "lg:pr-64 duration-300"
                : themeDirection === "ltr" && isColaps
                ? "lg:pl-16 duration-300"
                : "lg:pl-64 duration-300"
              : "duration-300 lg:pt-14 lg:pr-3"
          }
        >
          <div className="h-14"></div>
          <Page title="داشبورد">
            <MainPageDashboardLayout />
            <NavDashboard />
            <Outlet />
          </Page>
        </div>
      </div>
    </>
  );
}
