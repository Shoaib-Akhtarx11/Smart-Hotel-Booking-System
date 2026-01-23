import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import UserManagementTable from "../components/features/dashboard/UserManagementTable";
import HotelTable from "../components/features/dashboard/HotelTable";
import { FaUsers, FaUserTie, FaHotel, FaDatabase, FaStar, FaSignOutAlt, FaHome } from "react-icons/fa";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Safe Selectors
  const allHotels = useSelector((state) => state.hotels?.allHotels || []);
  const allUsers = useSelector((state) => state.users?.allUsers || []);
  const allReviews = useSelector((state) => state.reviews?.allReviews || []);
  const auth = useSelector((state) => state.auth);

  let customers = [];
  let managers = [];
  let filteredData = [];

  try {
    // Filter logic with safety guards
    managers = allUsers.filter((user) => user?.role === "manager");
    customers = allUsers.filter((user) => user?.role === "guest" || user?.role === "user" || !user?.role);
    
    // Apply search filter based on active tab
    if (activeTab === "customers") {
      filteredData = customers.filter(user => 
        user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (activeTab === "managers") {
      filteredData = managers.filter(user => 
        user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (activeTab === "hotels") {
      filteredData = allHotels.filter(hotel => 
        hotel?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel?.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (activeTab === "reviews") {
      filteredData = allReviews.filter(review => 
        review?.hotelName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review?.userName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  } catch (err) {
    console.error("Admin Data Processing Error:", err);
    navigate("/error", { state: { message: "Critical error loading system databases." } });
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const getTabStyle = (tab) => ({
    cursor: "pointer",
    fontWeight: activeTab === tab ? "bold" : "500",
    color: activeTab === tab ? "#0d6efd" : "#6c757d",
    borderBottom: activeTab === tab ? "3px solid #0d6efd" : "3px solid transparent",
  });

  // Dashboard Statistics
  const stats = [
    { label: "Total Users", value: allUsers.length, color: "primary" },
    { label: "Total Hotels", value: allHotels.length, color: "success" },
    { label: "Managers", value: managers.length, color: "info" },
    { label: "Total Reviews", value: allReviews.length, color: "warning" },
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      
      <div className="flex-grow-1" style={{ backgroundColor: "#f8f9fa", paddingTop: "20px", paddingBottom: "40px" }}>
        <div className="container">
          {/* Header with Navigation */}
          <div className="d-flex align-items-center justify-content-between mb-5">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-dark text-white p-3 rounded-3 shadow-sm">
                <FaDatabase size={24} />
              </div>
              <div>
                <h2 className="fw-bold mb-0">Admin Central Command</h2>
                <p className="text-secondary mb-0">Global oversight of users and property listings</p>
              </div>
            </div>
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-secondary rounded-pill px-4 d-flex align-items-center gap-2"
                onClick={() => navigate("/")}
                title="Go to Home"
              >
                <FaHome /> Home
              </button>
              <button 
                className="btn btn-danger rounded-pill px-4 d-flex align-items-center gap-2"
                onClick={handleLogout}
                title="Logout"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>

          {/* Dashboard Statistics */}
          <div className="row gap-3 mb-5">
            {stats.map((stat, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div className={`card border-0 shadow-sm rounded-4 bg-${stat.color} text-white`}>
                  <div className="card-body p-4 text-center">
                    <h3 className="fw-bold mb-1">{stat.value}</h3>
                    <p className="mb-0 opacity-75">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="d-flex gap-4 mb-4 border-bottom overflow-auto">
            {["customers", "managers", "hotels", "reviews"].map((tab) => (
              <div 
                key={tab}
                className="pb-2 px-1 tab-button text-capitalize" 
                style={getTabStyle(tab)} 
                onClick={() => { setActiveTab(tab); setSearchTerm(""); }}
              >
                {tab === "customers" && <FaUsers className="me-2" />}
                {tab === "managers" && <FaUserTie className="me-2" />}
                {tab === "hotels" && <FaHotel className="me-2" />}
                {tab === "reviews" && <FaStar className="me-2" />}
                {tab} DB
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input 
              type="text" 
              className="form-control rounded-3 border-0 shadow-sm p-3"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Dynamic Content Rendering */}
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <div key={activeTab} className="fade-in-section">
                {activeTab === "customers" && (
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 className="fw-bold mb-0">Registered Customers ({filteredData.length})</h4>
                    </div>
                    <UserManagementTable users={filteredData} type="customer" />
                  </>
                )}

                {activeTab === "managers" && (
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 className="fw-bold mb-0">Hotel Managers ({filteredData.length})</h4>
                    </div>
                    <UserManagementTable users={filteredData} type="manager" />
                  </>
                )}

                {activeTab === "hotels" && (
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 className="fw-bold mb-0">Property Listings ({filteredData.length})</h4>
                    </div>
                    <HotelTable hotels={filteredData} />
                  </>
                )}

                {activeTab === "reviews" && (
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 className="fw-bold mb-0">Hotel Reviews ({filteredData.length})</h4>
                    </div>
                    {filteredData.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead className="table-light">
                            <tr>
                              <th>Hotel Name</th>
                              <th>Guest Name</th>
                              <th>Rating</th>
                              <th>Comment</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData.map((review) => (
                              <tr key={review.id || review.hotelId}>
                                <td className="fw-bold">{review.hotelName || "N/A"}</td>
                                <td>{review.userName || review.guestName || "Anonymous"}</td>
                                <td>
                                  <span className="badge bg-warning text-dark">
                                    {"★".repeat(review.rating || 0)} {review.rating || 0}
                                  </span>
                                </td>
                                <td className="text-muted small" style={{ maxWidth: "300px" }}>
                                  {review.comment?.substring(0, 50) || "No comment"}...
                                </td>
                                <td className="text-muted small">{review.date || "N/A"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <p className="text-muted">No reviews found</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;