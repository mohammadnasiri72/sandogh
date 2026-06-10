import {
  Autocomplete,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setValCooperative } from "../../redux/slice/adminLoan";
import { mainDomain } from "../../utils/mainDomain";
import TableAdminLoanRequest from "../ManageLoanRequest/TableAdminLoanRequest";
import TabManageLoan from "./TabManageLoan";
import TableManageLoan from "./TableManageLoan";

export default function MainPageManageLoan() {
  const user = JSON.parse(localStorage.getItem("user"));
  const themeMode = useSelector((store) => store.setting.themeMode);
  const valTab = useSelector((store) => store.adminLoan.valTab);
  const valCooperative = useSelector((store) => store.adminLoan.valCooperative);
  const mainPageState = useSelector((store) => store.resetState.mainPageState);
  const [ListCooperative, setListCooperative] = useState([]);
  const [flagDel, setFlagDel] = useState(false);
  const [listLoanRequestCancel, setListLoanRequestCancel] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [listAdminLoan, setListAdminLoan] = useState([]);

  const [pageIndex, setPageIndex] = useState(1);
  const [numrecord, setNumrecord] = useState(0);
  const [numPayed, setNumPayed] = useState(0);
  const [numOverdue, setNumOverdue] = useState(0);
  const [numRePayed, setNumRePayed] = useState(0);
  const [numDueDate, setNumDueDate] = useState(0);

  const [listAdminLoanRequest, setListAdminLoanRequest] = useState([]);
  const [numPending, setNumPending] = useState(0);
  const [numReject, setNumReject] = useState(0);
  const [numConfirm, setNumConfirm] = useState(0);
  const [numArchive, setNumArchive] = useState(0);
  const [valSort, setValSort] = useState(1);
  const [valSort2, setValSort2] = useState(1);
  const [query, setQuery] = useState("");
  const [valRecord, setValRecord] = useState(1);
  const [valOrder, setValOrder] = useState(0);

  const disPatch = useDispatch();

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
  const optionOrder = [
    { id: 0, title: "نزولی" },
    { id: 1, title: "صعودی" },
  ];
  const optionRecord = [
    { id: 1, title: "25" },
    { id: 2, title: "50" },
    { id: 3, title: "75" },
    { id: 4, title: "100" },
  ];

  useEffect(() => {
    axios
      .get(mainDomain + "/api/BasicInfo/Cooperative", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {        
        setListCooperative(res.data);
      })
      .catch(() => {});
  }, []);

  // useEffect(() => {
  //   if (location.state?.myData === 0 || location.state?.myData) {
  //     disPatch(setValTab(location.state?.myData));
  //   }
  // }, []);

  //   get Loan list
  const config = {
    method: "get",
    url: `${mainDomain}/api/Loan`,
    params: valCooperative.userName
      ? {
          cooperative: valCooperative.userName,
          find: query,
          status:
            valTab === 2
              ? 100
              : valTab === 3
              ? 101
              : valTab === 4
              ? 104
              : valTab === 5
              ? 103
              : valTab === 7
              ? 102
              : 0,
          sortFilter: valSort,
          sortDir: valOrder,
          pageSize: valRecord * 25,
          page: pageIndex,
        }
      : {
          find: query,
          status:
            valTab === 2
              ? 100
              : valTab === 3
              ? 101
              : valTab === 4
              ? 104
              : valTab === 5
              ? 103
              : valTab === 7
              ? 102
              : 0,
          sortFilter: valSort,
          sortDir: valOrder,
          pageSize: valRecord * 25,
          page: pageIndex,
        },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const getLoanAdminList = async (newParams) => {
    config.params = { ...config.params, ...newParams };
    setListAdminLoan([]);
    setIsLoading(true);
    await axios(config)
      .then((res) => {
        setIsLoading(false);
        setNumrecord(res.data.loanCounter[0]);
        setNumPayed(res.data.loanCounter[1]);
        setNumOverdue(res.data.loanCounter[2]);
        setNumRePayed(res.data.loanCounter[3]);
        setNumDueDate(res.data.loanCounter[4]);
        setListAdminLoan(res.data.cooperativeLoanList);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getLoanAdminList();
  }, [mainPageState]);

  //   get LoanRequest list
  const config2 = {
    method: "get",
    url: `${mainDomain}/api/LoanRequest`,
    params:
      valCooperative.userName !== 0
        ? {
            userName: valCooperative.userName,
            find: query,
            statusId:
              valTab === 0 ? 2 : valTab === 1 ? 4 : valTab === 6 ? 5 : -1,
            sortId: valSort2,
            pageSize: valRecord * 25,
            page: pageIndex,
          }
        : {
            find: query,
            statusId:
              valTab === 0 ? 2 : valTab === 1 ? 4 : valTab === 6 ? 5 : -1,
            sortId: valSort,
            pageSize: valRecord * 25,
            page: pageIndex,
          },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const getLoanRequestAdminList = async (newParams) => {
    config2.params = { ...config2.params, ...newParams };
    setListAdminLoanRequest([]);
    setIsLoading(true);
    await axios(config2)
      .then((res) => {
        setIsLoading(false);
        setListAdminLoanRequest(res.data);
        if (res.data.length > 0) {
          if (res.data[0].status === 2) {
            setNumPending(res.data[0].totalRows);
          }
          if (res.data[0].status === 3) {
            setNumReject(res.data[0].totalRows);
          }
          if (res.data[0].status === 4) {
            setNumConfirm(res.data[0].totalRows);
          }
          if (res.data[0].status === 5) {
            setNumArchive(res.data[0].totalRows);
          }
        } else {
          if (config2.params.statusId === 2) {
            setNumPending(0);
          }
          if (config2.params.statusId === 3) {
            setNumReject(0);
          }
          if (config2.params.statusId === 4) {
            setNumConfirm(0);
          }
          if (config2.params.statusId === 5) {
            setNumArchive(0);
          }
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getLoanRequestAdminList();
  }, [mainPageState]);

  // get Statistics
  useEffect(() => {
    axios
      .get(mainDomain + "/api/LoanRequest/Statistics", {
        params: {
          ...(valCooperative.userName !== 0
            ? { userName: valCooperative.userName }
            : {}),
          find: query,
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setNumPending(res.data.find((e) => e.status === 2).number);
        setNumReject(res.data.find((e) => e.status === 3).number);
        setNumConfirm(res.data.find((e) => e.status === 4).number);
        setNumArchive(res.data.find((e) => e.status === 5).number);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (valTab === 1) {
      setListLoanRequestCancel([]);
      axios
        .get(`${mainDomain}/api/LoanRequest`, {
          params: {
            userName: valCooperative.userName,
            find: query,
            statusId: 3,
            sortId: valSort2,
            pageSize: valRecord * 25,
            page: pageIndex,
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setNumReject(0);
          setListLoanRequestCancel(res.data);
          if (res.data.length > 0) {
            if (res.data[0].status === 3) {
              setNumReject(res.data[0].totalRows);
            }
          }
        })
        .catch(() => {});
    }
  }, [valTab, flagDel]);

  useEffect(() => {
    if (valTab !== 1) {
      setListLoanRequestCancel([]);
    }
  }, [valTab]);

  return (
    <>
      {
        <div className="test">
          {(valTab === 0 || valTab === 1 || valTab === 6) && (
            <div className="flex flex-wrap mt-8 justify-start px-4">
              <div className="sm:w-1/4 w-full px-1">
                <Autocomplete
                  sx={{
                    "& .MuiInputBase-input": {
                      textAlign: "start",
                      fontSize: "12px",
                      height: "1.45rem",
                    },
                  }}
                  size="small"
                  disabled={ListCooperative.length === 0}
                  className="w-full"
                  value={valCooperative}
                  options={
                    ListCooperative.length > 0
                      ? [
                          { title: "همه تشکل ها", userName: 0 },
                          ...ListCooperative,
                        ]
                      : [{ title: "همه تشکل ها", userName: 0 }]
                  }
                  getOptionLabel={(option) =>
                    option.title ? option.title : ""
                  }
                  onChange={(event, newValue) => {
                    setFlagDel((e) => !e);
                    if (newValue) {
                      if (newValue.userName !== 0) {
                        disPatch(setValCooperative(newValue));
                        getLoanRequestAdminList({
                          userName: newValue.userName,
                          page: 1,
                        });
                        setPageIndex(1);
                      } else {
                        delete config2.params.userName;
                        disPatch(setValCooperative(newValue));
                        getLoanRequestAdminList({
                          page: 1,
                        });
                        setPageIndex(1);
                      }
                    }
                    if (!newValue) {
                      delete config2.params.userName;
                      disPatch(setValCooperative(""));
                      getLoanRequestAdminList({
                        page: 1,
                      });
                      setPageIndex(1);
                    }
                  }}
                  freeSolo
                  renderOption={(props, option) => (
                    <li {...props} key={option.title}>
                      <div className="text-start text-sm py-2">
                        {option.title ? option.title : ""}
                      </div>
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label={"لیست تشکل ها"} />
                  )}
                />
              </div>
              <div className="sm:w-1/4 w-full px-1 sm:mt-0 mt-3">
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
                      setFlagDel((e) => !e);
                      setValSort2(e.target.value);
                      getLoanRequestAdminList({
                        sortId: e.target.value,
                        page: 1,
                      });
                      setPageIndex(1);
                    }}
                  >
                    {optionSort2.map((e) => (
                      <MenuItem
                        sx={{ fontSize: "12px" }}
                        key={e.id}
                        value={e.id}
                      >
                        {e.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="sm:w-1/4 w-full px-1 sm:mt-0 mt-3">
                <div className="w-full flex justify-center items-center relative">
                  <TextField
                    sx={{
                      "& .MuiInputBase-input::placeholder": {
                        fontSize: "12px",
                      },
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
                        getLoanRequestAdminList({
                          find: "",
                          page: 1,
                        });
                        setPageIndex(1);
                        setFlagDel((e) => !e);
                      }
                    }}
                    value={query}
                  />
                  <div className="absolute left-0 top-0">
                    <IconButton
                      sx={{
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                      onClick={() => {
                        getLoanRequestAdminList({
                          find: query,
                          page: 1,
                        });
                        setPageIndex(1);
                        setFlagDel((e) => !e);
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
              <div className="sm:w-1/4 w-full px-1 sm:mt-0 mt-3">
                <FormControl size="small" color="primary" className="w-full">
                  <InputLabel
                    color="primary"
                    className="px-2"
                    id="demo-simple-select-label"
                  >
                    رکورد
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
                    value={valRecord}
                    label="رکورد"
                    color="primary"
                    onChange={(e) => {
                      setValRecord(e.target.value);
                      setFlagDel((e) => !e);
                      getLoanRequestAdminList({
                        page: 1,
                        pageSize: e.target.value * 25,
                      });
                      setPageIndex(1);
                    }}
                  >
                    {optionRecord.map((e) => (
                      <MenuItem
                        sx={{ fontSize: "12px" }}
                        key={e.id}
                        value={e.id}
                      >
                        {e.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          )}
          {!(valTab === 0 || valTab === 1 || valTab === 6) && (
            <div className="flex flex-wrap mt-8 justify-start px-4">
              <div className="sm:w-1/4 w-full px-1">
                <Autocomplete
                  sx={{
                    "& .MuiAutocomplete-option": { textAlign: "justify" },
                    "& .MuiInputBase-input": {
                      textAlign: "start",
                      fontSize: "12px",
                      height: "1.45rem",
                    },
                  }}
                  size="small"
                  disabled={ListCooperative.length === 0}
                  className="w-full"
                  value={valCooperative}
                  options={
                    ListCooperative.length > 0
                      ? [
                          { title: "همه تشکل ها", provinceId: 0 },
                          ...ListCooperative,
                        ]
                      : [{ title: "همه تشکل ها", provinceId: 0 }]
                  }
                  getOptionLabel={(option) =>
                    option.title ? option.title : ""
                  }
                  onChange={(event, newValue) => {
                    if (newValue) {
                      if (newValue.userName) {
                        disPatch(setValCooperative(newValue));
                        getLoanAdminList({
                          page: 1,
                          cooperative: newValue.userName,
                        });
                        setPageIndex(1);
                      } else {
                        delete config.params.cooperative;
                        disPatch(setValCooperative(newValue));
                        getLoanAdminList({ page: 1 });
                        setPageIndex(1);
                      }
                    }
                    if (!newValue) {
                      delete config.params.cooperative;
                      disPatch(setValCooperative(""));
                      getLoanAdminList({ page: 1 });
                      setPageIndex(1);
                    }
                  }}
                  freeSolo
                  renderOption={(props, option) => (
                    <li {...props} key={option.title}>
                      <div className="text-start text-sm py-2">
                        {option.title ? option.title : ""}
                      </div>
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label={"لیست تشکل ها"} />
                  )}
                />
              </div>
              <div className="sm:w-1/4 w-full px-1 sm:mt-0 mt-3">
                <div className="w-full flex justify-center items-center relative">
                  <TextField
                    sx={{
                      "& .MuiInputBase-input::placeholder": {
                        fontSize: "12px",
                      },
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
                        getLoanAdminList({
                          page: 1,
                          find: "",
                        });
                        setPageIndex(1);
                      }
                    }}
                    value={query}
                  />
                  <div className="absolute left-0 top-0">
                    <IconButton
                      sx={{
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                      onClick={() => {
                        getLoanAdminList({
                          page: 1,
                          find: query,
                        });
                        setPageIndex(1);
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
              <div className="sm:w-1/4 w-full px-1 sm:mt-0 mt-3">
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
                      getLoanAdminList({
                        page: 1,
                        sortFilter: e.target.value,
                      });
                      setPageIndex(1);
                    }}
                  >
                    {optionSort.map((e) => (
                      <MenuItem
                        sx={{ fontSize: "12px" }}
                        key={e.id}
                        value={e.id}
                      >
                        {e.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="sm:w-1/4 w-full px-1 sm:mt-0 mt-3 flex">
                <div className="w-1/2 px-1">
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
                      value={valOrder}
                      label="ترتیب"
                      color="primary"
                      onChange={(e) => {
                        setValOrder(e.target.value);
                        getLoanAdminList({
                          page: 1,
                          sortDir: e.target.value,
                        });
                        setPageIndex(1);
                      }}
                    >
                      {optionOrder.map((e) => (
                        <MenuItem
                          sx={{ fontSize: "12px" }}
                          key={e.id}
                          value={e.id}
                        >
                          {e.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="w-1/2 px-1">
                  <FormControl size="small" color="primary" className="w-full">
                    <InputLabel
                      color="primary"
                      className="px-2"
                      id="demo-simple-select-label"
                    >
                      رکورد
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
                      value={valRecord}
                      label="رکورد"
                      color="primary"
                      onChange={(e) => {
                        setValRecord(e.target.value);
                        getLoanAdminList({
                          page: 1,
                          pageSize: e.target.value * 25,
                        });
                        setPageIndex(1);
                      }}
                    >
                      {optionRecord.map((e) => (
                        <MenuItem
                          sx={{ fontSize: "12px" }}
                          key={e.id}
                          value={e.id}
                        >
                          {e.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          )}

          <TabManageLoan
            getLoanAdminList={getLoanAdminList}
            getLoanRequestAdminList={getLoanRequestAdminList}
            setPageIndex={setPageIndex}
            numPending={numPending}
            numConfirm={numConfirm}
            numReject={numReject}
            numArchive={numArchive}
            numPayed={numPayed}
            numrecord={numrecord}
            numOverdue={numOverdue}
            numRePayed={numRePayed}
            numDueDate={numDueDate}
            setFlagDel={setFlagDel}
          />
          {!(valTab === 0 || valTab === 1 || valTab === 6) && (
            <TableManageLoan
              listAdminLoan={listAdminLoan}
              isLoading={isLoading}
              pageIndex={pageIndex}
              pageSize={valRecord * 25}
              setPageIndex={setPageIndex}
              getLoanAdminList={getLoanAdminList}
              valRecord={valRecord}
              ListCooperative={ListCooperative}
            />
          )}
          {(valTab === 0 || valTab === 1 || valTab === 6) && (
            <TableAdminLoanRequest
              listAdminLoanRequest={listAdminLoanRequest}
              pageIndex={pageIndex}
              pageSize={valRecord * 25}
              isLoading={isLoading}
              setPageIndex={setPageIndex}
              getLoanRequestAdminList={getLoanRequestAdminList}
              setFlagDel={setFlagDel}
              listLoanRequestCancel={listLoanRequestCancel}
              valTab={valTab}
              getLoanAdminList={getLoanAdminList}
            />
          )}
        </div>
      }
    </>
  );
}
