import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { logout, updateAuthUser } from "../redux/authSlice";
import { updateUser } from "../redux/userSlice";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTrophy, FaCalendar, FaArrowRight } from "react-icons/fa";
import { getUserBookings, saveUserLoyalty, getUserLoyalty } from "../utils/userDataManager";

const UserAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const isAuthenticated = auth.isAuthenticated;
  const [allBookings, setAllBookings] = useState([]);
  
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditMode, setIsEditMode] = useState(false);
  const [loyalty, setLoyalty] = useState({ pointsBalance: 0, history: [] });
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
    city: currentUser?.city || "",
    country: currentUser?.country || "",
  });
  const [editSuccess, setEditSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { message: "Please login to view your account" } });
    }
  }, [isAuthenticated, navigate]);

  // Load user-specific bookings when user changes
  useEffect(() => {
    if (currentUser?.id) {
      const userBookings = getUserBookings(currentUser.id);
      setAllBookings(userBookings);
    }
  }, [currentUser?.id]);

  // Load user-specific loyalty points when user changes
  useEffect(() => {
    if (currentUser?.id) {
      const userLoyalty = getUserLoyalty(currentUser.id);
      setLoyalty(userLoyalty);
    }
  }, [currentUser?.id]);

  // Refresh loyalty data when tab changes to loyalty
  useEffect(() => {
    if (activeTab === 'loyalty' && currentUser?.id) {
      const userLoyalty = getUserLoyalty(currentUser.id);
      setLoyalty(userLoyalty);
    }
  }, [activeTab, currentUser?.id]);

  const userBookings = allBookings.filter(b => b.userId === currentUser?.id);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    const updatedUser = {
      ...currentUser,
      ...formData
    };
    // Update Redux user state
    dispatch(updateUser({
      id: currentUser.id,
      ...formData
    }));
    // Update auth state so the profile displays immediately with new name
    dispatch(updateAuthUser(updatedUser));
    // Update localStorage
    localStorage.setItem("activeUser", JSON.stringify(updatedUser));
    setEditSuccess(true);
    setIsEditMode(false);
    setTimeout(() => setEditSuccess(false), 3000);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const getBookingStatusBadge = (status) => {
    const statusClass = status === "Confirmed" ? "bg-success" : status === "Cancelled" ? "bg-danger" : "bg-warning";
    return <span className={`badge ${statusClass}`}>{status}</span>;
  };

  if (!isAuthenticated) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <NavBar />

      {/* Breadcrumb */}
      <nav className="bg-white border-bottom py-3 mb-4">
        <div className="container">
          <ol className="breadcrumb mb-0 small">
            <li className="breadcrumb-item"><a href="/" className="text-decoration-none">Home</a></li>
            <li className="breadcrumb-item active fw-bold text-dark">My Account</li>
          </ol>
        </div>
      </nav>

      <main className="container mb-5 flex-grow-1">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="bg-primary text-white p-4 text-center">
                <div className="fs-1 mb-2">👤</div>
                <h5 className="fw-bold mb-1">{currentUser?.firstName} {currentUser?.lastName}</h5>
                <p className="small mb-0">{currentUser?.email}</p>
              </div>

              <div className="list-group list-group-flush">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`list-group-item list-group-item-action ${activeTab === "profile" ? "active bg-primary border-primary" : ""}`}
                >
                  <FaUser className="me-2" /> Profile
                </button>
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`list-group-item list-group-item-action ${activeTab === "bookings" ? "active bg-primary border-primary" : ""}`}
                >
                  <FaCalendar className="me-2" /> My Bookings
                </button>
                <button
                  onClick={() => setActiveTab("loyalty")}
                  className={`list-group-item list-group-item-action ${activeTab === "loyalty" ? "active bg-primary border-primary" : ""}`}
                >
                  <FaTrophy className="me-2" /> Loyalty Points
                </button>
              </div>

              <div className="p-3 border-top">
                <button 
                  onClick={handleLogout}
                  className="btn btn-outline-danger w-100 rounded-pill"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            {editSuccess && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> Your profile has been updated.
                <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold mb-0">Profile Information</h4>
                    <button
                      onClick={() => setIsEditMode(!isEditMode)}
                      className="btn btn-primary btn-sm rounded-pill"
                    >
                      {isEditMode ? "Cancel" : "Edit Profile"}
                    </button>
                  </div>

                  {isEditMode ? (
                    <form>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-bold small text-muted">First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="form-control rounded-3"
                            placeholder="Enter first name"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-bold small text-muted">Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="form-control rounded-3"
                            placeholder="Enter last name"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-bold small text-muted">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-control rounded-3"
                            placeholder="Enter email"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-bold small text-muted">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="form-control rounded-3"
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label fw-bold small text-muted">Address</label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="form-control rounded-3"
                            placeholder="Enter address"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-bold small text-muted">City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="form-control rounded-3"
                            placeholder="Enter city"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-bold small text-muted">Country</label>
                          <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="form-control rounded-3"
                            placeholder="Enter country"
                          />
                        </div>
                      </div>
                      <div className="mt-4 d-flex gap-2">
                        <button
                          type="button"
                          onClick={handleSaveProfile}
                          className="btn btn-primary rounded-pill"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditMode(false)}
                          className="btn btn-outline-secondary rounded-pill"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="row g-4">
                      <div className="col-md-6">
                        <div className="d-flex align-items-center mb-2">
                          <FaUser className="text-primary me-2" />
                          <label className="fw-bold small text-muted mb-0">Name</label>
                        </div>
                        <p className="ms-4">{currentUser?.firstName} {currentUser?.lastName}</p>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center mb-2">
                          <FaEnvelope className="text-primary me-2" />
                          <label className="fw-bold small text-muted mb-0">Email</label>
                        </div>
                        <p className="ms-4">{currentUser?.email}</p>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center mb-2">
                          <FaPhone className="text-primary me-2" />
                          <label className="fw-bold small text-muted mb-0">Phone</label>
                        </div>
                        <p className="ms-4">{currentUser?.phone || "Not provided"}</p>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center mb-2">
                          <FaMapMarkerAlt className="text-primary me-2" />
                          <label className="fw-bold small text-muted mb-0">Location</label>
                        </div>
                        <p className="ms-4">{currentUser?.city}, {currentUser?.country || "Not provided"}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* BOOKINGS TAB */}
            {activeTab === "bookings" && (
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">My Bookings</h4>
                  
                  {userBookings.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead className="table-light">
                          <tr>
                            <th>Booking ID</th>
                            <th>Room ID</th>
                            <th>Check-In</th>
                            <th>Check-Out</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userBookings.map(booking => (
                            <tr key={booking.id}>
                              <td>
                                <small className="fw-bold text-primary">{booking.id}</small>
                              </td>
                              <td>{booking.roomId}</td>
                              <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                              <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                              <td>{getBookingStatusBadge(booking.status)}</td>
                              <td>
                                <button className="btn btn-sm btn-outline-primary rounded-pill">
                                  Details <FaArrowRight className="ms-1" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-5 bg-white rounded-4 border">
                      <div className="fs-1 mb-3">📅</div>
                      <h5>No Bookings Yet</h5>
                      <p className="text-muted mb-3">You haven't made any bookings. Start exploring hotels!</p>
                      <a href="/hotelList" className="btn btn-primary rounded-pill">
                        Browse Hotels
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* LOYALTY TAB */}
            {activeTab === "loyalty" && (
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">Loyalty Points</h4>
                  
                  <div className="row g-4 mb-4">
                    <div className="col-md-6">
                      <div className="card border-0 bg-gradient text-white rounded-4 p-4" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <p className="small mb-2 opacity-75">Total Points Balance</p>
                            <h2 className="fw-bold mb-0">{loyalty?.pointsBalance || 0}</h2>
                          </div>
                          <FaTrophy className="fs-2 opacity-50" />
                        </div>
                        <p className="small mb-0">
                          <strong>1 Point = ₹1</strong> discount on your next booking
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card border-0 bg-light rounded-4 p-4">
                        <p className="small text-muted mb-2">Redeem Your Points</p>
                        <h5 className="fw-bold mb-3">Convert Points to Discount</h5>
                        <p className="small mb-3">
                          You can use your loyalty points to get discounts on your next hotel booking. Each point is worth ₹1!
                        </p>
                        <button className="btn btn-primary rounded-pill w-100" disabled={loyalty?.pointsBalance === 0}>
                          Redeem Points
                        </button>
                      </div>
                    </div>
                  </div>

                  <h5 className="fw-bold mt-5 mb-3">Points History</h5>
                  {loyalty?.history && loyalty.history.length > 0 ? (
                    <div className="list-group list-group-flush">
                      {loyalty.history.map(entry => (
                        <div key={entry.id} className="list-group-item d-flex justify-content-between align-items-center py-3 px-0">
                          <div>
                            <p className="fw-bold mb-1">{entry.activity}</p>
                            <small className="text-muted">{entry.date}</small>
                          </div>
                          <span className="badge bg-success fs-6">+{entry.points}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-5 bg-light rounded-4 border">
                      <div className="fs-1 mb-3">🏆</div>
                      <h5 className="fw-bold">No Points Yet</h5>
                      <p className="text-muted mb-3">Book a hotel to earn loyalty points and enjoy exclusive rewards!</p>
                      <a href="/hotelList" className="btn btn-primary rounded-pill">
                        Start Booking
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserAccount;
