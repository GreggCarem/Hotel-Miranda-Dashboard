import { useState, useEffect } from "react";
import { HeaderMenu } from "../../Components/Header-menu/Header-menu";
import { SideBar } from "../../Components/Side-Bar/Side-Bar";
import bookingData from "../../assets/bookings.json";
import { useNavigate } from "react-router-dom";
import "./Booking.scss";

export default function Bookings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setBookings(bookingData);
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    if (selectedFilter === "All") {
      return true;
    }
    return booking.status === selectedFilter;
  });

  const handleEditClick = (reservationID) => {
    navigate(`/edit-booking/${reservationID}`);
  };

  const handleDelete = (reservationID) => {
    setBookings(
      bookings.filter((booking) => booking.reservationID !== reservationID)
    );
  };

  const handleCreate = () => {
    navigate("/edit-booking/new");
  };

  return (
    <div className="bookings-page">
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
        <div className="filter-buttons">
          <button onClick={() => setSelectedFilter("All")}>All</button>
          <button onClick={() => setSelectedFilter("Pending")}>Pending</button>
          <button onClick={() => setSelectedFilter("Booked")}>Booked</button>
          <button onClick={() => setSelectedFilter("Cancelled")}>
            Cancelled
          </button>
          <button onClick={() => setSelectedFilter("Refund")}>Refund</button>
          <button
            onClick={handleCreate}
            style={{ backgroundColor: "#007bff", color: "#fff" }}
          >
            Create New Booking
          </button>
        </div>
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Guest</th>
              <th>Order Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Special Request</th>
              <th>Room Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.reservationID}>
                <td className="image__text__column">
                  <img
                    src={booking.photo}
                    alt={`Guest ${booking.guest}`}
                    className="guest-photo"
                    onClick={() => handleEditClick(booking.reservationID)}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="text">
                    <h1>{booking.guest}</h1>
                    <h2>{booking.reservationID}</h2>
                  </div>
                </td>
                <td>{booking.orderDate}</td>
                <td>{booking.checkIn}</td>
                <td>{booking.checkOut}</td>
                <td>
                  <button onClick={() => window.alert(booking.specialRequest)}>
                    View Notes
                  </button>
                </td>
                <td>{booking.room_type}</td>
                <td>{booking.status}</td>
                <td>
                  <button
                    onClick={() => handleDelete(booking.reservationID)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
