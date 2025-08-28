import React from "react";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";
import s from "./TransactionList.module.scss";
import { useNavigate } from "react-router";

export default function TransactionList({ items }) {
  const navigate = useNavigate();

  if (!items?.length) return null;
  return (
    <ul className={s.list}>
      {items.map((t) => {
        const d = new Date(t.createdAt);
        const date = d.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
        const isExpense = t.type === "expense";
        return (
          <li
            key={t.id}
            className={s.row}
            onClick={() => navigate(`/tx/${t.id}`)}   // 👈 aquí usas navigate
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate(`/tx/${t.id}`)}
          >
            <div className={s.left}>
              <span className={`${s.badge} ${isExpense ? s.expense : s.income}`}>
                {isExpense ? <FiArrowDownCircle /> : <FiArrowUpCircle />}
              </span>
              <div className={s.meta}>
                <strong className={s.cat}>{t.category}</strong>
                <span className={s.date}>{date}</span>
              </div>
            </div>
            <div className={`${s.amount} ${isExpense ? s.expense : s.income}`}>
              {isExpense ? "-" : "+"}
              {Number(t.amount).toLocaleString()}
            </div>
          </li>
        );
      })}
    </ul>
  );
}