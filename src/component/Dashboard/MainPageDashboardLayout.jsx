import { useSelector } from "react-redux";
import NavItems from "./NavItems";
import NavItemHorizontal from "./NavItemHorizontal";

export default function MainPageDashboardLayout() {
  const isColaps = useSelector((store) => store.colaps.isColaps);
  const themeDirection = useSelector((store) => store.setting.themeDirection);
  const themeLayout = useSelector((store) => store.setting.themeLayout);
  const photoHeader = useSelector((store) => store.setting.photoHeader);  
  const themeColor = useSelector((store) => store.setting.themeColor);

  return (
    <>
      {themeLayout === "vertical" && (
        <div
          style={{
            width: isColaps ? "4rem" : "16rem",
            alignItems: isColaps
              ? "center"
              : themeDirection === "rtl"
              ? "end"
              : "start",
            background: themeColor.bgColor,

            overflowY: !isColaps ? "auto" : "visible",
            minHeight: !isColaps ? "100vh" : "",
          }}
          className={
            themeDirection === "rtl"
              ? "fixed flex-col top-0 bottom-0 right-0 duration-300 justify-start  z-50 lg:flex hidden bg-slate-500 scroll-box"
              : "fixed flex-col top-0 bottom-0 left-0 duration-300 justify-start z-50 lg:flex hidden bg-slate-500 scroll-box"
          }
        >
          <div className="w-full" style={{ direction: "rtl" }}>
            <div
              style={{
                backgroundImage: `url('${photoHeader}')`,
              }}
              className={
                photoHeader
                  ? isColaps
                    ? "fixed box-seting inset-0  opacity-50 bottom-0 right-0 w-[4rem] h-full duration-300"
                    : "fixed box-seting inset-0  opacity-50 bottom-0 right-0 w-[16rem] h-full duration-300"
                  : " inset-0 opacity-50"
              }
            ></div>
            <div className="h-full w-full z-20">
              <NavItems />
            </div>
          </div>
        </div>
      )}

      {themeLayout !== "vertical" && (
        <div
          style={{
            background: themeColor.bgColor,
          }}
          className="fixed left-0 right-0 top-[4.5rem] h-14 z-50 lg:flex hidden items-center px-5"
        >
          <NavItemHorizontal />
        </div>
      )}
    </>
  );
}
