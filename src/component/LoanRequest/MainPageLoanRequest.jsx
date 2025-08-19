import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setPageSize,
  setQuery,
  setValSort,
  setValuetabs,
} from "../../redux/slice/loanRequest";
import { mainDomain } from "../../utils/mainDomain";
import TableLoanRequest from "./TableLoanRequest";
import TabsLoanRequest from "./TabsLoanRequest";

export default function MainPageLoanRequest() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const themeColor = useSelector((store) => store.setting.themeColor);
  const mainPageState = useSelector((store) => store.resetState.mainPageState);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const query = useSelector((store) => store.loanRequest.query);
  const valSort = useSelector((store) => store.loanRequest.valSort);
  const pageSize = useSelector((store) => store.loanRequest.pageSize);
  const valuetabs = useSelector((store) => store.loanRequest.valuetabs);
  const [isLoading, setIsLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [statistics, setStatistics] = useState([]);
  const [listLoanRequest, setListLoanRequest] = useState([]);

  const Navigate = useNavigate();

  

  const disPatch = useDispatch();

  useEffect(() => {
    if (location.state) {
      disPatch(setValuetabs(location.state.myData));
    }
  }, [location]);

  const optionSort = [
    { id: 1, title: "آخرین درج" },
    { id: 2, title: "آخرین ویرایش" },
    { id: 3, title: "عنوان صعودی" },
    { id: 4, title: "عنوان نزولی" },
  ];

  //   get LoanRequest list
  const config = {
    method: "get",
    url: `${mainDomain}/api/LoanRequest`,
    params: {
      userName: "",
      find: query,
      statusId: !location.state?.myData
        ? valuetabs === 0
          ? 1
          : valuetabs === 1
          ? 2
          : valuetabs === 2
          ? 4
          : valuetabs === 3
          ? 3
          : valuetabs === 4
          ? 5
          : ""
        : 2,
      sortId: valSort,
      pageSize,
      page: pageIndex,
    },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const getLoanRequestList = async (newParams) => {
    config.params = { ...config.params, ...newParams };
    setListLoanRequest([]);
    setIsLoading(true);
    await axios(config)
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
              item.status === config.params.statusId
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

  useEffect(() => {
    getLoanRequestList();
  }, [mainPageState]);

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

  return (
    <>
      {
        <div>
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
                    disPatch(setQuery(e.target.value));
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
                  value={valSort}
                  label="مرتب سازی"
                  color="primary"
                  onChange={(e) => {
                    disPatch(setValSort(e.target.value));
                    getLoanRequestList({ sortId: e.target.value, page: 1 });
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
                    disPatch(setPageSize(e.target.value));
                    getLoanRequestList({ pageSize: e.target.value, page: 1 });
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
            <div className="sm:px-0 px-2 sm:mt-0 mt-3">
              {/* <ModalAddLoanRequest getLoanRequestList={getLoanRequestList} /> */}
              <div className="w-full flex justify-start items-center h-full px-2">
              <Button
                onClick={() => {
                  Navigate(`/profile/NewLoanRequest`);
                }}
                sx={{
                  height: "100%",
                  fontSize: "12px",
                  minWidth: "35px",
                  transition: "0.6s",
                  color: themeColor.color,
                  background: themeColor.bgColor,
                  boxShadow: "none",
                }}
              >
                <div className="flex items-center">
                  <FaPlus />
                  <span className="px-1">ثبت درخواست تسهیلات</span>
                </div>
              </Button>
            </div>
            </div>
           
          </div>
          <TabsLoanRequest
            getLoanRequestList={getLoanRequestList}
            setPageIndex={setPageIndex}
            statistics={statistics}
          />
          <TableLoanRequest
            listLoanRequest={listLoanRequest}
            isLoading={isLoading}
            pageSize={pageSize}
            pageIndex={pageIndex}
            getLoanRequestList={getLoanRequestList}
            setPageIndex={setPageIndex}
          />
        </div>
      }
    </>
  );
}
