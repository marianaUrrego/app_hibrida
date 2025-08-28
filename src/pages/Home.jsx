import React, { useState } from 'react';
import TopBar from '../components/TopBar.jsx';
import MonthHeader from '../components/MonthHeader.jsx';
import EmptyState from '../components/EmptyState.jsx';
import BottomNav from '../components/BottomNav.jsx';
import CalendarComponent from '../components/Calendar.jsx';
import Add from '../pages/Add.jsx';                   
import layout from '../styles/Layout.module.scss';

export default function Home() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAdd, setShowAdd] = useState(false);        
  return (
    <div className={layout.screen}>
      <TopBar onCalendarClick={() => setShowCalendar(!showCalendar)} />

      <main className={layout.content}>
        {showAdd ? (                                 
          <Add onCancel={() => setShowAdd(false)} />
        ) : (
          <>
            {showCalendar && <CalendarComponent />}
            <EmptyState />
          </>
        )}
      </main>

      <button
        className={layout.fab}
        aria-label="Agregar"
        onClick={() => setShowAdd(true)}        
      >
        +
      </button>

      <BottomNav />
    </div>
  );
}
