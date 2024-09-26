import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  updateUser,
  fetchUsers,
  selectAllUsers,
} from "../../Components/Redux/Slice/userSlice";
import { AppDispatch } from "../../Components/Redux/store";
import { User } from "../../Resources/Interface/users";

export default function EditUser() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isNewUser = username === "new";
  const users = useSelector(selectAllUsers);

  const userFromStore = users.find((u) => u._id === username);

  const [user, setUser] = useState<User>({
    _id: "",
    full_name: "",
    start_date: "",
    position: "",
    job_description: "",
    phone: "",
    status: "Active",
    photo: "",
    username: "",
    email: "",
    password: "",
    image: "",
    entryDate: new Date().toISOString(),
    job_position: "",
  });

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!isNewUser && !userFromStore) {
      dispatch(fetchUsers());
    } else if (userFromStore) {
      setUser({
        ...userFromStore,
        _id: userFromStore._id || "",
        position: userFromStore.position || "",
        photo: userFromStore.photo || userFromStore.image || "",
        password: "",
      });
    }
  }, [username, isNewUser, userFromStore, dispatch]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !user.full_name ||
      !user.email ||
      !user.position ||
      !user.username ||
      (isNewUser && !user.password)
    ) {
      setError(
        "Please fill in all required fields: Full Name, Email, Position, Username, and Password (for new users)."
      );
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      if (isNewUser) {
        const userToSave = { ...user };
        delete userToSave._id;

        const createdUser = await dispatch(createUser(userToSave)).unwrap();

        await dispatch(fetchUsers());
      } else {
        if (!user._id) {
          console.error("User ID is missing for update");
          return;
        }
        await dispatch(updateUser(user)).unwrap();
        await dispatch(fetchUsers());
      }

      navigate("/users");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to save user:", error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  };

  if (!userFromStore && !isNewUser) {
    return <div>Loading user data...</div>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{isNewUser ? "Create New User" : "Edit User"}</h2>
      {error && <div style={errorStyle}>{error}</div>}{" "}
      {user && (
        <>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Full Name:</label>
            <input
              type="text"
              name="full_name"
              value={user.full_name || ""}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Position:</label>
            <input
              type="text"
              name="position"
              value={user.position || ""}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Username:</label>
            <input
              type="text"
              name="username"
              value={user.username || ""}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Phone:</label>
            <input
              type="text"
              name="phone"
              value={user.phone || ""}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Password:</label>
            <input
              type="password"
              name="password"
              value={user.password || ""}
              onChange={handleChange}
              style={inputStyle}
              placeholder={
                isNewUser
                  ? "Enter password"
                  : "Leave blank to keep the current password"
              }
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Status:</label>
            <select
              name="status"
              value={user.status || ""}
              onChange={handleChange}
              style={selectStyle}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Photo URL:</label>
            <input
              type="text"
              name="photo"
              value={user.photo || ""}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <button onClick={handleSave} style={saveButtonStyle}>
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const errorStyle = {
  color: "red",
  marginBottom: "1rem",
};

const containerStyle = {
  padding: "20px",
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
  textAlign: "center",
};

const formGroupStyle = {
  marginBottom: "15px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: 600,
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  fontSize: "16px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  boxSizing: "border-box" as "border-box",
};

const selectStyle = {
  width: "100%",
  padding: "8px",
  fontSize: "16px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  boxSizing: "border-box" as "border-box",
};

const saveButtonStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
};
