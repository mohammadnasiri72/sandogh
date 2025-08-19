import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import rtlPlugin from "stylis-plugin-rtl";

RtlLayout.propTypes = {
  children: PropTypes.node,
};

export default function RtlLayout({ children }) {
  const themeDirection = useSelector((store) => store.setting.themeDirection);
  const theme = useTheme();
  
  useEffect(() => {
    document.dir = themeDirection;
  }, [themeDirection]);

  useEffect(() => {
    theme.direction = themeDirection;
  }, [themeDirection , theme]);

  const cacheRtl = createCache({
    key: themeDirection === "rtl" ? "rtl" : "css",
    stylisPlugins: themeDirection === "rtl" ? [rtlPlugin] : [],
  });

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
