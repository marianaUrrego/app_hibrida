import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import s from "../styles/Add.module.scss";
import logo from "../assets/app-icon.png";
import { useAppStore } from "../store/useAppStore.js";
import {
  FiCoffee, FiTruck, FiUsers, FiShoppingCart, FiPlus,
  FiDollarSign, FiBarChart2, FiClock, FiGift,
  FiMenu, FiCalendar, FiDelete, FiCheck
} from "react-icons/fi";

const EXP = [
  { key: "food",  label: "Comida",     Icon: FiCoffee },
  { key: "trans", label: "Transporte", Icon: FiTruck },
  { key: "social",label: "Social",     Icon: FiUsers },
  { key: "shop",  label: "Compras",    Icon: FiShoppingCart },
  { key: "more",  label: "Ajustes",    Icon: FiPlus },
];
const INC = [
  { key: "salary", label: "Salario",         Icon: FiDollarSign },
  { key: "inv",    label: "Inversiones",     Icon: FiBarChart2 },
  { key: "part",   label: "Tiempo\nparcial", Icon: FiClock },
  { key: "prize",  label: "Premios",         Icon: FiGift },
  { key: "more",   label: "Ajustes",         Icon: FiPlus },
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

export default function TxEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tx = useAppStore((st) => st.transactions.find((t) => t.id === id));
  const update = useAppStore((st) => st.updateTransaction);

  const [type, setType] = useState("expense");
  const [cat, setCat]   = useState(null);
  const [note, setNote] = useState("");
  const [expr, setExpr] = useState("0");

  useEffect(() => {
    if (!tx) return;
    setType(tx.type);
    setCat(tx.category);
    setNote(tx.note || "");
    setExpr(String(tx.amount));
  }, [tx]);

  if (!tx) return <div style={{padding:16}}>No existe el movimiento.</div>;

  const CATS = type === "expense" ? EXP : INC;

  const press = (v) => {
    if (v === "DEL") { setExpr((p)=> (p.length>1 ? p.slice(0,-1) : "0")); return; }
    if (v === ".")  { setExpr((p)=> (p.includes(".") && /[0-9.]+$/.test(p) ? p : p + ".")); return; }
    if (v === "+" || v === "-") { setExpr((p)=> (/[+\-]$/.test(p) ? p.slice(0,-1)+v : p+v)); return; }
    setExpr((p)=> (p==="0" ? v : p+v));
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
        <img src={logo} alt="LukApp" className={s.logo} />
      </div>

      <div className={s.body}>
        <div className={s.segmented}>
          <button className={`${s.seg} ${type==="expense" ? s.active : ""}`} onClick={()=>setType("expense")}>Gasto</button>
          <button className={`${s.seg} ${type==="income" ? s.active : ""}`} onClick={()=>setType("income")}>Ingreso</button>
        </div>

        <div className={s.grid}>
          {CATS.map(({ key, label, Icon }) => (
            <button
              key={key}
              className={`${s.cat} ${cat===key ? s.catActive : ""}`}
              onClick={() => setCat((p)=> p===key ? null : key)}
            >
              <span className={s.catIcon}><Icon/></span>
              <span className={s.catLabel} dangerouslySetInnerHTML={{ __html: label.replace("\n","<br/>") }} />
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
              <input className={s.note} placeholder="Nota:" value={note} onChange={(e)=>setNote(e.target.value)} />
            </div>

            <div className={s.pad}>
              <button onClick={()=>press("7")}>7</button><button onClick={()=>press("8")}>8</button><button onClick={()=>press("9")}>9</button>
              <button className={s.ghost}><FiCalendar/></button>
              <button onClick={()=>press("4")}>4</button><button onClick={()=>press("5")}>5</button><button onClick={()=>press("6")}>6</button>
              <button className={s.ghost} onClick={()=>press("+")}>+</button>
              <button onClick={()=>press("1")}>1</button><button onClick={()=>press("2")}>2</button><button onClick={()=>press("3")}>3</button>
              <button className={s.ghost} onClick={()=>press("-")}>−</button>
              <button onClick={()=>press(".")}>·</button><button onClick={()=>press("0")}>0</button>
              <button className={s.ghost} onClick={()=>press("DEL")}><FiDelete/></button>
              <button className={s.ok} onClick={save}><FiCheck/></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}