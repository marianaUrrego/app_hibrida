import React, { useEffect, useState } from "react";
import { FiX, FiTrash2, FiSave } from "react-icons/fi";
import { useAppStore } from "../store/useAppStore";
import s from "./EditTransactionSheet.module.scss";

export default function EditTransactionSheet({ open, tx, onClose }) {
  const updateTransaction = useAppStore((st) => st.updateTransaction);
  const removeTransaction = useAppStore((st) => st.removeTransaction);

  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("0");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (tx) {
      setType(tx.type);
      setCategory(tx.category);
      setAmount(String(tx.amount));
      setNote(tx.note || "");
    }
  }, [tx]);

  if (!open || !tx) return null;

  const onSave = () => {
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt < 0) return;
    updateTransaction(tx.id, { type, category, amount: amt, note });
    onClose?.();
  };

  const onDelete = () => {
    removeTransaction(tx.id);
    onClose?.();
  };

  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={s.header}>
          <button className={s.iconBtn} onClick={onClose}><FiX/></button>
          <div className={s.title}>Editar movimiento</div>
          <div className={s.spacer} />
        </div>

        <div className={s.body}>
          <label className={s.label}>Tipo</label>
          <div className={s.segmented}>
            <button className={`${s.seg} ${type === "expense" ? s.active : ""}`} onClick={() => setType("expense")}>Gasto</button>
            <button className={`${s.seg} ${type === "income"  ? s.active : ""}`} onClick={() => setType("income")}>Ingreso</button>
          </div>

          <label className={s.label}>Categoría</label>
          <input className={s.input} value={category} onChange={(e)=>setCategory(e.target.value)} />

          <label className={s.label}>Monto</label>
          <input className={s.input} type="number" step="0.01" value={amount} onChange={(e)=>setAmount(e.target.value)} />

          <label className={s.label}>Nota</label>
          <input className={s.input} value={note} onChange={(e)=>setNote(e.target.value)} />
        </div>

        <div className={s.footer}>
          <button className={`${s.btn} ${s.danger}`} onClick={onDelete}><FiTrash2/> Eliminar</button>
          <button className={`${s.btn} ${s.primary}`} onClick={onSave}><FiSave/> Guardar</button>
        </div>
      </div>
    </div>
  );
}