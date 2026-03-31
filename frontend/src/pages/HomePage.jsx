import { useState } from "react";
import ResultPanel from "../components/ResultPanel";
import StatsInputForm from "../components/StatsInputForm";
import { exportStatisticsPdf } from "../services/pdfExport";
import { calculateStatistics } from "../services/statsApi";
import { normalizeInputData } from "../utils/inputNormalization";

function HomePage() {
  const [selectedDataType, setSelectedDataType] = useState("nonGrouped");
  const [rawInput, setRawInput] = useState("10, 12, 12, 18, 20");
  const [selectedAction, setSelectedAction] = useState("Tabela");
  const [result, setResult] = useState(null);
  const [calculatedValues, setCalculatedValues] = useState([]);
  const [calculatedInputSummary, setCalculatedInputSummary] = useState("");
  const [processedData, setProcessedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function runCalculation(action) {
    setErrorMessage("");
    setSelectedAction(action);

    const { values, inputSummary, frequencyItems, intervalData, error } =
      normalizeInputData(rawInput);

    if (error) {
      setResult(null);
      setProcessedData(null);
      setErrorMessage(error);
      return;
    }

    setIsLoading(true);

    try {
      const payload = await calculateStatistics(values);
      setCalculatedValues(values);
      setCalculatedInputSummary(inputSummary);
      setProcessedData({
        frequencyItems,
        intervalData,
      });
      setResult(payload);
    } catch (error) {
      setResult(null);
      setCalculatedValues([]);
      setCalculatedInputSummary("");
      setProcessedData(null);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    runCalculation(selectedAction);
  }

  function handleExportPdf() {
    exportStatisticsPdf({
      inputSummary: calculatedInputSummary,
      selectedDataType,
      values: calculatedValues,
      result,
      processedData,
    });
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-content">
          <h1>Calculadora Estatística - Grupo Crises</h1>
          <p className="hero-text">
            Calcule média, mediana, moda, amplitude, desvio padrão populacional e visualize a tabela de frequência em um único painel.
          </p>
        </div>
      </section>

      <section className="content-grid">
        <StatsInputForm
          selectedDataType={selectedDataType}
          onDataTypeChange={setSelectedDataType}
          rawInput={rawInput}
          onInputChange={setRawInput}
          onSubmit={handleSubmit}
          selectedAction={selectedAction}
          onActionTrigger={runCalculation}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />

        <section className="panel output-panel">
          <div className="output-header">
            <div className="section-header">
              <span className="section-tag">Resultado</span>
              <h2>Resumo estatístico</h2>
              <p>Digite os dados e escolha uma opção para ver os resultados.</p>
            </div>

            {selectedAction === "geral" && result ? (
              <button
                type="button"
                className="secondary-button export-button"
                onClick={handleExportPdf}
              >
                Exportar PDF
              </button>
            ) : null}
          </div>

          {result ? (
            <ResultPanel
              selectedAction={selectedAction}
              selectedDataType={selectedDataType}
              values={calculatedValues}
              result={result}
              processedData={processedData}
            />
          ) : (
            <div className="empty-state">
              <p>Nenhum cálculo realizado ainda.</p>
              <span>Preencha os valores e use um dos botões de ação para ver os resultados.</span>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default HomePage;
