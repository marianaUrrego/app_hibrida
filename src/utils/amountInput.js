import { formatAmount } from "./amountMath.js";

function getCurrentTerm(expr = "") {
  const parts = expr.split(/[+\-]/);
  return parts[parts.length - 1] || "";
}

export function pressAmountKey(prev, key) {
  const current = (prev ?? "0").toString();

  if (key === "DEL") {
    const sliced = current.length > 1 ? current.slice(0, -1) : "0";
    const cleaned = sliced === "" ? "0" : sliced;
    return formatAmount(cleaned);
  }

  if (key === "+" || key === "-") {
    if (current === "0" && key === "+") return "0";
    if (/[+\-]$/.test(current)) {
      return current.slice(0, -1) + key;
    }
    return current + key;
  }

  if (key === ",") {
    const term = getCurrentTerm(current);

    if (term.includes(",")) return current;

    if (/[+\-]$/.test(current)) {
      return current + "0,";
    }

    return current === "0" ? "0," : current + ",";
  }

  if (/^\d$/.test(key)) {
    if (current === "0") {
      return formatAmount(key);
    }
    return formatAmount(current + key);
  }

  return current;
}