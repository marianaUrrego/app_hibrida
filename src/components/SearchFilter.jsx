import React from 'react';
import s from './SearchFilter.module.scss';

const SearchFilter = () => {
  return (
    <div className={s.filterContainer}>
      <div className={s.filterType}>
        <button className={s.filterButton}>Todo</button>
        <button className={s.filterButton}>Gasto</button>
        <button className={s.filterButton}>Ingreso</button>
      </div>
      <div className={s.filterCategory}>
        <span>Categoría:</span>
        <button className={s.filterButton}>Todo</button>
        <button className={s.filterButton}>+</button>
      </div>
      <div className={s.actionButtons}>
        <button className={s.actionButton}>🔄</button> {/* Botón de reiniciar */}
        <button className={s.actionButton}>✔️</button> {/* Botón de confirmar */}
      </div>
    </div>
  );
};

export default SearchFilter;
