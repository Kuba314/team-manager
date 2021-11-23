import "./App.css";
import AttendancePage from "./Pages/AttendancePage";
import DiscussionPage from "./Pages/DiscussionPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import { createTheme, ThemeProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      color: "#222222",
    },
  },
  background: "#222222",
});

const useStyles = makeStyles({
  cont: {
    background: "#555555",
    margin: 0,
    height: "100%",
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.cont}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="discussion" element={<DiscussionPage />} />
              <Route path="attendance" element={<AttendancePage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
