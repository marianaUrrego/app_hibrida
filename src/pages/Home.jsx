import React, { useState } from "react";
import { NavLink } from "react-router";
import TopBar from "../components/TopBar.jsx";
import EmptyState from "../components/EmptyState.jsx";
import BottomNav from "../components/BottomNav.jsx";
import CalendarComponent from "../components/Calendar.jsx";
import layout from "../styles/Layout.module.scss";

export default function Home() {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className={layout.screen}>
      <TopBar onCalendarClick={() => setShowCalendar(!showCalendar)} />

      <main className={layout.content}>
        {showCalendar && <CalendarComponent />}
        <EmptyState />
      </main>

      <NavLink to="/add/expense" className={layout.fab} aria-label="Agregar">
        +
      </NavLink>

      <BottomNav />
    </div>
  );
}
