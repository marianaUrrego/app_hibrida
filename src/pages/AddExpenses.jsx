import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import s from "../styles/Add.module.scss";
import { useAppStore } from "../store/useAppStore.js";
import {
  FiCoffee, FiTruck, FiUsers, FiShoppingCart, FiMoreHorizontal,
  FiMenu, FiCalendar, FiDelete, FiCheck
} from "react-icons/fi";

const CATS = [
  { key: "food",  label: "Comida",     Icon: FiCoffee },
  { key: "trans", label: "Transporte", Icon: FiTruck },
  { key: "social",label: "Social",     Icon: FiUsers },
  { key: "shop",  label: "Compras",    Icon: FiShoppingCart },
  { key: "more", label: "Otros", Icon: FiMoreHorizontal },
];

function evalExpr(expr) {
  const clean = expr.replace(/\s+/g, "");
  if (!/^[0-9.+\-]+$/.test(clean)) return NaN;
  const tokens = clean.match(/(\d+(\.\d+)?|[+\-])/g) || [];
  let total = 0, op = "+";
  for (const tk of tokens) {
    if (tk === "+" || tk === "-") { op = tk; continue; }
    const n = parseFloat(tk);
    if (Number.isNaN(n)) return NaN;
    total = op === "+" ? total + n : total - n;
  }
  return total;
}

export default function AddExpenses() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const returnTo   = location.state?.from || "/home";
  const preDateISO = location.state?.dateISO || new Date().toISOString();

  const [cat, setCat]   = useState(null);
  const [note, setNote] = useState("");
  const [expr, setExpr] = useState("0");
  const addTransaction  = useAppStore((s) => s.addTransaction);

  const toggleCat = (key) => {
    setCat((prev) => (prev === key ? null : key));
    setExpr("0");
  };

  const press = (v) => {
    if (v === "DEL") { setExpr((p) => (p.length > 1 ? p.slice(0, -1) : "0")); return; }
    if (v === ".")  { setExpr((p) => (p.includes(".") && /[0-9.]+$/.test(p) ? p : p + ".")); return; }
    if (v === "+" || v === "-") { setExpr((p) => (/[+\-]$/.test(p) ? p.slice(0, -1) + v : p + v)); return; }
    setExpr((p) => (p === "0" ? v : p + v));
  };

  const handleOk = () => {
    if (!cat) return;
    const amount = evalExpr(expr);
    const valid = Number.isFinite(amount) ? Math.abs(amount) : 0;
    if (valid <= 0) return;

    addTransaction({
      id: crypto.randomUUID(),
      type: "expense",
      category: cat,
      amount: valid,
      note,
      createdAt: preDateISO,
    });

    navigate(returnTo);
  };

  return (
    <div className={s.screen}>
      <div className={s.topbar}>
        <button className={s.link} onClick={() => navigate(returnTo)}>Cancelar</button>
        <div className={s.title}>Agregar</div>
        <h1 className={s.title}>LukApp</h1>
      </div>

      <div className={s.body}>
        <div className={s.segmented}>
          <button className={`${s.seg} ${s.active}`}>Gasto</button>
          <button
            className={s.seg}
            onClick={() => navigate("/add/income", { state: { from: returnTo, dateISO: preDateISO } })}
          >
            Ingreso
          </button>
        </div>

        <div className={s.grid}>
          {CATS.map(({ key, label, Icon }) => (
            <button
              key={key}
              className={`${s.cat} ${cat===key ? s.catActive : ""}`}
              onClick={() => toggleCat(key)}
            >
              <span className={s.catIcon}><Icon/></span>
              <span className={s.catLabel}>{label}</span>
            </button>
          ))}
        </div>

        <div className={s.divider} />

        {cat && (
          <>
            <div className={s.amountRow}>
              <button className={s.iconBtn}><FiMenu/></button>
              <div className={s.amount}>{expr}</div>
            </div>

            <div className={s.noteWrap}>
              <input
                className={s.note}
                placeholder="Nota:"
                value={note}
                onChange={(e)=>setNote(e.target.value)}
              />
            </div>

            <div className={s.pad}>
              <button onClick={()=>press("7")}>7</button>
              <button onClick={()=>press("8")}>8</button>
              <button onClick={()=>press("9")}>9</button>
              <button className={s.ghost}><FiCalendar/></button>

              <button onClick={()=>press("4")}>4</button>
              <button onClick={()=>press("5")}>5</button>
              <button onClick={()=>press("6")}>6</button>
              <button className={s.ghost} onClick={()=>press("+")}>+</button>

              <button onClick={()=>press("1")}>1</button>
              <button onClick={()=>press("2")}>2</button>
              <button onClick={()=>press("3")}>3</button>
              <button className={s.ghost} onClick={()=>press("-")}>−</button>

              <button onClick={()=>press(".")}>·</button>
              <button onClick={()=>press("0")}>0</button>
              <button className={s.ghost} onClick={()=>press("DEL")}><FiDelete/></button>
              <button className={s.ok} onClick={handleOk}><FiCheck/></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}