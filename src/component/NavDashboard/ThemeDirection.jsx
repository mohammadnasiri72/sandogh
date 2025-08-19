import { FaMoon, FaSun } from "react-icons/fa6";
// import { useDispatch } from "react-redux";

export default function ThemeMode() {
  // const dispach = useDispatch();
  return (
    <>
      <h3>حالت صفحه</h3>
      <div className="flex justify-between items-center px-4 pt-2">
        <div className="h-20 w-1/2 px-2">
          <div className="border rounded-lg h-full flex items-center justify-center cursor-pointer duration-300 hover:bg-slate-100">
          <FaMoon className="text-3xl" />
          </div>
        </div>
        <div className="h-20 w-1/2 px-2">
          <div className="border rounded-lg h-full flex items-center justify-center cursor-pointer duration-300 hover:bg-slate-100">
          <FaSun className="text-3xl"/>
          </div>
        </div>
      </div>
    </>
  );
}
