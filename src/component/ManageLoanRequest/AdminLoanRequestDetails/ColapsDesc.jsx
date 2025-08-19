import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Collapse, Divider } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

ColapsDesc.propTypes = {
  item: PropTypes.object,
  helperText: PropTypes.string,
};
export default function ColapsDesc({ item, helperText }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <>
      <div>
        <div className="flex justify-between ">
          <div>
            <Button onClick={handleExpandClick}>
              <span className="text-xs cursor-pointer select-none text-teal-500">
                توضیحات بیشتر
              </span>
              <ExpandMoreIcon sx={{ color: "rgb(20 184 166)" , transform:expanded? 'rotate(180deg)' : 'rotate(0deg)' , transition:'0.3s'}} />
            </Button>
          </div>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <div
            className="text-[#777] text-justify px-2"
            dangerouslySetInnerHTML={{ __html: helperText }}
          />
          <Divider />
          <div className="text-[#0008]">
            <div className="flex items-center mt-1 px-2">
              <span className="text-sm">تاریخ ثبت درخواست :</span>
              <span className="text-sm px-1">{item.createdFa}</span>
            </div>
            <Divider />
            <div className="flex items-center mt-1 px-2">
              <span className="text-sm">آخرین ویرایش : </span>
              <span className="text-sm px-1">{item.modifiedFa}</span>
            </div>
            {item.fileDesc && <Divider />}
            {item.fileDesc && (
              <div className="flex items-center mt-1 px-2">
                <span>توضیح : </span>
                <span className="text-sm px-1">{item.fileDesc}</span>
              </div>
            )}
            {item.statusDesc && <Divider />}
            {item.statusDesc && (
              <div className="flex items-center mt-1 px-2">
                <span>توضیح مدیر : </span>
                <span className="text-sm px-1">{item.statusDesc}</span>
              </div>
            )}
          </div>
        </Collapse>
      </div>
    </>
  );
}
