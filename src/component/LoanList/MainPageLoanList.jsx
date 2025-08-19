import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { mainDomain } from "../../utils/mainDomain";
import TabLoan from "./TabLoan";
import TableLoan from "./TableLoan";
import TableLoanRequest from "../LoanRequest/TableLoanRequest";

export default function MainPageLoanList() {
  const user = JSON.parse(localStorage.getItem("user"));
  const mainPageState = useSelector((store) => store.resetState.mainPageState);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [valSort, setValSort] = useState(5);
  const [valSort2, setValSort2] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [valDir, setValDir] = useState(0);
  const [valTab, setValTab] = useState(
    location.state ? location.state.myData : 0
  );
  const [listLoan, setListLoan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [numrecord, setNumrecord] = useState(0);
  const [numPayed, setNumPayed] = useState(0);
  const [numOverdue, setNumOverdue] = useState(0);
  const [numRePayed, setNumRePayed] = useState(0);
  const [numDueDate, setNumDueDate] = useState(0);
  const [statistics, setStatistics] = useState([]);
  const [flagDel, setFlagDel] = useState(false);
  
  const [listLoanRequest, setListLoanRequest] = useState([]);
  const [listLoanRequestCancel, setListLoanRequestCancel] = useState([]);
  const optionSort = [
    { id: 5, title: "تاریخ پرداخت" },
    { id: 7, title: "تاریخ سررسید" },
    { id: 8, title: "تاریخ وصول" },
    { id: 4, title: "تاریخ قرارداد" },
    { id: 3, title: "تاریخ جلسه" },
    { id: 6, title: "مبلغ تسهیلات" },
    { id: 1, title: "ترتیب درج" },
    { id: 2, title: "ویرایش" },
  ];
  const optionSort2 = [
    { id: 1, title: "آخرین درج" },
    { id: 2, title: "آخرین ویرایش" },
    { id: 3, title: "عنوان صعودی" },
    { id: 4, title: "عنوان نزولی" },
  ];
  const optionDir = [
    { id: 0, title: "نزولی" },
    { id: 1, title: "صعودی" },
  ];

  // get Statistics
  useEffect(() => {
    axios
      .get(mainDomain + "/api/Loan/Statistics", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setNumrecord(res.data.find((e) => e.status === 100).number);
        setNumPayed(res.data.find((e) => e.status === 101).number);
        setNumOverdue(res.data.find((e) => e.status === 102).number);
        setNumRePayed(res.data.find((e) => e.status === 103).number);
        setNumDueDate(res.data.find((e) => e.status === 104).number);
      })
      .catch(() => {});
  }, []);

  //   get Loan list
  const config = {
    method: "get",
    url: `${mainDomain}/api/Loan/Current`,
    params: {
      find: query,
      status: !location.state?.myData
        ? valTab + 98
        : location.state?.myData === 2
        ? 100
        : location.state?.myData === 3
        ? 101
        : location.state?.myData === 4
        ? 104
        : location.state?.myData === 5
        ? 103
        : location.state?.myData === 6
        ? 102
        : 0,
      sortFilter: valSort,
      sortDir: valDir,
      pageSize: pageSize,
      page: pageIndex,
    },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const getLoanList = async (newParams) => {
    config.params = { ...config.params, ...newParams };
    setListLoan([]);
    setIsLoading(true);
    await axios(config)
      .then((res) => {
        setIsLoading(false);
        setListLoan(res.data.cooperativeLoanList);
        if (res.data.cooperativeLoanList.length > 0) {
          if (res.data.cooperativeLoanList[0].status === 100) {
            setNumrecord(res.data.cooperativeLoanList[0].total);
          }
          if (res.data.cooperativeLoanList[0].status === 101) {
            setNumPayed(res.data.cooperativeLoanList[0].total);
          }
          if (res.data.cooperativeLoanList[0].status === 102) {
            setNumOverdue(res.data.cooperativeLoanList[0].total);
          }
          if (res.data.cooperativeLoanList[0].status === 103) {
            setNumRePayed(res.data.cooperativeLoanList[0].total);
          }
          if (res.data.cooperativeLoanList[0].status === 104) {
            setNumDueDate(res.data.cooperativeLoanList[0].total);
          }
        } else {
          if (config.params.status === 100) {
            setNumrecord(0);
          }
          if (config.params.status === 101) {
            setNumPayed(0);
          }
          if (config.params.status === 102) {
            setNumOverdue(0);
          }
          if (config.params.status === 103) {
            setNumRePayed(0);
          }
          if (config.params.status === 104) {
            setNumDueDate(0);
          }
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (location.state?.myData) {
      getLoanList();
    } else {
      getLoanRequestList();
    }
  }, [location, mainPageState]);

  //   get LoanRequest list
  const config2 = {
    method: "get",
    url: `${mainDomain}/api/LoanRequest`,
    params: {
      userName: "",
      find: query,
      statusId: !location.state?.myData
        ? valTab === 0
          ? 2
          : valTab === 1
          ? 4
          : ""
        : 2,
      sortId: valSort2,
      pageSize,
      page: pageIndex,
    },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const getLoanRequestList = async (newParams) => {
    setFlagDel((e)=>!e)
    
    config2.params = { ...config2.params, ...newParams };
    setListLoanRequest([]);
    setIsLoading(true);
    await axios(config2)
      .then((res) => {
        setIsLoading(false);
        setListLoanRequest(res.data);
        if (res.data.length > 0) {
          setStatistics((prev) =>
            prev.map((item) =>
              item.status === res.data[0].status
                ? { ...item, number: res.data[0].totalRows }
                : item
            )
          );
        } else {
          setStatistics((prev) =>
            prev.map((item) =>
              item.status === config2.params.statusId
                ? { ...item, number: 0 }
                : item
            )
          );
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  // useEffect(() => {
  //   getLoanRequestList();
  // }, [mainPageState]);

  // get Statistics
  useEffect(() => {
    axios
      .get(mainDomain + "/api/LoanRequest/Statistics", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setStatistics(res.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (valTab === 1) {
      axios
        .get(`${mainDomain}/api/LoanRequest`, {
          params: {
            userName: "",
            find: query,
            statusId: 3,
            sortId: valSort2,
            pageSize,
            page: pageIndex,
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setListLoanRequestCancel(res.data);
        })
        .catch(() => {});
    }
  }, [valTab , flagDel]);

  return (
    <>
      {valTab > 1 && (
        <div className="flex flex-wrap px-3">
          <div className="sm:w-1/3 w-full px-2">
            <div className="w-full flex justify-center items-center relative">
              <TextField
                sx={{
                  "& .MuiInputBase-input::placeholder": { fontSize: "12px" },
                }}
                size="small"
                type="text"
                className="w-full"
                id="outlined-multiline-flexible"
                label="جستجو"
                placeholder="عنوان"
                name="name"
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (!e.target.value) {
                    getLoanList({ find: "", page: 1 });
                    setPageIndex(1);
                  }
                }}
                value={query}
              />
              <div className="absolute left-0 top-0">
                <IconButton
                  onClick={() => {
                    getLoanList({
                      page: 1,
                      find: query,
                    });
                    setPageIndex(1);
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.4"
                      d="M11.01 20.02C15.9861 20.02 20.02 15.9861 20.02 11.01C20.02 6.03391 15.9861 2 11.01 2C6.03391 2 2 6.03391 2 11.01C2 15.9861 6.03391 20.02 11.01 20.02Z"
                      fill={themeMode === "dark" ? "#fff" : "#1787B0"}
                    />
                    <path
                      d="M21.9901 18.95C21.6601 18.34 20.9601 18 20.0201 18C19.3101 18 18.7001 18.29 18.3401 18.79C17.9801 19.29 17.9001 19.96 18.1201 20.63C18.5501 21.93 19.3001 22.22 19.7101 22.27C19.7701 22.28 19.8301 22.28 19.9001 22.28C20.3401 22.28 21.0201 22.09 21.6801 21.1C22.2101 20.33 22.3101 19.56 21.9901 18.95Z"
                      fill={themeMode === "dark" ? "#fff" : "#1787B0"}
                    />
                  </svg>
                </IconButton>
              </div>
            </div>
          </div>
          <div className="sm:w-1/3 w-full px-2 sm:mt-0 mt-3">
            <FormControl size="small" color="primary" className="w-full">
              <InputLabel
                color="primary"
                className="px-2"
                id="demo-simple-select-label"
              >
                مرتب سازی
              </InputLabel>
              <Select
                sx={{
                  "& .MuiSelect-select": {
                    fontSize: "14px",
                    textAlign: "left",
                  },
                }}
                size="small"
                className="w-full"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valSort}
                label="مرتب سازی"
                color="primary"
                onChange={(e) => {
                  setValSort(e.target.value);
                  getLoanList({ sortId: e.target.value, page: 1 });
                  setPageIndex(1);
                }}
              >
                {optionSort.map((e) => (
                  <MenuItem sx={{ fontSize: "12px" }} key={e.id} value={e.id}>
                    {e.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="sm:w-1/6 w-full px-2 sm:mt-0 mt-3">
            <FormControl size="small" color="primary" className="w-full">
              <InputLabel
                color="primary"
                className="px-2"
                id="demo-simple-select-label"
              >
                ترتیب
              </InputLabel>
              <Select
                sx={{
                  "& .MuiSelect-select": {
                    fontSize: "14px",
                    textAlign: "left",
                  },
                }}
                size="small"
                className="w-full"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valDir}
                label="ترتیب"
                color="primary"
                onChange={(e) => {
                  setValDir(e.target.value);
                  getLoanList({
                    page: 1,
                    sortDir: e.target.value,
                  });
                  setPageIndex(1);
                }}
              >
                {optionDir.map((e) => (
                  <MenuItem sx={{ fontSize: "12px" }} key={e.id} value={e.id}>
                    {e.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="sm:w-1/6 w-full px-2 sm:mt-0 mt-3">
            <FormControl size="small" color="primary" className="w-full">
              <InputLabel
                color="primary"
                className="px-2"
                id="demo-simple-select-label"
              >
                تعداد رکورد
              </InputLabel>
              <Select
                size="small"
                className="w-full"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pageSize}
                label="تعداد رکورد"
                color="primary"
                onChange={(e) => {
                  setPageSize(e.target.value);
                  getLoanList({
                    page: 1,
                    pageSize: e.target.value,
                  });
                  setPageIndex(1);
                }}
              >
                {[25, 50, 75, 100].map((e) => (
                  <MenuItem sx={{ fontSize: "12px" }} key={e} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      )}
      {valTab <= 1 && (
        <div className="flex flex-wrap px-3">
          <div className="sm:w-1/4 w-full px-2">
            <div className="w-full flex justify-center items-center relative">
              <TextField
                sx={{
                  "& .MuiInputBase-input::placeholder": { fontSize: "12px" },
                }}
                size="small"
                type="text"
                className="w-full"
                id="outlined-multiline-flexible"
                label="جستجو"
                placeholder="عنوان"
                name="name"
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (!e.target.value) {
                    getLoanRequestList({ find: "", page: 1 });
                    setPageIndex(1);
                  }
                }}
                value={query}
              />
              <div className="absolute left-0 top-0">
                <IconButton
                  onClick={() => {
                    getLoanRequestList({ find: query, page: 1 });
                    setPageIndex(1);
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.4"
                      d="M11.01 20.02C15.9861 20.02 20.02 15.9861 20.02 11.01C20.02 6.03391 15.9861 2 11.01 2C6.03391 2 2 6.03391 2 11.01C2 15.9861 6.03391 20.02 11.01 20.02Z"
                      fill={themeMode === "dark" ? "#fff" : "#1787B0"}
                    />
                    <path
                      d="M21.9901 18.95C21.6601 18.34 20.9601 18 20.0201 18C19.3101 18 18.7001 18.29 18.3401 18.79C17.9801 19.29 17.9001 19.96 18.1201 20.63C18.5501 21.93 19.3001 22.22 19.7101 22.27C19.7701 22.28 19.8301 22.28 19.9001 22.28C20.3401 22.28 21.0201 22.09 21.6801 21.1C22.2101 20.33 22.3101 19.56 21.9901 18.95Z"
                      fill={themeMode === "dark" ? "#fff" : "#1787B0"}
                    />
                  </svg>
                </IconButton>
              </div>
            </div>
          </div>
          <div className="sm:w-1/4 w-full px-2 sm:mt-0 mt-3">
            <FormControl size="small" color="primary" className="w-full">
              <InputLabel
                color="primary"
                className="px-2"
                id="demo-simple-select-label"
              >
                مرتب سازی
              </InputLabel>
              <Select
                sx={{
                  "& .MuiSelect-select": {
                    fontSize: "14px",
                    textAlign: "left",
                  },
                }}
                size="small"
                className="w-full"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valSort2}
                label="مرتب سازی"
                color="primary"
                onChange={(e) => {
                  setValSort2(e.target.value);
                  getLoanRequestList({ sortId: e.target.value, page: 1 });
                  setPageIndex(1);
                }}
              >
                {optionSort2.map((e) => (
                  <MenuItem sx={{ fontSize: "12px" }} key={e.id} value={e.id}>
                    {e.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="sm:w-1/6 w-full px-2 sm:mt-0 mt-3">
            <FormControl size="small" color="primary" className="w-full">
              <InputLabel
                color="primary"
                className="px-2"
                id="demo-simple-select-label"
              >
                تعداد رکورد
              </InputLabel>
              <Select
                size="small"
                className="w-full"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pageSize}
                label="تعداد رکورد"
                color="primary"
                onChange={(e) => {
                  setPageSize(e.target.value);
                  getLoanRequestList({
                    page: 1,
                    pageSize: e.target.value,
                  });
                  setPageIndex(1);
                }}
              >
                {[25, 50, 75, 100].map((e) => (
                  <MenuItem sx={{ fontSize: "12px" }} key={e} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      )}
      <TabLoan
        value={valTab}
        setValue={setValTab}
        getLoanList={getLoanList}
        setPageIndex={setPageIndex}
        numPayed={numPayed}
        numrecord={numrecord}
        numOverdue={numOverdue}
        numRePayed={numRePayed}
        numDueDate={numDueDate}
        statistics={statistics}
        getLoanRequestList={getLoanRequestList}
      />
      {valTab > 1 && (
        <TableLoan
          listLoan={listLoan}
          isLoading={isLoading}
          pageSize={pageSize}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          getLoanList={getLoanList}
          valTab={valTab}
          
        />
      )}
      {valTab <= 1 && (
        <TableLoanRequest
          listLoanRequest={listLoanRequest}
          isLoading={isLoading}
          pageSize={pageSize}
          pageIndex={pageIndex}
          getLoanRequestList={getLoanRequestList}
          setPageIndex={setPageIndex}
          listLoanRequestCancel={listLoanRequestCancel}
          valTab={valTab}
        />
      )}
    </>
  );
}
