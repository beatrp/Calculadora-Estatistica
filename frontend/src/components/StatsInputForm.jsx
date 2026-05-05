import ActionButtons from "./ActionButtons";
import NonGroupedInput from "./NonGroupedInput";

function StatsInputForm({
  rawInput,
  onInputChange,
  onSubmit,
  isLoading,
  errorMessage,
}) {
  return (
    <section className="panel input-panel">
      <div className="section-header">
        <span className="section-tag">Entrada</span>
        <h2>Insira os dados</h2>
        <p>Informe os dados numéricos para gerar a análise automaticamente.</p>
      </div>

      <form onSubmit={onSubmit} className="stats-form">
        <div className="input-mode-switcher">
          <NonGroupedInput rawInput={rawInput} onInputChange={onInputChange} />
        </div>

        {errorMessage ? <div className="message error">{errorMessage}</div> : null}

        <ActionButtons
          isLoading={isLoading}
        />
      </form>
    </section>
  );
}

export default StatsInputForm;
