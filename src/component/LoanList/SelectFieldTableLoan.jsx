import { IconButton, Menu } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;

const options = [
  { title: "کد", id: 1 },
  { title: "تاریخ جلسه", id: 2 },
  { title: "شماره جلسه", id: 3 },
  { title: " شماره قرارداد", id: 4 },
  { title: " تاریخ قرارداد ", id: 5 },
  { title: "تاریخ پرداخت", id: 6 },
  { title: " نرخ کارمزد", id: 7 },
  { title: " مدت", id: 8 },
  { title: "تاریخ سررسید", id: 9 },
  { title: "مقدار نهاده/کیلو", id: 10 },
  { title: "  قیمت هر کیلو", id: 11 },
  { title: " کارمزد", id: 12 },
  { title: "  مبلغ بازپرداخت", id: 13 },
  { title: "  مبلغ ضمانت", id: 14 },
  { title: " عوارض", id: 15 },
  { title: " مالیات", id: 16 },
  { title: "مجموع", id: 17 },
  { title: "تاریخ وصول", id: 18 },
  { title: "وضعیت", id: 19 },
];

SelectFieldTableLoan.propTypes = {
  setSelectedField: PropTypes.func,
};
export default function SelectFieldTableLoan({ setSelectedField }) {
  const [selectedOptions, setSelectedOptions] = useState([2, 3, 4, 13]);
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
