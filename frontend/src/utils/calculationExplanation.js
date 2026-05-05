import { formatNumber } from "./formatters";

function formatMode(result) {
  if (!result?.frequency?.length) {
    return "Não há moda.";
  }

  const highestFrequency = Math.max(...result.frequency.map((item) => item.count));

  if (highestFrequency === 1) {
    return "Não há moda, pois nenhum valor se repete.";
  }

  return `Moda: ${result.mode.map(formatNumber).join(", ")}.`;
}

export function getCalculationExplanation(values, result) {
  const count = values.length;
  const isEven = count % 2 === 0;

  return [
    {
      title: "Média",
      formula: "Média = soma dos valores / quantidade de valores",
      text: `Média = soma / n = ${formatNumber(result.mean)}.`,
    },
    {
      title: "Mediana",
      formula: isEven
        ? "Mediana = média dos dois valores centrais"
        : "Mediana = valor central",
      text: "Os valores são ordenados antes de localizar a posição central.",
    },
    {
      title: "Moda",
      formula: "Moda = valor com maior frequência",
      text: formatMode(result),
    },
    {
      title: "Amplitude Total",
      formula: "Amplitude = maior valor - menor valor",
      text: `Amplitude = ${formatNumber(result.amplitude)}.`,
    },
    {
      title: "Desvio Padrão Populacional",
      formula: "σ = √(Σ(xi - média)² / n)",
      text: "Mede o quanto os valores se afastam da média.",
    },
  ];
}
