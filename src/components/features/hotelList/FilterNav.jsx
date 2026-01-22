import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalFilters, resetFilters } from "../../../redux/hotelSlice";
import styles from "./FilterNav.module.css";

const FilterNav = () => {
  const dispatch = useDispatch();
  // Using optional chaining to ensure filters object is always accessible
  const filters = useSelector((state) => state.hotels?.filters || {});
  const [activeMenu, setActiveMenu] = useState(null);
  const navRef = useRef(null);

  const MIN_VAL = 500;
  const MAX_VAL = 100000;
  const LOCATIONS = ["Any region", "Mumbai", "Kolkata", "Bangalore", "Goa", "Delhi", "Jaipur"];
  const SORT_OPTIONS = ["Featured stays", "Price ascending", "Price descending", "Rating & Recommended"];
  const FEATURES = ["Sea View", "Pool", "Breakfast included", "Free WiFi", "Spa", "Gym"];

  // Close dropdown when clicking outside the navbar
  useEffect(() => {
    const close = (e) => { 
      if (navRef.current && !navRef.current.contains(e.target)) setActiveMenu(null); 
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleUpdate = (key, value) => {
    // We send the specific update; the slice merges it into state.filters
    dispatch(setGlobalFilters({ [key]: value }));
  };

  const toggleFeature = (feat) => {
    // Safety: ensure current is always an array
    const current = filters.advancedFeatures || [];
    const next = current.includes(feat) 
      ? current.filter(f => f !== feat) 
      : [...current, feat];
    
    handleUpdate("advancedFeatures", next);
  };

  // Calculate percentage positions for the CSS-based range slider track
  const minPos = ((filters.priceMin - MIN_VAL) / (MAX_VAL - MIN_VAL)) * 100;
  const maxPos = ((filters.priceMax - MIN_VAL) / (MAX_VAL - MIN_VAL)) * 100;

  return (
    <nav className={styles.filterNavbar} ref={navRef}>
      {/* Location Filter */}
      <div className={styles.filterItem}>
        <button className={styles.filterBtn} onClick={() => setActiveMenu(activeMenu === 'loc' ? null : 'loc')}>
          <i className="bi bi-geo-alt me-1"></i> {filters.location}
        </button>
        {activeMenu === 'loc' && (
          <div className={styles.dropdown}>
            {LOCATIONS.map(l => (
              <div 
                key={l} 
                className={styles.opt} 
                onClick={() => { handleUpdate('location', l); setActiveMenu(null); }}
              >
                {l}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className={styles.filterItem}>
        <button className={styles.filterBtn} onClick={() => setActiveMenu(activeMenu === 'price' ? null : 'price')}>
          ₹{filters.priceMin?.toLocaleString()} - ₹{filters.priceMax?.toLocaleString()}
        </button>
        {activeMenu === 'price' && (
          <div className={`${styles.dropdown} p-3`} style={{ width: '250px' }}>
            <div className="fw-bold small mb-3">Price Range</div>
            <div className={styles.rangeSliderWrapper}>
              <div 
                className={styles.sliderTrack} 
                style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
              ></div>
              <input 
                type="range" min={MIN_VAL} max={MAX_VAL} step="500" 
                value={filters.priceMin} 
                className={styles.rangeInput}
                onChange={(e) => handleUpdate('priceMin', Math.min(Number(e.target.value), filters.priceMax - 500))} 
              />
              <input 
                type="range" min={MIN_VAL} max={MAX_VAL} step="500" 
                value={filters.priceMax} 
                className={styles.rangeInput}
                onChange={(e) => handleUpdate('priceMax', Math.max(Number(e.target.value), filters.priceMin + 500))} 
              />
            </div>
            <div className="d-flex justify-content-between mt-2 small text-muted">
              <span>₹{filters.priceMin}</span>
              <span>₹{filters.priceMax}</span>
            </div>
            <button className="btn btn-dark btn-sm w-100 mt-3" onClick={() => setActiveMenu(null)}>Apply</button>
          </div>
        )}
      </div>

      {/* Sorting Filter */}
      <div className={styles.filterItem}>
        <button className={styles.filterBtn} onClick={() => setActiveMenu(activeMenu === 'sort' ? null : 'sort')}>
          <i className="bi bi-sort-down me-1"></i> {filters.sortBy}
        </button>
        {activeMenu === 'sort' && (
          <div className={styles.dropdown}>
            {SORT_OPTIONS.map(s => (
              <div 
                key={s} 
                className={styles.opt} 
                onClick={() => { handleUpdate('sortBy', s); setActiveMenu(null); }}
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Features Filter */}
      <div className={styles.filterItem}>
        <button className={styles.filterBtn} onClick={() => setActiveMenu(activeMenu === 'feat' ? null : 'feat')}>
          Features {filters.advancedFeatures?.length > 0 && `(${filters.advancedFeatures.length})`}
        </button>
        {activeMenu === 'feat' && (
          <div className={styles.dropdown}>
            {FEATURES.map(f => (
              <div 
                key={f} 
                className="px-3 py-2 d-flex align-items-center gap-2" 
                style={{ cursor: 'pointer' }}
                onClick={() => toggleFeature(f)}
              >
                <input 
                  type="checkbox" 
                  checked={filters.advancedFeatures?.includes(f)} 
                  onChange={() => {}} // Controlled via onClick of parent div
                />
                <span className="small">{f}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reset Button */}
      <button 
        className="btn btn-link text-danger text-decoration-none btn-sm fw-bold" 
        onClick={() => dispatch(resetFilters())}
      >
        RESET
      </button>
    </nav>
  );
};

export default FilterNav;