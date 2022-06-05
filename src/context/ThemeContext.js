import { useState, useMemo, createContext, useContext, useEffect } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

export const ThemeContext = createContext();

export const ThemeContextProvider = (props) => {
  const [showAppDrawer, setShowAppDrawer] = useState(true);
  const [enableDarkMode, setEnableDarkMode] = useState(false);

  const light = {
    textColor: "#2E384D",
    textColor2: "#8798AD",
    textColor3: "#B0BAC9",

    buttonColor: "#2E5BFF",
    buttonTextColor: "#fff",

    ui: "#ffffff",
    backgroundColor: "#F4F6FC",

    borderRadius: 5,

    name: "light",
  };

  const dark = {
    textColor: "#ececec",
    textColor2: "#c0c0c0",
    textColor3: "#d0d0d0",

    buttonColor: "#2E5BFF",

    buttonTextColor: "#fff",

    ui: "#222831",
    backgroundColor: "#111410",

    borderRadius: 5,

    name: "dark",
  };

  const setTheme = useMemo(
    () =>
      createTheme({
        palette: {
          type: enableDarkMode ? "dark" : "light",
          primary: {
            main: "#2E5BFF",
          },
          secondary: {
            main: "#D5DDFF",
          },
          tertiary: {
            main: "#33AC2E",
          },
          error: {
            main: "#D63649",
          },
          background: {
            default: "#F4F6FC",
          },
          success: {
            main: "#2E5BFF",
          },
          info: {
            main: "#33AC2E",
          },
        },
        typography: {
          fontFamily: [
            "Nunito",
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
          ].join(","),
        },
        spacing: 1,
        shape: {
          borderRadius: 1,
        },
      }),
    [enableDarkMode]
  );

  const theme = enableDarkMode ? dark : light;

  // console.log(" match : ", match, ;

  const { pathname } = useLocation();

  const [hideNavigation, setHideNavigation] = useState([]);

  useEffect(() => {
    let match = ["/login", "/forgotPassword", "/resetpassword"];

    const data = match?.filter((url) => {
      return pathname.includes(url);
    });
    setHideNavigation(data?.length > 0 ? true : false);
  }, [pathname]);

  return (
    <ThemeContext.Provider
      value={{
        enableDarkMode,
        setEnableDarkMode,
        showAppDrawer,
        setShowAppDrawer,
        light,
        dark,
        toggleDarkMode: () => setEnableDarkMode((e) => !e),
        theme,
        hideNavigation,
      }}
    >
      <ThemeProvider theme={setTheme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
