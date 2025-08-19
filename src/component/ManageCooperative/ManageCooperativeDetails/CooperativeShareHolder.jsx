import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  TextField,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { mainDomain } from "../../../utils/mainDomain";
import ModalAddShareHolder from "./ModalAddShareHolder";
import TableLegalShareHolder from "./TableLegalShareHolder";
import TableRealeShareHolder from "./TableRealeShareHolder";

CooperativeShareHolder.propTypes = {
  flag: PropTypes.bool,
};
export default function CooperativeShareHolder({ flag }) {
  const themeColor = useSelector((store) => store.setting.themeColor);
  const [isLoading, setIsLoading] = useState(true);
  const [listShareHolder, setListShareHolder] = useState([]);
  const [valSort, setValSort] = useState(1);
  const [valTypeSort, setValTypeSort] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [valTab, setValTab] = useState("1");
  const [term, setTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));
  const cooperativeId = useSelector((store) => store.cooperative.cooperativeId);

  const optionSort = [
    { id: 1, title: "درج" },
    { id: 2, title: "ویرایش" },
    { id: 3, title: "نام" },
    { id: 4, title: "نام خانوادگی" },
    { id: 5, title: "محل تولد" },
    { id: 6, title: "تاریخ تولد" },
  ];
  const typeSort = [
    { id: 0, title: "نزولی" },
    { id: 1, title: "صعودی" },
  ];

  const handleChangeTab = (event, newValue) => {
    setValTab(newValue);
    getShareHolderList({
      pageIndex: 1,
      tab: newValue === "1" ? "real" : "legal",
    });
    setPageIndex(1);
  };

  //   get ShareHolder list
  const config = {
    method: "get",
    url: `${mainDomain}/api/Cooperative/ShareHolder`,
    params: {
      id: cooperativeId,
      term,
      sort: String(valSort) + String(valTypeSort),
      tab: valTab === "1" ? "real" : "legal",
      pageSize,
      pageIndex,
    },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const getShareHolderList = async (newParams) => {
    config.params = { ...config.params, ...newParams };
    setListShareHolder([]);
    setIsLoading(true);
    await axios(config)
      .then((res) => {
        setIsLoading(false);
        setListShareHolder(res.data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getShareHolderList();
  }, [flag]);
  return (
    <>
      <div className="flex items-center flex-wrap mt-3">
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
              placeholder="نام , نام خانوادگی , ش ملی , ش ش , موبایل"
              name="name"
              onChange={(e) => {
                setTerm(e.target.value);
              }}
              value={term}
            />
            <div className="absolute left-0 top-0">
              <IconButton
                onClick={() => {
                  getShareHolderList({ term, pageIndex: 1 });
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
                    fill={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                  />
                  <path
                    d="M21.9901 18.95C21.6601 18.34 20.9601 18 20.0201 18C19.3101 18 18.7001 18.29 18.3401 18.79C17.9801 19.29 17.9001 19.96 18.1201 20.63C18.5501 21.93 19.3001 22.22 19.7101 22.27C19.7701 22.28 19.8301 22.28 19.9001 22.28C20.3401 22.28 21.0201 22.09 21.6801 21.1C22.2101 20.33 22.3101 19.56 21.9901 18.95Z"
                    fill={themeColor.bgColor?.match(/#.{0,6}(?=(?:.*#|$))/g)[0]}
                  />
                </svg>
              </IconButton>
            </div>
          </div>
        </div>
        <div className="sm:w-1/3 w-full px-2 sm:mt-0 mt-5">
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
                "& .MuiSelect-select": { fontSize: "14px", textAlign: "left" },
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
                getShareHolderList({
                  sort: String(e.target.value) + String(valTypeSort),
                  pageIndex: 1,
                });
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
        <div className="sm:w-1/6 w-full px-2 sm:mt-0 mt-5">
          <FormControl size="small" color="primary" className="w-full">
            <InputLabel
              color="primary"
              className="px-2"
              id="demo-simple-select-label"
            >
              ترتیب
            </InputLabel>
            <Select
              sx={{ "& .MuiSelect-select": { fontSize: "12px" } }}
              size="small"
              className="w-full"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={valTypeSort}
              label="ترتیب"
              color="primary"
              onChange={(e) => {
                setValTypeSort(e.target.value);
                getShareHolderList({
                  sort: String(valSort) + String(e.target.value),
                  pageIndex: 1,
                });
                setPageIndex(1);
              }}
            >
              {typeSort.map((e) => (
                <MenuItem sx={{ fontSize: "12px" }} key={e.id} value={e.id}>
                  {e.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="sm:w-1/6 w-full px-2 sm:mt-0 mt-5">
          <FormControl size="small" color="primary" className="w-full">
            <InputLabel
              color="primary"
              className="px-2"
              id="demo-simple-select-label"
            >
              تعداد رکورد
            </InputLabel>
            <Select
              sx={{ "& .MuiSelect-select": { fontSize: "12px" } }}
              size="small"
              className="w-full"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pageSize}
              label="تعداد رکورد"
              color="primary"
              onChange={(e) => {
                setPageSize(e.target.value);
                getShareHolderList({ pageSize: e.target.value, pageIndex: 1 });
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
      <div className="mt-2 px-2">
        <ModalAddShareHolder getShareHolderList={getShareHolderList} />
      </div>
      <div>
        <Box sx={{ width: "100%" }}>
          <TabContext value={valTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
               
                variant="fullWidth"
                sx={{
                  "& .MuiTab-root": { flex: 1 },
                  "& .Mui-selected": {
                    fontWeight: "bold",
                    fontSize: "16px",
                  },
                }}
                onChange={handleChangeTab}
              >
                <Tab
                  onClick={() => {
                    if (valTab === "1") {
                      getShareHolderList({
                        pageIndex: 1,
                        tab: "real",
                      });
                      setPageIndex(1);
                    }
                  }}
                  sx={{ width: "100%" }}
                  label="اشخاص حقیقی"
                  value="1"
                />
                <Tab
                  onClick={() => {
                    if (valTab === "2") {
                      getShareHolderList({
                        pageIndex: 1,
                        tab: "legal",
                      });
                      setPageIndex(1);
                    }
                  }}
                  sx={{ width: "100%" }}
                  label="اشخاص حقوقی"
                  value="2"
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <TableRealeShareHolder
                listShareHolder={listShareHolder.filter((e) => !e.isLegal)}
                isLoading={isLoading}
                getShareHolderList={getShareHolderList}
              />
            </TabPanel>
            <TabPanel value="2">
              <TableLegalShareHolder
                listShareHolder={listShareHolder.filter((e) => e.isLegal)}
                isLoading={isLoading}
                getShareHolderList={getShareHolderList}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
}
