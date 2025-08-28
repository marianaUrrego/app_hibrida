import React, { useState } from 'react';
import TopBar from '../components/TopBar.jsx';
import EmptyState from '../components/EmptyState.jsx';
import BottomNav from '../components/BottomNav.jsx';
import CalendarComponent from '../components/Calendar.jsx';
import AddExpenses from "../pages/AddExpenses.jsx";

import layout from '../styles/Layout.module.scss';

export default function Home() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className={layout.screen}>
      {!showAdd && (
        <TopBar onCalendarClick={() => setShowCalendar(!showCalendar)} />
      )}
      <main className={layout.content}>
        {showAdd ? (
          <AddExpenses onCancel={() => setShowAdd(false)} />
        ) : (
          <>
            {showCalendar && <CalendarComponent />}
            <EmptyState />
          </>
        )}
      </main>
      {!showAdd && (
        <button
          className={layout.fab}
          aria-label="Agregar"
          onClick={() => setShowAdd(true)}
        >
          +
        </button>
      )}
      {!showAdd && <BottomNav />}
    </div>
  );
}
