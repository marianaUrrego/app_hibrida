import { PiPiggyBankBold } from "react-icons/pi";
import s from './EmptyState.module.scss'

export default function EmptyState() {
  return (
    <div className={s.container}>
      <div className={s.card}>
        <PiPiggyBankBold className={s.icon} />
        <div className={s.text}>
          <div>No hay</div>
          <div>registros</div>
        </div>
      </div>
    </div>
  )
}
