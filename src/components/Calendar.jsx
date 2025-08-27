import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarComponent() {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
        view="month"
        minDetail="decade"
        maxDetail="month"
      />
      <p>Fecha seleccionada: {date.toLocaleDateString()}</p>
    </div>
  );
}

export default CalendarComponent;