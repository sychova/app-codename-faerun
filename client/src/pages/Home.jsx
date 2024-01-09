import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// TODO make prettier
const API_BASE = "http://localhost:5000";

const Home = () => {
  const navigate = useNavigate();

  const [cookies, removeCookie] = useCookies([]);
  // TODO redo to be stuff before @
  // const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.jwtToken) {
        navigate("/auth/login");
      }
      const { data } = await axios.post(
        API_BASE,
        {},
        { withCredentials: true }
      );
      const { status, user } = data;

      // TODO redo to be stuff before @
      // setUsername(user);

      return status
        ? toast(`Hello traveller`, {
            position: "top-right",
          })
        : (removeCookie("jwtToken"), navigate("/auth/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const logout = () => {
    removeCookie("jwtToken");
    navigate("/auth/registration");
  };

  return (
    <>
      <div className="home_page">
        <h4>Welcome traveller</h4>
        <button onClick={logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
