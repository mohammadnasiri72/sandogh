import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import * as React from "react";
import ConfirmDeleteLoanRequest from "./ConfirmDeleteLoanRequest";
import { useState } from "react";
import ModalDetailsFormLoanRequest from "./ModalDetailsFormLoanRequest";
import ModalDetailsFormContract from "./ModalDetailsFormContract";
import ModalDetailsFormPaymentOrder from "./ModalDetailsFormPaymentOrder";
import ModalDetailsFormInvoice from "./ModalDetailsFormInvoice";

ActionResponsive.propTypes = {
  getLoanRequestList: PropTypes.func,
  goToDetail: PropTypes.func,
  e: PropTypes.object,
};
export default function ActionResponsive({
  goToDetail,
  e,
  getLoanRequestList,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDel, setOpenDel] = React.useState(false);
  const [openVisitFile, setOpenVisitFile] = React.useState(false);
  const [openFormLoanRequest, setOpenFormLoanRequest] = useState(false);
  const [openFormContract, setOpenFormContract] = useState(false);
  const [openFormPaymentOrder, setOpenFormPaymentOrder] = useState(false);
  const [openFormInvoice, setOpenFormInvoice] = useState(false);
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
      >
        ...
      </Button>
      <Menu
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: 40 * 4.5,
              width: "200px",
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            goToDetail(e.id);
          }}
        >
          <div className="flex items-center">
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
        {e.status !== 2 && e.status !== 4 && (
          <MenuItem
            onClick={() => {
              setOpenDel((e) => !e);
            }}
          >
            <ConfirmDeleteLoanRequest
              id={e.id}
              getLoanRequestList={getLoanRequestList}
              openDel={openDel}
            />
          </MenuItem>
        )}
        {e.status === 5 && (
          // <MenuItem
          //   onClick={() => {
          //     setOpenVisitFile((e) => !e);
          //   }}
          // >
          //   <ArchiveFormsRes loan={e} open={openVisitFile} setOpen={setOpenVisitFile}/>
          // </MenuItem>
          <List
            sx={{ width: "100%", p: 0, m: 0 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton
              sx={{ px: 1, py: 0, m: 0 }}
              onClick={() => {
                setOpenVisitFile((e) => !e);
              }}
            >
              <IconButton>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M16.24 3.65002H7.76C5.29 3.65002 3.29 5.66002 3.29 8.12002V17.53C3.29 19.99 5.3 22 7.76 22H16.23C18.7 22 20.7 19.99 20.7 17.53V8.12002C20.71 5.65002 18.7 3.65002 16.24 3.65002Z"
                    fill="#34c38f"
                  />
                  <path
                    d="M14.35 2H9.65C8.61 2 7.76 2.84 7.76 3.88V4.82C7.76 5.86 8.6 6.7 9.64 6.7H14.35C15.39 6.7 16.23 5.86 16.23 4.82V3.88C16.24 2.84 15.39 2 14.35 2Z"
                    fill="#34c38f"
                  />
                  <path
                    d="M15 12.95H8C7.59 12.95 7.25 12.61 7.25 12.2C7.25 11.79 7.59 11.45 8 11.45H15C15.41 11.45 15.75 11.79 15.75 12.2C15.75 12.61 15.41 12.95 15 12.95Z"
                    fill="#34c38f"
                  />
                  <path
                    d="M12.38 16.95H8C7.59 16.95 7.25 16.61 7.25 16.2C7.25 15.79 7.59 15.45 8 15.45H12.38C12.79 15.45 13.13 15.79 13.13 16.2C13.13 16.61 12.79 16.95 12.38 16.95Z"
                    fill="#34c38f"
                  />
                </svg>
              </IconButton>
              <ListItemText
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "12px",
                    color: "#34c38f",
                  },
                }}
                primary="مشاهده فرم ها"
              />
              {openVisitFile ? (
                <ExpandLess sx={{ color: "#34c38f" }} fontSize="small" />
              ) : (
                <ExpandMore sx={{ color: "#34c38f" }} fontSize="small" />
              )}
            </ListItemButton>
            <Collapse in={openVisitFile} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ p: 0, m: 0 }}>
                <ListItemButton
                  onClick={() => {
                    setOpenFormLoanRequest((e) => !e);
                  }}
                  sx={{ py: 1, my: 0, pl: 4 }}
                >
                  <ListItemText
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "12px",
                      },
                    }}
                    primary="فرم درخواست تسهیلات"
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => {
                    setOpenFormContract((e) => !e);
                  }}
                  sx={{ py: 1, my: 0, pl: 4 }}
                >
                  <ListItemText
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "12px",
                      },
                    }}
                    primary="فرم قرارداد"
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => {
                    setOpenFormPaymentOrder((e) => !e);
                  }}
                  sx={{ py: 1, my: 0, pl: 4 }}
                >
                  <ListItemText
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "12px",
                      },
                    }}
                    primary="فرم دستور پرداخت"
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => {
                    setOpenFormInvoice((e) => !e);
                  }}
                  sx={{ py: 1, my: 0, pl: 4 }}
                >
                  <ListItemText
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "12px",
                      },
                    }}
                    primary="فرم صورت حساب"
                  />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        )}
      </Menu>

       <ModalDetailsFormLoanRequest
              open={openFormLoanRequest}
              setOpen={setOpenFormLoanRequest}
              loan={e}
            />
            <ModalDetailsFormContract
              open={openFormContract}
              setOpen={setOpenFormContract}
              loan={e}
            />
            <ModalDetailsFormPaymentOrder
              open={openFormPaymentOrder}
              setOpen={setOpenFormPaymentOrder}
              loan={e}
            />
            <ModalDetailsFormInvoice
              open={openFormInvoice}
              setOpen={setOpenFormInvoice}
              loan={e}
            />
    </div>
  );
}
