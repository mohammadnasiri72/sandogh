import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoading,
  setListCooperative,
  setNumPages,
  setValRecordCooperative,
} from "../../redux/slice/cooperative";
import PropTypes from "prop-types";

SelectNumRecord.propTypes = { getCooperativeList: PropTypes.func };

export default function SelectNumRecord({ getCooperativeList }) {
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
  const disPatch = useDispatch();
  const valRecordCooperative = useSelector(
    (store) => store.cooperative.valRecordCooperative
  );

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
            disPatch(setValRecordCooperative(e.target.value));
            disPatch(setListCooperative([]));
            disPatch(setIsLoading(true));
            getCooperativeList({ pageSize: e.target.value * 25, page: 1 });
            disPatch(setNumPages(1));
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
