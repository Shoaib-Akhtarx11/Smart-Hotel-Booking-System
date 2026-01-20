import React, { useState, useEffect } from 'react';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import loyaltyData from '../data/loyalty.json';

const LoyaltyPage = () => {
    const [loyalty, setLoyalty] = useState(null);

    useEffect(() => {
        setLoyalty(loyaltyData);
    }, []);

    if (!loyalty) return <div className="text-center mt-5">Loading rewards...</div>;

    return (
        <div>
            <NavBar />
            <div className="container mt-5 mb-5" style={{ minHeight: '60vh' }}>
                <div className="card border-0 shadow-lg text-white mb-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                    <div className="card-body p-5 text-center">
                        <h1 className="display-4 fw-bold mb-0">{loyalty.pointsBalance}</h1>
                        <p className="lead opacity-75">Available Points</p>
                        <button className="btn btn-light rounded-pill px-4 fw-bold mt-3">Redeem Now</button>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h3 className="mb-4 fw-bold">Points History</h3>
                        <div className="card shadow-sm border-0">
                            <ul className="list-group list-group-flush">
                                {loyalty.history.map((item) => (
                                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                                        <div>
                                            <h6 className="mb-0">{item.activity}</h6>
                                            <small className="text-muted">{item.date}</small>
                                        </div>
                                        <span className={`fw-bold ${item.points > 0 ? 'text-success' : 'text-danger'}`}>
                                            {item.points > 0 ? '+' : ''}{item.points} pts
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoyaltyPage;
