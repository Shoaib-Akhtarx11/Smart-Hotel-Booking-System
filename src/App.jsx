import { Routes, Route, useNavigate } from "react-router-dom"; 
import Home from "./pages/Home";
import HotelList from "./pages/HotelList";
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