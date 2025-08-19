import * as React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

MessageAdmin.propTypes = {
  dataDashboard: PropTypes.array,
};
export default function MessageAdmin({ dataDashboard }) {
  const [steps, setSteps] = React.useState([]);

  React.useEffect(() => {
    if (dataDashboard.cooperativeNotifyList) {
      const arr = [];
      dataDashboard.cooperativeNotifyList.map((e) => {
        const obj = {};
        obj.label = e.createdFa;
        obj.description = e.title;
        obj.body = e.body;
        arr.push(obj);
      });
      setSteps(arr);
    }
  }, [dataDashboard]);
  
  return (
    <>
      <div className="flex font-semibold text-lg">پیام های سیستم</div>
      <Box sx={{ maxWidth: 400, mx: "auto" }}>
        <Stepper orientation="vertical" nonLinear>
          {steps.map((step) => (
            <Step key={step.label} active completed>
              <StepLabel>
                <span className="px-2">ارسال شده در</span>
                {step.label}
              </StepLabel>
              <StepContent>
                <div className="flex">{step.description}</div>
                <Box>
                  <div className="flex">
                    <Button
                      onClick={() => {
                        Swal.fire({
                          title: step.description,
                          text: step.body,
                          icon: "info",
                        });
                      }}
                      sx={{ mr: 1 }}
                    >
                      مشاهده پیام
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </>
  );
}
