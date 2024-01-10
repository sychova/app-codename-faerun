import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

import { Home, Registration, Login, Tasks } from "./pages";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/registration" element={<Registration />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
