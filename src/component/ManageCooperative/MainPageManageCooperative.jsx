import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoading,
  setListCooperative,
  setListProvince,
} from "../../redux/slice/cooperative";
import { mainDomain } from "../../utils/mainDomain";
import ModalAddCooperative from "./ModalAddCooperative";
import SearchBoxCooperative from "./SearchBoxCooperative";
import SelectFieldTable from "./SelectFieldTable";
import SelectNumRecord from "./SelectNumRecord";
import SelectPriorityCooperative from "./SelectPriorityCooperative";
import SelectProvince from "./SelectProvince";
import SelectStatusCooperative from "./SelectStatuscooperative";
import TableCooperative from "./TableCooperative";
import { Skeleton } from "@mui/material";

export default function MainPageManageCooperative() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoading = useSelector((store) => store.cooperative.isLoading);
  const valStatusCooperative = useSelector(
    (store) => store.cooperative.valStatusCooperative
  );
  const valProvince = useSelector((store) => store.cooperative.valProvince);
  const find = useSelector((store) => store.cooperative.find);

  const valRecordCooperative = useSelector(
    (store) => store.cooperative.valRecordCooperative
  );
  const numPages = useSelector((store) => store.cooperative.numPages);
  const mainPageState = useSelector((store) => store.resetState.mainPageState);

  const valPriorityCooperative = useSelector(
    (store) => store.cooperative.valPriorityCooperative
  );

  const dispatch = useDispatch();

  

  //   get cooperative list
  const config = {
    method: "get",
    url: `${mainDomain}/api/Cooperative`,
    params: {
      statusId: valStatusCooperative,
      provinceId: valProvince?.provinceId || 0,
      find,
      sortFilter: valPriorityCooperative,
      pageSize: valRecordCooperative * 25,
      page: numPages,
    },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const getCooperativeList = async (newParams) => {
    config.params = { ...config.params, ...newParams };
    dispatch(setIsLoading(true));
    dispatch(setListCooperative([]));
    await axios(config)
      .then((res) => {
        dispatch(setIsLoading(false));
        dispatch(setListCooperative(res.data));
      })
      .catch(() => {
        dispatch(setIsLoading(false));
      });
  };

  useEffect(() => {
    getCooperativeList();
  }, [mainPageState]);

  // get Province
  useEffect(() => {
    axios
      .get(mainDomain + "/api/BasicInfo/Province", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        dispatch(setListProvince(res.data));
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <div className="px-5">
        <div className="flex flex-wrap items-center mt-10">
          <div className="sm:w-1/5 w-full px-2 sm:hidden block">
            <SearchBoxCooperative getCooperativeList={getCooperativeList} />
          </div>
          <div className="sm:w-1/4 w-full px-2 sm:mt-0 mt-5">
            <SelectProvince getCooperativeList={getCooperativeList} />
          </div>
          <div className="sm:w-1/5 w-full px-2 sm:mt-0 mt-5">
            <SelectStatusCooperative getCooperativeList={getCooperativeList} />
          </div>
          <div className="sm:w-1/5 w-full px-2 sm:block hidden">
            <SearchBoxCooperative getCooperativeList={getCooperativeList} />
          </div>
          <div className="sm:w-1/5 w-full px-2 sm:mt-0 mt-5">
            <SelectPriorityCooperative
              getCooperativeList={getCooperativeList}
            />
          </div>
          <div className="sm:w-[15%] w-full px-2 sm:mt-0 mt-5">
            <SelectNumRecord getCooperativeList={getCooperativeList} />
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 px-2">
          <div className="flex items-center">
            {!isLoading && (
              <ModalAddCooperative getCooperativeList={getCooperativeList} />
            )}
            {isLoading && (
              <div className="py-1">
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  height={33}
                  width={60}
                />
              </div>
            )}
          </div>
          {!isLoading && (
            <div className="px-1">
              <SelectFieldTable />
            </div>
          )}
          {isLoading && (
            <div className="py-1">
              <Skeleton
                animation="wave"
                variant="rounded"
                height={33}
                width={33}
              />
            </div>
          )}
        </div>
        <TableCooperative getCooperativeList={getCooperativeList} />
      </div>
    </>
  );
}
