import { useEffect } from "react";
import { MdOutlineDone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changPhotoHeader, changThemeColor } from "../../redux/slice/setting";
import styled from "styled-components";
import { Button, ColorPicker } from "antd";

const StyledPopup = styled.div`
  .ant-popover-inner {
    width: 100% !important; /* تغییر عرض کل پاپ‌آپ */
  }

  .ant-color-picker-panel {
    width: 100% !important; /* تغییر عرض بخش داخلی */
  }
`;

export default function ThemePaleteHeader() {
  const themeMode = useSelector((store) => store.setting.themeMode);
  const themeColor = useSelector((store) => store.setting.themeColor);
  const photoHeader = useSelector((store) => store.setting.photoHeader);
  const themeLayout = useSelector((store) => store.setting.themeLayout);
  const gallery = useSelector((store) => store.setting.gallery);
  const dispatch = useDispatch();

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
    localStorage.setItem("themeColor", JSON.stringify(themeColor));
  }, [themeColor]);
  useEffect(() => {
    localStorage.setItem("photoHeader", photoHeader);
  }, [photoHeader]);

  return (
    <>
      <div className="mt-4 pb-5">
        <div className="flex justify-start px-4">
          <span
            className={
              themeMode === "dark"
                ? "text-[#fffb] text-sm"
                : "text-[#000b] text-sm"
            }
          >
            گزینه های رنگ تم صفحه
          </span>
        </div>
        <div className="flex justify-start items-center px-5 mt-3 gap-2">
          {paletColor.map((them) => (
            <span
              key={them.id}
              onClick={() => {
                dispatch(
                  changThemeColor({
                    color: them.color,
                    bgColor: them.bgColor,
                  })
                );
              }}
              style={{ backgroundColor: them.bgColor, borderColor: them.color }}
              className="w-8 h-8 rounded-full border cursor-pointer flex justify-center items-center"
            >
              {themeColor.bgColor === them.bgColor &&
                themeColor.color === them.color && (
                  <MdOutlineDone style={{ color: them.color }} />
                )}
            </span>
          ))}
        </div>
        <div className="flex justify-start items-center px-5 mt-3 gap-2">
          {paletColorGradient.map((them) => (
            <span
              key={them.id}
              onClick={() => {
                dispatch(
                  changThemeColor({
                    color: them.color,
                    bgColor: them.bgColor,
                  })
                );
              }}
              style={{
                background: them.bgColor,
                borderColor: them.color,
              }}
              className="w-8 h-8 rounded-full border cursor-pointer flex justify-center items-center"
            >
              {themeColor.bgColor === them.bgColor &&
                themeColor.color === them.color && (
                  <MdOutlineDone style={{ color: them.color }} />
                )}
            </span>
          ))}
        </div>
        <div className="mt-3 flex justify-start gap-2 items-center px-2">
          <StyledPopup>
            <ColorPicker
              showText
              placement="topLeft"
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              value={themeColor.bgColor}
              onChange={(color) => {
                const hex = color.toHexString();

                dispatch(
                  changThemeColor({
                    ...themeColor,
                    bgColor: hex,
                  })
                );
              }}
            >
              <Button
                type="primary"
                style={{
                  background: themeColor.bgColor,
                  color: themeColor.color,
                }}
              >
                رنگ پس زمینه
              </Button>
            </ColorPicker>
          </StyledPopup>
          <StyledPopup>
            <ColorPicker
              showText
              placement="top"
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              value={themeColor.color}
              onChange={(color) => {
                const hex = color.toHexString();

                dispatch(
                  changThemeColor({
                    ...themeColor,
                    color: hex,
                  })
                );
              }}
            >
              <Button
                type="primary"
                style={{
                  background: themeColor.bgColor,
                  color: themeColor.color,
                }}
              >
                رنگ متن
              </Button>
            </ColorPicker>
          </StyledPopup>
        </div>
        {themeLayout === "vertical" && (
          <div>
            <div className="mt-3">
              <span className="text-sm">
                نوار کناری سمت راست تصویر پس زمینه
              </span>
            </div>
            <div className="flex flex-wrap justify-start items-center px-5">
              {gallery.length > 0 &&
                gallery.map((g) => (
                  <span key={g.id} className="w-1/3 h-20 px-1 mt-3">
                    <img
                      onClick={() => {
                        dispatch(changPhotoHeader(g.imageSrc));
                      }}
                      style={{
                        filter:
                          photoHeader === g.imageSrc
                            ? "brightness(1)"
                            : "brightness(0.2)",
                      }}
                      className="h-full rounded-md cursor-pointer object-cover"
                      src={g.imageSrc}
                      alt={g.categoryTitle}
                    />
                  </span>
                ))}

              <span className="w-1/3 h-20   px-1 mt-3">
                <div
                  className="w-full h-full rounded-md cursor-pointer border-2"
                  onClick={() => {
                    dispatch(changPhotoHeader(""));
                  }}
                  style={{
                    backgroundColor: photoHeader === "" ? "" : "#0005",
                  }}
                ></div>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
