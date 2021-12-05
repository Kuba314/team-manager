/**
 * @file App.js
 * Projekt: Implementace webové aplikace Team manager.
 * @author Jakub Kozubek
 * @author Josef Škorpík
 * @brief Component wrapping the whole app with routers and stuff.
 */

import "./App.css";
import AttendancePage from "./Pages/AttendancePage";
import DiscussionPage from "./Pages/DiscussionPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import PollPage from "./Pages/PollPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import { createTheme, ThemeProvider } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import React from "react";
import { useState } from "react";
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
  const [logged, setLogged] = useState(localStorage.getItem("user") != null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <LocalizationProvider locale={cs} dateAdapter={AdapterDateFns}>
          <Layout logged={logged} setLogged={setLogged}>
            <Routes>
              <Route path="discussion" element={<DiscussionPage />} />
              <Route path="attendance" element={<AttendancePage />} />
              <Route path="poll" element={<PollPage />} />
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
