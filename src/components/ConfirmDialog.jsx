import s from "../styles/ConfirmDialog.module.scss";

export default function ConfirmDialog({ open, title, cancelText="Cancelar", okText="Confirmar", onCancel, onOk }) {
  if (!open) return null;
  return (
    <div className={s.backdrop} onClick={onCancel}>
      <div className={s.card} onClick={(e)=>e.stopPropagation()}>
        <div className={s.title}>{title}</div>
        <div className={s.actions}>
          <button className={s.btn} onClick={onCancel}>{cancelText}</button>
          <button className={`${s.btn} ${s.ok}`} onClick={onOk}>{okText}</button>
        </div>
      </div>
    </div>
  );
}