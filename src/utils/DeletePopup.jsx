import React from 'react';
import "../style/utils/DeletePopup.css"
const DeletePopup = ({ isOpen, onClose, onDelete, message }) => {
  if (!isOpen) return null;

  return (
      <div className="modal">
          <div className="modal-content">
              <h3>{message}</h3>
              <button onClick={onDelete}>Yes</button>
              <button onClick={onClose}>No</button>
          </div>
      </div>
  );
};

export default DeletePopup;
