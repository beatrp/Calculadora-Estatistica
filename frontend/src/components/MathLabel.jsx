const SYMBOL_MAP = {
  Soma: "∑",
  Média: "x̄",
  Media: "x̄",
  "Desvio padrão": "σ",
  "Desvio Padrão": "σ",
  "Desvio Padrao": "σ",
  Variância: "σ²",
  Variancia: "σ²",
  Frequência: "f",
  Frequencia: "f",
  Total: "N",
};

function MathLabel({ label, className = "formula-icon" }) {
  const symbol = SYMBOL_MAP[label];

  if (!symbol) {
    return label;
  }

  return (
    <span className={className} title={label} aria-label={label}>
      {symbol}
    </span>
  );
}

export default MathLabel;
