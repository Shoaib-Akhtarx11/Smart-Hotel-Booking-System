import React, { useState, useEffect } from "react";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import FilterNav from "../components/features/hotelList/filterNav";
import HotelCard from "../components/features/hotelList/HotelCard";
import hotelDataRaw from "../data/hotels.json";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // Simulate API call
    setHotels(hotelDataRaw);
  }, []);

  return (
    <div>
      <div>
        {/* Header section */}
        <div style={{ position: 'relative', zIndex: 1100 }}> 
          <NavBar />
        </div>
        <div className="d-flex justify-content-center align-items-center bg-light">
          <FilterNav />
        </div>
      </div>

      {/* -----------------------------------------------------------------  */}

      {/* Hotel Card Component */}

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h6 className="mb-3 text-muted">{hotels.length} properties found</h6>
            
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------------------  */}

      {/* Footer section  */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HotelList;
