import { useMemo } from "react";
import CalculationExplanation from "./CalculationExplanation";
import FrequencyTable from "./FrequencyTable";
import InfoTooltip from "./InfoTooltip";
import ResultCard from "./ResultCard";
import { getPanelContents } from "../utils/reportSections";

function ResultSection({ tag, title, children }) {
  return (
    <div className="panel nested-panel">
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

  if (!contents || contents.length === 0) {
    return null;
  }

  const tableContent = contents.find((content) => content.tableItems);
  const resultContents = contents.filter((content) => !content.tableItems);

  return (
    <div className="result-panel-content">
      {tableContent ? (
        <ResultSection tag="Tabela">
          <div className="table-meta-row">
            <p className="final-summary table-k">{tableContent.finalResult}</p>
            <div className="result-table-title table-title-group" aria-label="Informações da tabela">
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
