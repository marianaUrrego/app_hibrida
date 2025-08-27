import React, { useState } from "react";
import s from "./Calendar.module.scss";

function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);
  
  // Obtener el mes y año actual
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Nombres de meses
  
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  
  // Nombres de días de la semana 
  const weekDays = ["D", "L", "M", "X", "J", "V", "S"];
  
  // Debug: verificar que weekDays se esté definiendo correctamente
  console.log("Días de la semana:", weekDays);
  
  // Generar años (desde 2000 hasta 2030)
  const years = [];
  for (let y = 2000; y <= 2030; y++) {
    years.push(y);
  }
  
  // Función para obtener el primer día del mes
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Función para obtener el número de días en el mes
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Función para navegar al mes anterior
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  // Función para navegar al mes siguiente
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  
  // Función para cambiar mes
  const changeMonth = (monthIndex) => {
    setCurrentDate(new Date(currentYear, monthIndex, 1));
    setShowMonthSelector(false);
  };
  
  // Función para cambiar año
  const changeYear = (year) => {
    setCurrentDate(new Date(year, currentMonth, 1));
    setShowYearSelector(false);
  };
  
  // Función para seleccionar día
  const selectDay = (day, isCurrentMonth) => {
    if (isCurrentMonth) {
      const newSelectedDate = new Date(currentYear, currentMonth, day);
      setSelectedDate(newSelectedDate);
    }
  };
  
  // Generar días del mes
  const generateCalendarDays = () => {
    const days = [];
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const totalDays = getDaysInMonth(currentYear, currentMonth);
    
    // Agregar días del mes anterior para completar la primera semana
    const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, isCurrentMonth: false });
    }
    
    // Agregar días del mes actual
    for (let day = 1; day <= totalDays; day++) {
      days.push({ day, isCurrentMonth: true });
    }
    
    // Agregar días del mes siguiente para completar la última semana
    const remainingDays = 42 - days.length; // 6 semanas * 7 días
    for (let day = 1; day <= remainingDays; day++) {
      days.push({ day, isCurrentMonth: false });
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  
  // Verificar si un día está seleccionado
  const isDaySelected = (day, isCurrentMonth) => {
    if (!selectedDate || !isCurrentMonth) return false;
    return selectedDate.getDate() === day && 
           selectedDate.getMonth() === currentMonth && 
           selectedDate.getFullYear() === currentYear;
  };
  
  return (
    <div className={s.calendarContainer}>
      {/* Header del calendario */}
      <div className={s.calendarHeader}>
        <button className={s.navButton} onClick={goToPreviousMonth}>
          &lt;
        </button>
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
                {monthNames.map((month, index) => (
                  <div
                    key={index}
                    className={`${s.dropdownItem} ${index === currentMonth ? s.active : ''}`}
                    onClick={() => changeMonth(index)}
                  >
                    {month}
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
                {years.map((year) => (
                  <div
                    key={year}
                    className={`${s.dropdownItem} ${year === currentYear ? s.active : ''}`}
                    onClick={() => changeYear(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>
          <span className={s.dropdownArrow}>▼</span>
        </div>
      </div>
      
      {/* Días de la semana */}
      <div className={s.weekDays} style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        gap: '8px', 
        marginBottom: '16px',
        backgroundColor: '#f8f9fa',
        padding: '8px',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        {weekDays && weekDays.length > 0 ? (
          weekDays.map((day, index) => (
            <div key={index} className={s.weekDay} style={{
              textAlign: 'center',
              fontSize: '14px',
              fontWeight: '700',
              color: '#333',
              padding: '8px 4px',
              backgroundColor: 'white',
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              {day}
            </div>
          ))
        ) : (
          <div>Error: No se pudieron cargar los días de la semana</div>
        )}
      </div>
      
      {/* Días del calendario */}
      <div className={s.calendarGrid}>
        {calendarDays.map(({ day, isCurrentMonth }, index) => (
          <div
            key={index}
            className={`${s.calendarDay} ${
              isCurrentMonth ? s.currentMonth : s.otherMonth
            } ${isDaySelected(day, isCurrentMonth) ? s.selected : ''}`}
            onClick={() => selectDay(day, isCurrentMonth)}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Información de fecha seleccionada */}
      {selectedDate && (
        <div className={s.selectedDateInfo}>
          Fecha seleccionada: {selectedDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      )}
    </div>
  );
}

export default CalendarComponent;
