import { useState } from "react";
import s from "../styles/Add.module.scss";
import {
  FiDollarSign,
  FiBarChart2,
  FiClock,
  FiGift,
  FiMoreHorizontal,
  FiPlus,
  FiMenu,
  FiCalendar,
  FiDelete,
  FiCheck,
} from "react-icons/fi";

const CATS = [
  { key: "salary", label: "Salario", Icon: FiDollarSign },
  { key: "inv", label: "Inversiones", Icon: FiBarChart2 },
  { key: "part", label: "Tiempo\nparcial", Icon: FiClock },
  { key: "prize", label: "Premios", Icon: FiGift },
  { key: "other", label: "Otros", Icon: FiMoreHorizontal },
  { key: "more", label: "Ajustes", Icon: FiPlus },
];

export default function Add({ onCancel }) {
  const [type, setType] = useState("gasto"); // 'gasto' | 'ingreso'
  const [cat, setCat] = useState("salary");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("0");

  const press = (v) => {
    if (v === "OK") {
      // TODO: aquí podrías guardar la transacción antes de cerrar
      if (onCancel) onCancel();
      return;
    }
    if (v === "DEL") {
      const next = amount.length > 1 ? amount.slice(0, -1) : "0";
      setAmount(next.endsWith(".") ? next.slice(0, -1) : next);
      return;
    }
    if (v === ".") {
      if (!amount.includes(".")) setAmount(amount + ".");
      return;
    }
    if (v === "CLR") {
      setAmount("0");
      return;
    }
    // número
    setAmount((prev) => {
      const clean = prev === "0" ? "" : prev;
      const next = (clean + v).slice(0, 9);
      return next || "0";
    });
  };

  return (
    <div className={s.screen}>
      {/* Topbar inline */}
      <div className={s.topbar}>
        <button className={s.link} onClick={() => onCancel && onCancel()}>
          Cancelar
        </button>
        <div className={s.title}>Agregar</div>
        <div className={s.brand}>LukApp</div>
      </div>

      {/* Selector tipo */}
      <div className={s.segmented}>
        <button
          className={`${s.seg} ${type === "gasto" ? s.active : ""}`}
          onClick={() => setType("gasto")}
        >
          Gasto
        </button>
        <button
          className={`${s.seg} ${type === "ingreso" ? s.active : ""}`}
          onClick={() => setType("ingreso")}
        >
          Ingreso
        </button>
      </div>

      {/* Categorías */}
      <div className={s.grid}>
        {CATS.map(({ key, label, Icon }) => (
          <button
          key={key}
          className={`${s.cat} ${key === "salary" ? s.catGold : ""} ${cat === key ? s.catActive : ""}`}
          onClick={() => setCat(key)}
        >
        
            <span className={s.catIcon}>
              <Icon />
            </span>
            <span
              className={s.catLabel}
              dangerouslySetInnerHTML={{
                __html: label.replace("\n", "<br/>"),
              }}
            />
          </button>
        ))}
      </div>

      {/* Monto */}
      <div className={s.amountRow}>
        <button className={s.iconBtn} aria-label="Menú">
          <FiMenu />
        </button>
        <div className={s.amount}>{amount}</div>
      </div>

      {/* Nota */}
      <div className={s.noteWrap}>
        <input
          className={s.note}
          placeholder="Nota:"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      {/* Teclado numérico */}
      <div className={s.pad}>
        {/* fila 1 */}
        <button onClick={() => press("7")}>7</button>
        <button onClick={() => press("8")}>8</button>
        <button onClick={() => press("9")}>9</button>
        <button className={s.ghost} aria-label="Fecha">
          <FiCalendar />
        </button>

        {/* fila 2 */}
        <button onClick={() => press("4")}>4</button>
        <button onClick={() => press("5")}>5</button>
        <button onClick={() => press("6")}>6</button>
        <button className={s.ghost} onClick={() => press("+")}>
          +
        </button>

        {/* fila 3 */}
        <button onClick={() => press("1")}>1</button>
        <button onClick={() => press("2")}>2</button>
        <button onClick={() => press("3")}>3</button>
        <button className={s.ghost} onClick={() => press("-")}>
          −
        </button>

        {/* fila 4 */}
        <button onClick={() => press(".")}>·</button>
        <button onClick={() => press("0")}>0</button>
        <button className={s.ghost} onClick={() => press("DEL")}>
          <FiDelete />
        </button>
        <button className={s.ok} onClick={() => press("OK")}>
          <FiCheck />
        </button>
      </div>

      {/* barra de gestos */}
      <div className={s.homebar} />
    </div>
  );
}
