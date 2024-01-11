import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  List,
  ListItem,
  Checkbox,
  Typography,
  Box,
  CssBaseline,
  Modal,
  TextField,
} from "@mui/material";

import verifyCookie from "../helpers/verifyCookie.js";

const API_BASE = "http://localhost:3000";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    GetTasks();
  }, []);

  const navigate = useNavigate();

  const [cookies, removeCookie] = useCookies([]);

  useEffect(() => {
    verifyCookie(cookies, navigate);
  }, [cookies, navigate, removeCookie]);

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const GetTasks = () => {
    fetch(API_BASE + "/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.error(error));
  };

  const handleComplete = async (id) => {
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

  const handleDelete = async (e, id) => {
    try {
      e.stopPropagation();

      const response = await axios.delete(`${API_BASE}/tasks/${id}`);

      const data = response.data;

      setTasks((tasks) => tasks.filter((task) => task._id !== data._id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
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
      setModalState(false);
      setNewTask("");
    } catch (error) {
      const { status, message } = error.response.data;

      setTimeout(() => {
        handleError(message);
      }, "10");
    }
  };

  return (
    <div className="App">
      <Box
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(https://staticdelivery.nexusmods.com/images/3474/100288838-1671549225.jpg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <CssBaseline />
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => setModalState(true)}
          className={"classes.addButton"}
        >
          New Quest
        </Button>
        <Box width="40%">
          <List>
            {tasks.map((task) => {
              return (
                <ListItem
                  key={task._id}
                  divider={true}
                  className={"classes.list"}
                  style={{ justifyContent: "space-between" }}
                >
                  <Checkbox
                    onClick={() => handleComplete(task._id)}
                    checked={task.status}
                  />
                  <Typography
                    className={"classes.text"}
                    style={{ color: task.isDone ? "green" : "" }}
                    key={task.id}
                    color={"#ffffff"}
                  >
                    {task.text}
                  </Typography>
                  <Button
                    onClick={(e) => handleDelete(e, task._id)}
                    color="secondary"
                    variant="contained"
                    className={"classes.listButtons"}
                  >
                    Delete
                  </Button>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>

      <Modal
        open={modalState}
        onClose={() => setModalState(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Quest
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="text"
            label="Quest details"
            name="text"
            autoFocus
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => handleAdd()}
            className={"classes.addButton"}
          >
            Add Quest
          </Button>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Tasks;
