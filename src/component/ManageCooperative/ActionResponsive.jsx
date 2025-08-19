import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import * as React from "react";
import { useSelector } from "react-redux";
import ConfirmDelete from "./ConfirmDelete";
import UserAccount from "./UserAccount";

ActionResponsive.propTypes = {
  cooperative: PropTypes.object,
  goToDetail: PropTypes.func,
  getCooperativeList: PropTypes.func,
};
export default function ActionResponsive({
  cooperative,
  goToDetail,
  getCooperativeList,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDel, setOpenDel] = React.useState(false);
  const [openUserAccount, setOpenUserAccount] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: themeMode === "dark" ? "#fff" : "#000" }}
      >
        ...
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            goToDetail(cooperative.id);
          }}
        >
          <div
            className={
              themeMode === "dark"
                ? "text-[#fff8] flex items-center "
                : "text-[#0008] flex items-center "
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M21.25 9.06449C18.94 5.46842 15.56 3.39795 12 3.39795C10.22 3.39795 8.49 3.91309 6.91 4.87402C5.33 5.84487 3.91 7.2615 2.75 9.06449C1.75 10.6198 1.75 13.146 2.75 14.7013C5.06 18.3073 8.44 20.3679 12 20.3679C13.78 20.3679 15.51 19.8527 17.09 18.8918C18.67 17.9209 20.09 16.5043 21.25 14.7013C22.25 13.1559 22.25 10.6198 21.25 9.06449ZM12 15.8901C9.76 15.8901 7.96 14.097 7.96 11.8879C7.96 9.6787 9.76 7.88561 12 7.88561C14.24 7.88561 16.04 9.6787 16.04 11.8879C16.04 14.097 14.24 15.8901 12 15.8901Z"
                fill="#1787B0"
              />
              <path
                d="M12 9.05457C10.43 9.05457 9.15002 10.3226 9.15002 11.8878C9.15002 13.4432 10.43 14.7112 12 14.7112C13.57 14.7112 14.86 13.4432 14.86 11.8878C14.86 10.3325 13.57 9.05457 12 9.05457Z"
                fill="#1787B0"
              />
            </svg>
            <span className="text-xs px-1 text-[#1787B0]">مشاهده جزئیات</span>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenUserAccount((e) => !e);
          }}
        >
          <UserAccount
            nationalId={cooperative.nationalId}
            openUserAccount={openUserAccount}
          />
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDel((e) => !e);
          }}
        >
          <ConfirmDelete
            openDel={openDel}
            id={cooperative.id}
            getCooperativeList={getCooperativeList}
          />
        </MenuItem>
      </Menu>
    </div>
  );
}
