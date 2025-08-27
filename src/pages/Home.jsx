import React, { useState } from 'react';
import TopBar from '../components/TopBar.jsx';
import MonthHeader from '../components/MonthHeader.jsx';
import EmptyState from '../components/EmptyState.jsx';
import BottomNav from '../components/BottomNav.jsx';
import CalendarComponent from '../components/Calendar.jsx';
import layout from '../styles/Layout.module.scss';

export default function Home() {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className={layout.screen}>
      <TopBar onCalendarClick={() => setShowCalendar(!showCalendar)} />
      <MonthHeader year="2025" month="Ago" gastos={0} ingresos={0} saldo={0} />
      <main className={layout.content}>
        {showCalendar && <CalendarComponent />}
        <EmptyState />
      </main>
      <button className={layout.fab} aria-label="Agregar">+</button>
      <BottomNav />
    </div>
  );
}
