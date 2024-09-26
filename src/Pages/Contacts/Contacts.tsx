import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeaderMenu } from "../../Components/Header-menu/Header-menu";
import { SideBar } from "../../Components/Side-Bar/Side-Bar";
import {
  fetchContacts,
  selectAllContacts,
  selectContactsStatus,
  selectContactsError,
} from "../../Components/Redux/Slice/contactsSlice";
import { AppDispatch } from "../../Components/Redux/store";
import "./Contacts.scss";

export default function Contacts() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const contactsPerPage = 3;

  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector(selectAllContacts);
  const contactsStatus = useSelector(selectContactsStatus);
  const error = useSelector(selectContactsError);

  useEffect(() => {
    if (contactsStatus === "idle") {
      dispatch(fetchContacts());
    }
  }, [contactsStatus, dispatch]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sortByDate = (a, b) => {
    return sortOrder === "asc"
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime();
  };

  const sortedContacts = Array.isArray(contacts)
    ? [...contacts].sort(sortByDate)
    : [];

  const totalPages = Math.ceil(sortedContacts.length / contactsPerPage);

  const nextSlide = () => {
    setCurrentPage((prevPage) =>
      prevPage === totalPages - 1 ? 0 : prevPage + 1
    );
  };

  const prevSlide = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? totalPages - 1 : prevPage - 1
    );
  };

  const startIndex = currentPage * contactsPerPage;
  const currentContacts = sortedContacts.slice(
    startIndex,
    startIndex + contactsPerPage
  );

  let content;

  if (contactsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (contactsStatus === "succeeded") {
    content = (
      <>
        <div className="slider-container">
          <button className="prev" onClick={prevSlide}>
            &#10094;
          </button>
          <div className="contact-slider">
            {currentContacts.map((contact) => (
              <div key={contact._id} className="contact-card">
                <h3>{contact.name}</h3>
                <p>{contact.message}</p>
                <small>{new Date(contact.date).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
          <button className="next" onClick={nextSlide}>
            &#10095;
          </button>
        </div>

        <div className="sort-controls">
          <button onClick={() => setSortOrder("asc")}>Sort Ascending</button>
          <button onClick={() => setSortOrder("desc")}>Sort Descending</button>
        </div>

        <table className="contacts-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Name</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {sortedContacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact._id}</td>
                <td>{new Date(contact.date).toLocaleDateString()}</td>
                <td>{contact.name}</td>
                <td>{contact.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  } else if (contactsStatus === "failed") {
    content = <p>Error: {error}</p>;
  }

  return (
    <div className="contacts-page">
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
        {content}
      </div>
    </div>
  );
}
