import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import HotelList from "./pages/HotelList";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/hotelList" element = {<HotelList />}/>
      </Routes>
    </div>
  )
}

export default App
