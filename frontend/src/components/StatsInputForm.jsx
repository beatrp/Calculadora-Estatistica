import ActionButtons from "./ActionButtons";
import DataTypeSelector from "./DataTypeSelector";
import NonGroupedInput from "./NonGroupedInput";

function StatsInputForm({
  selectedDataType,
  onDataTypeChange,
  rawInput,
  onInputChange,
  onSubmit,
  selectedAction,
  onActionTrigger,
  isLoading,
  errorMessage,
}) {
  return (
    <section className="panel input-panel">
      <div className="section-header">
        <span className="section-tag">Entrada</span>
        <h2>Insira os dados</h2>
        <p>Informe os dados uma vez e escolha como deseja organizar a análise.</p>
      </div>

      <form onSubmit={onSubmit} className="stats-form">
        <DataTypeSelector
          selectedDataType={selectedDataType}
          onDataTypeChange={onDataTypeChange}
        />

        <div className="input-mode-switcher">
          <NonGroupedInput rawInput={rawInput} onInputChange={onInputChange} />
        </div>

        {errorMessage ? <div className="message error">{errorMessage}</div> : null}

        <ActionButtons
          selectedAction={selectedAction}
          onActionTrigger={onActionTrigger}
          isLoading={isLoading}
        />
      </form>
    </section>
  );
}

export default StatsInputForm;
