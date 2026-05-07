import { useMemo } from "react";
import { getCalculationExplanation } from "../utils/calculationExplanation";

const UI_EXPLANATION_TEXT = {
  Média: "Use essa fórmula para dividir a soma dos valores pela quantidade de observações.",
  Moda: "Identifica o valor que aparece com maior frequência no conjunto.",
  "Amplitude Total": "Compara o maior e o menor valor do conjunto.",
};

function getExplanationText(item) {
  return UI_EXPLANATION_TEXT[item.title] ?? item.text;
}

function CalculationExplanation({ values, result }) {
  const items = useMemo(
    () => getCalculationExplanation(values, result),
    [values, result]
  );

  return (
    <div className="explanation-grid">
      {items.map((item) => (
        <article key={item.title} className="explanation-card">
          <h4>{item.title}</h4>
          <p className="explanation-formula">{item.formula}</p>
          <p>{getExplanationText(item)}</p>
        </article>
      ))}
    </div>
  );
}

export default CalculationExplanation;
