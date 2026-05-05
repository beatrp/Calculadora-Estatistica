import { useMemo } from "react";
import { getCalculationExplanation } from "../utils/calculationExplanation";

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
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}

export default CalculationExplanation;
