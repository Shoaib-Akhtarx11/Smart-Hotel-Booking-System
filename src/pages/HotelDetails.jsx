import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import hotelDataRaw from '../data/hotels.json';
import RoomList from '../components/features/hotel/RoomList';

const HotelDetails = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch delay
        const foundHotel = hotelDataRaw.find((h) => h.id === parseInt(id));
        setHotel(foundHotel);
        setLoading(false);
    }, [id]);

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (!hotel) return <div className="text-center mt-5">Hotel not found</div>;

    return (
        <div>
            <NavBar />
            <div className="container mt-4 mb-5">
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/hotelList">Hotels</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{hotel.name}</li>
                    </ol>
                </nav>

                <div className="row">
                    {/* Main Image */}
                    <div className="col-md-8 mb-4">
                        <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="img-fluid rounded w-100 shadow-sm"
                            style={{ maxHeight: '500px', objectFit: 'cover' }}
                        />
                        <div className="mt-3 d-flex gap-2 overflow-auto hide-scrollbar">
                            {hotel.images && hotel.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`View ${idx}`}
                                    className="rounded"
                                    style={{ width: '100px', height: '70px', objectFit: 'cover', cursor: 'pointer' }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Info Side */}
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-body">
                                <h1 className="h3 fw-bold">{hotel.name}</h1>
                                <p className="text-muted"><i className="bi bi-geo-alt-fill text-danger me-1"></i>{hotel.location}</p>

                                <div className="d-flex align-items-center mb-3">
                                    <span className="badge bg-primary me-2">{hotel.rating} / 10</span>
                                    <span className="text-muted small">{hotel.reviewsCount} reviews</span>
                                </div>

                                <p className="text-secondary">{hotel.description}</p>

                                <h4 className="fw-bold my-3">Features</h4>
                                <ul className="list-unstyled">
                                    {hotel.features.map((feature, idx) => (
                                        <li key={idx} className="mb-1"><span className="text-success me-2">✓</span> {feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rooms Section */}
                <RoomList rooms={hotel.rooms || []} hotelId={hotel.id} />

                {/* Reviews Section Placeholder */}
                <div className="mt-5">
                    <h4 className="mb-3">Guest Reviews</h4>
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-muted">Loading reviews...</p>
                            {/* Review component to be added later */}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HotelDetails;
