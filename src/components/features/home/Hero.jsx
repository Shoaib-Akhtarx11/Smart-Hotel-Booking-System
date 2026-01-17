import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import hotelsImage from '../../../assets/hotels.png';

const Hero = () => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    return (
        <div className="hero-section d-flex align-items-center justify-content-center">

            {/*Hero Section of the Page*/}
            <div className="container-fluid hero-container">


                {/*Headline (Find Your Next Stay)*/}
                <h1 className="text-dark mb-4 sec-header">
                    Get 50 % off on 1st booking
                </h1>


                <p className="lead text-secondary mb-3 fs-6">
                    We compare hotel prices from over 100 sites
                </p>

                {/*Search Bar with Input Fields*/}
                <div className="search-bar bg-white p-2 p-md-3 rounded-4 shadow-lg d-flex align-items-center justify-content-between" style={{ maxWidth: '770px', width: '100%' }}>

                    {/* Location Input */}
                    <div className="d-flex align-items-center px-2 px-md-3 border-end w-100" style={{ borderRight: '1px solid #ddd' }}>
                        <FaMapMarkerAlt className="text-secondary fs-5 me-2 flex-shrink-0" />
                        <div className="text-start w-100 min-w-0">
                            <label className="d-block small fw-bold text-dark m-0" style={{ fontSize: '11px' }}>Location</label>
                            <input type="text" className="form-control border-0 p-0 shadow-none text-truncate" placeholder="Where are you going?" />
                        </div>
                    </div>




                    {/* Date Input */}
                    <div className="d-flex align-items-center px-2 px-md-3 border-end w-100 position-relative" style={{ borderRight: '1px solid #ddd' }}>
                        <FaCalendarAlt className="text-secondary fs-5 me-2 flex-shrink-0" />
                        <div className="text-start w-100 min-w-0">
                            <label className="d-block small fw-bold text-dark m-0" style={{ fontSize: '11px' }}>Check in - Check out</label>
                            <DatePicker
                                selectsRange={true}
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update) => { setDateRange(update); }}
                                isClearable={true}
                                placeholderText="Add dates"
                                className="form-control border-0 p-0 shadow-none"
                                monthsShown={1}
                                dateFormat="dd/MM/YY"
                            />
                        </div>
                    </div>



                    {/* Guests Input */}
                    <div className="d-flex align-items-center px-2 px-md-3 w-100 min-w-0">
                        <FaUserFriends className="text-secondary fs-5 me-2 flex-shrink-0" />
                        <div className="text-start w-100 min-w-0">
                            <label className="d-block small fw-bold text-dark m-0" style={{ fontSize: '11px' }}>Guests</label>
                            <input type="text" className="form-control border-0 p-0 shadow-none text-truncate" placeholder="Add guests" />
                        </div>
                    </div>

                    {/* Search Button */}
                    <button className="btn btn-dark text-white rounded-4 px-3 px-md-4 py-2 py-md-3 ms-2 d-flex align-items-center justify-content-center gap-2 shadow-sm flex-shrink-0" style={{ minWidth: "120px" }}>
                        <FaSearch className="fs-6 fs-md-5" />
                        <span className="fw-bold d-none d-md-inline">Search</span>
                    </button>

                </div>

                <div className="mt-4 mt-md-5" >
                    <img src={hotelsImage} alt="Hotels Tie Ups" className="img-fluid" style={{ maxWidth: '770px', width: '100%' }} />
                </div>

            </div>

        </div>
    );
};

export default Hero;
