import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";

import verifyCookie from "../helpers/verifyCookie.js";

const Home = () => {
  const navigate = useNavigate();

  const [cookies, removeCookie] = useCookies([]);

  useEffect(() => {
    verifyCookie(cookies, navigate);
  }, [cookies, navigate, removeCookie]);

  const logout = () => {
    removeCookie("jwtToken");
    navigate("/auth/login");
  };

  return (
    <>
      <div className="home_page">
        <h1>Welcome, weary traveller</h1>
        <h4>What would you like to do today?</h4>
        <div>
          <div className="button">
            <span>
              <Link to={"/tasks"}>Quests</Link>
            </span>
          </div>
          <div className="button" onClick={logout}>
            <span>Logout</span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
