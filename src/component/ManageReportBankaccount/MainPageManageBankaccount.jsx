import {
  Autocomplete,
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { mainDomain } from "../../utils/mainDomain";
import TableReportBank from "./TableReportBank";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function MainPageManageBankaccount() {
  const user = JSON.parse(localStorage.getItem("user"));
  const mainPageState = useSelector((store) => store.resetState.mainPageState);
  const [isLoading, setIsLoading] = useState(false);
  const [listProvince, setListProvince] = useState([]);
  const [valProvince, setValProvince] = useState({
    title: "همه استان ها",
    id: 0,
  });
  const [valStatusCooperative, setValStatusCooperative] = useState(0);
  const [valDir, setValDir] = useState(0);
  const [valSort, setValSort] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [isLoadingExcel, setIsLoadingExcel] = useState(false);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [listReportBank, setListReportBank] = useState([]);
  const [selectedField, setSelectedField] = useState([]);
  const [selectedCols, setSelectedCols] = useState([]);
  const [selectedColsWidth, setSelectedColsWidth] = useState([]);

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  useEffect(() => {
    setSelectedCols(selectedField.map((item) => item.title));
    setSelectedColsWidth(selectedField.map((item) => item.width));
  }, [selectedField]);

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
      name: "نام استان",
    },
    {
      id: 2,
      name: "کد استان",
    },
    {
      id: 3,
      name: "نام تشکل",
    },
    {
      id: 4,
      name: "ویرایش",
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

  //  get ReportListLoan
  const config = {
    method: "get",
    url: `${mainDomain}/api/Report/BankAccount`,
    params: {
      provinceId: valProvince.provinceId,
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

  const getReportListLoan = async (newParams) => {
    config.params = { ...config.params, ...newParams };
    setListReportBank([]);
    setIsLoading(true);
    await axios(config)
      .then((res) => {
        setIsLoading(false);
        setListReportBank(res.data.cooperativeBankAccounts);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getReportListLoan();
  }, [mainPageState]);
  // get Excel
  const getDataExcel = () => {
    const data = {
      selectedCols,
      selectedColsWidth,
      provinceId: Number(valProvince.provinceId) || 0,
      statusId: valStatusCooperative,

      sortFilter: valSort,
      sortDir: valDir,
      fileExtenstion: ".xlsx",
    };

    setIsLoadingExcel(true);
    axios
      .post(mainDomain + "/api/Report/BankAccount/Export", data, {
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
    const dataSelectedCols = new FormData();
    selectedCols.map((ev) => {
      dataSelectedCols.append("selectedCols", ev);
      return true;
    });
    const data = {
      selectedCols,
      selectedColsWidth,
      provinceId: Number(valProvince.provinceId) || 0,
      statusId: valStatusCooperative,

      sortFilter: valSort,
      sortDir: valDir,
      fileExtenstion: ".pdf",
    };
    setIsLoadingPdf(true);
    axios
      .post(mainDomain + "/api/Report/BankAccount/Export", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const a = document.createElement("a");
        a.href = mainDomain + res.data;
        a.download = "";
        document.body.appendChild(a);
        a.target = "_blank";
        a.rel = "noopener noreferrer";
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
        <div className="sm:w-1/3 w-full px-2 sm:mt-0 mt-3">
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
                getReportListLoan({ provinceId: newValue.provinceId, page: 1 });
                setPageIndex(1);
              }
              if (!newValue) {
                setValProvince("");
                getReportListLoan({ provinceId: 0, page: 1 });
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
        <div className="sm:w-1/6 w-full px-2 sm:mt-0 mt-3">
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
                getReportListLoan({
                  statusId: e.target.value,
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
        <div className="sm:w-1/6 w-full px-2 sm:mt-0 mt-3">
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
                getReportListLoan({
                  sortFilter: e.target.value,
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
        <div className="sm:w-1/6 w-full px-2 sm:mt-0 mt-3">
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
                getReportListLoan({
                  sortDir: e.target.value,
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
              label=" تعداد رکورد"
              color="primary"
              onChange={(e) => {
                setPageSize(e.target.value);
                getReportListLoan({
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
      </div>
      <div className="py-3">
        <Divider />
      </div>

      <TableReportBank
        listReportBank={listReportBank}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageIndex={setPageIndex}
        isLoading={isLoading}
        getReportListLoan={getReportListLoan}
        isLoadingExcel={isLoadingExcel}
        isLoadingPdf={isLoadingPdf}
        getDataExcel={getDataExcel}
        getDataPDF={getDataPDF}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
      />
    </>
  );
}
