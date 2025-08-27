import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarCustom.css'; // Importa los estilos personalizados

function CalendarComponent() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-container">
      <Calendar
        onChange={setDate}
        value={date}
        view="month"
        minDetail="decade"
        maxDetail="month"
        showNeighboringMonth={false}
        locale="es-ES"
        next2Label={null}
        prev2Label={null}
      />
    </div>
  );
}

export default CalendarComponent;