import React from "react";
import "./ConfirmationModal.css";

const ConfirmationModal = (props) => {
  return (
    <div className="modal-overlay">
      <div className="confirmation-modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this expense?</p>
        <div className="modal-buttons">
          <button onClick={props.onCancel}>Cancel</button>
          <button onClick={props.onConfirm}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
