import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateHotel } from '../../../redux/hotelSlice';

const EditHotelModal = ({ hotel, show, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(hotel || {});
    const [loading, setLoading] = useState(false);

    const hotelAmenities = [
        'WiFi', 'Air Conditioning', 'Gym', 'Pool', 'Spa', 
        'Restaurant', 'Bar', 'Room Service', 'Laundry', 'Parking'
    ];

    const hotelFeatures = [
        'Luxury', 'Budget-Friendly', 'Business', 'Resort', 
        'Boutique', 'Family-Friendly', 'Pet-Friendly'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAmenityToggle = (amenity) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities?.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...(prev.amenities || []), amenity]
        }));
    };

    const handleFeatureToggle = (feature) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features?.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...(prev.features || []), feature]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            dispatch(updateHotel({
                id: hotel.id,
                ...formData
            }));

            // Save to localStorage for persistence
            const allHotels = JSON.parse(localStorage.getItem('allHotels') || '[]');
            const index = allHotels.findIndex(h => h.id === hotel.id);
            if (index >= 0) {
                allHotels[index] = { id: hotel.id, ...formData };
            }
            localStorage.setItem('allHotels', JSON.stringify(allHotels));

            // Show success alert
            alert(`${formData.name} is updated`);
            
            setLoading(false);
            onClose();
        } catch (error) {
            console.error('Error updating hotel:', error);
            alert('Failed to update hotel. Please try again.');
            setLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Edit Hotel: {hotel?.name}</h5>
                        <button 
                            type="button" 
                            className="btn-close btn-close-white" 
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Hotel Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="name"
                                    value={formData.name || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Location</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="location"
                                    value={formData.location || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Rating</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        name="rating"
                                        min="1"
                                        max="5"
                                        step="0.1"
                                        value={formData.rating || 0}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Offer (%)</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        name="offer"
                                        min="0"
                                        max="100"
                                        value={formData.offer || 0}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Tag</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="tag"
                                    placeholder="e.g., 5-Star Luxury"
                                    value={formData.tag || ''}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Amenities</label>
                                <div className="d-flex flex-wrap gap-2">
                                    {hotelAmenities.map(amenity => (
                                        <div key={amenity} className="form-check">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                id={amenity}
                                                checked={formData.amenities?.includes(amenity) || false}
                                                onChange={() => handleAmenityToggle(amenity)}
                                            />
                                            <label className="form-check-label" htmlFor={amenity}>
                                                {amenity}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Features</label>
                                <div className="d-flex flex-wrap gap-2">
                                    {hotelFeatures.map(feature => (
                                        <div key={feature} className="form-check">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                id={feature}
                                                checked={formData.features?.includes(feature) || false}
                                                onChange={() => handleFeatureToggle(feature)}
                                            />
                                            <label className="form-check-label" htmlFor={feature}>
                                                {feature}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Image URL</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="image"
                                    value={formData.image || ''}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="d-flex justify-content-end gap-2 mt-4">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={onClose}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary" 
                                    disabled={loading}
                                >
                                    {loading ? 'Updating...' : 'Update Hotel'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditHotelModal;
