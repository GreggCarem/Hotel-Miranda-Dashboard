import { useState, useEffect } from "react";
import { HeaderMenu } from "../../Components/Header-menu/Header-menu";
import { SideBar } from "../../Components/Side-Bar/Side-Bar";
import roomData from "../../JSON/rooms.json";
import "./Rooms.scss";

export default function Rooms() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    setRooms(roomData.rooms);
  }, []);
  const filteredRooms = rooms.filter(
    (room) =>
      room.roomNumber.includes(searchTerm) ||
      room.bedType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rooms-page">
      <SideBar isSidebarOpen={isSidebarOpen} />
      <HeaderMenu
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
      />
      <div
        className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by room number or bed type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="rooms-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Room Number</th>
              <th>ID</th>
              <th>Bed Type</th>
              <th>Facilities</th>
              <th>Rate</th>
              <th>Offer Price</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room) => (
              <tr key={room.id}>
                <td>
                  <img
                    src={room.photo}
                    alt={`Room ${room.roomNumber}`}
                    className="room-photo"
                  />
                </td>
                <td>{room.roomNumber}</td>
                <td>{room.id}</td>
                <td>{room.bedType}</td>
                <td>{room.facilities.join(", ")}</td>
                <td>{room.rate}</td>
                <td>{room.offerPrice}</td>
                <td>{room.status}</td>
                <td>{room.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
