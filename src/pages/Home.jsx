import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import TopBar from "../components/TopBar.jsx";
import EmptyState from "../components/EmptyState.jsx";
import BottomNav from "../components/BottomNav.jsx";
import TransactionList from "../components/TransactionList.jsx";
import MonthHeader from "../components/MonthHeader.jsx";
import EditTransactionSheet from "../components/EditTransactionSheet.jsx";
import MonthPicker from "../components/MonthPicker.jsx";
import { useAppStore } from "../store/useAppStore.js";
import layout from "../styles/Layout.module.scss";

export default function Home() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(null);

  const byMonth = useAppStore((s) => s.byMonth);

  const today = new Date();
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [showPicker, setShowPicker] = useState(false);

  const items = byMonth(view.year, view.month);

  return (
    <div className={layout.screen}>
      <TopBar onCalendarClick={() => navigate("/calendar")} />

      <main className={layout.content}>
        <MonthHeader
          year={view.year}
          month={view.month}
          onOpenPicker={() => setShowPicker(true)}
        />

        {items.length ? (
          <TransactionList items={items} onItemClick={(tx) => setEditing(tx)} />
        ) : (
          <EmptyState />
        )}
      </main>

      <NavLink to="/add/expense" className={layout.fab} aria-label="Agregar">+</NavLink>
      <BottomNav />

      <EditTransactionSheet open={!!editing} tx={editing} onClose={() => setEditing(null)} />

      <MonthPicker
        open={showPicker}
        year={view.year}
        month={view.month}
        onClose={() => setShowPicker(false)}
        onConfirm={({ year, month }) => setView({ year, month })}
      />
    </div>
  );
}