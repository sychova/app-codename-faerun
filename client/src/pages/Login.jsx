import React, { useState } from "react";
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
} from "@mui/material";

const API_BASE = "http://localhost:5000/";

const Login = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

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
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        API_BASE + "auth/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { status, message } = data;

      if (status) {
        navigate("/");
      }

      if (!status) {
      }
    } catch (error) {
      const { status, message } = error.response.data;

      setTimeout(() => {
        setInputValue({ ...inputValue, email, password });
        handleError(message);
      }, "10");
    }
    setInputValue({
      ...inputValue,
      email: "",
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
              Login Account
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
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to={"/auth/registration"}>
                    {"Don't have an account? Sign Up!"}
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

export default Login;
