import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import s from "../styles/Add.module.scss";
import { useAppStore } from "../store/useAppStore.js";
import {
  FiDollarSign, FiBarChart2, FiClock, FiGift, FiMoreHorizontal,
  FiMenu
} from "react-icons/fi";
import { evalExpr, formatAmount } from "../utils/amountMath.js";
import { pressAmountKey } from "../utils/amountInput.js";
import NumberPad from "../components/NumberPad.jsx";

const CATS = [
  { key: "salary", label: "Salario", Icon: FiDollarSign },
  { key: "inv", label: "Inversiones", Icon: FiBarChart2 },
  { key: "part", label: "Tiempo\nparcial", Icon: FiClock },
  { key: "prize", label: "Premios", Icon: FiGift },
  { key: "more", label: "Otros", Icon: FiMoreHorizontal },
];

export default function AddIncome() {
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.from || "/home";
  const preDateISO = location.state?.dateISO || new Date().toISOString();

  const [cat, setCat] = useState(null);
  const [note, setNote] = useState("");
  const [expr, setExpr] = useState("0");
  const addTransaction = useAppStore((s) => s.addTransaction);

  const toggleCat = (key) => {
    setCat((prev) => (prev === key ? null : key));
    setExpr("0");
  };

  const press = (v) => {
    setExpr((prev) => pressAmountKey(prev, v));
  };

  const handleOk = () => {
    if (!cat) return;

    const amount = evalExpr(expr);
    const valid = Number.isFinite(amount) ? Math.abs(amount) : 0;
    if (valid <= 0) return;

    addTransaction({
      id: crypto.randomUUID(),
      type: "income",
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
          <button
            className={s.seg}
            onClick={() => navigate("/add/expense", { state: { from: returnTo, dateISO: preDateISO } })}
          >
            Gasto
          </button>
          <button className={`${s.seg} ${s.active}`}>Ingreso</button>
        </div>

        <div className={s.grid}>
          {CATS.map(({ key, label, Icon }) => (
            <button
              key={key}
              className={`${s.cat} ${cat === key ? s.catActive : ""}`}
              onClick={() => toggleCat(key)}
            >
              <span className={s.catIcon}><Icon /></span>
              <span
                className={s.catLabel}
                dangerouslySetInnerHTML={{ __html: label.replace("\n", "<br/>") }}
              />
            </button>
          ))}
        </div>

        <div className={s.divider} />

        {cat && (
          <>
            <div className={s.amountRow}>
              <button className={s.iconBtn}><FiMenu /></button>
              <div className={s.amount}>{formatAmount(expr)}</div>
            </div>

            <div className={s.noteWrap}>
              <input
                className={s.note}
                placeholder="Nota:"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <NumberPad onPress={press} onConfirm={handleOk} />
          </>
        )}
      </div>
    </div>
  );
}