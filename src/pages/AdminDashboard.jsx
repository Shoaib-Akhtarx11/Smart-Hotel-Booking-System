import React, { useState } from 'react';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import UserManagementTable from '../components/features/dashboard/UserManagementTable'; // To be created
import usersData from '../data/users.json';

const AdminDashboard = () => {
    const [stats] = useState({
        totalUsers: 1250,
        activeBookings: 340,
        totalHotels: 45,
        revenue: 1250000
    });

    return (
        <div>
            <NavBar />
            <div className="container mt-4 mb-5">
                <h2 className="fw-bold mb-4">Admin Dashboard</h2>

                {/* KPI Cards */}
                <div className="row mb-5">
                    <div className="col-md-3">
                        <div className="card text-white bg-primary mb-3 shadow-sm">
                            <div className="card-header">Total Users</div>
                            <div className="card-body">
                                <h3 className="card-title">{stats.totalUsers}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-success mb-3 shadow-sm">
                            <div className="card-header">Active Bookings</div>
                            <div className="card-body">
                                <h3 className="card-title">{stats.activeBookings}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-dark bg-light mb-3 shadow-sm border">
                            <div className="card-header">Total Hotels</div>
                            <div className="card-body">
                                <h3 className="card-title">{stats.totalHotels}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-white bg-dark mb-3 shadow-sm">
                            <div className="card-header">Total Revenue (₹)</div>
                            <div className="card-body">
                                <h3 className="card-title">₹{(stats.revenue / 100000).toFixed(2)}L</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Management Section */}
                <div className="card shadow-sm border-0">
                    <div className="card-header bg-white py-3">
                        <h5 className="mb-0 fw-bold">User Management</h5>
                    </div>
                    <div className="card-body p-0">
                        <UserManagementTable users={usersData} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
