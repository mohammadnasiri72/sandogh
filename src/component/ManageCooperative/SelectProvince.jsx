import { Autocomplete, Box, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoading,
  setListCooperative,
  setNumPages,
  setValProvince,
} from "../../redux/slice/cooperative";

SelectProvince.propTypes = { getCooperativeList: PropTypes.func };

export default function SelectProvince({ getCooperativeList }) {
  const dispatch = useDispatch();

  const listProvince = useSelector((store) => store.cooperative.listProvince);
  const valProvince = useSelector((store) => store.cooperative.valProvince);
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
            dispatch(setValProvince(newValue));
            dispatch(setListCooperative([]));
            dispatch(setIsLoading(true));
            getCooperativeList({ provinceId: newValue.provinceId, page: 1 });
            dispatch(setNumPages(1));
          }
          if (!newValue) {
            dispatch(setValProvince(""));
            getCooperativeList({ provinceId: 0, page: 1 });
            dispatch(setNumPages(1));
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
