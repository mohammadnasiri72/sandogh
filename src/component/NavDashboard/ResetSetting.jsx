import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changFontFamily, changFontSize, changPhotoHeader, changThemeColor, toggleThemeLayout, toggleThemeMode, toggleThemeModeNavBar } from "../../redux/slice/setting";

export default function ResetSetting() {
  const themeColor = useSelector((store) => store.setting.themeColor);
  const setting = useSelector((store) => store.setting.setting);
  const disPatch = useDispatch()
  

  const paletColor = [
    {
      color: "#fff",
      bgColor: "#556ee6",
    },
    {
      color: "#fff",
      bgColor: "#4ade80",
    },
    {
      color: "#1d4ed8",
      bgColor: "#eff2f7",
    },
    {
      color: "#fff",
      bgColor: "#c084fc",
    },
  ];

  const paletColorGradient = [
    {
      id: 1,
      color: "#fff",
      bgColor: "linear-gradient(to right, #556ee6, #34c38f)",
    },
    {
      id: 2,
      color: "#fff",
      bgColor: "linear-gradient(to right, #2948df, #50a5f1)",
    },
    {
      id: 3,
      color: "#fff",
      bgColor: "linear-gradient(to right, #f46a6a , #556ee6)",
    },
    {
      id: 4,
      color: "#fff",
      bgColor: "linear-gradient(to right, #f46a6a, #f1b44c)",
    },
  ];

  

  const resetSetting = ()=>{
    disPatch(changFontSize('14'))
    disPatch(changFontFamily('yekan'))
    disPatch(toggleThemeMode('light'))
    disPatch(toggleThemeModeNavBar('light'))
    disPatch(toggleThemeLayout('vertical'))
    disPatch(changPhotoHeader(''))
    if (setting.length > 0) {
            if (setting.find((e) => e.propertyKey === "site_default_color")) {
              if (
                Number(
                  setting.find((e) => e.propertyKey === "site_default_color").value
                ) <= 4
              ) {
                disPatch(
                  changThemeColor(
                    paletColor[
                      Number(
                        setting.find((e) => e.propertyKey === "site_default_color")
                          .value
                      ) - 1
                    ]
                  )
                );
              }
              if (
                Number(
                  setting.find((e) => e.propertyKey === "site_default_color").value
                ) > 4
              ) {
                disPatch(
                  changThemeColor(
                    paletColorGradient[
                      Number(
                        setting.find((e) => e.propertyKey === "site_default_color")
                          .value - 4
                      ) - 1
                    ]
                  )
                );
              }
            }
          }
  }
  return (
    <>
      <div className="mt-3">
        <button
          onClick={resetSetting}
          style={{
            background: themeColor.bgColor,
            color: themeColor.color,
          }}
          className="rounded-md px-2 py-1 text-[15px]"
        >
          تنظیم مجدد
        </button>
      </div>
    </>
  );
}
