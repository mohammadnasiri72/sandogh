import { IconButton, Menu } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setshowFieldTable } from "../../redux/slice/cooperative";

const ITEM_HEIGHT = 48;

const options = [
  { title: "عنوان", id: 1 },
  { title: "تاریخ عضویت", id: 2 },
  { title: "شماره ثبت", id: 3 },
  { title: "تاریخ ثبت", id: 4 },
  { title: "محل ثبت", id: 5 },
  { title: "شناسه ملی", id: 6 },
  { title: "کد سهامدار", id: 7 },
  { title: "کد اقتصادی", id: 8 },
  { title: "شماره همراه", id: 9 },
  { title: "شماره ثابت", id: 10 },
  { title: "فکس", id: 11 },
  { title: "وضعیت", id: 12 },
];

export default function SelectFieldTable() {
  const [selectedOptions, setSelectedOptions] = useState([1, 2, 3, 4, 5, 6 , 7]);
  const disPatch = useDispatch();
  useEffect(() => {
    const filteredArray = options.filter((item) =>
      selectedOptions.includes(item.id)
    );
    disPatch(setshowFieldTable(filteredArray));
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
        sx={{
          "&:hover": { backgroundColor: "transparent" },
        }}
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
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
