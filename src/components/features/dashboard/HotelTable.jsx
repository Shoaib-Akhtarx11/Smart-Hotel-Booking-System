import React from 'react';

const HotelTable = ({ hotels, onDelete }) => {
    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle">
                <thead className="table-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Rooms</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {hotels.length > 0 ? (
                        hotels.map((hotel) => (
                            <tr key={hotel.id}>
                                <td>#{hotel.id}</td>
                                <td>
                                    <img src={hotel.image} alt={hotel.name} width="50" height="35" className="rounded" />
                                </td>
                                <td className="fw-bold">{hotel.name}</td>
                                <td className="text-muted">{hotel.location}</td>
                                <td>{hotel.rooms ? hotel.rooms.length : 0} Types</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(hotel.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4">No hotels found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default HotelTable;
