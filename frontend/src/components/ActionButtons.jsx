const ACTION_BUTTONS = [
  { label: "Geral", value: "geral" },
  { label: "Tabela", value: "Tabela" },
  { label: "Média", value: "Media" },
  { label: "Mediana", value: "Mediana" },
  { label: "Moda", value: "Moda" },
  { label: "Amplitude", value: "Amplitude" },
  { label: "Desvio Padrão", value: "Desvio Padrao" },
];

function ActionButtons({ selectedAction, onActionTrigger, isLoading }) {
  return (
    <div className="action-buttons" aria-label="Ações de cálculo">
      {ACTION_BUTTONS.map(({ label, value }) => (
        <button
          key={value}
          type="button"
          className={
            selectedAction === value
              ? "primary-button action-button"
              : "secondary-button action-button"
          }
          disabled={isLoading}
          aria-pressed={selectedAction === value}
          onClick={() => onActionTrigger(value)}
        >
          {isLoading ? "Calculando..." : label}
        </button>
      ))}
    </div>
  );
}

export default ActionButtons;
