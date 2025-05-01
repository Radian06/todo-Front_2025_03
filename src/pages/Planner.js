// 📁 pages/Planner.js

import React, { useState } from "react";
import Layout from "../component/Layout";
import "../component/Css/Planner.css";
import PlannerSet from "../component/PlannerSet";
import PlannerTimer from "../component/PlannerTimer";

// ⏰ 시간 배열 (4시부터 다음날 3시까지 24시간)
const hours = Array.from({ length: 24 }, (_, i) => {
  const hour = (i + 4) % 24;
  const nextHour = (hour + 1) % 24;
  return `${hour.toString().padStart(2, '0')}:00~${nextHour.toString().padStart(2, '0')}:00`;
});

function Planner() {
  const [isSetOpen, setIsSetOpen] = useState(false);          // 플래너 설정 모달 열림 여부
  const [isTimerOpen, setIsTimerOpen] = useState(false);      // 타이머 모달 열림 여부
  const [plannerName, setPlannerName] = useState('');         // 플래너 이름

  // 플래너 설정 모달 열기/닫기
  const openSetModal = () => setIsSetOpen(true);
  const closeSetModal = () => setIsSetOpen(false);

  // 플래너 시작 → 이름 받아오고 타이머 모달 열기
  const handleStart = (name) => {
    setPlannerName(name);      // 이름 저장
    setIsSetOpen(false);       // 설정 모달 닫기
    setIsTimerOpen(true);      // 타이머 모달 열기
  };

  // 타이머 모달 닫기
  const closeTimerModal = () => setIsTimerOpen(false);

  return (
    <Layout>
      <div className="planner_container">
        {/* 💬 명언 박스 */}
        <div className="quote_container">
          <div className="quote_box">
            <div className="quote_title">오늘의 명언</div>
            <div className="quote_subscribe">
              왜 살아야 하는지 아는 사람은 <br />
              그 어떠한 상황도 견딜 수 있다.
            </div>
            <div className="quote_writer">- 니체 -</div>
          </div>

          {/* ➕ 플래너 추가 버튼 */}
          <div className="inputTT" onClick={openSetModal}>
            플래너 추가하기
          </div>

          {/* ➖ 플래너 삭제 버튼 (아직 기능 없음) */}
          <div className="deleteTT">
            플래너 삭제하기
          </div>
        </div>

        {/* 📅 시간표 그리드 */}
        <div className="timeTable_container">
          <div className="planner_title">TIMETABLE</div>
          <div className="planner_grid">
            {hours.map((time, idx) => (
              <React.Fragment key={idx}>
                <div className="time_cell">{time}</div>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="plan_cell" />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 🛠️ 설정 모달 */}
        <PlannerSet
          isOpen={isSetOpen}
          onClose={closeSetModal}
          onStart={handleStart}
        />

        {/* ⏱️ 타이머 모달 */}
        <PlannerTimer
          isOpen={isTimerOpen}
          onClose={closeTimerModal}
          name={plannerName}
        />
      </div>
    </Layout>
  );
}

export default Planner;
