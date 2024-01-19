import axios from "axios";

const API_BASE = "http://localhost:5000";

const verifyCookie = async (cookies, navigate) => {
  try {
    const {
      data: { user },
    } = await axios.post(API_BASE, {}, { withCredentials: true });

    return user;
  } catch (error) {
    navigate("/auth/login");
  }
};

export default verifyCookie;
