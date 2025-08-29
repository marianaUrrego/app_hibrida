import { useState } from "react";
import { useNavigate } from "react-router";
import TopBar from "../components/TopBar.jsx";
import BottomNav from "../components/BottomNav.jsx";
import CalendarComponent from "../components/Calendar.jsx";
import layout from "../styles/Layout.module.scss";
import s from "../components/Calendar.module.scss";

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export default function CalendarPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [openMenu, setOpenMenu] = useState(false);

  const go = (type) => {
    const dateISO = startOfDay(selectedDate).toISOString();
    setOpenMenu(false);
    navigate(type === "expense" ? "/add/expense" : "/add/income", {
      state: { dateISO, from: "/calendar" },
    });
  };

  return (
    <div className={layout.screen}>
      <TopBar onCalendarClick={null} />

      <main className={layout.content}>
        <CalendarComponent
          value={selectedDate}
          onChange={(d) => setSelectedDate(startOfDay(d))}
        />
      </main>

      <button
        className={layout.fab}
        aria-label="Agregar"
        onClick={() => setOpenMenu((v) => !v)}
      >
        +
      </button>

      {openMenu && (
        <>
          <button
            aria-label="Cerrar menú"
            className={s.scrim}
            onClick={() => setOpenMenu(false)}
          />
          <div className={s.menu}>
            <button className={s.menuBtn} onClick={() => go("expense")}>
              Añadir Gasto
            </button>
            <button className={s.menuBtn} onClick={() => go("income")}>
              Añadir Ingreso
            </button>
          </div>
        </>
      )}

      <BottomNav />
    </div>
  );
}