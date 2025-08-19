import { RiseLoader } from "react-spinners";

export default function Loader() {
  return (
    <>
      <div
        style={{ zIndex: "54654654646546546" }}
        className="fixed top-0 bottom-0 left-0 right-0 bg-[#000a] flex justify-center items-center"
      >
        <RiseLoader size={20} color={"#556ee6"} loading={true} />{" "}
      </div>
    </>
  );
}
