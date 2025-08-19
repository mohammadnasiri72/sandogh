import { Navigate, useRoutes } from "react-router-dom";
import MainPageLoanRequestDetails from "../component/LoanRequest/LoanRequestDetails/mainPageLoanRequestDetails";
import MainPageManageCooperativeDetails from "../component/ManageCooperative/ManageCooperativeDetails/MainPageManageCooperativeDetails";
import EditLoanPage from "../component/ManageLoan/EditLoanPage";
import MainPageAdminLoanRequestDetails from "../component/ManageLoanRequest/AdminLoanRequestDetails/MainPageAdminLoanRequestDetails";
import MainPageManageReportSupervisor from "../component/ManageReportSupervisor/MainPageManageReportSupervisor";
import DetailsNewLoanRequest from "../component/NewLoanRequest/detailsNewLoanRequest";
import Login from "../pages/Auth/login";
import ForgotPassword from "../pages/Auth/Register";
import NotFound from "../pages/NotFound";
import DashboardLayout from "../pages/profile/DashboardLayout";
import HomeDashboard from "../pages/profile/homeDashboard";
import HomeDashboardAdmin from "../pages/profile/HomeDashboardAdmin";
import HomeDashboardSupervisor from "../pages/profile/HomeDashboardSupervisor";
import LoanList from "../pages/profile/LoanList";
import LoanRequest from "../pages/profile/LoanRequest";
import ManageBankaccount from "../pages/profile/ManageBankaccount";
import ManageCooperative from "../pages/profile/ManageCooperative";
import ManageLastcapital from "../pages/profile/ManageLastcapital";
import ManageLoan from "../pages/profile/ManageLoan";
import ManageCapital from "../pages/profile/ManageLoanCapital";
import ManageLoanRequest from "../pages/profile/ManageLoanRequest";
import ManageMessage from "../pages/profile/ManageMessage";
import ManageReport from "../pages/profile/ManageReport";
import ManageReportLoan from "../pages/profile/ManageReportLoan";
import ManageReportSpervisor from "../pages/profile/ManageReportSpervisor";
import ManageSpervisor from "../pages/profile/ManageSpervisor";
import Message from "../pages/profile/Message";
import NewLoanRequest from "../pages/profile/NewLoanRequest";
import ProfileDetails from "../pages/profile/ProfileDetails";
import ManageReportBill from "../pages/profile/ManageReportBill";

