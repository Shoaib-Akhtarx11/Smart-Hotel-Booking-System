import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoomList = ({ rooms, hotelId }) => {
    const navigate = useNavigate();

    const handleBook = (roomId) => {
        navigate(`/booking/${hotelId}/${roomId}`);
    };

    return (
        <div className="mt-4">
            <h4 className="mb-3">Available Rooms</h4>
            <div className="row">
                {rooms.map((room) => (
                    <div key={room.id} className="col-md-6 mb-3">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="card-title mb-0">{room.type}</h5>
                                    <span className="badge bg-success">Available</span>
                                </div>

                                <p className="card-text text-muted mb-2">
                                    <small>Max Guests: {room.capacity}</small>
                                </p>

                                <div className="mb-3">
                                    {room.amenities && room.amenities.map((amenity, index) => (
                                        <span key={index} className="badge bg-light text-dark me-1 border">{amenity}</span>
                                    ))}
                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <h4 className="text-primary mb-0">₹{room.price.toLocaleString()}</h4>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleBook(room.id)}
                                    >
                                        Select Room
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomList;
