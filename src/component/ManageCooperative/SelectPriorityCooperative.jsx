import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoading,
  setListCooperative,
  setNumPages,
  setValPriorityCooperative,
} from "../../redux/slice/cooperative";
import PropTypes from "prop-types";

SelectPriorityCooperative.propTypes = { getCooperativeList: PropTypes.func };

export default function SelectPriorityCooperative({ getCooperativeList }) {
  const listStatusCooperative = [
    {
      id: 0,
      name: "اولویت نمایش",
    },
    {
      id: 7,
      name: "کد سهامدار",
    },

    {
      id: 1,
      name: "آخرین درج",
    },

    {
      id: 2,
      name: "آخرین ویرایش",
    },

    {
      id: 3,
      name: "عنوان صعودی",
    },
    {
      id: 4,
      name: "عنوان نزولی",
    },
    {
      id: 5,
      name: "عضویت صعودی",
    },
    {
      id: 6,
      name: "عضویت نزولی",
    },
  ];
  const disPatch = useDispatch();
  const valPriorityCooperative = useSelector(
    (store) => store.cooperative.valPriorityCooperative
  );

  return (
    <>
      <FormControl size="small" color="primary" className="w-full">
        <InputLabel
          color="primary"
          className="px-2"
          id="demo-simple-select-label"
        >
          مرتب سازی
        </InputLabel>
        <Select
          size="small"
          className="w-full"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={valPriorityCooperative}
          label="مرتب سازی"
          color="primary"
          onChange={(e) => {
            disPatch(setValPriorityCooperative(e.target.value));
            disPatch(setListCooperative([]));
            disPatch(setIsLoading(true));
            getCooperativeList({ sortFilter: e.target.value, page: 1 });
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
