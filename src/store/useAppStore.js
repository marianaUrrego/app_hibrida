import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

function recomputeMonthlyTotals(list) {
  const map = {};
  for (const t of list) {
    const key = t.createdAt.slice(0, 7); // YYYY-MM
    if (!map[key]) map[key] = { expenses: 0, income: 0, balance: 0 };
    if (t.type === "expense") map[key].expenses += Number(t.amount || 0);
    else map[key].income += Number(t.amount || 0);
    map[key].balance = map[key].income - map[key].expenses;
  }
  return map;
}

export const useAppStore = create(
  persist(
    (set, get) => ({
      transactions: [],
      monthlyTotals: {},

      addTransaction: (tx) => {
        set((s) => {
          const list = [tx, ...s.transactions];
          return { transactions: list, monthlyTotals: recomputeMonthlyTotals(list) };
        });
      },

      updateTransaction: (id, patch) => {
        set((s) => {
          const list = s.transactions.map((t) => (t.id === id ? { ...t, ...patch } : t));
          return { transactions: list, monthlyTotals: recomputeMonthlyTotals(list) };
        });
      },

      removeTransaction: (id) => {
        set((s) => {
          const list = s.transactions.filter((t) => t.id !== id);
          return { transactions: list, monthlyTotals: recomputeMonthlyTotals(list) };
        });
      },

      byMonth: (year, monthIndex) => {
        const list = get().transactions;
        return list
          .filter((t) => {
            const d = new Date(t.createdAt);
            return d.getFullYear() === year && d.getMonth() === monthIndex;
          })
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      },

      totalsFor: (year, monthIndex) => {
        const key = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
        return get().monthlyTotals[key] || { expenses: 0, income: 0, balance: 0 };
      },
    }),
    {
      name: "lukapp-store",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ transactions: s.transactions, monthlyTotals: s.monthlyTotals }),
      migrate: (state, version) => state,
    }
  )
);