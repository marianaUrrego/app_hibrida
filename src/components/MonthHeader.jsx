import { useAppStore } from "../store/useAppStore";
import s from "./MonthHeader.module.scss";

export default function MonthHeader({ year, month, onOpenPicker }) {
  const totalsFor = useAppStore((st) => st.totalsFor);
  const totals = totalsFor(year, month);

  const monthName = new Date(year, month, 1).toLocaleString("es-ES", { month: "short" });

  return (
    <section className={s.header}>
      <button className={s.pill} onClick={onOpenPicker} aria-label="Elegir mes">
        <div className={s.month}>{year}</div>
        <div className={s.month} style={{ textTransform: "capitalize" }}>
          {monthName}
        </div>
      </button>

      <div className={s.totals}>
        <div className={s.total}>
          <span className={s.label}>Gastos</span>
          <span className={`${s.value} ${s.expense}`}>{totals.expenses.toLocaleString()}</span>
        </div>
        <div className={s.total}>
          <span className={s.label}>Ingresos</span>
          <span className={`${s.value} ${s.income}`}>{totals.income.toLocaleString()}</span>
        </div>
        <div className={s.total}>
          <span className={s.label}>Saldo</span>
          <span className={`${s.value} ${totals.balance < 0 ? s.expense : s.income}`}>
            {totals.balance.toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
}
