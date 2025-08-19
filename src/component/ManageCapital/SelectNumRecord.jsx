import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";

SelectNumRecord.propTypes = {
  getCapitalList: PropTypes.func,
  setValRecordCooperative: PropTypes.func,
  valRecordCooperative: PropTypes.number,
  setListCapital: PropTypes.func,
};

export default function SelectNumRecord({
  getCapitalList,
  valRecordCooperative,
  setValRecordCooperative,
  setListCapital,
}) {
  const listStatusCooperative = [
    {
      id: 1,
      name: "25",
    },
    {
      id: 2,
      name: "50",
    },
    {
      id: 3,
      name: "75",
    },
    {
      id: 4,
      name: "100",
    },
  ];

  return (
    <>
      <FormControl size="small" color="primary" className="w-full">
        <InputLabel
          color="primary"
          className="px-2"
          id="demo-simple-select-label"
        >
          رکورد
        </InputLabel>
        <Select
          size="small"
          className="w-full"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={valRecordCooperative}
          label="رکورد"
          color="primary"
          onChange={(e) => {
            setValRecordCooperative(e.target.value);
            setListCapital([]);
            getCapitalList({ pageSize: e.target.value * 25 });
          }}
        >
          {listStatusCooperative.map((e) => (
            <MenuItem sx={{ fontSize: "12px" }} key={e.id} value={e.id}>
              {e.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
