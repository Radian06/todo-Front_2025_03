import React, { useState, useEffect } from 'react';
import './Css/PlannerTimer.css';

const PlannerTimer = ({ isOpen, onClose, onReset, name }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isOpen) {
      setSeconds(0);
      setIsRunning(true);
    }

    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isOpen, isRunning]);

  const handleStop = () => {
    setIsRunning(false);
    onReset();  // 이름 리셋
    onClose();  // 모달 닫기
  };

  const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  if (!isOpen) return null;

  return (
    <div className="modal2_overlay" onClick={onClose}>
      <div className="modal2_container" onClick={(e) => e.stopPropagation()}>
        <div className="listTitle">{name ? name : '무제'}</div>
        <div style={{ fontSize: '2rem', margin: '20px 0' }}>
          {formatTime(seconds)}
        </div>
        <button className="stop_button" onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
};

export default PlannerTimer;
