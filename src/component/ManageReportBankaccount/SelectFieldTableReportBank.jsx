import { IconButton, Menu } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;

const options = [
  { title: "ردیف", id: 1, width: 0.5 },
  { title: "اولویت نمایش", id: 2, width: 0.5 },
  { title: "استان", id: 3, width: 0.5 },
  { title: "کد استان", id: 4, width: 0.5 },
  { title: "تشکل", id: 5, width: 2 },
  { title: "وضعیت", id: 6, width: 0.5 },
  { title: "نام بانک", id: 7, width: 1 },
  { title: "شعبه بانک", id: 8, width: 1 },
  { title: "شماره حساب", id: 9, width: 1 },
  { title: "شماره شبا", id: 10, width: 2 },
  { title: "ویرایش", id: 11, width: 1 },
];

SelectFieldTableReportBank.propTypes = {
  setSelectedField: PropTypes.func,
};
export default function SelectFieldTableReportBank({ setSelectedField }) {
  const [selectedOptions, setSelectedOptions] = useState([1, 3, 4, 5, 6, 7, 8]);
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
    <div>
      {/* <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <FilterListIcon />
      </IconButton> */}
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
              // setSelectedOptions([]);
              setSelectedOptions(
                options
                  .filter((item) => item.id === 1 || item.id === 2)
                  .map((option) => option.id)
              );
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
              if (option.id !== 1 && option.id !== 2) {
                if (selectedOptions.includes(option.id)) {
                  setSelectedOptions(
                    selectedOptions.filter((e) => e !== option.id)
                  );
                } else {
                  setSelectedOptions([...selectedOptions, option.id]);
                }
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
