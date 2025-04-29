import React, { useState } from 'react';
import './Css/PlannerSet.css';

const PlannerSet = ({ isOpen, onClose, onStart }) => {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [color, setColor] = useState('');

  if (!isOpen) return null;

  const handleStart = () => {
    onStart(); // PlannerTimer 열기
  };

  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_container" onClick={(e) => e.stopPropagation()}>
        <div className="setTitle_container">
          이름
          <input
            type="text"
            placeholder="이름을 입력하세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="setMemo_container">
          메모
          <textarea
            placeholder="목표를 입력하세요."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
        <div className="setColor_container">
          색상
          <div className="color_wrapper">
            <div
              className="color_circle"
              style={{ backgroundColor: color }}
              onClick={() => document.getElementById('colorInput').click()}
            />
            <input
              id="colorInput"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="hidden_color_input"
            />
          </div>
        </div>

        <button className="start_button" onClick={handleStart}>
          Start
        </button>
      </div>
    </div>
  );
};

export default PlannerSet;
