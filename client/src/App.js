import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import ProfilePagePet from "scenes/profilePagePet";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import AboutUsPage from "scenes/AboutUsPage";
import Messenger from "scenes/messenger/Messenger";
import TermsPage from "scenes/TermsPage";
import HelpPage from "scenes/HelpPage";
import ContactUsPage from "scenes/ContactUsPage";
import PostShare from "scenes/PostShare";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profilePet/:petId"
              element={isAuth ? <ProfilePagePet /> : <Navigate to="/" />}
            />
            <Route exact path="/about" element={<AboutUsPage />} />
            <Route path="/messenger"
              element={isAuth ? <Messenger/> : <Navigate to="/" />} />

            <Route exact path="/terms" element={<TermsPage />} />
            <Route exact path="/help" element={<HelpPage />} />
            <Route exact path="/contact" element={<ContactUsPage />} />
            
            <Route
              path="/postShare/:postId"
              element={isAuth ? <PostShare />: <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;