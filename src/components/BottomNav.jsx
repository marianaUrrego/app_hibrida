import { NavLink } from "react-router";
import { FiHome, FiUser } from "react-icons/fi";
import s from './BottomNav.module.scss'

export default function BottomNav() {
  return (
    <nav className={s.nav}>
      <NavLink to="/home" end className={s.tab}>
        <FiHome className={s.tabIcon} />
        <div className={s.tabLabel}>Inicio</div>
      </NavLink>

      <div className={`${s.tab} ${s.spacer}`} aria-hidden="true" />

      <NavLink to="/yo" className={s.tab}>
        <FiUser className={s.tabIcon} />
        <div className={s.tabLabel}>yo</div>
      </NavLink>
    </nav>
  )
}
