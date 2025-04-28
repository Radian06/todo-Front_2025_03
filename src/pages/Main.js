import { useState, useEffect } from "react";
import Layout from "../component/Layout";
import "../component/Css/Main.css";
import { Calendar } from "antd"; // Calendar 컴포넌트 추가

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [iconCounts, setIconCounts] = useState({ circle: 0, x: 0 });
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = weekDays[today.getDay()];

    setCurrentDate(`${year}.${month}.${day} (${dayOfWeek})`);
  }, []);

  const addTask = () => {
    if (input.trim() === "") return;
    if (tasks.length >= 8) {
      alert("할 일은 최대 8개까지 추가할 수 있습니다.");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
      checked: false,
      circleActive: false,
      xActive: true,
    };

    setTasks([...tasks, newTask]);
    setInput("");
    setIconCounts((prevCounts) => ({
      circle: prevCounts.circle,
      x: prevCounts.x + 1,
    }));
  };

  const toggleCheck = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const deleteCheckedTasks = () => {
    setTasks(tasks.filter((task) => !task.checked));
  };

  const handleIconClick = (id, type) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            circleActive: type === "circle",
            xActive: type === "x",
          };
        }
        return task;
      });

      const newCircleCount = updatedTasks.filter((task) => task.circleActive).length;
      const newXCount = updatedTasks.filter((task) => task.xActive).length;

      setIconCounts({ circle: newCircleCount, x: newXCount });

      return updatedTasks;
    });
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <Layout>
      <div className="main_container">
        <div className="list_container">
          <div className="list_div1">
            <div className="list_title_box">
              <div className="list_title">To-Do List</div>
              <div className="list_date">{currentDate}</div>
            </div>

            <div className="list_input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="할 일을 입력하세요"
              />
              <button onClick={addTask}>추가</button>
              <button className="list_delete" onClick={deleteCheckedTasks}>
                삭제
              </button>
            </div>

            <ul className="list_task">
              {tasks.map((task) => (
                <li key={task.id} className={`task_item ${task.completed ? "completed" : ""}`}>
                  <input
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => toggleCheck(task.id)}
                  />
                  <span>{task.text}</span>
                  <div className="task_icons">
                    <div
                      className={`icon_circle ${task.circleActive ? "active" : ""}`}
                      onClick={() => handleIconClick(task.id, "circle")}
                    ></div>
                    <div
                      className={`icon_x ${task.xActive ? "active" : ""}`}
                      onClick={() => handleIconClick(task.id, "x")}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="list_total">
            <span>총계</span>
            <div className="task_icons2">
              <div className="icon_circle2"></div> : {iconCounts.circle}개
              <div className="icon_x2"></div> : {iconCounts.x}개
            </div>
          </div>
        </div>

        <div className="calendar_container">
        <Calendar onPanelChange={onPanelChange} fullscreen={false} />
        </div>
      </div>
    </Layout>
  );
};

export default Main;
