import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";

SelectPriorityCooperative.propTypes = {
  listCapital: PropTypes.array,
  listProvince: PropTypes.array,
  valPriorityCooperative: PropTypes.number,
  setValPriorityCooperative: PropTypes.func,
  setListCapital: PropTypes.func,
};

export default function SelectPriorityCooperative({
  valPriorityCooperative,
  setValPriorityCooperative,
  setListCapital,
  listCapital,
  listProvince,
}) {
  const listStatusCooperative = [
    {
      id: 1,
      name: "کد سهامدار",
    },
    {
      id: 2,
      name: "نام استان",
    },
    {
      id: 3,
      name: "اولویت نمایش",
    },
  ];


  // shareHolderCode

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
            setValPriorityCooperative(e.target.value);
            if (e.target.value === 1) {
              setListCapital(
                listCapital.sort(
                  (a, b) => a.shareHolderCode - b.shareHolderCode
                )
              );
            }
            if (e.target.value === 2) {
              setListCapital(
                listCapital.sort((a, b) => {
                  const titleA =
                    listProvince.find(
                      (t) => Number(t.provinceId) === a.provinceId
                    )?.title || "";
                  const titleB =
                    listProvince.find(
                      (t) => Number(t.provinceId) === b.provinceId
                    )?.title || "";

                  return titleA.localeCompare(titleB);
                })
              );
            }
            if (e.target.value === 3) {
              setListCapital(
                listCapital.sort((a, b) => a.priority - b.priority)
              );
            }
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
