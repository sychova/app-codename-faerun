import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import verifyCookie from "../helpers/verifyCookie.js";

const API_BASE = "http://localhost:3000";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    GetTasks();
  }, []);

  const navigate = useNavigate();

  const [cookies, removeCookie] = useCookies([]);

  useEffect(() => {
    verifyCookie(cookies, navigate);
  }, [cookies, navigate, removeCookie]);

  // TODO
  const GetTasks = () => {
    fetch(API_BASE + "/tasks")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setTasks(data);
      })
      .catch((error) => console.error(error));
  };

  const completeTask = async (id) => {
    try {
      const response = await axios.put(`${API_BASE}/tasks/${id}/complete`);
      const data = response.data;

      setTasks((tasks) =>
        tasks.map((task) => {
          if (task._id === data._id) {
            task.status = data.status;
          }

          return task;
        })
      );
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const deleteTask = async (e, id) => {
    try {
      e.stopPropagation();

      const response = await axios.delete(`${API_BASE}/tasks/${id}`);

      const data = response.data;

      setTasks((tasks) => tasks.filter((task) => task._id !== data._id));
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async () => {
    try {
      const response = await axios.post(
        `${API_BASE}/tasks`,
        { text: newTask },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      setTasks([...tasks, data]);
      setPopupActive(false);
      setNewTask("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Welcome, weary traveller!</h1>
      <h4>Your quests, sire:</h4>
      <div className="tasks">
        {tasks.map((task) => (
          <div
            className={"task " + (task.status ? "is-complete" : "")}
            key={task._id}
            onClick={() => completeTask(task._id)}
          >
            <div className="checkbox"></div>
            <div className="text">{task.text}</div>
            <div
              className="delete-task"
              onClick={(e) => deleteTask(e, task._id)}
            >
              x
            </div>
          </div>
        ))}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>
      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            x
          </div>
          <div className="content">
            <h3>Add quest</h3>
            <input
              type="text"
              className="add-task-input"
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
            />
            <div className="button" onClick={() => addTask()}>
              Create task
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Tasks;
