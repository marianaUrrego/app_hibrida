import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import s from "../styles/Add.module.scss";
import { useAppStore } from "../store/useAppStore.js";
import {
  FiCoffee, FiTruck, FiUsers, FiShoppingCart, FiMoreHorizontal,
  FiMenu
} from "react-icons/fi";
import { evalExpr, formatAmount } from "../utils/amountMath.js";
import { pressAmountKey } from "../utils/amountInput.js";
import NumberPad from "../components/NumberPad.jsx";

const CATS = [
  { key: "food", label: "Comida", Icon: FiCoffee },
  { key: "trans", label: "Transporte", Icon: FiTruck },
  { key: "social", label: "Social", Icon: FiUsers },
  { key: "shop", label: "Compras", Icon: FiShoppingCart },
  { key: "more", label: "Otros", Icon: FiMoreHorizontal },
];

export default function AddExpenses() {
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
              className={`${s.cat} ${cat === key ? s.catActive : ""}`}
              onClick={() => toggleCat(key)}
            >
              <span className={s.catIcon}><Icon /></span>
              <span className={s.catLabel}>{label}</span>
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