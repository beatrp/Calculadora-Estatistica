import { useMemo } from "react";
import FrequencyTable from "./FrequencyTable";
import ResultCard from "./ResultCard";
import { getPanelContents } from "../utils/reportSections";

function ResultSection({ tag, title, children }) {
  return (
    <div className="panel nested-panel">
      <div className="section-header compact">
        <span className="section-tag">{tag}</span>
        <h3>{title}</h3>
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

  return (
    <div className="result-panel-content">
      {contents.map((content) => (
        <div key={content.title} className="result-group">
          <ResultSection tag="Fórmula" title={content.title}>
            <p className="formula-text">{content.formula}</p>
          </ResultSection>

          <ResultSection tag="Cálculo" title="Cálculo">
            <p className="calculation-expression">{content.calculation}</p>
            <ol className="calculation-steps">
              {content.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </ResultSection>

          <ResultSection tag="Resultado Final" title={content.title}>
            {content.tableItems ? (
              <>
                <p className="final-summary">{content.finalResult}</p>
                <FrequencyTable
                  selectedAction={selectedAction}
                  items={content.tableItems}
                  headers={content.tableHeaders}
                />
              </>
            ) : (
              <div className="results-grid">
                <ResultCard
                  label={content.title}
                  value={content.finalResult}
                />
              </div>
            )}
          </ResultSection>
        </div>
      ))}
    </div>
  );
}

export default ResultPanel;