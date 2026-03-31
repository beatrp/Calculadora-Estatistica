const DATA_TYPE_OPTIONS = [
  { label: "Dados Não Agrupados", value: "nonGrouped" },
  { label: "Agrupados (Frequência automática)", value: "grouped" },
  { label: "Intervalo de Classe automático", value: "interval" },
];

function DataTypeSelector({ selectedDataType, onDataTypeChange }) {
  return (
    <fieldset className="data-type-selector">
      <legend className="label">Tipo de dados</legend>

      <div className="segmented-control" role="radiogroup" aria-label="Tipo de dados">
        {DATA_TYPE_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={
              selectedDataType === option.value
                ? "segmented-option active"
                : "segmented-option"
            }
          >
            <input
              type="radio"
              name="dataType"
              value={option.value}
              checked={selectedDataType === option.value}
              onChange={() => onDataTypeChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default DataTypeSelector;
