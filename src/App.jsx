import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import HotelList from "./pages/HotelList";
import Sidebar from "./components/layout/Sidebar";
import NavBar from "./components/layout/NavBar";
import RecentViewedBody from "./components/features/RecentVisit/RecentVisitBody";
import RecentVisit from "./pages/RecentVisit";

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotelList" element={<HotelList />} />
        <Route path="/recentvisit" element={<RecentVisit />} />
      </Routes>
    </div>
  )
}

export default App
