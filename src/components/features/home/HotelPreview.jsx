import { FaStar, FaCheck } from "react-icons/fa";

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

function HotelPreview() {
    return (
        <div className="mt-5">

            {/* Top Hotels Deals Heading */}
            <div className="d-flex justify-content-between align-items-center mb-4" style={{ marginLeft: "220px", marginRight: "220px" }}>
                <h3 className="fw-bold">Hot hotel deals right now</h3>
                <a href="#" className="text-decoration-none fw-bold text-dark border border-dark rounded-2 p-2">See more deals &rarr;</a>
            </div>

            {/* Top Hotels Deals Cards Scroll Bar Animation */}
            <div className="d-flex gap-3 overflow-auto pb-4" style={{ marginLeft: "220px", marginRight: "220px" }}>

                {/* Putting the Hotel Data in Loop By Using MAP Function */}
                {
                    hotelData.map((hotel) => (

                        // Full Width of the four Cards
                        <div key={hotel.id} className="card border rounded-4 shadow-sm flex-shrink-0" style={{ width: "300px", minWidth: "300px" }}>
                            <div className="position-relative">
                                <img src={hotel.image} className="card-img-top rounded-top-4" alt={hotel.name} style={{ height: "180px", objectFit: "cover" }} />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title fw-bold mb-1 fs-6">{hotel.name}</h5>
                                <p className="card-text text-secondary small mb-2">{hotel.location}</p>

                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <span className="badge bg-success rounded-pill">{hotel.rating}</span>
                                    <span className="fw-bold small">{hotel.tag}</span>
                                    <span className="text-secondary small">({hotel.reviews})</span>
                                </div>

                                <div className="border rounded-3 p-2">
                                    <div className="badge bg-danger mb-2">{hotel.dealText}</div>
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span className="small fw-bold">{hotel.provider}</span>
                                        {hotel.features && hotel.features.map((feature, idx) => (
                                            <span key={idx} className="small text-success d-flex align-items-center gap-1"><FaCheck size={10} /> {feature}</span>
                                        ))}
                                    </div>

                                    <h4 className="fw-bold mb-0">{hotel.price}</h4>
                                    <div className="d-flex justify-content-between align-items-end">
                                        <span className="text-secondary small">per night</span>
                                        <span className="text-secondary small fw-bold">{hotel.dates}</span>
                                    </div>
                                </div>

                                <button className="btn btn-primary w-100 mt-3 fw-bold py-2">
                                    Check deal &rsaquo;
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default HotelPreview
