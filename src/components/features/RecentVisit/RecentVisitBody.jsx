import React from 'react';
import { Container } from 'react-bootstrap';
import HotelCard from '../hotelList/HotelCard';

const RecentViewedBody = () => {
    
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
        }
        
    ];

    return (
        <Container className="pt-2 ps-md-4">
            <div className="mb-4">
                <h2 className="fw-bold">Recently viewed</h2>
            </div>

            {/* Added maxWidth to limit the size of the cards */}
            <div className="d-flex flex-column gap-3" style={{ maxWidth: '850px' }}>
                {hotelData.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                ))}
            </div>
        </Container>
    );
};

export default RecentViewedBody;