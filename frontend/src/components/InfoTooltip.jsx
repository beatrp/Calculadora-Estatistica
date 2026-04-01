const FIELD_DESCRIPTIONS = [
  { key: "fi", description: "frequencia absoluta de cada valor ou classe" },
  {
    key: "xi",
    description: "valor representativo da classe",
    formula: "xi = (Li + Ls) / 2",
  },
  {
    key: "fr",
    description: "frequencia relativa em proporcao ou percentual",
    formula: "fr = fi / N",
  },
  {
    key: "Fi",
    description: "frequencia absoluta acumulada",
    formula: "Fi = sum(fi)",
  },
  {
    key: "Fr",
    description: "frequencia relativa acumulada",
    formula: "Fr = Fi / N",
  },
];

function InfoTooltip() {
  return (
    <span className="info-tooltip">
      <button
        type="button"
        className="info-tooltip-trigger"
        aria-label="Ver explicacao dos campos da tabela de frequencia"
      >
        i
      </button>

      <span className="info-tooltip-content" role="tooltip">
        {FIELD_DESCRIPTIONS.map((field) => (
          <span key={field.key} className="info-tooltip-row">
            <span className="info-tooltip-label">
              <strong>{field.key}</strong>: {field.description}
            </span>
            {field.formula ? (
              <code className="info-tooltip-formula">{field.formula}</code>
            ) : null}
          </span>
        ))}
      </span>
    </span>
  );
}

export default InfoTooltip;
