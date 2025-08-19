import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { mainDomain } from "../../utils/mainDomain";
import ModalAddCapitalAll from "./ModalAddCapitalAll";
import ModalDeleteStep from "./ModalDeleteStep";
import SearchBoxCooperative from "./SearchBoxCooperative";
import SelectPriorityCooperative from "./SelectPriorityCooperative";
import SelectProvince from "./SelectProvince";
import SelectStep from "./SelectStep";
import TableCapital from "./TableCapital";
import ModalFormCapitalAll from "./ModalFormCapitalAll";

export default function MainPageManageCapital() {
  const mainPageState = useSelector((store) => store.resetState.mainPageState);
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);
  const [listCapital, setListCapital] = useState([]);
  const [valStep, setValStep] = useState(-1);
  const [valProvince, setValProvince] = useState({
    title: "همه استان ها",
    id: 0,
  });


  const [valPriorityCooperative, setValPriorityCooperative] = useState(1);
  const [listProvince, setListProvince] = useState([]);
  const [steps, setSteps] = useState([]);
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);

  

  useEffect(() => {
    axios
      .get(mainDomain + "/api/Capital/Steps", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setSteps(res.data);
      })
      .catch(() => {});
  }, [flag]);

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

  //   get cooperative list
  const config = {
    method: "get",
    url: `${mainDomain}/api/Capital`,
    params: {
      step: valStep,
      provinceId: valProvince?.provinceId || 0,
      find: "",
      sortFilter: valPriorityCooperative,
      //   statusId: valStatusCooperative,
      //   find,
      // pageSize: valRecordCooperative * 25,
      // page: numPages,
    },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const getCapitalList = async (newParams) => {
    config.params = { ...config.params, ...newParams };
    setLoading(true);
    setListCapital([]);
    await axios(config)
      .then((res) => {
        setLoading(false);
        setListCapital(res.data);
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (valStep >= 0) {
      getCapitalList();
    }
  }, [mainPageState, valStep, flag2]);

  return (
    <>
      <div className="px-5">
        <div className="flex flex-wrap items-center mt-10">
          <div className="sm:w-1/5 w-full px-2 sm:hidden block">
            <SearchBoxCooperative
              getCapitalList={getCapitalList}
              setListCapital={setListCapital}
            />
          </div>
          <div className="sm:w-1/4 w-full px-2 sm:mt-0 mt-5">
            <SelectProvince
              getCapitalList={getCapitalList}
              setListCapital={setListCapital}
              valProvince={valProvince}
              setValProvince={setValProvince}
              listProvince={listProvince}
            />
          </div>
          <div className="sm:w-1/5 w-full px-2 sm:mt-0 mt-5">
            <SelectStep
              getCapitalList={getCapitalList}
              valStep={valStep}
              setValStep={setValStep}
              setListCapital={setListCapital}
              steps={steps}
            />
          </div>
          <div className="sm:w-1/5 w-full px-2 sm:block hidden ">
            <SearchBoxCooperative
              getCapitalList={getCapitalList}
              setListCapital={setListCapital}
            />
          </div>
          <div className="sm:w-1/5 w-full px-2 sm:mt-0 mt-5">
            <SelectPriorityCooperative
              listProvince={listProvince}
              listCapital={listCapital}
              valPriorityCooperative={valPriorityCooperative}
              setValPriorityCooperative={setValPriorityCooperative}
              setListCapital={setListCapital}
            />
          </div>
          {/* <div className="sm:w-[15%] w-full px-2 sm:mt-0 mt-5">
            <SelectNumRecord
              getCapitalList={getCapitalList}
              valRecordCooperative={valRecordCooperative}
              setValRecordCooperative={setValRecordCooperative}
              setListCapital={setListCapital}
              setNumPages={setNumPages}
            />
          </div> */}
        </div>
        {listCapital.length > 0 && (
          <div>
            <div className="flex flex-wrap justify-between px-3 py-1 mt-5">
              <div className="flex flex-wrap justify-center items-center gap-2 sm:w-auto w-full">
                <ModalAddCapitalAll level={steps[0] + 1} setFlag={setFlag} />
                <ModalFormCapitalAll valStep={valStep} />
              </div>

              <div className="sm:block hidden">
                <span className="text-xs">آخرین سرمایه صندوق: </span>
                <span className="font-semibold px-2">
                  {listCapital[0].capital.toLocaleString()}
                </span>
              </div>
              <ModalDeleteStep setFlag={setFlag} valStep={valStep} />

              {/* <Button
              // onClick={handleClickOpen}
              sx={{
                fontSize: "12px",
                minWidth: "35px",
                transition: "0.6s",
                color: "#fff",
                background: "red",
                boxShadow: "none",
              }}
            >
              <div className="flex items-center">
                <FaRegTrashAlt />
                <span className="px-1">حذف کلی مرحله فعلی</span>
              </div>
            </Button> */}
            </div>
            <div className="sm:hidden block ">
              <span className="text-xs">آخرین سرمایه صندوق: </span>
              <span className="font-semibold px-2">
                {listCapital[0].capital.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        <div className="px-2 test">
          <TableCapital
            loading={loading}
            listCapital={listCapital}
            listProvince={listProvince}
            setListCapital={setListCapital}
            steps={steps}
            setFlag={setFlag2}
          />
        </div>
      </div>
    </>
  );
}
