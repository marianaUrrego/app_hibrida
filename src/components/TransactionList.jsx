import React from "react";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";
import s from "./TransactionList.module.scss";

export default function TransactionList({ items, onItemClick }) {
  if (!items?.length) return null;
  return (
    <ul className={s.list}>
      {items.map((t) => {
        const d = new Date(t.createdAt);
        const date = d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
        const isExpense = t.type === "expense";
        return (
          <li
            key={t.id}
            className={s.row}
            onClick={() => onItemClick?.(t)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onItemClick?.(t)}
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
              {isExpense ? "-" : "+"}{Number(t.amount).toLocaleString()}
            </div>
          </li>
        );
      })}
    </ul>
  );
}