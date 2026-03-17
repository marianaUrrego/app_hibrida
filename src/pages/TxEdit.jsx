import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import s from "../styles/Add.module.scss";
import { useAppStore } from "../store/useAppStore.js";
import {
  FiCoffee, FiTruck, FiUsers, FiShoppingCart, FiMoreHorizontal,
  FiDollarSign, FiBarChart2, FiClock, FiGift,
  FiMenu, FiPlus
} from "react-icons/fi";
import { evalExpr, formatAmount } from "../utils/amountMath.js";
import { pressAmountKey } from "../utils/amountInput.js";
import NumberPad from "../components/NumberPad.jsx";

const EXP = [
  { key: "food", label: "Comida", Icon: FiCoffee },
  { key: "trans", label: "Transporte", Icon: FiTruck },
  { key: "social", label: "Social", Icon: FiUsers },
  { key: "shop", label: "Compras", Icon: FiShoppingCart },
  { key: "more", label: "Otros", Icon: FiMoreHorizontal },
];

const INC = [
  { key: "salary", label: "Salario", Icon: FiDollarSign },
  { key: "inv", label: "Inversiones", Icon: FiBarChart2 },
  { key: "part", label: "Tiempo\nparcial", Icon: FiClock },
  { key: "prize", label: "Premios", Icon: FiGift },
  { key: "more", label: "Ajustes", Icon: FiPlus },
];

export default function TxEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tx = useAppStore((st) => st.transactions.find((t) => t.id === id));
  const update = useAppStore((st) => st.updateTransaction);

  const [type, setType] = useState("expense");
  const [cat, setCat] = useState(null);
  const [note, setNote] = useState("");
  const [expr, setExpr] = useState("0");

  useEffect(() => {
    if (!tx) return;
    setType(tx.type);
    setCat(tx.category);
    setNote(tx.note || "");
    setExpr(formatAmount(String(tx.amount)));
  }, [tx]);

  if (!tx) return <div style={{ padding: 16 }}>No existe el movimiento.</div>;

  const CATS = type === "expense" ? EXP : INC;

  const press = (v) => {
    setExpr((prev) => pressAmountKey(prev, v));
  };

  const save = () => {
    if (!cat) return;

    const amount = evalExpr(expr);
    const valid = Number.isFinite(amount) ? Math.abs(amount) : 0;
    if (valid <= 0) return;

    update(tx.id, { type, category: cat, note, amount: valid });
    navigate(`/tx/${tx.id}`);
  };

  return (
    <div className={s.screen}>
      <div className={s.topbar}>
        <button className={s.link} onClick={() => navigate(-1)}>Cancelar</button>
        <div className={s.title}>Editar</div>
        <h1 className={s.title}>LukApp</h1>
      </div>

      <div className={s.body}>
        <div className={s.segmented}>
          <button
            className={`${s.seg} ${type === "expense" ? s.active : ""}`}
            onClick={() => setType("expense")}
          >
            Gasto
          </button>
          <button
            className={`${s.seg} ${type === "income" ? s.active : ""}`}
            onClick={() => setType("income")}
          >
            Ingreso
          </button>
        </div>

        <div className={s.grid}>
          {CATS.map(({ key, label, Icon }) => (
            <button
              key={key}
              className={`${s.cat} ${cat === key ? s.catActive : ""}`}
              onClick={() => setCat((p) => (p === key ? null : key))}
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

            <NumberPad onPress={press} onConfirm={save} />
          </>
        )}
      </div>
    </div>
  );
}