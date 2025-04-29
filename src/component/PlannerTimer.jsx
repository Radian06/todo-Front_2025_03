import React from 'react';
import './Css/PlannerTimer.css';

const PlannerTimer = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_container" onClick={(e) => e.stopPropagation()}>
        <h2>할 일 목록</h2>
        <div style={{ fontSize: '2rem', margin: '20px 0' }}>00:00:00</div>
        <button onClick={onClose}>Stop</button>
      </div>
    </div>
  );
};

export default PlannerTimer;
