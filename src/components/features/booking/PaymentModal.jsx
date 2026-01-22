import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PaymentModal = ({ show, onHide, bookingDetails, onConfirm }) => {
  // Safe calculation of points for the preview
  const pointsToEarn = Math.floor((bookingDetails?.total || 0) / 10);

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold">Secure Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className="bg-light rounded-3 p-3 mb-4">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Payable Amount:</span>
            <span className="fw-bold text-primary">
              ₹{(bookingDetails?.total || 0).toLocaleString()}
            </span>
          </div>
          <div className="d-flex justify-content-between small">
            <span className="text-muted">You will earn:</span>
            <span className="text-success fw-bold">+{pointsToEarn} Points</span>
          </div>
        </div>

        <p className="small text-muted mb-0">
          By clicking confirm, you agree to our terms of service and authorize the transaction.
        </p>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="light" onClick={onHide} className="rounded-pill px-4">
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={onConfirm} 
          className="rounded-pill px-4 fw-bold"
        >
          Confirm & Pay
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;