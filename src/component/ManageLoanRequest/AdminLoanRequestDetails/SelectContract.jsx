import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import * as React from "react";
import { useSelector } from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

SelectContract.propTypes = {
  setMobileList: PropTypes.func,
};
export default function SelectContract({ setMobileList }) {
  const [personName, setPersonName] = React.useState([]);
  const loanRequestData = useSelector(
    (store) => store.adminLoanRequest.loanRequestData
  );
  React.useEffect(() => {
    setMobileList(personName.map((item) => item.mobile));
  }, [personName]);

  React.useEffect(() => {
    if (loanRequestData.loanRequestDto) {
      const idArray = loanRequestData.loanRequestDto.contractingParties
        .split(",")
        .map((id) => parseInt(id, 10));
      const filteredData = loanRequestData.cooperativeMemberList.filter(
        (item) => idArray.includes(Number(item.mobile))
      );
      setPersonName(filteredData);
    }
  }, [loanRequestData]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
  };
  return (
    <div className="w-full">
      <FormControl sx={{ width: "100%" }}>
        <InputLabel size="small" id="demo-multiple-chip-label">
          طرف های قرارداد
        </InputLabel>
        <Select
          size="small"
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="طرف های قرارداد" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  size="small"
                  key={value.id}
                  label={value.name + " " + value.family}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {loanRequestData.cooperativeMemberList &&
            loanRequestData.cooperativeMemberList.map((name) => (
              <MenuItem
                key={name.id}
                value={name}
                // style={getStyles(name, personName, theme)}
              >
                {name.name} {name.family}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
