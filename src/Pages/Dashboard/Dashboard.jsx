import { useState } from "react";
import { HeaderMenu } from "../../Components/Header-menu/Header-menu";
import { SideBar } from "../../Components/Side-Bar/Side-Bar";
import { KPI } from "../../Components/KPI/KPI";
import "./Dashboard.scss";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashbaord-page">
      <SideBar isSidebarOpen={isSidebarOpen} />

      <HeaderMenu
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
      />
      <div
        className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <KPI />
      </div>
    </div>
  );
}
