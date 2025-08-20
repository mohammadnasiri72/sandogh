import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { changThemeColor, setGallery, setSetting } from "./redux/slice/setting";
import Router from "./routes/Router";
import { mainDomain } from "./utils/mainDomain";
import NoInternet from "./pages/NoInternet";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine); // وضعییت اینترنت
  const font = useSelector((store) => store.setting.fontFamily);
  const setting = useSelector((store) => store.setting.setting);

  const disPatch = useDispatch();
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

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    axios
      .get(mainDomain + "/api/BasicInfo/Setting", {})
      .then((res) => {
        disPatch(setGallery(res.data.galleries));
        disPatch(setSetting(res.data.settings));
        const faviconElement = document.getElementById("dynamic-favicon");
        faviconElement.href = res.data.settings.find(
          (e) => e.propertyKey === "site_icon"
        )?.value;
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("themeColor"))) {
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
  }, [setting]);
  return (
    <>
      {!isOnline && (
        <NoInternet />
      )}
      {isOnline && (
        <div style={{ fontFamily: font }}>
          <Router />
        </div>
      )}
    </>
  );
}

export default App;
