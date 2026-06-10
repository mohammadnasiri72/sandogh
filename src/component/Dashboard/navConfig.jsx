import { Description } from "@mui/icons-material";
import { AiFillPhone } from "react-icons/ai";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { CgList } from "react-icons/cg";
import {
  FaClipboardList,
  FaMoneyBillWave,
  FaUser,
  FaUsers,
} from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { GrMoney } from "react-icons/gr";
import { MdContactPhone, MdEmail, MdSupervisorAccount } from "react-icons/md";
import { RiBarChartGroupedLine, RiFileList3Fill } from "react-icons/ri";
import { TbCreditCardFilled } from "react-icons/tb";

const sidebarConfig = [
  {
    subheader: "منو",
    items: [
      {
        title: "پیشخوان",
        path: "/profile/SupervisorDashboard",
        icon: <GoHomeFill />,
        role: "Supervisor",
        id: 0,
      },
      {
        title: "پیشخوان",
        path: "/profile/SupervisorDashboard",
        icon: <GoHomeFill />,
        role: "SupervisorReport",
        id: 0.5,
      },
      {
        title: "پیشخوان",
        path: "/profile/dashboard",
        icon: <GoHomeFill />,
        role: "Cooperative",
        id: 1,
      },
      {
        title: "پیشخوان",
        path: "/profile/AdminDashboard",
        icon: <GoHomeFill />,
        role: "AdminCooperative",
        id: 2,
      },
      {
        title: "کارتابل",
        path: "/profile/AdminSign",
        icon: <Description />,
        role: "CeoCooperative",
        id: 2,
      },
      {
        title: "مدیریت تعاونی ها",
        path: "/profile/AdminCooperative",
        icon: <FaUsers />,
        role: "AdminCooperative",
        id: 3,
      },
      {
        title: "مدیریت سرمایه",
        path: "/profile/AdminCapital",
        icon: <GrMoney />,
        role: "AdminCooperative",
        id: 3.5,
      },
      // {
      //   title: "مدیریت درخواست ها",
      //   path: "/profile/AdminLoanRequest",
      //   icon: <FaClipboardList />,
      //   role: "AdminCooperative",
      //   id: 4,
      // },
      {
        title: "مدیریت درخواست ها",
        path: "/profile/AdminLoanList",
        icon: <TbCreditCardFilled />,
        role: "AdminCooperative",
        id: 5,
      },
      {
        title: "مدیریت ناظران",
        path: "/profile/AdminSpervisor",
        icon: <MdSupervisorAccount />,
        role: "AdminCooperative",
        id: 6,
      },
      {
        title: "پیامها",
        path: "/profile/AdminMessage",
        icon: <BiSolidMessageSquareDetail />,
        role: "AdminCooperative",
        id: 7,
      },
      {
        title: "گزارش ها",
        path: "/profile/AdminReport",
        icon: <RiBarChartGroupedLine />,
        role: "AdminCooperative",
        id: 8,
        children: [
          {
            title: "تسهیلات",
            path: "/profile/AdminReport/loan",
            icon: <BsCreditCard2FrontFill />,
            role: "AdminCooperative",
            id: 9,
          },
          {
            title: "صورت حساب",
            path: "/profile/AdminReport/bill",
            icon: <CgList />,
            role: "AdminCooperative",
            id: 9.5,
          },
          {
            title: "حساب های بانکی",
            path: "/profile/AdminReport/bankaccount",
            icon: <RiFileList3Fill />,
            role: "AdminCooperative",
            id: 10,
          },
          {
            title: "سرمایه",
            path: "/profile/AdminReport/lastcapital",
            icon: <FaMoneyBillWave />,
            role: "AdminCooperative",
            id: 11,
          },
          {
            title: "گزارشات ناظر",
            path: "/profile/AdminReport/Supervisor",
            icon: <MdSupervisorAccount />,
            role: "AdminCooperative",
            id: 12,
          },
        ],
      },
      {
        title: "پروفایل",
        path: "/profile/Details",
        icon: <FaUser />,
        role: "Cooperative",
        id: 13,
      },
      {
        title: "ثبت درخواست تسهیلات",
        path: "/profile/NewLoanRequest",
        icon: <FaClipboardList />,
        role: "Cooperative",
        id: 15,
      },
      // {
      //   title: "کارتابل درخواست ها",
      //   path: "/profile/LoanRequest",
      //   icon: <FaClipboardList />,
      //   role: "Cooperative",
      //   id: 14,
      // },

      {
        title: "کارتابل درخواست ها",
        path: "/profile/LoanList",
        icon: <TbCreditCardFilled />,
        role: "Cooperative",
        id: 16,
      },
      {
        title: "رونوشت‌ها",
        path: "/profile/referdoc",
        icon: <Description />,
        role: "Cooperative",
        id: 16.5,
      },
      // {
      //   title: "کارتابل تسهیلات",
      //   path: "/profile/LoanList",
      //   icon: <TbCreditCardFilled />,
      //   role: "Cooperative",
      //   id: 16,
      // },
      {
        title: "پیامها",
        path: "/profile/Message",
        icon: <BiSolidMessageSquareDetail />,
        role: "Cooperative",
        id: 17,
      },
      {
        title: "تماس با ما",
        icon: <MdContactPhone />,
        role: "Cooperative",
        id: 18,
        children: [
          {
            title: "02166576971-2",
            icon: <AiFillPhone />,
            role: "Cooperative",
            phone: "02166576971",
            id: 19,
          },
          {
            title: "sandogh.ashayeri@gmail.com",
            icon: <MdEmail />,
            role: "Cooperative",
            email: "sandogh.ashayeri@gmail.com",
            id: 20,
          },
        ],
      },
    ],
  },
];

export default sidebarConfig;
