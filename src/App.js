import "./App.css";
import AttendancePage from "./Pages/AttendancePage";
import DiscussionPage from "./Pages/DiscussionPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import { createTheme, ThemeProvider } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import RegisterPage from "./Pages/RegisterPage";
import React from "react";
import { useState } from "react";
import LoginPage from "./Pages/LoginPage";
import { CssBaseline } from "@mui/material";
import { cs } from "date-fns/locale";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFF",
    },
  },
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: "0px",
          padding: "10px",
          color: "inherit",
        },
      },
    },
  },
});

function App() {
  const [logged, setLogged] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <LocalizationProvider locale={cs} dateAdapter={AdapterDateFns}>
          <Layout>
            <Routes>
              <Route path="discussion" element={<DiscussionPage />} />
              <Route path="attendance" element={<AttendancePage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route
                path="login"
                element={<LoginPage logged={logged} setLogged={setLogged} />}
              />
            </Routes>
          </Layout>
        </LocalizationProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