export default function Router() {
  const user = JSON.parse(localStorage.getItem("user"));
  return useRoutes([
    {
      path: "/",
      element: user ? (
        <Navigate to="/profile" replace />
      ) : (
        <Navigate to="/Auth/login" replace />
      ),
    },

    {
      path: "/Auth",
      children: [
        { path: "login", element: <Login /> },
        { path: "forgotPassword", element: <ForgotPassword /> },
      ],
    },
    {
      path: "/profile",
      // element:  <Navigate to="/profile/dashboard" replace />,
      element: user ? (
        user.roles[0] === "AdminCooperative" ? (
          <Navigate to="/profile/AdminDashboard" replace />
        // ) : user.roles[0] === "Supervisor" ? (
        ) : (user.roles[0] === "SupervisorReport" ||user.roles[0] === "Supervisor")  ? (
          <Navigate to="/profile/SupervisorDashboard" replace />
        ) : (
          <Navigate to="/profile/dashboard" replace />
        )
      ) : (
        <Navigate to="/Auth/login" replace />
      ),
    },
    {
      path: "/profile",
      element: user ? (
        <DashboardLayout />
      ) : (
        <Navigate to="/Auth/login" replace />
      ),
      children: [
        {
          path: "SupervisorDashboard",
          element:
            user?.roles[0] === "SupervisorReport" ? (
              <div className="mt-10">
                <MainPageManageReportSupervisor />
              </div>
            ) :  user?.roles[0] === "Supervisor" ? (
              <HomeDashboardSupervisor />
              
            ): <NotFound />,
        },
        {
          path: "dashboard",
          element:
            user?.roles[0] !== "Cooperative" ? (
              <NotFound />
            ) : (
              <HomeDashboard />
            ),
        },
        {
          path: "AdminDashboard",
          element:
            user?.roles[0] === "AdminCooperative" ? (
              <HomeDashboardAdmin />
            ) : (
              <NotFound />
            ),
        },
        {
          path: "AdminCooperative",
          element:
            user?.roles[0] === "AdminCooperative" ? (
              <ManageCooperative />
            ) : (
              <NotFound />
            ),
        },
        {
          path: "AdminCooperative/:details",
          element:
            user?.roles[0] === "AdminCooperative" ? (
              <MainPageManageCooperativeDetails />
            ) : (
              <NotFound />
            ),
        },
        {
          path: "AdminLoanRequest",
          element:
            user?.roles[0] === "AdminCooperative" ? (
              <ManageLoanRequest />
            ) : (
              <NotFound />
            ),
        },
        {
          path: "AdminCapital",
          element:
            user?.roles[0] === "AdminCooperative" ? (
              <ManageCapital />
            ) : (
              <NotFound />
            ),
        },
        // {
        //   path: "AdminLoanRequest/:details",
        //   element:
        //     user?.roles[0] === "AdminCooperative" ? (
        //       <MainPageAdminLoanRequestDetails />
        //     ) : (
        //       <NotFound />
        //     ),
        // },
        {
          path: "AdminLoanList",
          element:
            user?.roles[0] === "AdminCooperative" ? (
              <ManageLoan />
            ) : (
              <NotFound />
            ),
        },
        {
          path: "AdminLoanList/loanRequest/:details",
          element:
            user?.roles[0] === "AdminCooperative" ? (
              <MainPageAdminLoanRequestDetails />
            ) : (
              <NotFound />
            ),
        },
        {
          path: "AdminLoanList/:details",
          element:
            user?.roles[0] === "AdminCooperative" ? (
              <EditLoanPage />
            ) : (
              <NotFound />
            ),
        },
        {
          path: "AdminSpervisor",
          element:
            user?.roles[0] === "AdminCooperative" ? (
              <ManageSpervisor />
            ) : (
              <NotFound />
            ),
        },
        {
          path: "AdminMessage",
          element:
            user?.roles[0] === "AdminCooperative" ? (
              <ManageMessage />
            ) : (
              <NotFound />
            ),
        },
        {
          path: "AdminReport",
          element:
            user?.roles[0] === "AdminCooperative" ? (
              <ManageReport />
            ) : (
              <NotFound />
            ),
          children: [
            {
              path: "loan",
              element:
                user?.roles[0] === "AdminCooperative" ? (
                  <ManageReportLoan />
                ) : (
                  <NotFound />
                ),
            },
            {
              path: "bill",
              element:
                user?.roles[0] === "AdminCooperative" ? (
                  <ManageReportBill />
                ) : (
                  <NotFound />
                ),
            },
            {
              path: "bankaccount",
              element:
                user?.roles[0] === "AdminCooperative" ? (
                  <ManageBankaccount />
                ) : (
                  <NotFound />
                ),
            },
            {
              path: "lastcapital",
              element:
                user?.roles[0] === "AdminCooperative" ? (
                  <ManageLastcapital />
                ) : (
                  <NotFound />
                ),
            },
            {
              path: "Supervisor",
              element:
                user?.roles[0] === "AdminCooperative" ? (
                  <ManageReportSpervisor />
                ) : (
                  <NotFound />
                ),
            },
          ],
        },

        {
          path: "Details",
          element:
            user?.roles[0] !== "Cooperative" ? (
              <NotFound />
            ) : (
              <ProfileDetails />
            ),
        },
        {
          path: "LoanRequest",
          element:
            user?.roles[0] !== "Cooperative" ? (
              <NotFound />
            ) : (
              <LoanRequest />
            ),
        },
        {
          path: "NewLoanRequest",
          element:
            user?.roles[0] !== "Cooperative" ? (
              <NotFound />
            ) : (
              <NewLoanRequest />
            ),
        },
        {
          path: "NewLoanRequest/:details",
          element:
            user?.roles[0] !== "Cooperative" ? (
              <NotFound />
            ) : (
              <DetailsNewLoanRequest />
            ),
        },
        {
          path: "LoanList/:details",
          element:
            user?.roles[0] !== "Cooperative" ? (
              <NotFound />
            ) : (
              <MainPageLoanRequestDetails />
            ),
        },
        {
          path: "LoanList",
          element:
            user?.roles[0] !== "Cooperative" ? <NotFound /> : <LoanList />,
        },
        {
          path: "Message",
          element:
            user?.roles[0] !== "Cooperative" ? <NotFound /> : <Message />,
        },
      ],
    },
    { path: "404", element: <NotFound /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
