import React from 'react';
import s from './SearchFilter.module.scss';

const SearchFilter = () => {
  return (
    <div className={s.filterContainer}>

      <div className={s.filterRow}>
        <span className={s.filterLabel}>Tipo:</span>
        <button className={`${s.filterButton} ${s.active}`}>Todo</button>
        <button className={s.filterButton}>Gasto</button>
        <button className={s.filterButton}>Ingreso</button>
      </div>


      <div className={s.filterRow}>
        <span className={s.filterLabel}>Categoría:</span>
        <button className={`${s.filterButton} ${s.active}`}>Todo</button>
        <button className={s.filterButton}>+</button>
      </div>


      <div className={s.actionButtons}>
        <button className={s.actionButton}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z" fill="currentColor"/>
          </svg>
        </button>
        <button className={s.actionButton}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.16.17Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
