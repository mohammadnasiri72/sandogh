import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import {
    Alert,
    Box,
    Button,
    Card,
    Chip,
    Divider,
    Tab,
    Tabs,
    Tooltip,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BiSolidCalendarCheck, BiSolidCalendarEdit } from "react-icons/bi";
import { MdDone, MdOutlineAttachFile, MdOutlineCancel } from "react-icons/md";
import { useSelector } from "react-redux";
import { mainDomain } from "../../utils/mainDomain";
import ModalDetailsCheq from "../ManageLoanRequest/AdminLoanRequestDetails/ModalDetailsCheq";
import ModalDetailsLetter from "../ManageLoanRequest/AdminLoanRequestDetails/ModalDetailsLetter";
import SpeedDialFile from "../ManageLoanRequest/SpeedDialFile";

DetailsPaid.propTypes = {
  loanId: PropTypes.number,
};
function DetailsPaid({ loanId }) {
  const [value, setValue] = useState(0);
  const [loanRequestData, setLoanRequestData] = useState({});
  const [flag, setFlag] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const themeColor = useSelector((store) => store.setting.themeColor);

  useEffect(() => {
    if (loanId !== 0) {
      setLoanRequestData({});
      axios
        .get(mainDomain + `/api/LoanRequest/${loanId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setLoanRequestData(res.data);
        })
        .catch(() => {});
    }
  }, [flag, loanId]);

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {loanRequestData.loanRequestDto && (
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              width: "100%",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
            >
              {loanRequestData.loanRequestItems.map((loanReq, index) => (
              <Tab
                key={index}
                onClick={() => {
                  if (value === 0) {
                    //   getLoanRequestAdminList();
                  }
                }}
                label={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color:
                        loanRequestData.cooperativeLoanDocs
                          .filter((e) => e.itemId === loanReq.id)
                          .filter((e) => e.status === 3).length > 0
                          ? "rgb(239 68 68)"
                          : loanRequestData.cooperativeLoanDocs
                              .filter((e) => e.itemId === loanReq.id)
                              .filter((e) => e.status === 4).length > 0
                          ? "rgb(16 185 129)"
                          : "",
                    }}
                  >
                    {loanRequestData.cooperativeLoanDocs
                      .filter((e) => e.itemId === loanReq.id)
                      .filter((e) => e.status !== 1)
                      .every((item) => item.status === 4) &&
                      loanRequestData.cooperativeLoanDocs
                        .filter((e) => e.itemId === loanReq.id)
                        .filter((e) => e.status !== 1).length > 0 && (
                        <MdDone className="text-xl text-emerald-500" />
                      )}
                    {loanRequestData.cooperativeLoanDocs
                      .filter((e) => e.itemId === loanReq.id)
                      .filter((e) => e.status !== 1)
                      .every((item) => item.status === 3) &&
                      loanRequestData.cooperativeLoanDocs
                        .filter((e) => e.itemId === loanReq.id)
                        .filter((e) => e.status !== 1).length > 0 && (
                        <MdOutlineCancel className="text-xl text-red-500" />
                      )}
                    {loanReq.title}
                  </Box>
                }
                {...a11yProps(0)}
              />
            ))}
            </Tabs>
          </Box>

          {loanRequestData.loanRequestItems.map((item, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            <div className="py-2 text-xl font-semibold">
              <span>{item.title}</span>
            </div>
            <div className="w-full mx-auto mb-3">
              <Alert severity="info">
                <div
                  className="text-[#777] text-justify px-2"
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
                {item.fileAttach && (
                  <a
                    className="text-xs flex items-center text-teal-500 duration-300 hover:text-teal-600 mt-1"
                    download
                    href={item.fileAttach}
                  >
                    <MdOutlineAttachFile />
                    <span>دانلود فایل راهنما</span>
                  </a>
                )}
              </Alert>
            </div>
            {loanRequestData.loanRequestDto.status === 2 && (
              <div className="flex items-center justify-center">
                {loanRequestData.loanRequestItems[value].title.slice(0, 2) !==
                  "چک" &&
                  loanRequestData.loanRequestItems[value].title.slice(0, 12) !==
                    "نامه درخواست" &&
                  loanRequestData.cooperativeLoanDocs.filter(
                    (e) => e.itemId === item.id
                  ).length > 0 && (
                    <div className="flex items-center">
                      <Tooltip title="فقط یک فایل میتوانید ارسال کنید!!!">
                        <span>
                          <Button
                            disabled
                            sx={{
                              fontSize: "12px",
                              width: "100%",
                              transition: "0.6s",
                              color: "#fff",
                              backgroundColor: "#556ee6",
                              "&:hover": {
                                backgroundColor: "#485ec4",
                              },
                              boxShadow: "none",
                            }}
                          >
                            <div className="flex items-center">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  opacity="0.4"
                                  d="M21.99 10.84C21.97 10.36 21.89 9.88999 21.74 9.43999C21.05 7.27999 19.03 5.71999 16.65 5.71999H13.86C13.28 5.71999 13.24 5.65998 12.93 5.24998L11.53 3.38998C10.88 2.51998 10.37 1.98999 8.73999 1.98999H6.40997C3.96997 1.98999 1.98999 3.96999 1.98999 6.40999V9.42998V16.64C1.98999 19.59 4.39003 21.99 7.34003 21.99H16.64C19.59 21.99 21.99 19.59 21.99 16.64V11.06C22 11 22 10.91 21.99 10.84Z"
                                  fill={themeColor.color}
                                />
                                <path
                                  d="M15.5801 19.7C13.4701 19.85 13.4701 22.91 15.5801 23.06H20.5901C21.2001 23.06 21.78 22.84 22.23 22.43C23.71 21.14 22.92 18.54 20.97 18.3C20.27 14.08 14.16 15.68 15.61 19.7"
                                  fill={themeColor.color}
                                />
                              </svg>
                              <span className="px-1 whitespace-nowrap">
                                افزودن فایل
                              </span>
                            </div>
                          </Button>
                        </span>
                      </Tooltip>
                    </div>
                  )}
                {loanRequestData.loanRequestItems[value].title.slice(0, 2) !==
                  "چک" &&
                  loanRequestData.loanRequestItems[value].title.slice(0, 12) !==
                    "نامه درخواست" &&
                  loanRequestData.cooperativeLoanDocs.filter(
                    (e) => e.itemId === item.id
                  ).length === 0 && (
                    <div className="flex gap-1">
                      {/* <ModalAddDetailsFile
                        setFlag={setFlag}
                        activeStep={value}
                        loanDocs={loanDocs}
                      /> */}
                      {loanRequestData.cooperativeFileList &&
                        loanRequestData.cooperativeFileList.find(
                          (e) =>
                            e.itemId ===
                            loanRequestData.loanRequestItems[value].id
                        ) && (
                          <div className="px-1">
                            {/* <ModalCurentFile
                              item={item}
                              files={loanRequestData.cooperativeFileList.filter(
                                (e) =>
                                  e.itemId ===
                                  loanRequestData.loanRequestItems[value].id
                              )}
                              valItem={loanRequestData.loanRequestItems[value]}
                              setFlag={setFlag}
                            /> */}
                          </div>
                        )}
                    </div>
                  )}
                {loanRequestData.loanRequestItems[value].title.slice(0, 2) ===
                  "چک" && (
                  <div className="mt-3">
                    {/* <ModalAddDetailsCheq
                      setFlag={setFlag}
                      activeStep={value}
                      item={item}
                    /> */}
                  </div>
                )}
                {loanRequestData.loanRequestItems[value].title.slice(0, 12) ===
                  "نامه درخواست" && (
                  <div className="mt-3">
                    {/* <ModalAddDetailsLetter
                      setFlag={setFlag}
                      activeStep={value}
                      loanDocs={loanDocs}
                      item={item}
                    /> */}
                  </div>
                )}
              </div>
            )}
            <div className="w-full mx-auto">
              <Card sx={{ width: "100%" }}>
                <div>
                  {loanRequestData.cooperativeLoanDocs.filter(
                    (e) => e.itemId === item.id
                  ).length > 0 &&
                    loanRequestData.cooperativeLoanDocs
                      .filter((e) => e.itemId === item.id)
                      .filter((e) => e.status !== 1)
                      .map((e) => (
                        <div key={e.id}>
                          <div className="flex mt-3 px-3">
                            <span className="">{e.fileDesc}</span>
                          </div>
                          <div className="sm:hidden block">
                            {e.status === 1 && (
                              <div>
                                <span className="text-teal-500 bg-teal-50 rounded-full px-2 select-none">
                                  جدید
                                </span>
                              </div>
                            )}
                            {e.status === 2 && (
                              <div>
                                <span className="text-yellow-600 bg-yellow-50 rounded-full px-2 select-none">
                                  <TimerOutlinedIcon
                                    sx={{ pr: 1, fontSize: "25px" }}
                                  />
                                  در حال بررسی
                                </span>
                              </div>
                            )}
                            {e.status === 3 && (
                              <div>
                                <span className="text-red-600 bg-red-50 rounded-full px-2 select-none">
                                  <CancelOutlinedIcon
                                    sx={{ pr: 1, fontSize: "25px" }}
                                  />
                                  رد شده
                                </span>
                              </div>
                            )}
                            {e.status === 4 && (
                              <div>
                                <span className="text-emerald-600 bg-emerald-50 rounded-full px-2 select-none">
                                  <TaskAltOutlinedIcon
                                    sx={{ pr: 1, fontSize: "25px" }}
                                  />
                                  تایید شده
                                </span>
                              </div>
                            )}
                            {e.status === 5 && (
                              <div className="">
                                <span className="text-orange-600 bg-orange-50 rounded-full px-2 select-none">
                                  آرشیو شده
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex justify-between px-1 relative pb-3 items-center">
                            <div className="mt-12">
                              <SpeedDialFile e={e} />
                            </div>
                            {loanRequestData.loanRequestItems[
                              value
                            ].title.slice(0, 2) === "چک" && (
                              <div
                                style={{
                                  background: themeColor.bgColor,
                                  bottom: "0.8rem",
                                }}
                                className="absolute right-16 rounded-full w-10 h-10 flex items-center justify-center shadow-xl"
                              >
                                <ModalDetailsCheq
                                  loanDocs={e}
                                  setFlag={setFlag}
                                />
                              </div>
                            )}
                            {loanRequestData.loanRequestItems[
                              value
                            ].title.slice(0, 12) === "نامه درخواست" && (
                              <div
                                style={{
                                  background: themeColor.bgColor,
                                  bottom: "0.8rem",
                                }}
                                className="absolute right-16 rounded-full w-10 h-10 flex items-center justify-center shadow-xl"
                              >
                                <ModalDetailsLetter
                                  loanDocs={e}
                                  activeStep={value}
                                  setFlag={setFlag}
                                  id={e.id}
                                />
                              </div>
                            )}
                            <div className="sm:block hidden">
                              {e.status === 1 && (
                                <div className="absolute top-0 mt-6 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                  <span className="text-teal-500 bg-teal-50 rounded-full px-2 select-none">
                                    جدید
                                  </span>
                                </div>
                              )}
                              {e.status === 2 && (
                                <div className="absolute top-0 mt-6 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                  <span className="text-yellow-600 bg-yellow-50 rounded-full px-2 select-none">
                                    <TimerOutlinedIcon
                                      sx={{ pr: 1, fontSize: "25px" }}
                                    />
                                    در حال بررسی
                                  </span>
                                </div>
                              )}
                              {e.status === 3 && (
                                <div className="absolute top-0 mt-6 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                  <span className="text-red-600 bg-red-50 rounded-full px-2 select-none">
                                    <CancelOutlinedIcon
                                      sx={{ pr: 1, fontSize: "25px" }}
                                    />
                                    رد شده
                                  </span>
                                </div>
                              )}
                              {e.status === 4 && (
                                <div className="absolute top-0 mt-6 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                  <span className="text-emerald-600 bg-emerald-50 rounded-full px-2 select-none">
                                    <TaskAltOutlinedIcon
                                      sx={{ pr: 1, fontSize: "25px" }}
                                    />
                                    تایید شده
                                  </span>
                                </div>
                              )}
                              {e.status === 5 && (
                                <div className="absolute top-0 mt-6 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                  <span className="text-orange-600 bg-orange-50 rounded-full px-2 select-none">
                                    آرشیو شده
                                  </span>
                                </div>
                              )}
                            </div>
                            {loanRequestData.loanRequestDto.status === 2 && (
                              <div className="px-1 flex items-center justify-center -mt-3">
                                {/* {e.status !== 4 && (
                                  <ModalConfirmLoanReq
                                    id={e.id}
                                    setFlag={setFlag}
                                  />
                                )}
                                {e.status !== 3 && (
                                  <ModalRejectLoanReq
                                    id={e.id}
                                    setFlag={setFlag}
                                  />
                                )}
                                {e.status !== 2 && (
                                  <ModalPendingLoanReq
                                    id={e.id}
                                    setFlag={setFlag}
                                  />
                                )} */}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between px-3">
                            <div className="flex flex-col items-start justify-center">
                              <div className="flex flex-wrap gap-2 items-center py-2">
                                {item.createdFa && (
                                  <Chip
                                    sx={{ mt: 1 }}
                                    icon={
                                      <BiSolidCalendarCheck className="text-2xl" />
                                    }
                                    label={e.createdFa}
                                  />
                                )}
                                {item.modifiedFa && (
                                  <Chip
                                    sx={{ mt: 1 }}
                                    icon={
                                      <BiSolidCalendarEdit className="text-2xl" />
                                    }
                                    label={e.modifiedFa}
                                  />
                                )}
                              </div>
                            </div>
                            <div className="flex items-center justify-center">
                              {/* {loanRequestData.loanRequestDto.status === 2 && (
                                <div className="flex justify-center items-center">
                                  <ConfirmDeleteDoc
                                    setFlag={setFlag}
                                    id={e.id}
                                  />
                                </div>
                              )} */}
                            </div>
                          </div>
                          {e.statusDesc && (
                            <div>
                              {e.status === 4 && (
                                <Alert
                                  icon={<InfoOutlinedIcon fontSize="inherit" />}
                                  severity="success"
                                >
                                  {e.statusDesc}
                                </Alert>
                              )}
                              {e.status === 3 && (
                                <Alert severity="error">{e.statusDesc}</Alert>
                              )}
                              {e.status !== 3 && e.status !== 4 && (
                                <Alert severity="info">{e.statusDesc}</Alert>
                              )}
                            </div>
                          )}
                          <Divider />
                        </div>
                      ))}
                </div>
              </Card>
            </div>
          </CustomTabPanel>
        ))}
        </Box>
      )}
    </>
  );
}

export default DetailsPaid;
