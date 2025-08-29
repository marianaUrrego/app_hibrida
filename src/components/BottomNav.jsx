import { NavLink, useLocation } from "react-router";
import { FiHome } from "react-icons/fi";
import s from "./BottomNav.module.scss";

export default function BottomNav() {
  const { pathname } = useLocation();
  const isHome = pathname === "/home";

  return (
    <nav className={s.nav}>
      {!isHome && (
        <NavLink to="/home" end className={s.tab}>
          <FiHome className={s.tabIcon} />
          <div className={s.tabLabel}>Inicio</div>
        </NavLink>
      )}

      <div className={`${s.tab} ${s.spacer}`} aria-hidden="true" />
    </nav>
  );
}
