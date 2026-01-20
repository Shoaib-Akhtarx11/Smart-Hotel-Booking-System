import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import HotelList from "./pages/HotelList";
import HotelDetails from "./pages/HotelDetails";
import BookingPage from "./pages/BookingPage";
import ManagerDashboard from "./pages/ManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LoyaltyPage from "./pages/LoyaltyPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NavBar from "./components/layout/NavBar";
import RecentVisit from "./pages/RecentVisit.jsx"
const App = () => {
  const navigate = useNavigate();

  return (
    <div>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotelList" element={<HotelList />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/booking/:hotelId/:roomId" element={<BookingPage />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/loyalty" element={<LoyaltyPage />} />
        <Route path="/recentvisit" element={<RecentVisit />} />

        <Route
          path="/login"
          element={
            <Login
              onSuccess={() => navigate("/")}
              onSwitchToRegister={() => navigate("/register")}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              onSwitchToLogin={() => navigate("/login")}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;