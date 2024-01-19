import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box, Typography, CssBaseline, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import verifyCookie from "../helpers/verifyCookie.js";

const Home = () => {
  const navigate = useNavigate();

  const [userIsAdmin, setUserIsAdmin] = useState([]);
  const [cookies, removeCookie] = useCookies([]);

  useEffect(() => {
    (async () => {
      const user = await verifyCookie(cookies, navigate);
      if (user) {
        setUserIsAdmin(user.isAdmin);
      }
    })();
  }, [cookies, navigate]);

  const logout = () => {
    removeCookie("jwtToken");
    navigate("/auth/login");
  };

  const getAdvice = async () => {
    try {
      const {
        data: {
          slip: { advice },
        },
      } = await axios.get("https://api.adviceslip.com/advice", {});

      toast.info(`🦄 ${advice}`, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error(error);
    }
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
      <ToastContainer
        position="top-center"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
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
        <Box>
          <Button
            variant="contained"
            color="secondary"
            sx={{ margin: 1 }}
            onClick={getAdvice}
          >
            Want advice?
          </Button>
        </Box>
        {userIsAdmin ? (
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            // to="/"
            sx={{ margin: 1 }}
          >
            Guilds
          </Button>
        ) : (
          ""
        )}
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
