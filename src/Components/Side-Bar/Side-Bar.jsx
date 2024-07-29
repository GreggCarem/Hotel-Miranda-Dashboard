import React, { useState } from "react";
import HotelLogo from "./../../assets/Logos/Hotel-Logo.jpeg";
import User1 from "./../../assets/user-1.jpg";
import "./Side-Bar.scss";
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

  const toggleRooms = (e) => {
    e.preventDefault();
    setShowRooms(!showNewRoom);
  };
  return (
    <div className={`sidebar-container ${isSidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar">
        <div className="sidebar__tittle">
          <img
            src={HotelLogo}
            alt="Login Illustration"
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
            <a href="#dashboards">Dashboard</a>
          </li>
          <li>
            <SlKey />

            <a className="rooms" href="#rooms">
              Rooms
              {showNewRoom ? (
                <FaAngleUp onClick={toggleRooms} />
              ) : (
                <FaAngleDown onClick={toggleRooms} />
              )}
            </a>
          </li>
          <div className="new__rooms">
            {showNewRoom && (
              <>
                <MdOutlineAddCircleOutline />
                <a href="#NewRoom">New Room</a>
              </>
            )}
          </div>
          <li>
            <TbCalendarCheck />
            <a href="#bookings">Bookings</a>
          </li>
          <li>
            <MdOutlinePersonOutline />
            <a href="#guest">Guest</a>
          </li>
          <li>
            <PiPuzzlePieceBold />
            <a href="#users">Concierge</a>
          </li>
        </ul>
        <div className="user__info">
          <img src={User1} alt="User" className="user__photo" />
          <div className="user__info__details">
            <h3>William Johanson</h3>
            <p>williamjohn@mail.com</p>
            <button className="user__info__details__btn"> Contact Us</button>
          </div>
        </div>
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
