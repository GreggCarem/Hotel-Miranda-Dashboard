import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
// import NewRoom from "./Pages/NewRoom/NewRoom";
// import Bookings from "./Pages/Bookings/Bookings";
// import Guest from "./Pages/Guest/Guest";
// import Concierge from "./Pages/Concierge/Concierge";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/new-room" element={<NewRoom />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/guest" element={<Guest />} />
          <Route path="/concierge" element={<Concierge />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
