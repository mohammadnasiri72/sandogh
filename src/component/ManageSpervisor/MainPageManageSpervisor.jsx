import { Autocomplete, Box, IconButton, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { mainDomain } from "../../utils/mainDomain";
import { useSelector } from "react-redux";
import ModalAddSpervisor from "./ModalAddSpervisor";
import TableSpervisor from "./TableSpervisor";

export default function MainPageManageSpervisor() {
  const user = JSON.parse(localStorage.getItem("user"));
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [listSupervisor, setListSupervisor] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [valProvince, setValProvince] = useState({
    title: "همه استان ها",
    id: 0,
  });
  const [query, setQuery] = useState("");
  const [flag, setflag] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  // get Province
  useEffect(() => {
    axios
      .get(mainDomain + "/api/BasicInfo/Province", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setListProvince(res.data);
      })
      .catch(() => {});
  }, []);

  //   get Supervisor list
  const config = {
    method: "get",
    url: `${mainDomain}/api/Supervisor`,
    params: {
      provinceId: -1,
    },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const getSupervisorList = async (newParams) => {
    config.params = { ...config.params, ...newParams };
    setListSupervisor([]);
    setIsLoading(true);
    await axios(config)
      .then((res) => {
        setIsLoading(false);
        setListSupervisor(res.data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getSupervisorList();
  }, [flag]);

  return (
    <>
      <div className="flex flex-wrap items-center px-3">
        <div className="sm:w-1/4 w-full px-1">
          <Autocomplete
            size="small"
            disabled={listProvince.length === 0}
            className="w-full"
            value={valProvince}
            options={
              listProvince.length > 0
                ? [{ title: "همه استان ها", id: 0 }, ...listProvince]
                : [{ title: "همه استان ها", id: 0 }]
            }
            getOptionLabel={(option) => (option.title ? option.title : "")}
            onChange={(event, newValue) => {
              if (newValue && newValue.id !==0) {
                setValProvince(newValue);
                getSupervisorList({ provinceId: Number(newValue.provinceId) });
                // setNumPages(1);
              }
              else {
                setValProvince("");
                getSupervisorList({ provinceId: -1 });
              }
            }}
            freeSolo
            renderOption={(props, option) => (
              <Box
                key={option.id}
                sx={{ fontSize: 12 }}
                component="li"
                {...props}
              >
                {option.title ? option.title : ""}
              </Box>
            )}
            renderInput={(params) => (
              <TextField {...params} label={"لیست استان ها"} />
            )}
          />
        </div>
        <div className="sm:w-1/4 w-full px-1 sm:mt-0 mt-3">
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
                onClick={() => {
                  if (query) {
                    getSupervisorList({
                      find: query,
                    });
                  }
                  if (!query) {
                    getSupervisorList();
                  }
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
      </div>
      <div className="flex items-center justify-between mt-3 px-2">
        <div className="flex items-center">
          <ModalAddSpervisor listProvince={listProvince} setflag={setflag}/>

          {/* {isLoading && (
              <div className="py-1">
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  height={33}
                  width={60}
                />
              </div>
            )} */}
        </div>
        {/* {!isLoading && (
            <div className="px-1">
              <SelectFieldTable />
            </div>
          )} */}
        {/* {isLoading && (
            <div className="py-1">
              <Skeleton
                animation="wave"
                variant="rounded"
                height={33}
                width={33}
              />
            </div>
          )} */}
      </div>
      <div className="px-4 py-2">
        <TableSpervisor listSupervisor={listSupervisor} listProvince={listProvince} setflag={setflag} isLoading={isLoading}/>
      </div>
    </>
  );
}
