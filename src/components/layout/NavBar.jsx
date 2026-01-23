import { FaHome, FaPhoneAlt, FaUser, FaUserCircle, FaCog, FaCalendarAlt, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMenu, IoClose } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice"; 

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // NEW: Local state to toggle the Profile/Account dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isAuthenticated, role } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        setIsDropdownOpen(false); // Close dropdown on logout
        navigate("/");
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    
    // NEW: Function to toggle the account dropdown
    const toggleDropdown = (e) => {
        e.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleListProperty = (e) => {
        e.preventDefault();
        if (isAuthenticated && role === "manager") {
            navigate("/manager");
        } else {
            navigate("/login");
        }
    };

    return (
        <div>
            <nav className="py-2 py-md-3 navbar-mobile-friendly">
                {/* Fixed container width and alignment */}
                <div className="container px-3 px-md-4 d-flex justify-content-between align-items-center mx-auto" style={{ maxWidth: '1200px' }}>

                    {/* Logo Section */}
                    <div className="logo-section">
                        <Link to="/">
                            <img src="/favicon-crop.jpeg" width={140} height={30} alt="Logo" className="navbar-logo" />
                        </Link>
                    </div>

                    {/* Hamburger Menu Button (Mobile) */}
                    <button className="btn btn-link d-lg-none ms-auto" onClick={toggleMenu}>
                        {isMenuOpen ? <IoClose className="fs-4 text-dark" /> : <IoMenu className="fs-4 text-dark" />}
                    </button>

                    {/* Navigation Links */}
                    <div className={`navbar-links-container ${isMenuOpen ? 'show' : ''}`}>
                        <ul className="d-flex flex-column flex-lg-row justify-content-end align-items-lg-center gap-2 gap-lg-3 m-0 p-3 p-lg-0 list-unstyled">
                            {/* List Your Property - Only for Managers */}
                            {isAuthenticated && role === 'manager' && (
                                <li>
                                    <a href="#" onClick={handleListProperty} className="text-decoration-none text-dark fw-bold border border-dark rounded-2 px-3 py-2 d-flex align-items-center gap-2">
                                        <FaHome /> <span>List Your Property</span>
                                    </a>
                                </li>
                            )}
                            <li>
                                <a href="#" className="text-decoration-none text-dark fw-bold border border-dark rounded-2 px-3 py-2 d-flex align-items-center gap-2">
                                    <FaPhoneAlt /> <span>Call Us</span>
                                </a>
                            </li>

                            {/* DROPDOWN MENU - Logic Fixed */}
                            {isAuthenticated && (
                                <li className="position-relative">
                                    <button 
                                        onClick={toggleDropdown}
                                        className="bg-transparent text-dark fw-bold border border-dark rounded-2 px-3 py-2 d-flex align-items-center gap-2 w-100"
                                    >
                                        <CgProfile /> <span>Menu</span>
                                    </button>

                                    {/* Only render the dropdown if isDropdownOpen is true */}
                                    {isDropdownOpen && (
                                        <div 
                                            className="position-absolute bg-white border border-dark rounded-2 shadow p-2 mt-2" 
                                            style={{ width: '200px', right: 0, zIndex: 1000 }}
                                        >
                                            <ul className="list-unstyled m-0 p-0 text-start">
                                                <li className="fw-bold px-2 pt-1 small">Account</li>
                                                <hr className="my-1" />
                                                {role !== 'admin' && <li><Link to="/account" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light" onClick={() => setIsDropdownOpen(false)}><FaUser /> My Account</Link></li>}
                                                {role !== 'admin' && <li><Link to="/loyalty" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light" onClick={() => setIsDropdownOpen(false)}><FaUserCircle /> My Points</Link></li>}
                                                {role === 'manager' && <li><Link to="/manager" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light" onClick={() => setIsDropdownOpen(false)}><FaCog /> Manager DB</Link></li>}
                                                {role === 'admin' && <li><Link to="/admin" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light" onClick={() => setIsDropdownOpen(false)}><FaCog /> Admin DB</Link></li>}
                                                {role !== 'admin' && <li><Link to="/account" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light" onClick={() => setIsDropdownOpen(false)}><FaCalendarAlt /> My Bookings</Link></li>}
                                                <hr className="my-1" />
                                                <li><a href="#" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light"><FaQuestionCircle /> Help Center</a></li>
                                                <li>
                                                    <button 
                                                        onClick={handleLogout} 
                                                        className="btn btn-link w-100 d-flex align-items-center gap-2 text-danger text-decoration-none py-1 px-2 rounded hover-bg-light border-0"
                                                    >
                                                        <FaSignOutAlt /> Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            )}

                            {!isAuthenticated && (
                                <li>
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-decoration-none text-dark fw-bold border border-dark rounded-2 px-3 py-2 d-flex align-items-center gap-2">
                                        <FaUser /> <span>Login/Sign Up</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;