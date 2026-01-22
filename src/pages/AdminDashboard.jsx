import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserManagementTable from "../components/features/dashboard/UserManagementTable";
import HotelTable from "../components/features/dashboard/HotelTable";
import { FaUsers, FaUserTie, FaHotel, FaDatabase } from "react-icons/fa";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const navigate = useNavigate();

  // Safe Selectors
  const allHotels = useSelector((state) => state.hotels?.allHotels || []);
  const allUsers = useSelector((state) => state.users?.allUsers || []);

  let customers = [];
  let managers = [];

  try {
    // Filter logic with safety guards
    managers = allUsers.filter((user) => user?.role === "manager");
    customers = allUsers.filter((user) => user?.role === "guest" || user?.role === "user" || !user?.role);
  } catch (err) {
    console.error("Admin Data Processing Error:", err);
    navigate("/error", { state: { message: "Critical error loading system databases." } });
  }

  const getTabStyle = (tab) => ({
    cursor: "pointer",
    fontWeight: activeTab === tab ? "bold" : "500",
    color: activeTab === tab ? "#0d6efd" : "#6c757d",
    borderBottom: activeTab === tab ? "3px solid #0d6efd" : "3px solid transparent",
  });

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="container">
        <div className="d-flex align-items-center gap-3 mb-5">
          <div className="bg-dark text-white p-3 rounded-3 shadow-sm">
            <FaDatabase size={24} />
          </div>
          <div>
            <h2 className="fw-bold mb-0">Admin Central Command</h2>
            <p className="text-secondary mb-0">Global oversight of users and property listings</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="d-flex gap-4 mb-4 border-bottom">
          {["customers", "managers", "hotels"].map((tab) => (
            <div 
              key={tab}
              className="pb-2 px-1 tab-button text-capitalize" 
              style={getTabStyle(tab)} 
              onClick={() => setActiveTab(tab)}
            >
              {tab === "customers" && <FaUsers className="me-2" />}
              {tab === "managers" && <FaUserTie className="me-2" />}
              {tab === "hotels" && <FaHotel className="me-2" />}
              {tab} DB
            </div>
          ))}
        </div>

        {/* Dynamic Content Rendering */}
        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-4">
            <div key={activeTab} className="fade-in-section">
              {activeTab === "customers" && (
                <>
                  <h4 className="fw-bold mb-4">Registered Customers</h4>
                  <UserManagementTable users={customers} type="customer" />
                </>
              )}

              {activeTab === "managers" && (
                <>
                  <h4 className="fw-bold mb-4">Hotel Managers</h4>
                  <UserManagementTable users={managers} type="manager" />
                </>
              )}

              {activeTab === "hotels" && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold mb-0">Property Listings</h4>
                    <button className="btn btn-primary rounded-pill px-4 shadow-sm">+ Add Global Hotel</button>
                  </div>
                  <HotelTable hotels={allHotels} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;