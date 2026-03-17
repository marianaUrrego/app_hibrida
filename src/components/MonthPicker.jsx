import { useState } from "react";
import s from "./MonthPicker.module.scss";

const MONTHS = ["ene","feb","mar","abr","may","jun","jul","ago","sept","oct","nov","dic"];

export default function MonthPicker({ open, year, month, onClose, onConfirm, full = false }) {
  const [y, setY] = useState(year);
  const [m, setM] = useState(month);
  if (!open) return null;

  return (
    <div className={s.overlay}>
      <button aria-label="Cerrar" className={s.scrim} onClick={onClose} />
      <div className={`${s.sheet} ${full ? s.full : ""}`}>
        <div className={s.header}>
          <button className={s.arrow} onClick={() => setY(y - 1)}>‹</button>
          <div className={s.title}>{MONTHS[m]} de {y}</div>
          <button className={s.arrow} onClick={() => setY(y + 1)}>›</button>
        </div>

        <div className={s.grid}>
          {MONTHS.map((mm, idx) => (
            <button
              key={mm}
              className={`${s.month} ${m===idx ? s.active : ""}`}
              onClick={() => setM(idx)}
            >
              {mm}
            </button>
          ))}
        </div>

        <div className={s.actions}>
          <button className={s.cancel} onClick={onClose}>Cancelar</button>
          <button
            className={s.ok}
            onClick={() => { onConfirm({ year: y, month: m }); onClose(); }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}