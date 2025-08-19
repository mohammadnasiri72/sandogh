import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

DelaydLoans.propTypes = {
  dataDashboard: PropTypes.object,
};
export default function DelaydLoans({ dataDashboard }) {
  const [steps, setSteps] = useState([]);
  const themeMode = useSelector((store) => store.setting.themeMode);
  useEffect(() => {
    if (dataDashboard.cooperativeDelaydLoans) {
      const arr = [];
      dataDashboard.cooperativeDelaydLoans.map((e) => {
        const obj = {};
        obj.label = e.loanMaturityFa;
        obj.description = e.cooperativeTitle;
        obj.amount = e.amount;
        obj.id = e.id;
        arr.push(obj);
      });
      setSteps(arr);
    }
  }, [dataDashboard]);
  const Navigate = useNavigate();
  return (
    <>
      <div className="flex font-semibold text-lg">
        تسهیلات معوق ({dataDashboard.cooperativeDelaydLoans[0].total})
      </div>
      <Box sx={{ maxWidth: 400, mx: "auto" }}>
        <Stepper orientation="vertical" nonLinear>
          {steps.map((step) => (
            <Step key={step.label} active completed>
              <StepLabel>
                <div
                  className={
                    themeMode === "dark" ? "text-[#fff8]" : "text-[#0008]"
                  }
                >
                  <span className="px-2">تاریخ سررسید :</span>
                  {step.label}
                </div>
              </StepLabel>
              <StepContent>
                <div
                  onClick={() => {
                    Navigate("/profile/AdminLoanList/edit", {
                      state: { myData: 2, page: 1, loanId: step.id },
                    });
                  }}
                  className="flex text-justify cursor-pointer hover:text-teal-500 duration-300"
                >
                  {step.description}
                </div>
                <div className="flex text-teal-500">
                  <span>مبلغ : </span>
                  <span className="font-semibold px-1">
                    {step.amount.toLocaleString()}
                  </span>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        <div className="">
          <Button
            onClick={() => {
              Navigate("/profile/AdminLoanList", {
                state: { myData: 2 },
              });
            }}
            sx={{ mr: 1 }}
          >
            بارگیری بیشتر
          </Button>
        </div>
      </Box>
    </>
  );
}
