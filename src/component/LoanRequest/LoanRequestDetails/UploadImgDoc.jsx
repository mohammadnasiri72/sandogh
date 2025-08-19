import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { mainDomain } from "../../../utils/mainDomain";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const UploadImgDoc = ({ setFileName, activeStep }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [fileList, setFileList] = useState([]);
  const loanRequestData = useSelector(
    (store) => store.loanRequest.loanRequestData
  );

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  useEffect(() => {
    if (fileList.length === 0) {
      setFileName("");
    }
  }, [fileList]);

  const handleUpload = async ({ file, onSuccess, onError }) => {
    if (activeStep || activeStep === 0) {
      let extensionArray =
        loanRequestData.loanRequestItems[activeStep].fileExt.split(",");
      let found = extensionArray.some((extension) => file.name.endsWith(extension));

      if (found) {
        const formData = new FormData();
        formData.append("files", file);
        try {
          const response = await axios.post(
            `${mainDomain}/api/File/Upload`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          onSuccess(response.data);
          setFileName(response.data);
        } catch (error) {
          onError(error);
        }
      } else {
        onError();
        Toast.fire({
          icon: "error",
          text: "فرمت فایل ارسالی درست نیست",
          customClass: {
            container: "toast-modal",
          },
        });
      }
    } else {
      const formData = new FormData();
      formData.append("files", file);
      try {
        const response = await axios.post(
          `${mainDomain}/api/File/Upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        onSuccess(response.data);
        setFileName(response.data);
      } catch (error) {
        onError(error);
      }
    }
  };

  return (
    <div className="flex upload-container relative w-full">
      <Upload
        listType="picture"
        onChange={({ fileList }) => {
          setFileList(fileList);
          // const updatedArray = fileList.map((item) =>
          //   !fileList[0]?.thumbUrl ? { ...item, thumbUrl: '' } : item
          // );
          // setFileList(updatedArray);
        }}
        fileList={fileList}
        customRequest={handleUpload}
      >
        {fileList.length === 0 && (
          <div className="py-4">
            <Button
              type="primary"
              className="absolute top-1 right-3"
              icon={<UploadOutlined />}
            >
              بارگذاری تصویر
            </Button>
          </div>
        )}
      </Upload>
    </div>
  );
};

UploadImgDoc.propTypes = {
  setFileName: PropTypes.func,
  activeStep: PropTypes.number,
};

export default UploadImgDoc;
