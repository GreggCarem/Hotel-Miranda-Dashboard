import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiMail,
  PiSignOutBold,
  RiArrowLeftDoubleFill,
  HiOutlineBell,
  MdOutlineKeyboardDoubleArrowRight,
} from "../React-Icons";
import "./Header-Menu.scss";

export const HeaderMenu = ({ onToggleSidebar, isSidebarOpen }) => {
  const [unreadMessages, setUnreadMessages] = useState(5);
  const [currentMonthReservations, setCurrentMonthReservations] = useState(12);

  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logging out...");
    navigate("/");
  };

  return (
    <header className={`header__menu ${isSidebarOpen ? "sidebar__open" : ""}`}>
      <button className="toggle__sidebar" onClick={onToggleSidebar}>
        {isSidebarOpen ? (
          <RiArrowLeftDoubleFill />
        ) : (
          <MdOutlineKeyboardDoubleArrowRight />
        )}
      </button>
      <h1 className="header__menu__tittle">Dashboard</h1>
      <div className="header__icons">
        <div className="icon__container">
          <FiMail />
          {unreadMessages > 0 && (
            <span className="badge">{unreadMessages}</span>
          )}
        </div>

        <div className="icon__container">
          <HiOutlineBell />
          {currentMonthReservations > 0 && (
            <span className="badge">{currentMonthReservations}</span>
          )}
        </div>
        <button className="logout__button" onClick={handleLogout}>
          <PiSignOutBold />
        </button>
      </div>
    </header>
  );
};
