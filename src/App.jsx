import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Users/Users";
import Rooms from "./Pages/Rooms/Rooms";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rooms" element={<Rooms />} />
        {/* <Route path="/new-room" element={<NewRoom />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/guest" element={<Guest />} /> */}
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
