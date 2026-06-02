import { useMemo } from "react";
import CalculationExplanation from "./CalculationExplanation";
import FrequencyTable from "./FrequencyTable";
import InfoTooltip from "./InfoTooltip";
import ResultCard from "./ResultCard";
import { formatNumber } from "../utils/formatters";
import { getPanelContents } from "../utils/reportSections";

function ResultSection({ tag, title, className = "", children }) {
  const sectionClassName = ["panel", "nested-panel", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={sectionClassName}>
      <div className="section-header compact">
        <span className="section-tag">{tag}</span>
        {title ? <h3>{title}</h3> : null}
      </div>
      {children}
    </div>
  );
}

function ResultPanel({
  selectedAction,
  selectedDataType,
  values,
  result,
  processedData,
}) {
  const contents = useMemo(
    () =>
      getPanelContents(
        selectedAction,
        selectedDataType,
        values,
        result,
        processedData
      ),
    [selectedAction, selectedDataType, values, result, processedData]
  );
  const orderedValues = useMemo(
    () =>
      values
        .filter((value) => Number.isFinite(value))
        .slice()
        .sort((a, b) => a - b),
    [values]
  );

  if (!contents || contents.length === 0) {
    return null;
  }

  const tableContent = contents.find((content) => content.tableItems);
  const resultContents = contents.filter((content) => !content.tableItems);

  return (
    <div className="result-panel-content">
      {orderedValues.length > 0 ? (
        <ResultSection
          tag="Rol de dados"
          title="Dados em ordem crescente"
          className="ordered-data-section"
        >
          <div className="ordered-data-list" aria-label="Dados em ordem crescente">
            {orderedValues.map((value, index) => (
              <span className="ordered-data-chip" key={`${value}-${index}`}>
                {formatNumber(value)}
              </span>
            ))}
          </div>
        </ResultSection>
      ) : null}

      {tableContent ? (
        <ResultSection tag="Tabela">
          <div className="table-meta-row">
            <p className="final-summary table-k">{tableContent.finalResult}</p>
            <div
              className="result-table-title table-title-group"
              aria-label="Informações da tabela"
            >
              <span className="result-table-title-text">{tableContent.title}</span>
              <InfoTooltip />
            </div>
          </div>
          <FrequencyTable
            selectedAction={selectedAction}
            items={tableContent.tableItems}
            headers={tableContent.tableHeaders}
          />
        </ResultSection>
      ) : null}

      <ResultSection tag="Resultado Final">
        <div className="results-grid">
          {resultContents.map((content) => (
            <ResultCard
              key={content.title}
              label={content.title}
              value={content.finalResult}
            />
          ))}
        </div>
      </ResultSection>

      <ResultSection tag="Explicação">
        <CalculationExplanation values={values} result={result} />
      </ResultSection>
    </div>
  );
}

export default ResultPanel;
