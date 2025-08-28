import { useState } from "react";
import { NavLink } from "react-router";
import s from "../styles/Add.module.scss";
import logo from "../assets/app-icon.png";
import {
  FiDollarSign, FiBarChart2, FiClock, FiGift, FiMoreHorizontal, FiPlus,
  FiMenu, FiCalendar, FiDelete, FiCheck
} from "react-icons/fi";

const CATS = [
  { key: "salary", label: "Salario", Icon: FiDollarSign },
  { key: "inv",    label: "Inversiones", Icon: FiBarChart2 },
  { key: "part",   label: "Tiempo\nparcial", Icon: FiClock },
  { key: "prize",  label: "Premios", Icon: FiGift },
  { key: "other",  label: "Otros", Icon: FiMoreHorizontal },
  { key: "more",   label: "Ajustes", Icon: FiPlus },
];

export default function AddExpenses() {
  const [cat, setCat]       = useState("salary");
  const [note, setNote]     = useState("");
  const [amount, setAmount] = useState("0");

  const press = (v) => {
    if (v === "DEL") { const next = amount.length>1?amount.slice(0,-1):"0"; setAmount(next.endsWith(".")?next.slice(0,-1):next); return; }
    if (v === ".")   { if(!amount.includes(".")) setAmount(amount+"."); return; }
    if (v === "CLR") { setAmount("0"); return; }
    if (v === "OK")  { return; }
    setAmount((p)=> (p==="0"?"":p)+v);
  };

  return (
    <div className={s.screen}>
      <div className={s.topbar}>
        <NavLink to="/" className={s.link}>Cancelar</NavLink>
        <div className={s.title}>Agregar</div>
        <img src={logo} alt="LukApp" className={s.logo} />
      </div>

      <div className={s.body}>
        <div className={s.segmented}>
          <button className={`${s.seg} ${s.active}`}>Gasto</button>
          <NavLink to="/add/income" className={s.seg}>Ingreso</NavLink>
        </div>

        <div className={s.grid}>
          {CATS.map(({ key, label, Icon }) => (
            <button
              key={key}
              className={`${s.cat} ${key==="salary"?s.catGold:""} ${cat===key? s.catActive:""}`}
              onClick={() => setCat(key)}
            >
              <span className={s.catIcon}><Icon/></span>
              <span
                className={s.catLabel}
                dangerouslySetInnerHTML={{ __html: label.replace("\n","<br/>") }}
              />
            </button>
          ))}
        </div>

        <div className={s.divider} />

        <div className={s.amountRow}>
          <button className={s.iconBtn}><FiMenu/></button>
          <div className={s.amount}>{amount}</div>
        </div>

        <div className={s.noteWrap}>
          <input className={s.note} placeholder="Nota:" value={note} onChange={(e)=>setNote(e.target.value)} />
        </div>

        <div className={s.pad}>
          <button onClick={()=>press("7")}>7</button>
          <button onClick={()=>press("8")}>8</button>
          <button onClick={()=>press("9")}>9</button>
          <button className={s.ghost}><FiCalendar/></button>

          <button onClick={()=>press("4")}>4</button>
          <button onClick={()=>press("5")}>5</button>
          <button onClick={()=>press("6")}>6</button>
          <button className={s.ghost}>+</button>

          <button onClick={()=>press("1")}>1</button>
          <button onClick={()=>press("2")}>2</button>
          <button onClick={()=>press("3")}>3</button>
          <button className={s.ghost}>−</button>

          <button onClick={()=>press(".")}>·</button>
          <button onClick={()=>press("0")}>0</button>
          <button className={s.ghost} onClick={()=>press("DEL")}><FiDelete/></button>
          <button className={s.ok} onClick={()=>press("OK")}><FiCheck/></button>
        </div>
      </div>
    </div>
  );
}
