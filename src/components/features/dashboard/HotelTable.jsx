import React from 'react';

const HotelTable = ({ hotels, onDelete }) => {
    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                    <tr>
                        <th scope="col" className="ps-3">ID</th>
                        <th scope="col">Preview</th>
                        <th scope="col">Hotel Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Inventory</th>
                        <th scope="col" className="text-end pe-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {hotels.length > 0 ? (
                        hotels.map((hotel) => (
                            <tr key={hotel.id}>
                                <td className="ps-3 text-muted">#{hotel.id}</td>
                                <td>
                                    <img 
                                        src={hotel.image} 
                                        alt={hotel.name} 
                                        width="60" 
                                        height="40" 
                                        className="rounded shadow-sm" 
                                        style={{ objectFit: 'cover' }}
                                    />
                                </td>
                                <td>
                                    <div className="fw-bold text-dark">{hotel.name}</div>
                                    <div className="small text-muted">{hotel.tag || 'Standard'}</div>
                                </td>
                                <td>
                                    <span className="text-truncate d-inline-block" style={{ maxWidth: '150px' }}>
                                        📍 {hotel.location}
                                    </span>
                                </td>
                                <td>
                                    <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-2 py-1">
                                        {hotel.rooms ? hotel.rooms.length : 0} Room Types
                                    </span>
                                </td>
                                <td className="text-end pe-3">
                                    <div className="btn-group">
                                        <button className="btn btn-sm btn-outline-secondary">
                                            Edit
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-outline-danger" 
                                            onClick={() => {
                                                if(window.confirm(`Are you sure you want to delete ${hotel.name}?`)) {
                                                    onDelete(hotel.id);
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-5 text-muted">
                                <i className="bi bi-building-x fs-2 d-block mb-2"></i>
                                No hotels listed in the directory.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default HotelTable;