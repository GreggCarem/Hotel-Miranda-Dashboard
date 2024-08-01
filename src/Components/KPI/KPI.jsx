import { useEffect, useState } from "react";
import "./KPI.scss";

import {
  IoBedOutline,
  LuCalendarCheck2,
  RiExpandLeftLine,
  RiExpandRightLine,
} from "../React-Icons";

import reservationData from "../../assets/bookings.json";

export const KPI = () => {
  const [kpis, setKpis] = useState({
    reservations: 0,
    occupancy: 0,
    checkIns: 0,
    checkOuts: 0,
  });

  useEffect(() => {
    const calculateKpis = () => {
      const totalReservations = reservationData.length;

      const totalCheckIns = reservationData.reduce(
        (acc, item) => acc + (item.status === "Booked" ? 1 : 0),
        0
      );
      const totalCheckOuts = reservationData.reduce(
        (acc, item) => acc + (item.status === "Booked" ? 1 : 0),
        0
      );

      const now = new Date();
      const totalDays = reservationData.reduce((acc, item) => {
        const checkInDate = new Date(item.checkIn);
        const checkOutDate = new Date(item.checkOut);

        const days = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

        return acc + (now >= checkInDate && now <= checkOutDate ? days : 0);
      }, 0);

      const totalOccupancy = totalDays ? (totalCheckIns / totalDays) * 100 : 0;

      setKpis({
        reservations: totalReservations,
        occupancy: totalOccupancy.toFixed(0),
        checkIns: totalCheckIns,
        checkOuts: totalCheckOuts,
      });
    };

    calculateKpis();
  }, []);

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
