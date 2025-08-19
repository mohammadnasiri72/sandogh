import { IconButton, Menu } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";

import { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;

const options = [
  { title: "کد درخواست", id: 1 },
  { title: "تعاونی", id: 2 },
  { title: "عنوان درخواست", id: 3 },
  { title: "وضعیت", id: 4 },
  { title: "تاریخ ثبت", id: 5 },
  { title: "آخرین ویرایش", id: 6 },
];

SelectFieldTableAdmin.propTypes = {
  setSelectedField: PropTypes.func,
};
export default function SelectFieldTableAdmin({ setSelectedField }) {
  const [selectedOptions, setSelectedOptions] = useState([1, 2, 3, 4, 5, 6]);
  useEffect(() => {
    const filteredArray = options.filter((item) =>
      selectedOptions.includes(item.id)
    );
    setSelectedField(filteredArray);
  }, [selectedOptions]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    // <div>
    //   <FormControl size="small" sx={{ width: 100 }}>
    //     <InputLabel size="small" id="demo-multiple-checkbox-label">
    //       نمایش
    //     </InputLabel>
    //     <Select
    //       size="small"
    //       labelId="demo-multiple-checkbox-label"
    //       id="demo-multiple-checkbox"
    //       multiple
    //       value={selectedOptions}
    //       onChange={handleChange}
    //       input={<OutlinedInput label="نمایش" />}
    //       renderValue={() => "نمایش"}
    //       MenuProps={MenuProps}
    //       sx={{ "& .MuiSelect-select": { fontSize: "12px" } }}
    //     >
    //       <MenuItem value="all" sx={{ margin: 0, padding: 0 }}>
    //         <Checkbox
    //           size="small"
    //           checked={selectedOptions.length === options.length}
    //           indeterminate={
    //             selectedOptions.length > 0 &&
    //             selectedOptions.length < options.length
    //           }
    //         />
    //         <ListItemText
    //           sx={{
    //             "& .MuiListItemText-primary": {
    //               fontSize: "12px",
    //               textAlign: "left",
    //             },
    //           }}
    //           primary="انتخاب همه"
    //         />
    //       </MenuItem>

    //       {options.map((option) => (
    //         <MenuItem
    //           key={option.id}
    //           value={option.id}
    //           sx={{ margin: 0, padding: 0 }}
    //         >
    //           <Checkbox
    //             size="small"
    //             checked={selectedOptions.includes(option.id)}
    //           />
    //           <ListItemText
    //             sx={{
    //               "& .MuiListItemText-primary": {
    //                 fontSize: "12px",
    //                 textAlign: "left",
    //               },
    //             }}
    //             primary={option.title}
    //           />
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   </FormControl>
    // </div>
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          "&:hover": { backgroundColor: "transparent" },
        }}
      >
       <img className="min-w-8 max-w-8" src="/images/Frame 954.svg" alt="" />
      </IconButton>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              paddingLeft: 10,
            },
          },
        }}
      >
        <MenuItem
          sx={{ fontSize: "12px" }}
          onClick={() => {
            if (selectedOptions.length === options.length) {
              setSelectedOptions([]);
            } else {
              setSelectedOptions(options.map((option) => option.id));
            }
          }}
        >
          <Checkbox
            size="small"
            checked={selectedOptions.length === options.length}
            indeterminate={
              selectedOptions.length > 0 &&
              selectedOptions.length < options.length
            }
          />
          انتخاب همه
        </MenuItem>
        {options.map((option) => (
          <MenuItem
            sx={{ fontSize: "12px" }}
            key={option.id}
            onClick={() => {
              if (selectedOptions.includes(option.id)) {
                setSelectedOptions(
                  selectedOptions.filter((e) => e !== option.id)
                );
              } else {
                setSelectedOptions([...selectedOptions, option.id]);
              }
            }}
          >
            <Checkbox
              size="small"
              checked={selectedOptions.includes(option.id)}
            />
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
