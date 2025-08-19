import { Autocomplete, Box, TextField } from "@mui/material";
import PropTypes from "prop-types";

SelectProvince.propTypes = {
  getCapitalList: PropTypes.func,
  setListCapital: PropTypes.func,
  valProvince: PropTypes.object,
  setValProvince: PropTypes.func,
  listProvince: PropTypes.array,
};

export default function SelectProvince({
  getCapitalList,
  setListCapital,
  valProvince,
  setValProvince,
  listProvince,
}) {
  return (
    <>
      <Autocomplete
        size="small"
        disabled={listProvince.length === 0}
        className="w-full"
        value={valProvince}
        options={
          listProvince.length > 0
            ? [{ title: "همه استان ها", id: 0 }, ...listProvince]
            : [{ title: "همه استان ها", id: 0 }]
        }
        getOptionLabel={(option) => (option.title ? option.title : "")}
        onChange={(event, newValue) => {
          if (newValue) {
            setValProvince(newValue);
            setListCapital([]);
            getCapitalList({ provinceId: newValue.provinceId });
          }
          if (!newValue) {
            setValProvince("");
            setListCapital([]);
            getCapitalList({ provinceId: 0 });
          }
        }}
        freeSolo
        renderOption={(props, option) => (
          <Box key={option.id} sx={{ fontSize: 12 }} component="li" {...props}>
            {option.title ? option.title : ""}
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} label={"لیست استان ها"} />
        )}
      />
    </>
  );
}
