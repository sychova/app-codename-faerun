import { Route, Routes } from "react-router-dom";

import { Home, Registration, Login, Tasks } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/registration" element={<Registration />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
