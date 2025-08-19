import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: localStorage.getItem("mode") || "light",
  themeModeNavBar: localStorage.getItem("modeNavBar") || "light",
  themeDirection: "rtl",
  themeColorPresets: "purple",
  themeLayout: localStorage.getItem("layout") || "vertical",
  themeStretch: false,
  themeColor: JSON.parse(localStorage.getItem("themeColor"))
    ? JSON.parse(localStorage.getItem("themeColor"))
    : {
        bgColor: "#556ee6",
        color: "#fff",
      },
  colorHeader: JSON.parse(localStorage.getItem("colorHeader"))?.brigthness
    ? JSON.parse(localStorage.getItem("colorHeader"))
    : {
        brigthness: "#fff",
        lighter: "#D6E4FF",
        light: "#3366FF",
        main: "#556ee6",
        dark: "#1939B7",
        darker: "#091A7A",
        darkness: "#000",
      },
  photoHeader: localStorage.getItem("photoHeader") || "",
  fontFamily: localStorage.getItem("fontFamily") || "yekan",
  fontSize: localStorage.getItem("fontSize") || "14",
  gallery: {},
  setting: {},
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    toggleThemeDirection: (state, action) => {
      state.themeDirection = action.payload;
    },
    toggleThemeMode: (state, action) => {
      state.themeMode = action.payload;
    },
    toggleThemeLayout: (state, action) => {
      state.themeLayout = action.payload;
    },
    toggleThemeModeNavBar: (state, action) => {
      state.themeModeNavBar = action.payload;
    },
    changColorHeader: (state, action) => {
      state.colorHeader = action.payload;
    },
    changThemeColor: (state, action) => {
      state.themeColor = action.payload;
    },
    changPhotoHeader: (state, action) => {
      state.photoHeader = action.payload;
    },
    changFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
    changFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setGallery: (state, action) => {
      state.gallery = action.payload;
    },
    setSetting: (state, action) => {
      state.setting = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleThemeDirection,
  toggleThemeMode,
  toggleThemeLayout,
  toggleThemeModeNavBar,
  changColorHeader,
  changPhotoHeader,
  changFontFamily,
  changFontSize,
  setGallery,
  setSetting,
  changThemeColor,
} = settingSlice.actions;

export default settingSlice.reducer;
