import { useMemo, useState } from "react";
import Footer from "../components/Footer";
import ResultPanel from "../components/ResultPanel";
import StatsInputForm from "../components/StatsInputForm";
import logo from "../assets/images/logo.svg";
import { exportStatisticsPdf } from "../services/pdfExport";
import { normalizeInputData } from "../utils/inputNormalization";
import { calculateStatistics } from "../utils/statistics";

function getAutomaticDataType(valueCount) {
  if (valueCount > 25) {
    return "interval";
  }

  if (valueCount >= 20) {
    return "grouped";
  }

  return "nonGrouped";
}

function HomePage() {
  const [rawInput, setRawInput] = useState("10, 12, 12, 18, 20");
  const [result, setResult] = useState(null);
  const [calculatedValues, setCalculatedValues] = useState([]);
  const [calculatedInputSummary, setCalculatedInputSummary] = useState("");
  const [processedData, setProcessedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const normalizedInput = useMemo(() => normalizeInputData(rawInput), [rawInput]);
  const currentDataType = useMemo(
    () => getAutomaticDataType(normalizedInput.values?.length ?? 0),
    [normalizedInput.values]
  );
  const calculatedDataType = useMemo(
    () => getAutomaticDataType(calculatedValues.length),
    [calculatedValues.length]
  );
  const selectedDataType = result ? calculatedDataType : currentDataType;

  function runCalculation() {
    setErrorMessage("");

    const {
      values,
      inputSummary,
      frequencyItems,
      ungroupedTableData,
      intervalData,
      error,
    } = normalizedInput;

    if (error) {
      setResult(null);
      setProcessedData(null);
      setErrorMessage(error);
      return;
    }

    try {
      const payload = calculateStatistics(values);
      setCalculatedValues(values);
      setCalculatedInputSummary(inputSummary);
      setProcessedData({
        frequencyItems,
        ungroupedTableData,
        intervalData,
      });
      setResult(payload);
    } catch (error) {
      setResult(null);
      setCalculatedValues([]);
      setCalculatedInputSummary("");
      setProcessedData(null);
      setErrorMessage(error.message);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    runCalculation();
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
          <div className="hero-title-row">
            <img
              src={logo}
              alt="Grupo Crises Logo"
              className="hero-logo"
              width="90"
              height="90"
            />
            <h1>Calculadora Estatística 1.0 - Grupo Crises</h1>
          </div>
          <p className="hero-text">
            Calcule média, mediana, moda, amplitude, desvio padrão populacional e
            visualize a tabela de frequência em um único painel.
          </p>
        </div>
      </section>

      <section className="content-grid">
        <StatsInputForm
          rawInput={rawInput}
          onInputChange={setRawInput}
          onSubmit={handleSubmit}
          isLoading={false}
          errorMessage={errorMessage}
        />

        <section className="panel output-panel">
          <div className="output-header">
            <div className="section-header">
              <span className="section-tag">Resultado</span>
              <h2>Resumo estatístico</h2>
            </div>

            {result ? (
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
              selectedAction="geral"
              selectedDataType={selectedDataType}
              values={calculatedValues}
              result={result}
              processedData={processedData}
            />
          ) : (
            <div className="empty-state">
              <p>Nenhum cálculo realizado ainda.</p>
              <span>
                Preencha os valores e use o botão de ação para ver os
                resultados.
              </span>
            </div>
          )}
        </section>
      </section>
      <Footer />
    </main>
  );
}

export default HomePage;
