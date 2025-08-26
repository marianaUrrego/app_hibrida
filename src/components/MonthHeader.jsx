import s from './MonthHeader.module.scss'

export default function MonthHeader({ year, month, gastos = 0, ingresos = 0, saldo = 0 }) {
  return (
    <section className={s.header}>
      <div className={s.pill}>
        <div className={s.month}>{year}</div>
        <div className={s.month}>{month}</div>
      </div>

      <div className={s.totals}>
        <div className={s.total}>
          <span className={s.label}>Gastos</span>
          <span className={s.value}>{gastos}</span>
        </div>
        <div className={s.total}>
          <span className={s.label}>Ingresos</span>
          <span className={s.value}>{ingresos}</span>
        </div>
        <div className={s.total}>
          <span className={s.label}>Saldo</span>
          <span className={s.value}>{saldo}</span>
        </div>
      </div>
    </section>
  )
}
