import React, { useState } from 'react';
import TopBar from '../components/TopBar.jsx';
import EmptyState from '../components/EmptyState.jsx';
import BottomNav from '../components/BottomNav.jsx';
import CalendarComponent from '../components/Calendar.jsx';
import AddExpenses from '../pages/AddExpenses.jsx';
import AddIncome from '../pages/AddIncome.jsx';
import layout from '../styles/Layout.module.scss';


export default function Home() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [addScreen, setAddScreen] = useState('none'); // 'none' | 'expense' | 'income'

  return (
    <div className={layout.screen}>
      {addScreen === 'none' && (
        <TopBar onCalendarClick={() => setShowCalendar(!showCalendar)} />
      )}

      <main className={layout.content}>
        {addScreen === 'expense' && (
          <AddExpenses
            onCancel={() => setAddScreen('none')}
            onSwitch={(to) => setAddScreen(to)}
          />
        )}
        {addScreen === 'income' && (
          <AddIncome
            onCancel={() => setAddScreen('none')}
            onSwitch={(to) => setAddScreen(to)}
          />
        )}
        {addScreen === 'none' && (
          <>
            {showCalendar && <CalendarComponent />}
            <EmptyState />
          </>
        )}
      </main>
      <button className={layout.fab}>+</button>
      <BottomNav />

      {addScreen === 'none' && (
        <button
          className={layout.fab}
          aria-label="Agregar"
          onClick={() => setAddScreen('expense')}
        >
          +
        </button>
      )}
      {addScreen === 'none' && <BottomNav />}
    </div>
  );
}
