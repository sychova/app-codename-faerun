import { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    GetTasks();
  }, []);

  const GetTasks = () => {
    fetch(API_BASE + "/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error:", error));
  };

  const completeTask = async (id) => {
    const data = await fetch(API_BASE + "/tasks/" + id + "/complete", {
      method: "PUT",
    }).then((res) => res.json());

    setTasks((tasks) =>
      tasks.map((task) => {
        if (task._id === data._id) {
          task.status = data.status;
        }

        return task;
      })
    );
  };

  const deleteTask = async (id) => {
    const data = await fetch(API_BASE + "/tasks/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTasks((tasks) => tasks.filter((task) => task._id !== data._id));
  };

  const addTask = async () => {
    const data = await fetch(API_BASE + "/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newTask }),
    }).then((res) => res.json());

    setTasks([...tasks, data]);
    setPopupActive(false);
    setNewTask("");
  };

  return (
    <div className="App">
      <h1>Welcome, weary traveller</h1>
      <h4>These are your quests:</h4>

      <div className="tasks">
        {tasks.map((task) => (
          <div
            className={"task " + (task.status ? "is-complete" : "")}
            key={task._id}
            onClick={() => completeTask(task._id)}
          >
            <div className="checkbox"></div>
            <div className="text">{task.text}</div>
            <div className="delete-task" onClick={() => deleteTask(task._id)}>
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
}

export default App;
