// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ onClose, cardName, artStyle, children }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="modal-close" onClick={onClose}>X</button>
      
      {/* Header Section */}
      <div className="modal-header">
        <h2 className="card-name">{cardName}</h2>
        <p className="art-style">in {artStyle} style</p>
      </div>

      {/* Modal Body */}
      {children}
    </div>
  </div>
);

export default Modal;