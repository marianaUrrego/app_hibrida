export function formatIntegerWithThousands(value = "") {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "0";

  let out = "";
  for (let i = 0; i < digits.length; i++) {
    out += digits[i];
    const remaining = digits.length - 1 - i;
    if (remaining > 0 && remaining % 3 === 0) {
      out += ".";
    }
  }
  return out;
}

export function formatNumberToken(token = "") {
  if (!token) return "";

  const raw = token.replace(/\./g, "");
  const [intPartRaw = "0", decPart] = raw.split(",");

  const intPart = formatIntegerWithThousands(intPartRaw);
  return decPart !== undefined ? `${intPart},${decPart}` : intPart;
}

export function formatAmount(expr = "") {
  const clean = expr
    .toString()
    .replace(/\s+/g, "")
    .replace(/[^0-9,+\-.]/g, "");

  if (!clean) return "0";

  const parts = clean.split(/([+\-])/);
  const formatted = parts
    .map((part) => {
      if (part === "+" || part === "-") return part;
      if (!part) return "";
      return formatNumberToken(part);
    })
    .join("");

  return formatted || "0";
}

export function normalizeExprForEval(expr = "") {
  return expr
    .toString()
    .replace(/\s+/g, "")
    .replace(/\./g, "")
    .replace(/,/g, ".");
}

export function evalExpr(expr) {
  const normalized = normalizeExprForEval(expr);

  if (!/^[0-9.+\-]+$/.test(normalized)) return NaN;

  const tokens = normalized.match(/(\d+(\.\d+)?|[+\-])/g) || [];
  let total = 0;
  let op = "+";

  for (const tk of tokens) {
    if (tk === "+" || tk === "-") {
      op = tk;
      continue;
    }

    const n = parseFloat(tk);
    if (Number.isNaN(n)) return NaN;

    total = op === "+" ? total + n : total - n;
  }

  return total;
}