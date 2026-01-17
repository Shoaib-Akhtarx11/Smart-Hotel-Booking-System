import React, { useState } from "react"; 
import { FaHome, FaPhoneAlt, FaUser, FaUserCircle, FaCog, FaCalendarAlt, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa"; 
import { IoMenu } from "react-icons/io5"; 
import Modal from "./Modal"; 
import Login from "./Login"; // your login component 
import Register from "./Register"; // your register component

const NavBar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [showModal, setShowModal] = useState(false); 
    const [modalType, setModalType] = useState("login"); 
    // "login" or "register" 
    const handleLogout = () => { 
        localStorage.removeItem("registeredEmail"); 
        localStorage.removeItem("registeredPassword"); 
        setIsLoggedIn(false); 
    };
    return (
      <div>
        {/* Full NavBar + Offer Information Display Div */}
        <div>
          {/* This is the Actual NavBar */}
          <nav className="py-3">
            {/* The whole  Container */}
            <div className="container d-flex justify-content-between align-items-center">
              {/* CheckIn Logo */}
              <div style={{ marginLeft: "150px" }}>
                <a href="#">
                  <img
                    src="/favicon-crop.jpeg"
                    width={160}
                    height={35}
                    alt="Logo"
                  />
                </a>
              </div>

              {/*Navigation Links */}
              <div style={{ marginRight: "150px" }}>
                <ul className="d-flex justify-content-end align-items-center gap-3 m-0 p-0 list-unstyled">
                  <li>
                    <a
                      href="#"
                      className="text-decoration-none text-dark fw-bold border border-dark rounded-2 px-3 py-2 d-flex align-items-center gap-2 nav-btn"
                    >
                      <FaHome /> List Your Property
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-decoration-none text-dark fw-bold border border-dark rounded-2 px-3 py-2 d-flex align-items-center gap-2 nav-btn"
                    >
                      <FaPhoneAlt /> Call Us
                    </a>
                  </li>
                  <li>
                    <div className="dropdown-container position-relative">
                      <a
                        href="#"
                        className="text-decoration-none text-dark fw-bold border border-dark rounded-2 px-3 py-2 d-flex align-items-center gap-2 nav-btn"
                      >
                        <IoMenu /> Menu
                      </a>
                      {/* Hover Dropdown for the Menu Bar */}
                      <div
                        className="dropdown-menu-custom position-absolute bg-white border border-dark rounded-2 shadow p-2 mt-2"
                        style={{ width: "200px", right: 0, display: "none" }}
                      >
                        <ul className="list-unstyled m-0 p-0 text-start">
                          <li className="fw-bold bolder">
                            <hr className="dropdown-divider" />
                            Account
                          </li>
                          <li>
                            <a
                              href="#"
                              className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light"
                            >
                              <FaUserCircle /> My Profile
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light"
                            >
                              <FaCog /> Settings
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light"
                            >
                              <FaCalendarAlt /> Bookings
                            </a>
                          </li>
                          <li className="fw-bold bolder">
                            <hr className="dropdown-divider" />
                            Support
                          </li>
                          <li>
                            <a
                              href="#"
                              className="d-flex align-items-center gap-2 text-dark text-decoration-none py-1 px-2 rounded hover-bg-light"
                            >
                              <FaQuestionCircle /> Help Center
                            </a>
                          </li>
                          {isLoggedIn && (
                            <li>
                              <a href="#" onClick={handleLogout}>
                                <FaSignOutAlt /> Logout
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    {!isLoggedIn ? (
                      <a
                        href="#"
                        className="text-decoration-none text-dark fw-bold border border-dark rounded-2 px-3 py-2 d-flex align-items-center gap-2 nav-btn"
                        onClick={() => {
                          setModalType("login");
                          setShowModal(true);
                        }}
                      >
                        <FaUser /> Login/Sign Up
                      </a>
                    ) : (
                      <FaUserCircle size={28} />
                    )}
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

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          {modalType === "login" ? (
            <Login
              onSuccess={() => {
                setIsLoggedIn(true);
                setShowModal(false);
              }}
              onSwitchToRegister={() => setModalType("register")}
            />
          ) : (
            <Register
              onSuccess={() => {
                setIsLoggedIn(true);
                setShowModal(false);
              }}
              onSwitchToLogin={() => setModalType("login")}
              
            />
          )}
        </Modal>
      </div>
    );
}

export default NavBar
