import { Divider, Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { mainDomain } from "../../../utils/mainDomain";
import EditBasicInfoCooperative from "./EditBasicInfoCooperative";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setCooperativeId,
  setListProvince,
} from "../../../redux/slice/cooperative";

BasicInfoCooperative.propTypes = {
  flag: PropTypes.bool,
  setFlag: PropTypes.func,
};
export default function BasicInfoCooperative({ flag, setFlag }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(true);
  const [selectCooperative, setSelectCooperative] = useState({});
  const cooperativeId = useSelector((store) => store.cooperative.cooperativeId);
  const url = useLocation();
  const disPatch = useDispatch();
  useEffect(() => {
    if (cooperativeId === 0) {
      const id = url.pathname.substring(url.pathname.lastIndexOf("/") + 1);
      disPatch(setCooperativeId(id));
      axios
        .get(mainDomain + "/api/BasicInfo/Province", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          disPatch(setListProvince(res.data));
        })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (cooperativeId !== 0) {
      setIsLoading(true);
      axios
        .get(mainDomain + `/api/Cooperative/${cooperativeId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setSelectCooperative(res.data);

          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [flag, cooperativeId]);

  return (
    <>
      {!isLoading && (
        <div className="px-4 flex">
          <EditBasicInfoCooperative setFlag={setFlag} />
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-wrap">
          <div className="px-3 sm:w-1/2 w-full mt-2">
            <div
              className={
                themeMode === "dark"
                  ? "rounded-lg border shadow-lg bg-slate-700 pb-5"
                  : "rounded-lg border shadow-lg bg-white pb-5"
              }
            >
              <div
                style={{
                  background: themeColor.bgColor,
                  color: themeColor.color,
                }}
                className={
                  themeMode === "dark"
                    ? "rounded-t-lg flex justify-between px-2 py-5"
                    : "rounded-t-lg flex justify-between px-2 py-5"
                }
              >
                <span className="text-start">{selectCooperative.title}</span>
              </div>
              <div className="relative ">
                <div className="absolute top-0 right-5 rounded-full border-2 overflow-hidden -translate-y-1/3 bg-white">
                  <img
                    className="w-14 h-14 object-cover"
                    src="/images/partnership.png"
                    alt=""
                  />
                </div>
                <div className="pt-2">
                  {selectCooperative.status && (
                    <span className="text-xs text-emerald-600 bg-emerald-100 rounded-full px-3 py-1 absolute left-1/2 top-3 -translate-x-1/2">
                      {selectCooperative.status}
                    </span>
                  )}
                </div>
                <Divider className="pt-10" />
                <div className="pt-2 flex justify-between px-3">
                  <div>
                    <span className="text-xs"> شناسه ملی : </span>
                    <span className="text-sm text-[#6c757d]">
                      {selectCooperative.nationalId
                        ? selectCooperative.nationalId
                        : "---"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs">کد اقتصادی :</span>
                    <span className="text-sm text-[#6c757d]">
                      {selectCooperative.economicCode
                        ? selectCooperative.economicCode
                        : "---"}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className="pt-2 flex justify-between px-3">
                  <div>
                    <span className="text-xs"> تاریخ عضویت : </span>
                    <span className="text-sm text-[#6c757d]">
                      {selectCooperative.memberDateFa
                        ? selectCooperative.memberDateFa
                        : "---"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs"> تاریخ ثبت :</span>
                    <span className="text-sm text-[#6c757d]">
                      {selectCooperative.registerDateFa
                        ? selectCooperative.registerDateFa
                        : "---"}
                    </span>
                  </div>
                </div>
                <Divider />
                <div className="pt-2 flex justify-between px-3">
                  <div>
                    <span className="text-xs"> محل ثبت : </span>
                    <span className="text-sm text-[#6c757d]">
                      {selectCooperative.registerPlace
                        ? selectCooperative.registerPlace
                        : "---"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs"> شماره ثبت :</span>
                    <span className="text-sm text-[#6c757d]">
                      {selectCooperative.registerNumber
                        ? selectCooperative.registerNumber
                        : "---"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-3 sm:w-1/2 w-full mt-2">
            <div
              className={
                themeMode === "dark"
                  ? "rounded-lg border shadow-lg bg-slate-700 pb-3"
                  : "rounded-lg border shadow-lg bg-white pb-3"
              }
            >
              <div className="text-start p-4">
                <span>جزئیات بیشتر</span>
              </div>
              <Divider />
              <div className="pt-2 flex justify-between px-3">
                <div>
                  <span className="text-xs"> شماره ثابت : </span>
                  <span className="text-sm text-[#6c757d]">
                    {selectCooperative.tel ? selectCooperative.tel : "---"}
                  </span>
                </div>
                <div>
                  <span className="text-xs">شماره همراه :</span>
                  <span className="text-sm text-[#6c757d]">
                    {selectCooperative.mobile
                      ? selectCooperative.mobile
                      : "---"}
                  </span>
                </div>
              </div>
              <Divider />
              <div className="pt-2 flex justify-between px-3">
                <div>
                  <span className="text-xs"> فکس : </span>
                  <span className="text-sm text-[#6c757d]">
                    {selectCooperative.fax ? selectCooperative.fax : "---"}
                  </span>
                </div>
                <div>
                  <span className="text-xs"> کد پستی : </span>
                  <span className="text-sm text-[#6c757d]">
                    {selectCooperative.postalCode
                      ? selectCooperative.postalCode
                      : "---"}
                  </span>
                </div>
              </div>
              <Divider />
              <div className="pt-2 flex justify-between px-3">
                <div>
                  <span className="text-xs">ایمیل :</span>
                  <span className="text-sm text-[#6c757d]">
                    {selectCooperative.email ? selectCooperative.email : "---"}
                  </span>
                </div>
              </div>
              <Divider />
              <div className="pt-2 flex justify-between px-3">
                <div className="">
                  <span className="text-xs"> آدرس: </span>
                  <span className="text-sm text-[#6c757d] ">
                    {selectCooperative.address
                      ? selectCooperative.address
                      : "---"}
                  </span>
                </div>
              </div>
              <Divider />

              <div className="pt-2 flex justify-between px-3">
                <div>
                  <span className="text-xs">توضیحات : </span>
                  <span className="text-sm text-[#6c757d]">
                    {selectCooperative.description
                      ? selectCooperative.description
                      : "---"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div>
          <div className="w-24 px-2">
            <Skeleton animation="wave" height={70} />
          </div>
          <div className="flex flex-wrap">
            <div className="px-3 sm:w-1/2 w-full">
              <Skeleton variant="rounded" height={250} />
            </div>
            <div className="px-3 sm:w-1/2 w-full sm:mt-0 mt-3">
              <Skeleton variant="rounded" height={250} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
