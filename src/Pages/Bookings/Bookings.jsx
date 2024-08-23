import { useState, useEffect } from "react";
import { HeaderMenu } from "../../Components/Header-menu/Header-menu";
import { SideBar } from "../../Components/Side-Bar/Side-Bar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookings,
  deleteBooking,
  selectAllBookings,
  selectBookingsStatus,
  selectBookingsError,
} from "../../Components/Redux/Slice/bookingsSlice";
import "./Booking.scss";

export default function Bookings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookings = useSelector(selectAllBookings);
  const bookingStatus = useSelector(selectBookingsStatus);
  const error = useSelector(selectBookingsError);

  useEffect(() => {
    if (bookingStatus === "idle") {
      dispatch(fetchBookings());
    }
  }, [bookingStatus, dispatch]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filteredBookings = bookings.filter((booking) => {
    if (selectedFilter === "All") {
      return true;
    }
    return booking.status === selectedFilter;
  });

  const handleEditClick = (id) => {
    navigate(`/edit-booking/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteBooking(id)).then((response) => {
      if (response.error) {
        alert(`Failed to delete booking: ${response.error.message}`);
      } else {
        alert(`Booking ${id} deleted successfully.`);
      }
    });
  };

  const handleCreate = () => {
    navigate("/edit-booking/new");
  };

  let content;

  if (bookingStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (bookingStatus === "succeeded") {
    content = (
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
            <tr key={booking.id}>
              <td className="image__text__column">
                <img
                  src={booking.photo}
                  alt={`Guest ${booking.guest}`}
                  className="guest-photo"
                  onClick={() => handleEditClick(booking.id)}
                  style={{ cursor: "pointer" }}
                />
                <div className="text">
                  <h1>{booking.guest}</h1>
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
                  onClick={() => handleDelete(booking.id)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (bookingStatus === "failed") {
    content = <p>{error}</p>;
  }

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
        {content}
      </div>
    </div>
  );
}
