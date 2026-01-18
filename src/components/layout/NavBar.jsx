import { FaHome, FaPhoneAlt, FaUser, FaUserCircle, FaCog, FaCalendarAlt, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>


            {/* Full NavBar + Offer Information Display Div */}
            <div >


                {/* This is the Actual NavBar */}
                <nav className="py-2 py-md-3 navbar-mobile-friendly"  >

                    {/* The whole  Container */}
                    <div className="container-fluid px-3 px-md-4 px-lg-5 d-flex justify-content-between align-items-center navbar-container" style={{ maxWidth: '770px', width: '100%' }}>
                       
                       
                       
                        {/* CheckIn Logo */}
                        <div className="logo-section" style={{ marginLeft: '-50px', marginRight: '20px' }}>
                            <a href="#"><img src="/favicon-crop.jpeg" width={160} height={35} alt="Logo" className="navbar-logo" /></a>
                        </div>

                       
                       
                       
                        {/* Hamburger Menu Button - Visible on Mobile */}
                        <button 
                            className="btn btn-link d-lg-none ms-auto me-2" 
                            onClick={toggleMenu}
                            style={{ border: 'none', background: 'none', padding: '0.25rem' }}
                        >
                            {isMenuOpen ? (
                                <IoClose className="fs-4 text-dark" />
                            ) : (
                                <IoMenu className="fs-4 text-dark" />
                            )}
                        </button>

                        {/*Navigation Links */}
                        <div className={`navbar-links-container ${isMenuOpen ? 'show' : ''}`}>
                            <ul className="d-flex flex-column flex-lg-row justify-content-end align-items-lg-center gap-2 gap-lg-3 m-0 p-3 p-lg-0 list-unstyled navbar-nav-list">
                                <li>
                                    <a href="#" className="text-decoration-none text-dark fw-bold border border-dark rounded-2 px-2 px-md-3 py-2 d-flex align-items-center gap-1 gap-md-2 nav-btn nav-btn-responsive">
                                        <FaHome /> <span className="d-none d-md-inline">List Your Property</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-decoration-none text-dark fw-bold border border-dark rounded-2 px-2 px-md-3 py-2 d-flex align-items-center gap-1 gap-md-2 nav-btn nav-btn-responsive">
                                        <FaPhoneAlt /> <span className="d-none d-md-inline">Call Us</span>
                                    </a>
                                </li>
                                <li>
                                    <div className="dropdown-container position-relative">
                                        <a href="#" className="text-decoration-none text-dark fw-bold border border-dark rounded-2 px-2 px-md-3 py-2 d-flex align-items-center gap-1 gap-md-2 nav-btn nav-btn-responsive">
                                            <IoMenu /> <span className="d-none d-md-inline">Menu</span>
                                        </a>
                                        {/* Hover Dropdown for the Menu Bar */}
                                        <div className="dropdown-menu-custom position-absolute bg-white border border-dark rounded-2 shadow p-2 mt-2" style={{ width: '200px', right: 0, display: 'none' }}>
                                            <ul className="list-unstyled m-0 p-0 text-start">
                                                <li className="fw-bold bolder"><hr className="dropdown-divider" />Account</li>
                                                <li><a href="#" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light"><FaUserCircle /> My Profile</a></li>
                                                <li><a href="#" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light"><FaCog /> Settings</a></li>
                                                <li><a href="#" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light"><FaCalendarAlt /> Bookings</a></li>
                                                <li className="fw-bold bolder"><hr className="dropdown-divider" />Support</li>
                                                <li><a href="#" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light"><FaQuestionCircle /> Help Center</a></li>
                                                <li><a href="#" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light"><FaSignOutAlt /> Logout</a></li>

                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <a href="#" className="text-decoration-none text-dark fw-bold border border-dark rounded-2 px-2 px-md-3 py-2 d-flex align-items-center gap-1 gap-md-2 nav-btn nav-btn-responsive">
                                        <FaUser /> <span className="d-none d-md-inline">Login/Sign Up</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Offer Information Display  Above NavBar */}
                {/* <div className="text-center ">
                    <p>Exclusive Price Drop! Hurry, <span>Offer Ends Soon!</span></p>
                </div> */}

            </div>


        </div>
    );
}

export default NavBar;
