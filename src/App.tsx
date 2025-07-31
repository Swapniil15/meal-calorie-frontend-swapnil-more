import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Calories from "./pages/Calories";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { FeedbackForm } from "./components/FeedbackForm";

function App() {
  const token = localStorage.getItem("token"); 

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      <Router>
        <DarkModeToggle />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/calories"
            element={token ? <Calories /> : <Navigate to="/login" />}
          />
          <Route path="/feedback" element={<FeedbackForm />} />

        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </Router>
    </div>
  );
}

export default App;
