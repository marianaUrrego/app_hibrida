import { useAppStore } from "../store/useAppStore";
import s from "./MonthHeader.module.scss";

export default function MonthHeader() {
  const totalsFor = useAppStore((s) => s.totalsFor);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.toLocaleString("default", { month: "short" });

  const totals = totalsFor(year, now.getMonth());

  return (
    <section className={s.header}>
      <div className={s.pill}>
        <div className={s.month}>{year}</div>
        <div className={s.month}>{month}</div>
      </div>

      <div className={s.totals}>
        <div className={s.total}>
          <span className={s.label}>Gastos</span>
          <span className={`${s.value} ${s.expense}`}>
            {totals.expenses.toLocaleString()}
          </span>
        </div>
        <div className={s.total}>
          <span className={s.label}>Ingresos</span>
          <span className={`${s.value} ${s.income}`}>
            {totals.income.toLocaleString()}
          </span>
        </div>
        <div className={s.total}>
          <span className={s.label}>Saldo</span>
          <span
            className={`${s.value} ${
              totals.balance < 0 ? s.expense : s.income
            }`}
          >
            {totals.balance.toLocaleString()}
          </span>
        </div>
      </div>
    </section>
  );
}
