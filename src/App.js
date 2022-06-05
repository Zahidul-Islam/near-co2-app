import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import ThemeContextProvider from "./context/ThemeContext";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:userId" element={<ProfilePage />} />
        </Routes>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}
