import { Box, Dialog, IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { CiViewList } from "react-icons/ci";
import { useSelector } from "react-redux";
import TabHistory from "../../ManageLoan/TabHistory";

ModalDetailsHistory.propTypes = {
  loan: PropTypes.object,
  cooperativeId: PropTypes.number,
};
function ModalDetailsHistory({ cooperativeId }) {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="flex justify-start items-center">
        <Tooltip title="سابقه رونوشت">
          <span>
            <IconButton
              onClick={handleClickOpen}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <CiViewList
                className={`${
                  themeMode === "dark" ? "text-white" : "text-[#1787B0]"
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
          <span className="text-xl font-medium">سابقه رونوشت</span>
          <IconButton onClick={handleClose}>
            <CgClose className="text-xl" />
          </IconButton>
        </div>

        {/* تب‌ها */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}>
          <TabHistory cooperativeId={cooperativeId} />
        </Box>
      </Dialog>
    </>
  );
}

export default ModalDetailsHistory;
