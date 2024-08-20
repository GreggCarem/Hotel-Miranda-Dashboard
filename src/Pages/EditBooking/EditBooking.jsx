import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bookingData from "../../assets/bookings.json";

export default function EditBooking() {
  const { reservationID } = useParams();
  const navigate = useNavigate();
  const isNewBooking = reservationID === "new";
  const [booking, setBooking] = useState({
    guest: "",
    orderDate: "",
    checkIn: "",
    checkOut: "",
    specialRequest: "",
    room_type: "",
    status: "Pending",
    photo: "",
    reservationID: "",
  });

  useEffect(() => {
    if (!isNewBooking) {
      const foundBooking = bookingData.find(
        (b) => b.reservationID === reservationID
      );
      if (foundBooking) {
        setBooking(foundBooking);
      } else {
        console.error("Booking not found!");
      }
    }
  }, [reservationID, isNewBooking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (isNewBooking) {
      console.log("New booking created:", booking);
    } else {
      console.log("Updated booking data:", booking);
    }
    navigate("/bookings");
  };

  const handleDelete = () => {
    if (!isNewBooking) {
      console.log("Deleted booking:", booking.reservationID);
    }
    navigate("/bookings");
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
    fontWeight: "600",
    color: "#333",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box",
  };

  const selectStyle = {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box",
  };

  const textareaStyle = {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box",
    resize: "vertical",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  };

  const saveButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#007bff",
    color: "#fff",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
    color: "#fff",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>
        {isNewBooking ? "Create New Booking" : "Edit Booking"}
      </h2>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Guest:</label>
        <input
          type="text"
          name="guest"
          value={booking.guest || ""}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Order Date:</label>
        <input
          type="date"
          name="orderDate"
          value={booking.orderDate || ""}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Check In:</label>
        <input
          type="date"
          name="checkIn"
          value={booking.checkIn || ""}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Check Out:</label>
        <input
          type="date"
          name="checkOut"
          value={booking.checkOut || ""}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Special Request:</label>
        <textarea
          name="specialRequest"
          value={booking.specialRequest || ""}
          onChange={handleChange}
          rows="4"
          style={textareaStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Room Type:</label>
        <input
          type="text"
          name="room_type"
          value={booking.room_type || ""}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Status:</label>
        <select
          name="status"
          value={booking.status || ""}
          onChange={handleChange}
          style={selectStyle}
        >
          <option value="Pending">Pending</option>
          <option value="Booked">Booked</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Refund">Refund</option>
        </select>
      </div>
      <div style={{ textAlign: "center" }}>
        <button onClick={handleSave} style={saveButtonStyle}>
          Save
        </button>
        {!isNewBooking && (
          <button onClick={handleDelete} style={deleteButtonStyle}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
