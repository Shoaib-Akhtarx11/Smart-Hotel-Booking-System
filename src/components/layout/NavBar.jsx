import { FaHome, FaPhoneAlt, FaUser, FaUserCircle, FaCog, FaCalendarAlt, FaQuestionCircle, FaSignOutAlt} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMenu, IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // 1. Import Link
import Login from "../auth/Login";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        setIsLoggedIn(false);
        navigate("/");
        window.location.reload(); // Ensure state is reset
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleListProperty = (e) => {
        e.preventDefault();
        const role = localStorage.getItem("userRole");
        if (isLoggedIn && role === "manager") {
            navigate("/manager");
        } else {
            navigate("/login");
        }
    };

    return (
        <div>
            <div>
                <nav className="py-2 py-md-3 navbar-mobile-friendly">
                    <div className="container-fluid px-3 px-md-4 px-lg-5 d-flex justify-content-between align-items-center navbar-container" style={{ maxWidth: '770px', width: '100%' }}>

                        {/* CheckIn Logo - Use Link to return Home */}
                        <div className="logo-section" style={{ marginLeft: '-50px', marginRight: '20px' }}>
                            <Link to="/">
                                <img src="/favicon-crop.jpeg" width={160} height={35} alt="Logo" className="navbar-logo" />
                            </Link>
                        </div>

                        {/* Hamburger Menu Button */}
                        <button
                            className="btn btn-link d-lg-none ms-auto me-2"
                            onClick={toggleMenu}
                            style={{ border: 'none', background: 'none', padding: '0.25rem' }}
                        >
                            {isMenuOpen ? <IoClose className="fs-4 text-dark" /> : <IoMenu className="fs-4 text-dark" />}
                        </button>

                        {/* Navigation Links */}
                        <div className={`navbar-links-container ${isMenuOpen ? 'show' : ''}`}>
                            <ul className="d-flex flex-column flex-lg-row justify-content-end align-items-lg-center gap-2 gap-lg-3 m-0 p-3 p-lg-0 list-unstyled navbar-nav-list">
                                <li>
                                    <a href="#" onClick={handleListProperty} className="text-decoration-none text-dark fw-bold border border-dark rounded-2 px-2 px-md-3 py-2 d-flex align-items-center gap-1 gap-md-2 nav-btn nav-btn-responsive">
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
                                            <CgProfile /> <span className="d-none d-md-inline">Menu</span>
                                        </a>
                                        <div className="dropdown-menu-custom position-absolute bg-white border border-dark rounded-2 shadow p-2 mt-2" style={{ width: '200px', right: 0, display: 'none' }}>
                                            <ul className="list-unstyled m-0 p-0 text-start">
                                                <li className="fw-bold bolder"><hr className="dropdown-divider" />Account</li>
                                                <li><Link to="/loyalty" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light"><FaUserCircle /> My Points</Link></li>
                                                <li><Link to="/manager" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light"><FaCog /> Manager DB</Link></li>
                                                <li><Link to="/admin" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light"><FaCog /> Admin DB</Link></li>
                                                <li><Link to="/bookings" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light"><FaCalendarAlt /> My Bookings</Link></li>
                                                <li className="fw-bold bolder"><hr className="dropdown-divider" />Support</li>
                                                <li><a href="#" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light"><FaQuestionCircle /> Help Center</a></li>
                                                <li>
                                                    <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light">
                                                        <FaSignOutAlt /> Logout
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>

                                {/* 2. Changed <a> to <Link> for Login/Sign Up */}
                                {!isLoggedIn && (
                                    <li>
                                        <Link
                                            to="/login"
                                            onClick={() => setIsMenuOpen(false)} // Closes mobile menu on click
                                            className="text-decoration-none text-dark fw-bold border border-dark rounded-2 px-2 px-md-3 py-2 d-flex align-items-center gap-1 gap-md-2 nav-btn nav-btn-responsive"
                                        >
                                            <FaUser /> <span className="d-none d-md-inline">Login/Sign Up</span>
                                        </Link>
                                    </li>
                                )}

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default NavBar;