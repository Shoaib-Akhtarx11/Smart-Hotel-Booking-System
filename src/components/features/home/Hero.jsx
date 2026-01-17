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
            <div className="container" style={{ marginLeft: "220px" }}>


                {/*Headline (Find Your Next Stay)*/}
                <h1 className="text-dark mb-4 sec-header">
                    Get 50 % off on 1st booking
                </h1>


                <p className="lead text-secondary mb-3 fs-6">
                    We compare hotel prices from over 100 sites
                </p>

                {/*Search Bar with Input Fields*/}
                <div className="search-bar bg-white p-2 rounded-4 shadow-lg d-inline-flex align-items-center justify-content-between w-100" style={{ maxWidth: "990px" }}>

                    {/* Location Input */}
                    <div className="d-flex align-items-center px-3 border-end w-100">
                        <FaMapMarkerAlt className="text-secondary fs-5 me-2" />
                        <div className="text-start w-100">
                            <label className="d-block small fw-bold text-dark m-0" style={{ fontSize: '11px' }}>Location</label>
                            <input type="text" className="form-control border-0 p-0 shadow-none text-truncate" placeholder="Where are you going?" />
                        </div>
                    </div>




                    {/* Date Input */}
                    <div className="d-flex align-items-center px-3 border-end w-100 position-relative">
                        <FaCalendarAlt className="text-secondary fs-5 me-2" />
                        <div className="text-start w-100">
                            <label className="d-block small fw-bold text-dark m-0" style={{ fontSize: '11px' }}>Check in - Check out</label>
                            <DatePicker
                                selectsRange={true}
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update) => { setDateRange(update); }}
                                isClearable={true}
                                placeholderText="Add dates"
                                className="form-control border-0 p-0 shadow-none"
                                monthsShown={2}
                                dateFormat="dd/MM/YY"
                            />
                        </div>
                    </div>



                    {/* Guests Input */}
                    <div className="d-flex align-items-center px-3 w-100">
                        <FaUserFriends className="text-secondary fs-5 me-2" />
                        <div className="text-start w-100">
                            <label className="d-block small fw-bold text-dark m-0" style={{ fontSize: '11px' }}>Guests</label>
                            <input type="text" className="form-control border-0 p-0 shadow-none text-truncate" placeholder="Add guests" />
                        </div>
                    </div>

                    {/* Search Button */}
                    <button className="btn btn-dark text-white rounded-4 px-4 py-3 ms-2 d-flex align-items-center justify-content-center gap-2 shadow-sm" style={{ minWidth: "140px" }}>
                        <FaSearch className="fs-5" />
                        <span className="fw-bold">Search</span>
                    </button>

                </div>

                <div className="mt-5" >
                    <img src={hotelsImage} alt="Hotels Tie Ups" className="img-fluid" style={{ maxWidth: '1000px' }} />
                </div>

            </div>

        </div>
    );
};

export default Hero;
