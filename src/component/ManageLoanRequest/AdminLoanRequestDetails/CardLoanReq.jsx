import { Divider } from "@mui/material";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import SpeedDialFile from "../SpeedDialFile";
import ColapsDesc from "./ColapsDesc";
import ModalConfirmLoanReq from "./ModalConfirmLoanReq";
import ModalRejectLoanReq from "./ModalRejectLoanReq";

CardLoanReq.propTypes = {
  item: PropTypes.object,
  setFlag: PropTypes.func,
};
export default function CardLoanReq({ item, setFlag }) {
  const loanRequestData = useSelector(
    (store) => store.adminLoanRequest.loanRequestData
  );

  const filesItem = loanRequestData.cooperativeLoanDocs.filter(
    (e) => e.itemId === item.id
  );

  return (
    <Card sx={{ width: "100%" }}>
      <div className="bg-slate-50 py-2">
        <span>{item.title}</span>
      </div>

      <div>
        {filesItem.length > 0 &&
          filesItem
            // .filter((e) => e.status !== 1)
            .map((e) => (
              <div key={e.id}>
                <div className="flex justify-between px-1 relative py-3">
                  <div className="mt-12">
                    <SpeedDialFile e={e} />
                  </div>
                  <div>
                    {e.status === 1 && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="text-teal-500 bg-teal-50 rounded-full px-2 select-none">
                          جدید
                        </span>
                      </div>
                    )}
                    {e.status === 2 && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="text-yellow-600 bg-yellow-50 rounded-full px-2 select-none">
                          در حال بررسی
                        </span>
                      </div>
                    )}
                    {e.status === 3 && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="text-red-600 bg-red-50 rounded-full px-2 select-none">
                          رد شده
                        </span>
                      </div>
                    )}
                    {e.status === 4 && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="text-emerald-600 bg-emerald-50 rounded-full px-2 select-none">
                          تایید شده
                        </span>
                      </div>
                    )}
                    {e.status === 5 && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="text-orange-600 bg-orange-50 rounded-full px-2 select-none">
                          آرشیو شده
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="px-1 flex items-center justify-center -mt-3">
                    <ModalConfirmLoanReq id={e.id} setFlag={setFlag} />
                    <ModalRejectLoanReq id={e.id} setFlag={setFlag} />
                  </div>
                </div>
                <Divider />

                <ColapsDesc item={e} helperText={item.body} />
                <Divider />
              </div>
            ))}
      </div>
    </Card>
  );
}
