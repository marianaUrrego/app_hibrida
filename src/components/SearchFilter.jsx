import React from "react";
import s from "./SearchFilter.module.scss";
import { FiRefreshCw, FiCheck } from "react-icons/fi";

export default function SearchFilter({
  type = "all",
  onTypeChange,
  category = null,
  onCategoryChange,
  onApply,
  onReset,
}) {
  return (
    <div className={s.filterContainer}>
      <div className={s.filterRow}>
        <span className={s.filterLabel}>Tipo:</span>

        <button
          className={`${s.filterButton} ${type === "all" ? s.isActive : ""}`}
          onClick={() => onTypeChange?.("all")}
          aria-pressed={type === "all"}
        >
          Todo
        </button>

        <button
          className={`${s.filterButton} ${type === "expense" ? s.isActive : ""}`}
          onClick={() => onTypeChange?.("expense")}
          aria-pressed={type === "expense"}
        >
          Gasto
        </button>

        <button
          className={`${s.filterButton} ${type === "income" ? s.isActive : ""}`}
          onClick={() => onTypeChange?.("income")}
          aria-pressed={type === "income"}
        >
          Ingreso
        </button>
      </div>

      <div className={s.filterRow}>
        <span className={s.filterLabel}>Categoría:</span>

        <button
          className={`${s.filterButton} ${!category ? s.isActive : ""}`}
          onClick={() => onCategoryChange?.(null)}
          aria-pressed={!category}
        >
          Todo
        </button>

        <button
          className={s.filterButton}
          onClick={() => onCategoryChange?.("more")}
          aria-pressed={category === "more"}
        >
          +
        </button>
      </div>

      <div className={s.actionButtons}>
        <button
          className={s.actionButton}
          onClick={() => onReset?.()}
          aria-label="Restablecer filtros"
          title="Restablecer filtros"
        >
          <FiRefreshCw />
        </button>

        <button
          className={`${s.actionButton} ${s.primary}`}
          onClick={() => onApply?.({ type, category })}
          aria-label="Aplicar búsqueda"
          title="Aplicar búsqueda"
        >
          <FiCheck />
        </button>
      </div>
    </div>
  );
}