import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Camera } from "lucide-react";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { SyncLoader } from "react-spinners";
import Swal from "sweetalert2";
import { mainDomain } from "../../utils/mainDomain";

UploadAvatar.propTypes = {
  setFileSrc: PropTypes.func,
};
export default function UploadAvatar({ setFileSrc }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profileImage, setProfileImage] = useState(mainDomain + user.avatar);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // import sweet alert 2
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

  const handleImageUpload = (event) => {
    setIsLoading(true);
    setProfileImage(null);
    const fileData = new FormData();
    fileData.append("files", event.target.files[0]);
    axios
      .post(mainDomain + "/api/File/Upload", fileData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setFileSrc(res.data);
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);
      })
      .catch((err) => {
        setIsLoading(false);
        setProfileImage(mainDomain + user.avatar);
        Toast.fire({
          icon: "error",
          text: err.response ? err.response.data : "خطای شبکه",
          customClass: {
            container: "toast-modal",
          },
        });
      });
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <motion.div
      className="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
      onClick={triggerFileInput}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      <AnimatePresence mode="wait">
        {profileImage && (
          <motion.img
            key="profile-image"
            src={profileImage}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          />
        )}
        {!profileImage && isLoading && (
          <div>
            <SyncLoader />
          </div>
        )}
        {!profileImage && !isLoading && (
          <div>
            <FaRegUser className="text-4xl" />
          </div>
        )}
      </AnimatePresence>

      {profileImage && (
        <motion.div
          className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
        >
          <Camera size={16} color="gray" />
        </motion.div>
      )}
    </motion.div>
  );
}
