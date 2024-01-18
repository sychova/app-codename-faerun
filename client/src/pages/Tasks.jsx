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

const API_BASE = "http://localhost:5000/";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [newTask, setNewTask] = useState("");

  const navigate = useNavigate();

  const [cookies] = useCookies([]);

  const getTasks = async () => {
    try {
      const { data } = await axios.get(API_BASE + "tasks", {
        withCredentials: true,
      });
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    verifyCookie(cookies, navigate);
    getTasks();
  }, [cookies, navigate]);

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleComplete = async (id) => {
    try {
      const response = await axios.put(
        `${API_BASE}/tasks/${id}/complete`,
        {},
        { withCredentials: true }
      );

      const data = response.data;

      setTasks((tasks) =>
        tasks.map((task) => {
          if (task.id === data.id) {
            task.isComplete = data.isComplete;
          }

          return task;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e, id) => {
    try {
      e.stopPropagation();

      const response = await axios.delete(`${API_BASE}/tasks/${id}`, {
        withCredentials: true,
      });

      const data = response.data;

      setTasks((tasks) => tasks.filter((task) => task.id !== data.id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post(
        API_BASE + "tasks",
        { text: newTask },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
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
                  key={task.id}
                  divider={true}
                  className={"classes.list"}
                  style={{ justifyContent: "space-between" }}
                >
                  <Checkbox
                    onClick={() => handleComplete(task.id)}
                    checked={task.isComplete}
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
                    onClick={(e) => handleDelete(e, task.id)}
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
