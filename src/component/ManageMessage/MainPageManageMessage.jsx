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
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { mainDomain } from "../../utils/mainDomain";
import ModalSndMssageAll from "./ModalSndMssageAll";
import TableMessage from "./TableMessage";

const listType = [
  { id: 1, title: "پیامهای دریافتی", desc: "inbox" },
  { id: 2, title: "پیامهای ارسالی", desc: "sent" },
];
const listSort = [
  { id: 1, title: "جدیدترین" },
  { id: 2, title: "قدیمی ترین" },
  { id: 3, title: "فرستنده" },
  { id: 4, title: "عنوان" },
];

export default function MainPageManageMessage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const themeMode = useSelector((store) => store.setting.themeMode);
  const mainPageState = useSelector((store) => store.resetState.mainPageState);
  const [ListCooperative, setListCooperative] = useState([]);
  const [valCooperative, setValCooperative] = useState({
    title: "همه تشکل ها",
    userName: 0,
  });
  const [valType, setValType] = useState("inbox");
  const [query, setQuery] = useState("");
  const [valSort, setValSort] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [pageIndex, setPageIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [listMessage, setListMessage] = useState([]);

  

  //   get list Coparative
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

  //  get list message
  const config = {
    method: "get",
    url: `${mainDomain}/api/Message`,
    params:
      valCooperative.userName !== 0
        ? {
            userName: valCooperative.userName,
            type: valType,
            find: query,
            sortFilter: valSort,
            pageSize,
            page: pageIndex,
          }
        : {
            type: valType,
            find: query,
            sortFilter: valSort,
            pageSize,
            page: pageIndex,
          },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const getListMessage = async (newParams) => {
    config.params = { ...config.params, ...newParams };

    setListMessage([]);
    setIsLoading(true);
    await axios(config)
      .then((res) => {
        setIsLoading(false);
        setListMessage(res.data);        
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getListMessage();
  }, [mainPageState]);

  const btnSeaech = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
        btnSeaech.current.click();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
      <div>
        <div className="flex items-center flex-wrap px-4">
          <div className="md:w-1/5 w-full px-1 md:mt-0 mt-3">
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
                  ? [{ title: "همه تشکل ها", userName: 0 }, ...ListCooperative]
                  : [{ title: "همه تشکل ها", userName: 0 }]
              }
              getOptionLabel={(option) => (option.title ? option.title : "")}
              onChange={(event, newValue) => {
                if (newValue) {
                  if (newValue.userName !== 0) {
                    setValCooperative(newValue);
                    getListMessage({
                      userName: newValue.userName,
                      page: 1,
                    });
                    setPageIndex(1);
                  } else {
                    setValCooperative(newValue);
                    delete config.params.userName;
                    getListMessage({
                      page: 1,
                    });
                    setPageIndex(1);
                  }
                }
                if (!newValue) {
                  delete config.params.userName;
                  setValCooperative("");
                  getListMessage({
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
          <div className="md:w-1/6 w-full px-1 md:mt-0 mt-3">
            <FormControl size="small" color="primary" className="w-full">
              <InputLabel
                color="primary"
                className="px-2"
                id="demo-simple-select-label"
              >
                نوع پیام
              </InputLabel>
              <Select
                size="small"
                className="w-full"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valType}
                label="نوع پیام"
                color="primary"
                onChange={(e) => {
                  setValType(e.target.value);
                  getListMessage({
                    type: e.target.value,
                    page: 1,
                  });
                  setPageIndex(1);
                }}
              >
                {listType.map((e) => (
                  <MenuItem sx={{ fontSize: "12px" }} key={e.id} value={e.desc}>
                    {e.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="md:w-1/5 w-full px-1 md:mt-0 mt-3">
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
                  ref={btnSeaech}
                  onClick={() => {
                    getListMessage({
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
          <div className="md:w-1/6 w-full px-1 md:mt-0 mt-3">
            <FormControl size="small" color="primary" className="w-full">
              <InputLabel
                color="primary"
                className="px-2"
                id="demo-simple-select-label"
              >
                ترتیب نمایش
              </InputLabel>
              <Select
                size="small"
                className="w-full"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valSort}
                label=" ترتیب نمایش"
                color="primary"
                onChange={(e) => {
                  setValSort(e.target.value);
                  getListMessage({
                    sortFilter: e.target.value,
                    page: 1,
                  });
                  setPageIndex(1);
                }}
              >
                {listSort.map((e) => (
                  <MenuItem sx={{ fontSize: "12px" }} key={e.id} value={e.id}>
                    {e.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="md:w-1/12 w-full px-1 md:mt-0 mt-3">
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
                label=" تعداد رکورد"
                color="primary"
                onChange={(e) => {
                  setPageSize(e.target.value);
                  getListMessage({
                    pageSize: e.target.value,
                    page: 1,
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
          <div className="px-1 md:mt-0 mt-3">
            <ModalSndMssageAll getListMessage={getListMessage} />
          </div>
        </div>

        <TableMessage
          listMessage={listMessage}
          pageIndex={pageIndex}
          pageSize={pageSize}
          isLoading={isLoading}
          setPageIndex={setPageIndex}
          getListMessage={getListMessage}
          setListMessage={setListMessage}
          valType={valType}
        />
      </div>
    </>
  );
}
