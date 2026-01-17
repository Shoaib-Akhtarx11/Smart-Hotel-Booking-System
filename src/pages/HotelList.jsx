import React from "react";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import FilterNav from "../components/features/hotelList/filterNav";
import HotelCard from "../components/features/hotelList/HotelCard";

const hotelData = [
    {
        id: 1,
        name: "Hard Rock Hotel Goa",
        location: "Calangute, India",
        rating: 8.7,
        reviews: 17195,
        tag: "Excellent",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
        dealText: "21% lower than other sites",
        provider: "Agoda",
        price: "₹5,351",
        dates: "11 Mar - 12 Mar",
        features: ["Free cancellation"]
    },
    {
        id: 2,
        name: "Accord Puducherry",
        location: "Puducherry, India",
        rating: 8.7,
        reviews: 12909,
        tag: "Excellent",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1625&q=80",
        dealText: "21% lower than other sites",
        provider: "Agoda",
        price: "₹10,447",
        dates: "26 Jan - 28 Jan",
        features: ["Breakfast included"]
    },
    {
        id: 3,
        name: "Taj Lands End",
        location: "Mumbai, India",
        rating: 9.2,
        reviews: 49044,
        tag: "Excellent",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
        dealText: "13% lower than other sites",
        provider: "Trip.com",
        price: "₹18,511",
        dates: "13 Jan - 15 Jan",
    },
    {
        id: 4,
        name: "The Barefoot Eco Hotel",
        location: "Hanimaadhoo, Maldives",
        rating: 9.2,
        reviews: 1734,
        tag: "Excellent",
        image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
        dealText: "32% lower than other sites",
        provider: "Hotel Site",
        price: "₹14,506",
        dates: "20 Feb - 22 Feb",
    }
];

const HotelList = () => {
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
            <h6 className="mb-3 text-muted">{hotelData.length} properties found</h6>
            
            {hotelData.map((hotel) => (
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
