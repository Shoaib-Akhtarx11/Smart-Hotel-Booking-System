import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

const PaymentModal = ({ show, onHide, bookingDetails, onConfirm }) => {
    const [processing, setProcessing] = useState(false);

    const handlePayment = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            onConfirm();
        }, 2000); // Simulate 2 second delay
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Secure Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center mb-4">
                    <h3 className="text-primary">₹{bookingDetails?.totalPrice?.toLocaleString()}</h3>
                    <p className="text-muted">Total Amount</p>
                </div>

                <div className="mb-3">
                    <label className="form-label">Card Number (Mock)</label>
                    <input type="text" className="form-control" value="**** **** **** 4242" readOnly />
                </div>

                <div className="row mb-3">
                    <div className="col-6">
                        <label className="form-label">Expiry</label>
                        <input type="text" className="form-control" value="12/28" readOnly />
                    </div>
                    <div className="col-6">
                        <label className="form-label">CVV</label>
                        <input type="text" className="form-control" value="***" readOnly />
                    </div>
                </div>

                <p className="text-muted small text-center"><i className="bi bi-lock-fill"></i> Payments are processed continuously.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} disabled={processing}>
                    Cancel
                </Button>
                <Button variant="success" onClick={handlePayment} disabled={processing}>
                    {processing ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Processing...
                        </>
                    ) : 'Pay Now'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentModal;
