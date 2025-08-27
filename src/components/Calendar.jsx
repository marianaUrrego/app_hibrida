import React, { useState } from "react";
import Calendar from "react-calendar";
import Select from "react-select";
import "react-calendar/dist/Calendar.css";
import layout from "../styles/Layout.module.scss";

function CalendarComponent() {
  const [date, setDate] = useState(new Date());

  const years = [];
  for (let y = 2000; y <= 2030; y++) years.push({ value: y, label: y });

  const months = [
    { value: 0, label: "Ene" },
    { value: 1, label: "Feb" },
    { value: 2, label: "Mar" },
    { value: 3, label: "Abr" },
    { value: 4, label: "May" },
    { value: 5, label: "Jun" },
    { value: 6, label: "Jul" },
    { value: 7, label: "Ago" },
    { value: 8, label: "Sep" },
    { value: 9, label: "Oct" },
    { value: 10, label: "Nov" },
    { value: 11, label: "Dic" },
  ];

  const navigationLabel = ({ date, view }) => {
    if (view === "month") {
      const year = date.getFullYear();
      const month = date.getMonth();

      return (
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Select
            value={months.find((m) => m.value === month)}
            onChange={(option) => {
              const newDate = new Date(date);
              newDate.setMonth(option.value);
              setDate(newDate);
            }}
            options={months}
            isSearchable={false}
            styles={{
              control: (base) => ({
                ...base,
                minWidth: 80,
                background: "none",
                border: "none",
                boxShadow: "none",
                fontWeight: "bold",
                fontSize: "1em",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: "#222",
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
          />
          <Select
            value={years.find((y) => y.value === year)}
            onChange={(option) => {
              const newDate = new Date(date);
              newDate.setFullYear(option.value);
              setDate(newDate);
            }}
            options={years}
            isSearchable={false}
            styles={{
              control: (base) => ({
                ...base,
                minWidth: 70,
                background: "none",
                border: "none",
                boxShadow: "none",
                fontWeight: "bold",
                fontSize: "1em",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: "#222",
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
          />
        </div>
      );
    }
    return null;
  };

  const formatShortWeekday = (locale, date) =>
    date.toLocaleDateString(locale, { weekday: "narrow" });

  return (
    <div className={layout.content}>
      <Calendar
        onChange={setDate}
        value={date}
        view="month"
        minDetail="decade"
        maxDetail="month"
        showNeighboringMonth={false}
        locale="es-ES"
        prevLabel={null} // Quita flecha <
        nextLabel={null} // Quita flecha >
        next2Label={null} // Quita flechas >>
        prev2Label={null} // Quita flechas <<
        navigationLabel={navigationLabel}
        formatShortWeekday={formatShortWeekday}
        className="react-calendar"
      />
    </div>
  );
}

export default CalendarComponent;
