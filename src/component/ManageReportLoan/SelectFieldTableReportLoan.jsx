import { IconButton, Menu } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;

const options = [
  { title: "ردیف", id: 1, width: 0.5 },
  { title: "کد", id: 2, width: 0.5 },
  { title: "عنوان تشکل", id: 3, width: 1.5 },
  { title: "وضعیت", id: 4, width: 0.6 },
  { title: "تاریخ جلسه", id: 5, width: 1 },
  { title: "شماره جلسه", id: 6, width: 0.5 },
  { title: "شماره قرارداد", id: 7, width: 1 },
  { title: "تاریخ قرارداد", id: 8, width: 1 },
  { title: "تاریخ پرداخت", id: 9, width: 1 },
  { title: "مبلغ تسهیلات", id: 10, width: 1.2 },
  { title: "نرخ کارمزد", id: 11, width: 1 },
  { title: "مدت", id: 12, width: 1 },
  { title: "تاریخ سررسید", id: 13, width: 1 },
  { title: "مقدار نهاده/کیلو", id: 14, width: 1 },
  { title: "قیمت هر کیلو", id: 15, width: 1 },
  { title: "کارمزد", id: 16, width: 1 },
  { title: "مبلغ بازپرداخت", id: 17, width: 1 },
  { title: "مبلغ ضمانت", id: 18, width: 1 },
  { title: "عواض", id: 19, width: 1 },
  { title: "مالیات", id: 20, width: 1 },
  { title: "مجموع", id: 21, width: 1 },
  { title: "تاریخ وصول", id: 22, width: 1 },
  { title: "وضعیت", id: 23, width: 0.7 },
];

SelectFieldTableReportLoan.propTypes = {
  setSelectedField: PropTypes.func,
};
export default function SelectFieldTableReportLoan({ setSelectedField }) {
  const [selectedOptions, setSelectedOptions] = useState([
    1, 3, 4, 5, 6, 7, 8, 9, 10, 13, 16, 23,
  ]);
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
              setSelectedOptions(
                options
                  .filter(
                    (item) => item.id === 1 || item.id === 3 || item.id === 10
                  )
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
              if (option.id !== 1 && option.id !== 3 && option.id !== 10) {
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
