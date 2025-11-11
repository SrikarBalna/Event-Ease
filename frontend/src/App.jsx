import Auth from "../Auth/Auth.jsx";
// import Navbar from "../pages/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landingPage.jsx";

function App() {
  return (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
  );
}

export default App;