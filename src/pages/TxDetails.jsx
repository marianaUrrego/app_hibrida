import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppStore } from "../store/useAppStore";
import s from "../styles/TxDetails.module.scss";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import { FiArrowLeft,
  FiShoppingCart, FiCoffee, FiTruck, FiUsers, FiDollarSign,
  FiBarChart2, FiClock, FiGift, FiSettings
} from "react-icons/fi";

const ICON = {
  shop: FiShoppingCart, food: FiCoffee, trans: FiTruck, social: FiUsers,
  salary: FiDollarSign, inv: FiBarChart2, part: FiClock, prize: FiGift, more: FiSettings
};
const LABEL = {
  shop: "Compras", food: "Comida", trans: "Transporte", social: "Social",
  salary: "Salario", inv: "Inversiones", part: "Tiempo parcial", prize: "Premios", more: "Ajustes"
};

export default function TxDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const tx = useAppStore((st) => st.transactions.find((t) => t.id === id));
  const removeTransaction = useAppStore((st) => st.removeTransaction);
  const [ask, setAsk] = useState(false);

  const d = useMemo(() => {
    if (!tx) return {};
    const dd = new Date(tx.createdAt);
    return {
      day: dd.toLocaleDateString(undefined, { day: "2-digit", month: "long", year: "numeric" }),
      full: dd.toLocaleString(),
    };
  }, [tx]);

  if (!tx) {
    return (
      <div className={s.screen}>
        <header className={s.topbar}>
          <button className={s.back} onClick={() => navigate("/home")}><FiArrowLeft/></button>
          <h1 className={s.title}>Detalles</h1>
          <div/>
        </header>
        <main className={s.body}>Movimiento no encontrado.</main>
      </div>
    );
  }

  const Is = ICON[tx.category] || FiSettings;
  const title = LABEL[tx.category] || tx.category;
  const isExpense = tx.type === "expense";

  return (
    <div className={s.screen}>
      <header className={s.topbar}>
        <button className={s.back} onClick={() => navigate(-1)}><FiArrowLeft/></button>
        <h1 className={s.title}>Detalles</h1>
        <div />
      </header>

      <main className={s.body}>
        <section className={s.hero}>
          <span className={`${s.circle} ${isExpense ? s.expense : s.income}`}>
            <Is />
          </span>
          <h2 className={s.heroTitle}>{title}</h2>
        </section>

        <section className={s.group}>
          <div className={s.row}>
            <span className={s.label}>Tipo</span>
            <span className={s.value}>{isExpense ? "Gasto" : "Ingreso"}</span>
          </div>

          <div className={s.row}>
            <span className={s.label}>Importe</span>
            <span className={`${s.value} ${s.valueStrong}`}>
              {isExpense ? "−" : "+"}{Number(tx.amount).toLocaleString()}
            </span>
          </div>

          <div className={s.row}>
            <span className={s.label}>Fecha</span>
            <span className={s.value}>
              <span className={s.valueStrong}>{d.day}</span>
              <span className={s.sub}>(Agregado {d.full})</span>
            </span>
          </div>

          <div className={s.row}>
            <span className={s.label}>Nota</span>
            <span className={s.value}>{tx.note || "—"}</span>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <button className={s.btn} onClick={() => navigate(`/tx/${tx.id}/edit`)}>Editar</button>
        <button className={`${s.btn} ${s.danger}`} onClick={() => setAsk(true)}>Eliminar</button>
      </footer>

      <ConfirmDialog
        open={ask}
        title="¿Estás seguro de eliminar?"
        cancelText="Cancelar"
        okText="Confirmar"
        onCancel={() => setAsk(false)}
        onOk={() => { removeTransaction(tx.id); navigate("/home"); }}
      />
    </div>
  );
}