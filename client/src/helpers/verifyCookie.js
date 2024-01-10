import axios from "axios";

const API_BASE = "http://localhost:5000";

const verifyCookie = async (cookies, navigate) => {
  if (!cookies.jwtToken) {
    navigate("/auth/login");
  }

  await axios.post(API_BASE, {}, { withCredentials: true });

  return;
};

export default verifyCookie;
