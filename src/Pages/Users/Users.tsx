import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HeaderMenu } from "../../Components/Header-menu/Header-menu";
import { SideBar } from "../../Components/Side-Bar/Side-Bar";
import {
  fetchUsers,
  deleteUser,
  selectAllUsers,
  selectUsersStatus,
  selectUsersError,
} from "../../Components/Redux/Slice/userSlice";
import { AppDispatch } from "../../Components/Redux/store";
import { User } from "../../Resources/Interface/users";
import "./Users.scss";

export default function Users() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectAllUsers) as User[];
  const userStatus = useSelector(selectUsersStatus);
  const error = useSelector(selectUsersError);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filteredUsers = users
    .filter((user) => {
      if (filter === "active") {
        return user.status && user.status.toLowerCase() === "active";
      } else if (filter === "inactive") {
        return user.status && user.status.toLowerCase() === "inactive";
      }
      return true;
    })
    .filter((user) => {
      if (searchTerm === "") return true;
      return (
        user.full_name &&
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  let content;

  if (userStatus === "succeeded") {
    content = (
      <table className="users-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Full Name</th>
            <th>Entry Date</th>
            <th>Job Position</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id || user.username}>
                <td>
                  <img
                    src={user.photo ? user.photo.trim() : ""}
                    alt={user.full_name || "N/A"}
                    className="user-photo"
                    onClick={() => navigate(`/edit-user/${user._id}`)}
                  />
                </td>
                <td>{user.full_name || "N/A"}</td>

                {/* Formatting the Entry Date */}
                <td>
                  {new Date(user.entryDate).toLocaleDateString() || "N/A"}
                </td>

                {/* Job Position */}
                <td>{user.job_position || user.position || "N/A"}</td>

                {/* Phone */}
                <td>{user.phone || "N/A"}</td>

                {/* Status */}
                <td>{user.status || "N/A"}</td>

                {/* Actions */}
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  return (
    <div className="users-page">
      <SideBar isSidebarOpen={isSidebarOpen} />
      <HeaderMenu
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
      />
      <div
        className={`main-content ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
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
            onChange={handleSearchChange}
          />
          <button onClick={() => navigate("/edit-user/new")}>
            Create New User
          </button>
        </div>
        {content}
      </div>
    </div>
  );
}
