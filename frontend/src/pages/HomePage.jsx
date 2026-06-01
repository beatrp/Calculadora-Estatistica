import { useMemo, useState } from "react";
import ResultPanel from "../components/ResultPanel";
import StatsInputForm from "../components/StatsInputForm";
import logo from "../assets/images/logo.svg";
import { exportStatisticsPdf } from "../services/pdfExport";
import { classifyDataType } from "../utils/dataClassification";
import { normalizeInputData } from "../utils/inputNormalization";
import { calculateStatistics } from "../utils/statistics";

function HomePage() {
  const [rawInput, setRawInput] = useState("10, 12, 12, 18, 20");
  const [result, setResult] = useState(null);
  const [calculatedValues, setCalculatedValues] = useState([]);
  const [calculatedInputSummary, setCalculatedInputSummary] = useState("");
  const [processedData, setProcessedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const normalizedInput = useMemo(() => normalizeInputData(rawInput), [rawInput]);
  const currentDataType = useMemo(
    () => classifyDataType(normalizedInput.values ?? []),
    [normalizedInput.values]
  );
  const calculatedDataType = useMemo(
    () => classifyDataType(calculatedValues),
    [calculatedValues]
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
    <>
      <section className="hero" id="descritiva">
        <div className="hero-content">
          <div className="hero-title-row">
            <img
              src={logo}
              alt="Logo da Calculadora Estatística"
              className="hero-logo"
              width="90"
              height="90"
            />
            <h1>Estatística Descritiva</h1>
          </div>
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
    </>
  );
}

export default HomePage;
