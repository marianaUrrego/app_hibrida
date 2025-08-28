import React from "react";
import s from "./SearchFilter.module.scss";
import { FiRefreshCw, FiCheck } from "react-icons/fi";

const SearchFilter = () => {
  return (
    <div className={s.filterContainer}>
      {/* Filtros de Tipo */}
      <div className={s.filterRow}>
        <span className={s.filterLabel}>Tipo:</span>
        <button className={`${s.filterButton} ${s.active}`}>Todo</button>
        <button className={s.filterButton}>Gasto</button>
        <button className={s.filterButton}>Ingreso</button>
      </div>

      {/* Filtros de Categoría */}
      <div className={s.filterRow}>
        <span className={s.filterLabel}>Categoría:</span>
        <button className={`${s.filterButton} ${s.active}`}>Todo</button>
        <button className={s.filterButton}>+</button>
      </div>

      {/* Botones de acción */}
      <div className={s.actionButtons}>
        <button className={s.actionButton}>
          <FiRefreshCw />
        </button>
        <button className={s.actionButton}>
          <FiCheck />
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;