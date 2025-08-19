import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserAccount from "./UserAccount";
import PropTypes from "prop-types";
import ModalDeleteSpervisor from "./ModalDeleteSpervisor";
import ModalEditSpervisor from "./ModalEditSpervisor";

ActionResponsive.propTypes = {
  supervisor: PropTypes.object,
  setflag: PropTypes.func,
  listProvince: PropTypes.array,
};
export default function ActionResponsive({
  supervisor,
  setflag,
  listProvince,
}) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openUserAccount, setOpenUserAccount] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
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
          <MenuItem onClick={() => setOpenEdit((e) => !e)}>
            <ModalEditSpervisor
              listProvince={listProvince}
              supervisor={supervisor}
              setflag={setflag}
              openEdit={openEdit}
            />
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpenUserAccount((e) => !e);
            }}
          >
            <UserAccount
              nationalId={supervisor.nationalId}
              openUserAccount={openUserAccount}
            />
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpenDel((e) => !e);
            }}
          >
            <ModalDeleteSpervisor
              id={supervisor.id}
              setFlag={setflag}
              openDel={openDel}
            />
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}
