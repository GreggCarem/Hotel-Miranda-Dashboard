import React, { useState, useEffect } from "react";
import { HeaderMenu } from "../../Components/Header-menu/Header-menu";
import { SideBar } from "../../Components/Side-Bar/Side-Bar";
import UserLogin from "../../JSON/users.json";
import "./Users.scss";

export default function Users() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setUsers(UserLogin);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filteredUsers = users
    .filter((user) => {
      if (filter === "active") {
        return user.status.toLowerCase() === "active";
      }
      if (filter === "inactive") {
        return user.status.toLowerCase() === "inactive";
      }
      return true;
    })
    .filter((user) => {
      if (searchTerm === "") return true;
      return user.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <div className="users-page">
      <SideBar isSidebarOpen={isSidebarOpen} />

      <HeaderMenu
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
      />
      <div
        className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <div className="filters">
          <button onClick={() => setFilter("all")}>All Employees</button>
          <button onClick={() => setFilter("active")}>Active Employees</button>
          <button onClick={() => setFilter("inactive")}>
            Inactive Employees
          </button>
          <input
            type="text"
            placeholder="Search user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="user-list">
          {filteredUsers.map((user, index) => (
            <div className="user-row" key={index}>
              <img
                className="user-photo"
                src={user.image}
                alt={user.full_name}
              />
              <div className="user-details">
                <h3>{user.full_name}</h3>
                <p>Joined on {user.joined_date}</p>
                <p>{user.job_position}</p>
                <p>{user.phone}</p>
                <p>{user.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
