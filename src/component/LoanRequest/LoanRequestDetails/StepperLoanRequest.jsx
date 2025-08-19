import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Alert, Step, StepLabel, Stepper } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/styles";
import PropTypes from "prop-types";
import * as React from "react";
import { BiSolidUserRectangle } from "react-icons/bi";
import { HiClipboardDocumentList, HiUserGroup } from "react-icons/hi2";
import { MdFeaturedPlayList, MdOutlineAttachFile } from "react-icons/md";
import {
  PiListChecksFill,
  PiListFill,
  PiListPlusFill,
  PiListStarFill,
} from "react-icons/pi";
import {
  RiFileList2Fill,
  RiFileList3Fill,
  RiFileListFill,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import ConfirmSubmit from "./ConfirmSubmit";
import ModalAddDetailsCheq from "./ModalAddDetailsCheq";
import ModalAddDetailsFile from "./ModalAddDetailsFile";
import ModalAddDetailsLetter from "./ModalAddDetailsLetter";
import TableFileLoan from "./TableFileLoan";
import { Progress } from "antd";

StepperLoanRequest.propTypes = {
  setFlag: PropTypes.func,
  loading: PropTypes.bool,
  activeStep: PropTypes.number,
  setActiveStep: PropTypes.func,
  loanDocs: PropTypes.array,
  setLoanDocs: PropTypes.func,
};
export default function StepperLoanRequest({
  setFlag,
  loading,
  activeStep,
  setActiveStep,
  loanDocs,
  setLoanDocs,
}) {
  const loanRequestData = useSelector(
    (store) => store.loanRequest.loanRequestData
  );
  const theme = useTheme();
  const themeColor = useSelector((store) => store.setting.themeColor);

  const [filteredArray, setFilteredArray] = React.useState([]);
  const maxSteps = loanRequestData.loanRequestItems
    ? loanRequestData.loanRequestItems.length
    : 0;


  React.useEffect(() => {
    if (loanRequestData.loanRequestDto) {
      setFilteredArray(
        loanRequestData.loanRequestItems
          .filter((item) => {
            return !loanRequestData.cooperativeLoanDocs.some(
              (obj) => obj.itemId === item.id
            );
          })
          .filter((item) => {
            return !loanRequestData.cooperativeFileList.some(
              (obj) => obj.itemId === item.id
            );
          })
      );
    }
  }, [loanRequestData]);

  React.useEffect(() => {
    if (
      loanRequestData.cooperativeFileList.find(
        (e) => e.itemId === loanRequestData.loanRequestItems[activeStep].id
      )
    ) {
      setLoanDocs(
        loanRequestData.cooperativeLoanDocs.filter(
          (e) => e.itemId === loanRequestData.loanRequestItems[activeStep].id
        )
      );
    } else if (loanRequestData.loanRequestItems) {
      setLoanDocs(
        loanRequestData.cooperativeLoanDocs.filter(
          (e) => e.itemId === loanRequestData.loanRequestItems[activeStep].id
        )
      );
    }
  }, [loanRequestData, activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const ColorlibStepIconRoot = styled("div")(({ ownerState }) => ({
    background: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    marginTop: "-10px",
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      // background: themeColor.bgColor, // رنگ برای حالت فعال
      // color: themeColor.color,
      // border:'3px solid red'
      animation: "puls 1.5s infinite",
    }),
    ...(ownerState.completed && {
      background: themeColor.bgColor, // رنگ برای حالت تکمیل‌شده
    }),
    ...(ownerState.success && {
      background: "rgb(52 211 153)", // رنگ برای حالت تکمیل‌شده
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className, success } = props;

    const icons = {
      1: <RiFileListFill className="text-2xl" />,
      2: <PiListChecksFill className="text-2xl" />,
      3: <RiFileList3Fill className="text-2xl" />,
      4: <PiListPlusFill className="text-2xl" />,
      5: <PiListStarFill className="text-2xl" />,
      6: <RiFileList2Fill className="text-2xl" />,
      7: <PiListFill className="text-2xl" />,
      8: <BiSolidUserRectangle className="text-2xl" />,
      9: <HiUserGroup className="text-2xl" />,
      10: <HiClipboardDocumentList className="text-2xl" />,
      11: <MdFeaturedPlayList className="text-2xl" />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active, success }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    success: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };

  const ColorlibStepIconRoot2 = styled("div")(({ ownerState }) => ({
    background: themeColor.bgColor,
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    marginTop: "-10px",
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      animation: "puls 1.5s infinite",
    }),
    ...(ownerState.completed && {
      background: "rgb(52 211 153)",
    }),
    ...(ownerState.error && {
      background: "rgb(248 113 113)",
    }),
    ...(ownerState.empty && {
      background: "#ccc",
    }),
  }));

  function ColorlibStepIcon2(props) {
    const { active, completed, className, error, empty } = props;

    const icons = {
      1: <RiFileListFill className="text-2xl" />,
      2: <PiListChecksFill className="text-2xl" />,
      3: <RiFileList3Fill className="text-2xl" />,
      4: <PiListPlusFill className="text-2xl" />,
      5: <PiListStarFill className="text-2xl" />,
      6: <RiFileList2Fill className="text-2xl" />,
      7: <PiListFill className="text-2xl" />,
      8: <BiSolidUserRectangle className="text-2xl" />,
      9: <HiUserGroup className="text-2xl" />,
      10: <HiClipboardDocumentList className="text-2xl" />,
      11: <MdFeaturedPlayList className="text-2xl" />,
    };

    return (
      <ColorlibStepIconRoot2
        ownerState={{ completed, active, error, empty }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot2>
    );
  }

  ColorlibStepIcon2.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    error: PropTypes.bool,
    empty: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="lg:block hidden mt-7">
        {loanRequestData.loanRequestDto.status === 1 && (
          <Stepper activeStep={activeStep} nonLinear alternativeLabel>
            {loanRequestData.loanRequestItems.map((label, index) => (
              <Step
                key={label.id}
                completed={
                  loanRequestData.cooperativeLoanDocs.some(
                    (obj) => obj.itemId === label.id
                  ) &&
                  loanRequestData.cooperativeLoanDocs.find(
                    (obj) => obj.itemId === label.id
                  )?.status !== 4
                }
              >
                <StepLabel
                  StepIconComponent={(props) => (
                    <ColorlibStepIcon
                      {...props}
                      success={
                        loanRequestData.cooperativeLoanDocs.find(
                          (obj) => obj.itemId === label.id
                        )?.status === 4
                      }
                    />
                  )}
                  sx={{
                    cursor: "pointer !important",
                    "& .MuiStepLabel-label": {
                      transition: "0.4s",
                      fontSize: index === activeStep ? "12px" : "10px",
                      color:
                        index === activeStep
                          ? themeColor.bgColor.match(/#.{0,6}(?=(?:.*#|$))/g)[0]
                          : "",
                    },
                  }}
                  onClick={() => {
                    setActiveStep(index);
                  }}
                >
                  {label.title}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
        {loanRequestData.loanRequestDto.status !== 1 && (
          <Stepper activeStep={activeStep} nonLinear alternativeLabel>
            {loanRequestData.loanRequestItems.map((label, index) => (
              <Step
                key={label.id}
                completed={
                  loanRequestData.cooperativeLoanDocs.find(
                    (obj) => obj.itemId === label.id
                  )?.status === 4
                }
              >
                <StepLabel
                  // StepIconComponent={ColorlibStepIcon2}
                  StepIconComponent={(props) => (
                    <ColorlibStepIcon2
                      {...props}
                      error={
                        loanRequestData.cooperativeLoanDocs.find(
                          (obj) => obj.itemId === label.id
                        )?.status === 3 ||
                        loanRequestData.cooperativeFileList.find(
                          (obj) => obj.itemId === label.id
                        )?.status === 3
                      }
                      empty={
                        !loanRequestData.cooperativeLoanDocs.some(
                          (obj) => obj.itemId === label.id
                        )
                      }
                    />
                  )}
                  sx={{
                    cursor: "pointer !important",
                    "& .MuiStepLabel-label": {
                      transition: "0.4s",
                      fontSize: index === activeStep ? "12px" : "10px",
                      color:
                        index === activeStep
                          ? themeColor.bgColor.match(/#.{0,6}(?=(?:.*#|$))/g)[0]
                          : "",
                    },
                  }}
                  onClick={() => {
                    setActiveStep(index);
                  }}
                >
                  {label.title}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
      </div>

      <div className="w-full lg:hidden block">
        <Box sx={{ width: "100%" }}>
          {/* <MobileStepper
            variant="progress"
            steps={loanRequestData.loanRequestItems.length}
            position="static"
            activeStep={activeStep}
           
          /> */}
          <Progress
            percent={
              (activeStep / (loanRequestData.loanRequestItems.length - 1)) * 100
            }
            showInfo={false}
          />
        </Box>
      </div>

      <div className="flex flex-col items-center mt-2">
        <span className="text-2xl w-full">
          {loanRequestData.loanRequestItems[activeStep].title}
        </span>
       <div className="mt-3">
       <Alert severity="info">
          {loanRequestData.loanRequestItems && (
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html: loanRequestData.loanRequestItems[activeStep].body,
              }}
            />
          )}
          {loanRequestData.loanRequestItems[activeStep].fileAttach && (
            <a
              className="text-xs flex items-center text-teal-500 duration-300 hover:text-teal-600 mt-1"
              download
              href={loanRequestData.loanRequestItems[activeStep].fileAttach}
            >
              <MdOutlineAttachFile />
              <span>دانلود فایل راهنما</span>
            </a>
          )}
        </Alert>
       </div>
      </div>
      <div className="mt-2 flex justify-start px-1 items-start">
        <div className="flex items-center gap-3 justify-center w-full">
          <div className="flex">
            {loanRequestData.loanRequestItems[activeStep].title.slice(0, 2) !==
              "چک" &&
              loanRequestData.loanRequestItems[activeStep].title.slice(
                0,
                12
              ) !== "نامه درخواست" &&
              (loanDocs[0]?.status === 1 ||
                loanDocs[0]?.status === 3 ||
                loanDocs[0]?.typeId === 2 ||
                loanDocs.length === 0) && (
                <div>
                  <ModalAddDetailsFile
                    setFlag={setFlag}
                    activeStep={activeStep}
                    loanDocs={loanDocs}
                  />
                </div>
              )}
            {loanRequestData.loanRequestItems[activeStep].title.slice(0, 2) ===
              "چک" &&
              (loanDocs[0]?.status === 1 ||
                loanDocs[0]?.status === 3 ||
                loanDocs.length === 0) && (
                <ModalAddDetailsCheq
                  setFlag={setFlag}
                  activeStep={activeStep}
                  loanDocs={loanDocs}
                />
              )}
            {loanRequestData.loanRequestItems[activeStep].title.slice(0, 12) ===
              "نامه درخواست" &&
              (loanDocs[0]?.status === 1 ||
                loanDocs[0]?.status === 3 ||
                loanDocs.length === 0) && (
                <ModalAddDetailsLetter
                  setFlag={setFlag}
                  activeStep={activeStep}
                  loanDocs={loanDocs}
                />
              )}
          </div>
        </div>
      </div>
      <TableFileLoan
        loanDocs={loanDocs}
        setFlag={setFlag}
        loading={loading}
        activeStep={activeStep}
      />

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          "& .MuiMobileStepper-dots": { display: "none" },
          display: "flex",
          justifyContent: "center",
          gap: 3,
        }}
        nextButton={
          activeStep !== maxSteps - 1 ? (
            <Button
              size="large"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              sx={{
                whiteSpace: "nowrap",
                minWidth: "35px",
                transition: "0.6s",
                color: "#fff",
                backgroundColor:
                  activeStep === maxSteps - 1 ? "#0001" : "#556ee6",
                "&:hover": {
                  backgroundColor: "#485ec4",
                },
                boxShadow: "none",
              }}
            >
              مرحله بعد
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          ) : (
            (loanRequestData.loanRequestDto.status === 1 ||
              loanRequestData.loanRequestDto.status === 2) && (
              <ConfirmSubmit
                loanDocs={loanDocs}
                setFlag={setFlag}
                filteredArray={filteredArray}
              />
            )
          )
        }
        backButton={
          <Button
            sx={{
              whiteSpace: "nowrap",
              minWidth: "35px",
              transition: "0.6s",
              color: "#fff",
              backgroundColor: activeStep === 0 ? "#0001" : "#74788d",
              "&:hover": {
                backgroundColor: "#636678",
              },
              boxShadow: "none",
            }}
            size="large"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            مرحله قبل
          </Button>
        }
      />
    </Box>
  );
}
