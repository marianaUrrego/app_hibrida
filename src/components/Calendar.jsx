import React, { useState } from "react";
import s from "./Calendar.module.scss";

function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthNames = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
  ];

  const weekDays = ["D", "L", "M", "X", "J", "V", "S"];

  const years = [];
  for (let y = 2000; y <= 2030; y++) years.push(y);

  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const goToPreviousMonth = () =>
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));

  const goToNextMonth = () =>
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));

  const changeMonth = (monthIndex) => {
    setCurrentDate(new Date(currentYear, monthIndex, 1));
    setShowMonthSelector(false);
  };

  const changeYear = (year) => {
    setCurrentDate(new Date(year, currentMonth, 1));
    setShowYearSelector(false);
  };

  const selectDay = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return;
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  const generateCalendarDays = () => {
    const days = [];
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const totalDays = getDaysInMonth(currentYear, currentMonth);

    const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, isCurrentMonth: false });
    }

    for (let day = 1; day <= totalDays; day++) {
      days.push({ day, isCurrentMonth: true });
    }

    const remaining = 42 - days.length; // 6 filas * 7 columnas
    for (let day = 1; day <= remaining; day++) {
      days.push({ day, isCurrentMonth: false });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const isDaySelected = (day, isCurrentMonth) =>
    !!selectedDate &&
    isCurrentMonth &&
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === currentMonth &&
    selectedDate.getFullYear() === currentYear;

  return (
    <div className={s.calendarContainer}>
      <div className={s.calendarHeader}>
        <button className={s.navButton} onClick={goToPreviousMonth}>&lt;</button>

        <h2 className={s.calendarTitle}>Calendario</h2>

        <div className={s.monthYearSelector}>
          <div className={s.monthSelector}>
            <span
              className={s.monthYear}
              onClick={() => setShowMonthSelector(!showMonthSelector)}
            >
              {monthNames[currentMonth]}
            </span>
            {showMonthSelector && (
              <div className={s.dropdownMenu}>
                {monthNames.map((m, i) => (
                  <div
                    key={i}
                    className={`${s.dropdownItem} ${i === currentMonth ? s.active : ""}`}
                    onClick={() => changeMonth(i)}
                  >
                    {m}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={s.yearSelector}>
            <span
              className={s.monthYear}
              onClick={() => setShowYearSelector(!showYearSelector)}
            >
              {currentYear}
            </span>
            {showYearSelector && (
              <div className={s.dropdownMenu}>
                {years.map((y) => (
                  <div
                    key={y}
                    className={`${s.dropdownItem} ${y === currentYear ? s.active : ""}`}
                    onClick={() => changeYear(y)}
                  >
                    {y}
                  </div>
                ))}
              </div>
            )}
          </div>

          <span className={s.dropdownArrow}>▼</span>
        </div>
      </div>

      <div className={s.weekDays}>
        {weekDays.map((d, i) => (
          <div key={i} className={s.weekDay}>{d}</div>
        ))}
      </div>

      <div className={s.calendarGrid}>
        {calendarDays.map(({ day, isCurrentMonth }, i) => (
          <div
            key={`${day}-${i}`}
            className={`${s.calendarDay} ${
              isCurrentMonth ? s.currentMonth : s.otherMonth
            } ${isDaySelected(day, isCurrentMonth) ? s.selected : ""}`}
            onClick={() => selectDay(day, isCurrentMonth)}
          >
            {day}
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className={s.selectedDateInfo}>
          Fecha seleccionada:{" "}
          {selectedDate.toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      )}
    </div>
  );
}

export default CalendarComponent;