import {
  Autocomplete,
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";
import DownloadExelTableReportCapital from "./DownloadExelTableReportCapital";
import DownloadPDFTableReportCapital from "./DownloadPDFTableReportCapital";
import SelectFieldTableReportCapital from "./SelectFieldTableReportCapital";
import SubHeaderCapital from "./SubHeaderCapital";
import TableReportCapital from "./TableReportCapital";

export default function MainPageManageLastcapital() {
  const user = JSON.parse(localStorage.getItem("user"));
  const themeMode = useSelector((store) => store.setting.themeMode);
  const mainPageState = useSelector((store) => store.resetState.mainPageState);
  const [isLoading, setIsLoading] = useState(false);
  const [listProvince, setListProvince] = useState([]);
  const [valProvince, setValProvince] = useState({
    title: "همه استان ها",
    id: 0,
  });
  const [valStatusCooperative, setValStatusCooperative] = useState(0);
  const [valStep, setValStep] = useState(-1);
  const [valDir, setValDir] = useState(0);
  const [valSort, setValSort] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [ListCooperative, setListCooperative] = useState([]);
  const [valCooperative, setValCooperative] = useState({
    title: "همه تشکل ها",
    userName: 0,
  });
  const [flagStep, setFlagStep] = useState(true);

  const [listReportCapital, setListReportCapital] = useState([]);
  const [listSubHeaderReportCapital, setListSubHeaderReportCapital] = useState(
    []
  );
  const [steps, setSteps] = useState([]);
  const [isLoadingExcel, setIsLoadingExcel] = useState(false);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [selectedCols, setSelectedCols] = useState([]);
  const [selectedColsWidth, setSelectedColsWidth] = useState([]);
  const [selectedField, setSelectedField] = useState([]);

  useEffect(() => {
    setSelectedCols(selectedField.map((item) => item.title));
    setSelectedColsWidth(selectedField.map((item) => item.width));
  }, [selectedField]);

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const listStatusCooperative = [
    {
      id: 0,
      name: "همه",
    },
    {
      id: 1,
      name: "سهامدار",
    },
    {
      id: 2,
      name: "غیر سهامدار",
    },
    {
      id: 3,
      name: "بخش دولتی",
    },
  ];
  const listDir = [
    {
      id: 0,
      name: "نزولی",
    },
    {
      id: 1,
      name: "صعودی",
    },
  ];
  const listSort = [
    {
      id: 5,
      name: "اولویت نمایش",
    },
    {
      id: 1,
      name: "عنوان تشکل",
    },
    {
      id: 4,
      name: "تعداد سهم",
    },
    {
      id: 6,
      name: "مبلغ کل سهام",
    },
    {
      id: 7,
      name: "مرحله",
    },
  ];

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

  //  get ReportListCapital
  const config = {
    method: "get",
    url: `${mainDomain}/api/Report/Capital`,
    params: {
      cooperative: valCooperative.userName,
      provinceId: valProvince.provinceId,
      step: valStep,
      statusId: valStatusCooperative,
      sortFilter: valSort,
      sortDir: valDir,
      pageSize,
      page: pageIndex,
    },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const getReportListCapital = async (newParams) => {
    config.params = { ...config.params, ...newParams };
    if (valCooperative.userName === 0) {
      delete config.params.cooperative;
    }
    if (valStep === -1) {
      delete config.params.step;
    }
    setListReportCapital([]);
    setListSubHeaderReportCapital([]);
    setIsLoading(true);
    await axios(config)
      .then((res) => {
        setIsLoading(false);
        setListReportCapital(res.data.cooperativeLastCapitalView);
        setSteps(res.data.steps);

        setListSubHeaderReportCapital(res.data.cooperativeSumCapitalView);
        if (res.data.steps.length > 0 && flagStep) {
          setValStep(res.data.steps[0]);
          setFlagStep(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getReportListCapital();
  }, [mainPageState]);

  // get Excel
  const getDataExcel = () => {
    const data = {
      selectedCols,
      selectedColsWidth,
      provinceId: Number(valProvince.provinceId) || 0,
      statusId: valStatusCooperative,
      ...(valCooperative.userName
        ? { cooperative: valCooperative.userName }
        : {}),

      sortFilter: valSort,
      sortDir: valDir,
      step: valStep,
      fileExtenstion: ".xlsx",
    };

    setIsLoadingExcel(true);
    axios
      .post(mainDomain + "/api/Report/Capital/Export", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const a = document.createElement("a");
        a.href = mainDomain + res.data;
        a.download = "";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setIsLoadingExcel(false);
      })
      .catch((err) => {
        setIsLoadingExcel(false);
        Toast.fire({
          icon: "error",
          text: err.response?.data ? err.response?.data : "خطای شبکه",
          customClass: {
            container: "toast-modal",
          },
        });
      });
  };

  // get PDF
  const getDataPDF = () => {
    const data = {
      selectedCols,
      selectedColsWidth,
      provinceId: Number(valProvince.provinceId) || 0,
      statusId: valStatusCooperative,
      ...(valCooperative.userName
        ? { cooperative: valCooperative.userName }
        : {}),

      sortFilter: valSort,
      sortDir: valDir,
      step: valStep,
      fileExtenstion: ".pdf",
    };
    setIsLoadingPdf(true);

    axios
      .post(mainDomain + "/api/Report/Capital/Export", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const a = document.createElement("a");
        a.href = mainDomain + res.data;
        a.download = "";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setIsLoadingPdf(false);
      })
      .catch((err) => {
        setIsLoadingPdf(false);
        Toast.fire({
          icon: "error",
          text: err.response?.data ? err.response?.data : "خطای شبکه",
          customClass: {
            container: "toast-modal",
          },
        });
      });
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="sm:w-1/3 w-full px-2 sm:mt-0 mt-5">
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
              if (newValue) {
                setValProvince(newValue);
                getReportListCapital({
                  provinceId: newValue.provinceId,
                  step: steps[0],
                  page: 1,
                });
                setPageIndex(1);
              }
              if (!newValue) {
                setValProvince("");
                getReportListCapital({
                  provinceId: 0,
                  page: 1,
                  step: steps[0],
                });
                setPageIndex(1);
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
        <div className="sm:w-1/3 w-full px-2 sm:mt-0 mt-5">
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
                  getReportListCapital({
                    cooperative: newValue.userName,
                    step: steps[0],
                    page: 1,
                  });
                  setPageIndex(1);
                } else {
                  delete config.params.cooperative;
                  setValCooperative(newValue);
                  getReportListCapital({
                    step: steps[0],
                    page: 1,
                  });
                  setPageIndex(1);
                }
              }
              if (!newValue) {
                delete config.params.cooperative;
                setValCooperative("");
                getReportListCapital({
                  step: steps[0],
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
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: themeMode === "dark" ? "#fff5" : "#0005", // رنگ بوردر
                    },
                    "&:hover fieldset": {
                      borderColor: themeMode === "dark" ? "#fff" : "#000", // رنگ بوردر هنگام هاور
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue", // رنگ بوردر هنگام فوکوس
                    },
                    "& input": {
                      color: themeMode === "dark" ? "#fff" : "#000", // رنگ متن داخل
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: themeMode === "dark" ? "#fff" : "#000", // رنگ label
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "blue", // رنگ label هنگام فوکوس
                  },
                  "& .MuiAutocomplete-clearIndicator": {
                    color: themeMode === "dark" ? "#fff" : "#000", // رنگ ضربدر
                  },
                }}
                {...params}
                label={"لیست تشکل ها"}
              />
            )}
          />
        </div>
        <div className="sm:w-1/6 w-full px-2 sm:mt-0 mt-5">
          <FormControl size="small" color="primary" className="w-full">
            <InputLabel
              color="primary"
              className="px-2"
              id="demo-simple-select-label"
            >
              وضعیت تعاونی
            </InputLabel>
            <Select
              size="small"
              className="w-full"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={valStatusCooperative}
              label="وضعیت تعاونی"
              color="primary"
              onChange={(e) => {
                setValStatusCooperative(e.target.value);
                getReportListCapital({
                  statusId: e.target.value,
                  step: steps[0],
                  page: 1,
                });
                setPageIndex(1);
              }}
            >
              {listStatusCooperative.map((e) => (
                <MenuItem sx={{ fontSize: "12px" }} key={e.id} value={e.id}>
                  {e.name}
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
              مرحله
            </InputLabel>
            <Select
              size="small"
              className="w-full"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={valStep}
              label="مرحله"
              color="primary"
              onChange={(e) => {
                setValStep(e.target.value);
                setFlagStep(true);
                getReportListCapital({
                  step: e.target.value,
                  page: 1,
                });
                setPageIndex(1);
              }}
            >
              {steps.map((e) => (
                <MenuItem sx={{ fontSize: "12px" }} key={e} value={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="sm:w-1/5 w-full px-2 mt-5">
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
                getReportListCapital({
                  sortFilter: e.target.value,
                  step: steps[0],
                  page: 1,
                });
                setPageIndex(1);
              }}
            >
              {listSort.map((e) => (
                <MenuItem sx={{ fontSize: "12px" }} key={e.id} value={e.id}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="sm:w-1/5 w-full px-2 mt-5">
          <FormControl size="small" color="primary" className="w-full">
            <InputLabel
              color="primary"
              className="px-2"
              id="demo-simple-select-label"
            >
              جهت ترتیب نمایش
            </InputLabel>
            <Select
              size="small"
              className="w-full"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={valDir}
              label="جهت ترتیب نمایش"
              color="primary"
              onChange={(e) => {
                setValDir(e.target.value);
                getReportListCapital({
                  sortDir: e.target.value,
                  step: steps[0],
                  page: 1,
                });
                setPageIndex(1);
              }}
            >
              {listDir.map((e) => (
                <MenuItem sx={{ fontSize: "12px" }} key={e.id} value={e.id}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="sm:w-1/5 w-full px-2  mt-5">
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
                getReportListCapital({
                  pageSize: e.target.value,
                  step: steps[0],
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
      </div>
      <div className="pt-3">
        <Divider />
      </div>

      {/* <TableSubHeader listSubHeaderReportCapital={listSubHeaderReportCapital} /> */}
      <SubHeaderCapital
        listSubHeaderReportCapital={listSubHeaderReportCapital}
      />
      <div className="flex justify-between items-center px-4">
        <div className="flex justify-center">
          {listSubHeaderReportCapital.length > 0 && (
            <div className="px-1">
              <DownloadExelTableReportCapital
                getDataExcel={getDataExcel}
                isLoadingExcel={isLoadingExcel}
              />
            </div>
          )}
          {listSubHeaderReportCapital.length === 0 && (
            <div className="px-3">
              <Skeleton variant="rounded" width={110} height={35} />
            </div>
          )}
          {listSubHeaderReportCapital.length > 0 && (
            <div className="px-1">
              <DownloadPDFTableReportCapital
                getDataPDF={getDataPDF}
                isLoadingPdf={isLoadingPdf}
              />
            </div>
          )}
          {listSubHeaderReportCapital.length === 0 && (
            <div className="px-3">
              <Skeleton variant="rounded" width={110} height={35} />
            </div>
          )}
        </div>
        {listSubHeaderReportCapital.length > 0 && (
          <SelectFieldTableReportCapital setSelectedField={setSelectedField} />
        )}
        {listSubHeaderReportCapital.length === 0 && (
          <div className="px-1 pb-2">
            <Skeleton variant="rounded" width={35} height={35} />
          </div>
        )}
      </div>
      <TableReportCapital
        listReportCapital={listReportCapital}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageIndex={setPageIndex}
        isLoading={isLoading}
        getReportListCapital={getReportListCapital}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
      />
    </>
  );
}
