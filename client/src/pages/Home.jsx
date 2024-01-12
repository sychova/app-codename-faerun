import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box, Typography, CssBaseline, Button } from "@mui/material";

import verifyCookie from "../helpers/verifyCookie.js";

const Home = () => {
  const navigate = useNavigate();

  const [cookies, removeCookie] = useCookies([]);

  useEffect(() => {
    verifyCookie(cookies, navigate);
  }, [cookies, navigate]);

  const logout = () => {
    removeCookie("jwtToken");
    navigate("/auth/login");
  };

  return (
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
      <Box
        sx={{
          position: "relative",
          color: "#fff",
          textAlign: "center",
          padding: "20px",
          width: "100%",
          margin: 0,
        }}
      >
        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
          {"Welcome, weary traveller"}
        </Typography>
        <Typography variant="h5" color="inherit" paragraph>
          {"What would you like to do today?"}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/tasks"
          sx={{ margin: 1 }}
        >
          Tasks
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ margin: 1 }}
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
