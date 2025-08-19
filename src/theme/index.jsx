import { useMemo } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { useSelector } from "react-redux";
import palette from "./palette";
import PropTypes from "prop-types";

//

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const themeDirection = useSelector((store) => store.setting.themeDirection);
  const themeMode = useSelector((store) => store.setting.themeMode);
  const font = useSelector((store) => store.setting.fontFamily);

  const isLight = themeMode === "light";
  const themeOptions = useMemo(
    () => ({
      typography: { fontFamily: font },
      direction: themeDirection,
      palette: isLight ? palette.light : palette.dark,
      components: {
        MuiAutocomplete: {
          styleOverrides: {
            inputRoot: { fontFamily: font },
          },
        },
        MuiInputBase: {
          styleOverrides: { root: { fontFamily: font } },
        },
      },
    }),
    [themeDirection, isLight, font]
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
