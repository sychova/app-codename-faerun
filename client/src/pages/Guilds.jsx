import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import {
  Button,
  Typography,
  Box,
  CssBaseline,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Container,
} from "@mui/material";

import verifyCookie from "../helpers/verifyCookie.js";

const API_BASE = "http://localhost:5000/";

const Guilds = () => {
  const navigate = useNavigate();

  const [guilds, setGuilds] = useState([]);
  const [cookies] = useCookies([]);

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
    verifyCookie(cookies, navigate);
    getGuilds();
  }, [cookies, navigate]);

  return (
    <div>
      <Box
        style={{
          height: "100vh",
          backgroundImage: `url(http://localhost:3000/images/home-bg.jpg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <CssBaseline />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
        >
          <Grid container spacing={3} width="80%" height="50%" margin="auto">
            {guilds.map((guild) => {
              return (
                <Grid key={guild.id} item>
                  <Card
                    sx={{
                      height: 360,
                      width: 320,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      sx={{ height: 140 }}
                      image={`/images/guilds/${guild.name
                        .toLowerCase()
                        .replace(/ /g, "-")}.jpg`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {guild.name}
                      </Typography>
                      <Typography variant="body3" color="text.secondary">
                        {guild.description}
                      </Typography>
                    </CardContent>
                    <Box
                      component="footer"
                      sx={{
                        py: 3,
                        px: 2,
                        mt: "auto",
                        backgroundColor: (theme) =>
                          theme.palette.mode === "light"
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                      }}
                    >
                      <Container maxWidth="sm">
                        <Typography
                          variant="body3"
                          color="text.secondary"
                          style={{ marginTop: "auto" }}
                        >
                          Members: 🦄 {guild.users.length}
                        </Typography>
                      </Container>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Guilds;
