import { useState } from "react";
import "./KPI.scss";

import {
  IoBedOutline,
  LuCalendarCheck2,
  RiExpandLeftLine,
  RiExpandRightLine,
} from "../React-Icons";

export const KPI = () => {
  const [kpis, setKpis] = useState({
    reservations: 50,
    occupancy: 95,
    checkIns: 100,
    checkOuts: 20,
  });

  return (
    <div className="kpi__container">
      <div className="kpi">
        <div className="kpi__icon">
          <IoBedOutline />
        </div>
        <div className="kpi__text">
          <h2>New Bookings</h2>
          <p>{kpis.reservations}</p>
        </div>
      </div>
      <div className="kpi">
        <div className="kpi__icon">
          <LuCalendarCheck2 />
        </div>
        <div className="kpi__text">
          <h2>Scheduled Rooms</h2>
          <p>{kpis.occupancy}%</p>
        </div>
      </div>
      <div className="kpi">
        <div className="kpi__icon">
          <RiExpandRightLine />
        </div>
        <div className="kpi__text">
          <h2>Check In</h2>
          <p>{kpis.checkIns}</p>
        </div>
      </div>
      <div className="kpi">
        <div className="kpi__icon">
          <RiExpandLeftLine />
        </div>
        <div className="kpi__text">
          <h2>Check Out</h2>
          <p>{kpis.checkOuts}</p>
        </div>
      </div>
    </div>
  );
};
