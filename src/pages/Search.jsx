import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import TopBar from "../components/TopBar.jsx";
import BottomNav from "../components/BottomNav.jsx";
import SearchFilter from "../components/SearchFilter.jsx";
import TransactionList from "../components/TransactionList.jsx";
import { useAppStore } from "../store/useAppStore.js";
import layout from "../styles/Layout.module.scss";

function norm(s = "") {
  return s
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function Search() {
  const navigate = useNavigate();
  const transactions = useAppStore((s) => s.transactions);

  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");         
  const [category, setCategory] = useState(null);  
  const [results, setResults] = useState([]);

  const hasApplied = useMemo(() => results !== null && Array.isArray(results), [results]);

  const handleApply = () => {
    const nq = norm(query).trim();
    const filtered = transactions
      .filter((t) => {
        // 1) Nota por prefijo
        const noteOk = nq === "" ? true : norm(t.note || "").startsWith(nq);

        // 2) Tipo
        const typeOk = type === "all" ? true : t.type === type;

        // 3) Categoría
        const catOk = category ? t.category === category : true;

        return noteOk && typeOk && catOk;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setResults(filtered);
  };

  const handleReset = () => {
    setQuery("");
    setType("all");
    setCategory(null);
    setResults([]);
  };

  return (
    <div className={layout.screen}>
      <TopBar />

      <main className={layout.content}>
        <div className={layout.placeholder} style={{ paddingBottom: 8 }}>
          <input
            className={layout.searchInput}
            placeholder="Buscar por nota..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <SearchFilter
          type={type}
          onTypeChange={setType}
          category={category}
          onCategoryChange={setCategory}
          onApply={handleApply}
          onReset={handleReset}
        />

        {/* Resultados */}
        {hasApplied && results.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <TransactionList
              items={results}
              onItemClick={(tx) => navigate(`/tx/${tx.id}`)}
            />
          </div>
        )}

        {hasApplied && results.length === 0 && (
          <p style={{ textAlign: "center", color: "#6b7280", marginTop: 16 }}>
            No hay resultados para tu búsqueda.
          </p>
        )}
      </main>

      <BottomNav />
    </div>
  );
}