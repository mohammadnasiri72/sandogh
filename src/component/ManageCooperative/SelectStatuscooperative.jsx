import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoading,
  setListCooperative,
  setNumPages,
  setValStatusCooperative,
} from "../../redux/slice/cooperative";
import PropTypes from "prop-types";

SelectStatusCooperative.propTypes = { getCooperativeList: PropTypes.func };

export default function SelectStatusCooperative({ getCooperativeList }) {
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
  const disPatch = useDispatch();
  const valStatusCooperative = useSelector(
    (store) => store.cooperative.valStatusCooperative
  );

  return (
    <>
      <FormControl size="small" color="primary" className="w-full">
        <InputLabel
          color="primary"
          className="px-2"
          id="demo-simple-select-label"
        >
          نوع تعاونی
        </InputLabel>
        <Select
          size="small"
          className="w-full"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={valStatusCooperative}
          label="نوع تعاونی"
          color="primary"
          onChange={(e) => {
            disPatch(setValStatusCooperative(e.target.value));
            disPatch(setListCooperative([]));
            disPatch(setIsLoading(true));
            getCooperativeList({ statusId: e.target.value, page: 1 });
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
