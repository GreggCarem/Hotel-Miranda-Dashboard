import { useState, useEffect } from "react";
import { HeaderMenu } from "../../Components/Header-menu/Header-menu";
import { SideBar } from "../../Components/Side-Bar/Side-Bar";
import ReviewsData from "./../../assets/contacts.json";
import "./Contacts.scss";

export default function Contacts() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    setReviews(ReviewsData);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sortByDate = (a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  };

  const sortedReviews = [...reviews].sort(sortByDate);

  const topReviews = sortedReviews.slice(0, 3); // 3 reviews

  return (
    <div className="reviews-page">
      <SideBar isSidebarOpen={isSidebarOpen} />
      <HeaderMenu
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
      />
      <div
        className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <div className="top-reviews">
          {topReviews.map((review) => (
            <div key={review.id} className="review-card">
              <h3>{review.name}</h3>
              <p>{review.message}</p>
              <small>{review.date}</small>
            </div>
          ))}
        </div>
        <div className="sort-controls">
          <button onClick={() => setSortOrder("asc")}>Sort by Date Up</button>
          <button onClick={() => setSortOrder("desc")}>
            Sort by Date Down
          </button>
        </div>

        <table className="reviews-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Name</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {sortedReviews.map((review) => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.date}</td>
                <td>{review.name}</td>
                <td>{review.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
