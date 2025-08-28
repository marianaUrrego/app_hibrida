import { NavLink } from "react-router";
import { FiSearch, FiCalendar } from "react-icons/fi";
import s from "./TopBar.module.scss";
import logo from "../assets/app-icon.png"; // ruta relativa correcta

export default function TopBar({ onCalendarClick }) {
  return (
    <header className={s.topbar}>
      <div className={s.side}>
        <NavLink to="/buscar" end className={s.iconBtn} aria-label="Buscar">
          <FiSearch className={s.icon} />
        </NavLink>
        <button
          className={s.iconBtn}
          aria-label="Calendario"
          onClick={onCalendarClick}
        >
          <FiCalendar className={s.icon} />
        </button>
      </div>

      <h1 className={s.title}>LukApp</h1>

      <div className={s.side}>
        <img src={logo} alt="LukApp logo" className={s.logo} />
      </div>
    </header>
  );
}
