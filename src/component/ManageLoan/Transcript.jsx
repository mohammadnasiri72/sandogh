import { Box, Dialog, IconButton, Tab, Tabs, Tooltip } from "@mui/material";
import { SendIcon } from "lucide-react";
import PropTypes from "prop-types";
import * as React from "react";
import { CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";
import TabHistory from "./TabHistory";
import TabTranscript from "./TabTranscript";

Transcript.propTypes = {
  loan: PropTypes.object,
  ListCooperative: PropTypes.array,
};
export default function Transcript({ loan, ListCooperative }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [open, setOpen] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const disable =
    loan.contractTypeId === 1 ? loan.formStatus < 8 : loan.formStatus < 7;

  return (
    <>
      <div className="flex justify-start items-center">
        <Tooltip disabled={disable} title="رونوشت">
          <span>
            <IconButton
              disabled={disable}
              onClick={handleClickOpen}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <SendIcon
                className={`${
                  themeMode === "dark"
                    ? disable
                      ? "text-gray-200"
                      : "text-white"
                    : disable
                      ? "text-gray-200"
                      : "text-[#1787B0]"
                }`}
              />
            </IconButton>
          </span>
        </Tooltip>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="transcript-dialog-title"
        PaperProps={{
          sx: { width: "600px", maxWidth: "none", borderRadius: "12px" },
        }}
      >
        {/* هدر مودال */}
        <div
          className={
            themeMode === "dark"
              ? "flex justify-between px-5 items-center py-2 bg-slate-700 border-b border-slate-600"
              : "flex justify-between px-5 items-center py-2 bg-slate-50 border-b border-gray-200"
          }
        >
          <span className="text-xl font-medium">رونوشت</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>

        {/* تب‌ها */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="transcript tabs"
            sx={{
              "& .MuiTab-root": {
                fontSize: "14px",
                fontWeight: 500,
              },
              "& .Mui-selected": {
                color: "#1787B0",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#1787B0",
              },
            }}
          >
            <Tab label="رونوشت" id="tab-0" aria-controls="tabpanel-0" />
            <Tab label="سابقه" id="tab-1" aria-controls="tabpanel-1" />
          </Tabs>
        </Box>

        {/* پنل تب رونوشت */}
        <TabPanel value={tabValue} index={0}>
          <TabTranscript loan={loan} ListCooperative={ListCooperative} />
        </TabPanel>

        {/* پنل تب سابقه */}
        <TabPanel value={tabValue} index={1}>
          <TabHistory cooperativeId={loan.id} />
        </TabPanel>
      </Dialog>
    </>
  );
}

// کامپوننت کمکی برای نمایش پنل هر تب
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
