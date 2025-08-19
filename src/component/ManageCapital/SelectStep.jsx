import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect } from "react";

SelectStep.propTypes = {
  getCapitalList: PropTypes.array,
  valStep: PropTypes.number,
  setValStep: PropTypes.func,
  setListCapital: PropTypes.func,
  steps: PropTypes.array,
};
export default function SelectStep({
  getCapitalList,
  valStep,
  setValStep,
  setListCapital,
  steps,
}) {
  useEffect(() => {
    if (steps[0]) {
      setValStep(steps[0]);
    }
  }, [steps]);
  return (
    <>
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
            setListCapital([]);
            getCapitalList({
              step: e.target.value,
            });
          }}
        >
          {steps.map((e) => (
            <MenuItem sx={{ fontSize: "12px" }} key={e} value={e}>
              {e}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
