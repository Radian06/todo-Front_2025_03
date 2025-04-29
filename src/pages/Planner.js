import React, { useState } from "react";
import Layout from "../component/Layout";
import "../component/Css/Planner.css";
import PlannerSet from "../component/PlannerSet"; // 추가
import PlannerTimer from "../component/PlannerTimer"; // 추가

const hours = Array.from({ length: 24 }, (_, i) => {
  const hour = (i + 4) % 24; // 04:00 ~ 03:00
  const nextHour = (hour + 1) % 24;
  return `${hour.toString().padStart(2, '0')}:00~${nextHour.toString().padStart(2, '0')}:00`;
});

function Planner() {
  const [isSetOpen, setIsSetOpen] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);

  const openSetModal = () => setIsSetOpen(true);
  const closeSetModal = () => setIsSetOpen(false);

  const openTimerModal = () => {
    setIsSetOpen(false);
    setIsTimerOpen(true);
  };

  const closeTimerModal = () => setIsTimerOpen(false);

  return (
    <Layout>
      <div className="planner_container">
        <div className="quote_container">
          <div className="quote_box">
            <div className="quote_title">오늘의 명언</div>
            <div className="quote_subscribe">
              왜 살아야 하는지 아는 사람은 <br />
              그 어떠한 상황도 견딜 수 있다.
            </div>
            <div className="quote_writer">- 니체 -</div>
          </div>

          {/* 플래너 추가하기 버튼 */}
          <div className="inputTT" onClick={openSetModal}>플래너 추가하기</div>

          {/* 플래너 삭제하기 버튼 (일단 기능 없음) */}
          <div className="deleteTT">플래너 삭제하기</div>
        </div>

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

        {/* ✨ 모달 추가 */}
        <PlannerSet isOpen={isSetOpen} onClose={closeSetModal} onStart={openTimerModal} />
        <PlannerTimer isOpen={isTimerOpen} onClose={closeTimerModal} />
      </div>
    </Layout>
  );
}

export default Planner;
