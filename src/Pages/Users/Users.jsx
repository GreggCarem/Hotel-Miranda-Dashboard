import { useState, useEffect } from "react";
import { HeaderMenu } from "../../Components/Header-menu/Header-menu";
import { SideBar } from "../../Components/Side-Bar/Side-Bar";
import UserLogin from "./../../assets/users.json";
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
      } else if (filter === "inactive") {
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
        <table className="users-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Full Name</th>
              <th>Start Date</th>
              <th>Job Position</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.username}>
                <td>
                  <img
                    src={user.image}
                    alt={user.full_name}
                    className="user-photo"
                  />
                </td>
                <td>{user.full_name}</td>
                <td>{user.start_date}</td>
                <td>{user.job_position}</td>
                <td>{user.phone}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
