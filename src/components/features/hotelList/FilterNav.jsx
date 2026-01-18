import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './FilterNav.module.css'; // Import the module

const FilterNav = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  // States
  const [sortBy, setSortBy] = useState('Featured stays');
  const [priceRange, setPriceRange] = useState({ min: 500, max: 210000 });
  const [selectedLocation, setSelectedLocation] = useState('Select');

  const toggleMenu = (menu) => setActiveMenu(activeMenu === menu ? null : menu);

  return (
    <nav className={styles.filterNavbar}>
      
      {/* 1. Sort By */}
      <div className={styles.filterItem}>
        <span className={styles.labelTitle}>Sort by</span>
        <button className={styles.filterBtn} onClick={() => toggleMenu('sort')}>
          {sortBy} <span>{activeMenu === 'sort' ? '▴' : '▾'}</span>
        </button>
        {activeMenu === 'sort' && (
          <div className={styles.filterDropdown}>
            {['Featured stays', 'Rating & Recommended', 'Price & Recommended', 'Price ascending', 'Price descending'].map(opt => (
              <div key={opt} className="form-check mb-2">
                <input className="form-check-input" type="radio" name="sort" checked={sortBy === opt} onChange={() => setSortBy(opt)} />
                <label className="form-check-label">{opt}</label>
              </div>
            ))}
            <button className="btn btn-primary btn-sm w-100 mt-2" onClick={() => setActiveMenu(null)}>Apply</button>
          </div>
        )}
      </div>

      {/* 2. Advanced Filters */}
      <div className={styles.filterItem}>
        <span className={styles.labelTitle}>Filters</span>
        <button className={styles.filterBtn} onClick={() => toggleMenu('filters')}>
          Select <span>▾</span>
        </button>
        {activeMenu === 'filters' && (
          <div className={`${styles.filterDropdown} ${styles.customScroll}`} style={{ width: '320px' }}>
            <div className={styles.sectionHeader}>Deals</div>
            <div className="form-check"><input type="checkbox" className="form-check-input" /> <label className="form-check-label">Limited Time Offer</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" /> <label className="form-check-label">Free Cancellation</label></div>
            
            <hr className="my-2" />
            <div className={styles.sectionHeader}>Hotel Rating</div>
            <div className="d-flex flex-wrap gap-2">
              {['0-2', '2+', '3+', '4+', '5'].map(r => (
                <div key={r} className="form-check">
                  <input type="checkbox" className="form-check-input" /> <label className="form-check-label">{r}</label>
                </div>
              ))}
            </div>

            <hr className="my-2" />
            <div className={styles.sectionHeader}>Meal Options</div>
            {['Breakfast', 'Half Board', 'Full Board', 'No Meals'].map(meal => (
              <div key={meal} className="form-check">
                <input type="checkbox" className="form-check-input" /> <label className="form-check-label">{meal}</label>
              </div>
            ))}
            
            <hr className="my-2" />
            <div className={styles.sectionHeader}>Amenities</div>
            <div className="form-check"><input type="checkbox" className="form-check-input" /> <label className="form-check-label">Free WiFi</label></div>
            <div className="form-check"><input type="checkbox" className="form-check-input" /> <label className="form-check-label">Pool</label></div>

            <button className="btn btn-primary btn-sm w-100 mt-3" onClick={() => setActiveMenu(null)}>Apply</button>
          </div>
        )}
      </div>

      {/* 3. Price Range */}
      <div className={styles.filterItem}>
        <span className={styles.labelTitle}>Price</span>
        <button className={styles.filterBtn} onClick={() => toggleMenu('price')}>
          ₹{priceRange.min} - ₹{priceRange.max}
        </button>
        {activeMenu === 'price' && (
          <div className={styles.filterDropdown} style={{ width: '260px' }}>
            <div className={styles.sectionHeader}>Set price range</div>
            <input type="range" className="form-range" min="500" max="250000" step="1000" 
              value={priceRange.max}
              onChange={(e) => setPriceRange({...priceRange, max: e.target.value})} />
            <div className="d-flex justify-content-between gap-2 mt-2">
              <div className="input-group input-group-sm">
                <span className="input-group-text">₹</span>
                <input type="text" className="form-control" value={priceRange.min} readOnly />
              </div>
              <div className="input-group input-group-sm">
                <span className="input-group-text">₹</span>
                <input type="text" className="form-control" value={priceRange.max} readOnly />
              </div>
            </div>
            <button className="btn btn-primary btn-sm w-100 mt-3" onClick={() => setActiveMenu(null)}>Apply</button>
          </div>
        )}
      </div>

      {/* 4. Location */}
      <div className={styles.filterItem}>
        <span className={styles.labelTitle}>Location</span>
        <button className={styles.filterBtn} onClick={() => toggleMenu('location')}>
          {selectedLocation} <span>▾</span>
        </button>
        {activeMenu === 'location' && (
          <div className={styles.filterDropdown}>
            <div className={styles.sectionHeader}>Select City</div>
            {['Any region', 'Mumbai', 'Pune', 'Jaipur', 'Chennai', 'Goa', 'Bangalore'].map(loc => (
              <div key={loc} className="form-check mb-2">
                <input className="form-check-input" type="radio" name="loc" checked={selectedLocation === loc} onChange={() => setSelectedLocation(loc)} />
                <label className="form-check-label">{loc}</label>
              </div>
            ))}
            <button className="btn btn-primary btn-sm w-100 mt-2" onClick={() => setActiveMenu(null)}>Apply</button>
          </div>
        )}
      </div>

    </nav>
  );
};

export default FilterNav;