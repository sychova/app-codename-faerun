import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  Grid,
  CssBaseline,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const API_BASE = "http://localhost:5000/";

const Registration = () => {
  const navigate = useNavigate();

  const [guilds, setGuilds] = useState([]);
  const [inputValue, setInputValue] = useState({
    email: "",
    guild: "",
    password: "",
  });

  const { email, guild, password } = inputValue;

  const getGuilds = async () => {
    try {
      const { data } = await axios.get(API_BASE + "guilds", {
        withCredentials: true,
      });

      setGuilds(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGuilds();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
      autoClose: true,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleSuccess = () =>
    toast.success("Qapla'!", {
      position: "bottom-right",
      autoClose: true,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        API_BASE + "auth/registration",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { status, message } = data;

      if (status) {
        setTimeout(() => {
          handleSuccess();
        }, 10);
        navigate("/");
      }
    } catch (error) {
      const { status, message } = error.response.data;

      setTimeout(() => {
        setInputValue({ ...inputValue, email, guild, password });
        handleError(message);
      }, "10");
    }
    setInputValue({
      ...inputValue,
      email: "",
      guild: "",
      password: "",
    });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(http://localhost:3000/images/auth-bg.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={1} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="form_container">
            <Typography component="h1" variant="h5">
              Register here
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleOnChange}
              />
              <FormControl fullWidth required>
                <InputLabel id="guild-label">Choose your guild</InputLabel>
                <Select
                  labelId="guild-label"
                  id="guild"
                  label="Guild"
                  name="guild"
                  value={guild}
                  onChange={handleOnChange}
                >
                  {guilds.map((guild) => {
                    return (
                      <MenuItem key={guild.id} value={guild.id}>
                        {guild.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={handleOnChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to={"/auth/login"}>
                    {"Already have an account? Sign In!"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <ToastContainer />
          </div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Registration;
