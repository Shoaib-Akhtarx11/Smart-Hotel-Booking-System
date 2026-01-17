import React from 'react';
import styles from './HotelCard.module.css';

const HotelCard = ({ hotel }) => {
  return (
    <div className={`card mb-4 shadow-sm ${styles.hotelCard}`}>
      <div className="row g-0">
        {/* Left: Image */}
        <div className="col-md-4 p-3 position-relative">
          <img src={hotel.image} className={styles.hotelImg} alt={hotel.name} />
          <button className={styles.wishlistBtn}>♡</button>
        </div>

        {/* Center: Info */}
        <div className="col-md-5 p-3 d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
               <span className={styles.stars}>★★★★</span>
               <small className="text-muted">Hotel</small>
            </div>
            <h5 className="fw-bold mb-1">{hotel.name}</h5>
            <p className="text-muted small mb-2">📍 {hotel.location}</p>
            
            {hotel.features && hotel.features.map((f, i) => (
              <div key={i} className="text-success small">✓ {f}</div>
            ))}
          </div>

          <div className="mt-2">
            <span className={`badge ${styles.ratingBadge}`}>{hotel.rating}</span>
            <span className="fw-bold ms-2">{hotel.tag}</span>
            <span className="text-muted small ms-1">({hotel.reviews.toLocaleString()} ratings)</span>
          </div>
        </div>

        {/* Right: Pricing */}
        <div className={`col-md-3 border-start p-3 ${styles.priceSection}`}>
          {hotel.dealText && (
            <div className={styles.discountTag}>{hotel.dealText}</div>
          )}
          <div className="text-danger small fw-bold mt-1">Our lowest price</div>
          
          <div className="mt-2">
            <div className="small fw-bold">{hotel.provider}</div>
            <div className="text-muted xsmall">{hotel.dates}</div>
          </div>

          <div className="mt-auto pt-3">
            <h3 className="fw-bold mb-0">{hotel.price}</h3>
            <button className={`btn btn-primary w-100 mt-2 ${styles.viewDealBtn}`}>
              View Deal <span>›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;