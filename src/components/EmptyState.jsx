import s from './EmptyState.module.scss'

export default function EmptyState() {
  return (
    <div className={s.container}>
      <p className={s.text}>No hay registros</p>
    </div>
  )
}
