import React, { useState } from "react";
import { NavLink } from "react-router";
import TopBar from "../components/TopBar.jsx";
import EmptyState from "../components/EmptyState.jsx";
import BottomNav from "../components/BottomNav.jsx";
import CalendarComponent from "../components/Calendar.jsx";
import TransactionList from "../components/TransactionList.jsx";
import MonthHeader from "../components/MonthHeader.jsx";
import EditTransactionSheet from "../components/EditTransactionSheet.jsx";
import { useAppStore } from "../store/useAppStore.js";
import layout from "../styles/Layout.module.scss";

export default function Home() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [editing, setEditing] = useState(null);

  const byMonth = useAppStore((s) => s.byMonth);
  const now = new Date();
  const items = byMonth(now.getFullYear(), now.getMonth());

  return (
    <div className={layout.screen}>
      <TopBar onCalendarClick={() => setShowCalendar(!showCalendar)} />

      <main className={layout.content}>
        {showCalendar && <CalendarComponent />}

        <MonthHeader />

        {items.length ? (
          <TransactionList
            items={items}
            onItemClick={(tx) => setEditing(tx)}
          />
        ) : (
          <EmptyState />
        )}
      </main>

      <NavLink to="/add/expense" className={layout.fab} aria-label="Agregar">+</NavLink>
      <BottomNav />

      <EditTransactionSheet
        open={!!editing}
        tx={editing}
        onClose={() => setEditing(null)}
      />
    </div>
  );
}