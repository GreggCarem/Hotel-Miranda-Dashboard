import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HotelLogo from "./../../assets/Logos/Hotel-Logo.jpeg";
import User1 from "./../../assets/user-1.jpg";
import "./Side-Bar.scss";
import UserLogin from "./../../JSON/users.json";
import {
  LuLayoutDashboard,
  FaAngleDown,
  FaAngleUp,
  SlKey,
  TbCalendarCheck,
  MdOutlinePersonOutline,
  PiPuzzlePieceBold,
  FaHeart,
  MdOutlineAddCircleOutline,
} from "../React-Icons";

export const SideBar = ({ isSidebarOpen }) => {
  const currentYear = new Date().getFullYear();
  const [showNewRoom, setShowRooms] = useState(false);
  const [user, setUser] = useState(null);

  const toggleRooms = (e) => {
    e.preventDefault();
    setShowRooms(!showNewRoom);
  };

  useEffect(() => {
    const loggedInUsername = localStorage.getItem("loggedInUsername");
    if (loggedInUsername) {
      const userData = UserLogin.find(
        (user) => user.username === loggedInUsername
      );
      if (userData) {
        setUser(userData);
        console.log("Retrieved user data:", userData);
      } else {
        console.log("User not found");
      }
    }
  }, []);

  return (
    <div className={`sidebar-container ${isSidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar">
        <div className="sidebar__tittle">
          <img
            src={HotelLogo}
            alt="Hotel Logo"
            style={{
              width: "5rem",
              height: "auto",
              marginBottom: "-1.5rem",
            }}
          />
          <h1>Travel</h1>
          <h2>Hotel Admin Dashboard</h2>
        </div>
        <ul>
          <li>
            <LuLayoutDashboard />
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <SlKey />
            <Link className="rooms" to="#" onClick={toggleRooms}>
              Rooms
              {showNewRoom ? <FaAngleUp /> : <FaAngleDown />}
            </Link>
          </li>
          <div className="new__rooms">
            {showNewRoom && (
              <>
                <MdOutlineAddCircleOutline />
                <Link to="/new-room">New Room</Link>
              </>
            )}
          </div>
          <li>
            <TbCalendarCheck />
            <Link to="/bookings">Bookings</Link>
          </li>
          <li>
            <MdOutlinePersonOutline />
            <Link to="/guest">Guest</Link>
          </li>
          <li>
            <PiPuzzlePieceBold />
            <Link to="/concierge">Concierge</Link>
          </li>
        </ul>
        {user ? (
          <div className="user__info">
            <img src={user.image} alt="User" className="user__photo" />
            <div className="user__info__details">
              <h3>{user.full_name}</h3>
              <p>{user.email}</p>
              <button className="user__info__details__btn">Contact Us</button>
            </div>
          </div>
        ) : (
          <div className="user__info">
            <h3>Loading...</h3>
          </div>
        )}
        <div className="sidebar__footer">
          <h3>Travel Hotel Admin Dashboard</h3>
          <h4>© {currentYear} All rights reserved.</h4>
          <h5>
            Made with <FaHeart /> by Peterdraw{" "}
          </h5>
        </div>
      </div>
    </div>
  );
};
