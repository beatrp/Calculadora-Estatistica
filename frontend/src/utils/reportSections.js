import { formatNumber } from "./formatters";
import { gerarTabelaAgrupada } from "./gerarTabelaAgrupada";

function buildMeanContent(values, result) {
  const sum = values.reduce((total, value) => total + value, 0);
  const formattedValues = values.map(formatNumber);

  return {
    title: "Média",
    formula: "sum(x) / n",
    calculation: `(${formattedValues.join(" + ")}) / ${values.length}`,
    steps: [
      `Dados informados: ${formattedValues.join(", ")}`,
      `Soma dos valores: ${formattedValues.join(" + ")} = ${formatNumber(sum)}`,
      `Quantidade de valores: ${values.length}`,
      `Média: ${formatNumber(sum)} / ${values.length} = ${formatNumber(result.mean)}`,
    ],
    finalResult: formatNumber(result.mean),
  };
}

function buildMedianContent(values, result) {
  const sortedValues = [...values].sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedValues.length / 2);
  const isEven = sortedValues.length % 2 === 0;
  const middleValues = isEven
    ? [sortedValues[middleIndex - 1], sortedValues[middleIndex]]
    : [sortedValues[middleIndex]];

  return {
    title: "Mediana",
    formula: isEven ? "(x[n/2] + x[n/2 + 1]) / 2" : "x[(n + 1) / 2]",
    calculation: isEven
      ? `(${middleValues.map(formatNumber).join(" + ")}) / 2`
      : `${formatNumber(middleValues[0])}`,
    steps: [
      `Dados ordenados: ${sortedValues.map(formatNumber).join(", ")}`,
      isEven
        ? `Como a quantidade é par, usamos os dois valores centrais: ${middleValues.map(formatNumber).join(" e ")}`
        : `Como a quantidade é ímpar, usamos o valor central: ${formatNumber(middleValues[0])}`,
      isEven
        ? `Mediana: (${middleValues.map(formatNumber).join(" + ")}) / 2 = ${formatNumber(result.median)}`
        : `Mediana: ${formatNumber(result.median)}`,
    ],
    finalResult: formatNumber(result.median),
  };
}

function buildModeContent(result) {
  const highestFrequency = Math.max(...result.frequency.map((i) => i.count));
  const modalItems = result.frequency.filter((i) => i.count === highestFrequency);

  return {
    title: "Moda",
    formula: "Mo = valor(es) com maior frequência",
    calculation: `${modalItems.map((i) => formatNumber(i.value)).join(", ")} possuem frequência ${highestFrequency}`,
    steps: [
      `Frequências observadas: ${result.frequency
        .map((i) => `${formatNumber(i.value)} aparece ${i.count}x`)
        .join("; ")}`,
      `Maior frequência encontrada: ${highestFrequency}`,
      `Valor(es) modal(is): ${modalItems.map((i) => formatNumber(i.value)).join(", ")}`,
    ],
    finalResult: result.mode.map(formatNumber).join(", "),
  };
}

function buildAmplitudeContent(values, result) {
  const min = Math.min(...values);
  const max = Math.max(...values);

  return {
    title: "Amplitude",
    formula: "A = xmax - xmin",
    calculation: `${formatNumber(max)} - ${formatNumber(min)}`,
    steps: [
      `Menor valor: ${formatNumber(min)}`,
      `Maior valor: ${formatNumber(max)}`,
      `Amplitude: ${formatNumber(max)} - ${formatNumber(min)} = ${formatNumber(result.amplitude)}`,
    ],
    finalResult: formatNumber(result.amplitude),
  };
}

function buildStdDevContent(values, result) {
  const squaredDiffs = values.map((v) => (v - result.mean) ** 2);
  const variance =
    squaredDiffs.reduce((t, v) => t + v, 0) / values.length;

  const terms = values.map(
    (v, i) =>
      `(${formatNumber(v)} - ${formatNumber(result.mean)})² = ${formatNumber(
        squaredDiffs[i]
      )}`
  );

  return {
    title: "Desvio Padrão",
    formula: "σ = √(Σ(x - média)² / n)",
    calculation: `√(${formatNumber(variance)})`,
    steps: [
      `Média utilizada: ${formatNumber(result.mean)}`,
      `Desvios ao quadrado: ${terms.join("; ")}`,
      `Variância populacional: ${formatNumber(variance)}`,
      `Desvio padrão: √(${formatNumber(variance)}) = ${formatNumber(result.stdDev)}`,
    ],
    finalResult: formatNumber(result.stdDev),
  };
}

function buildFrequencyTableContent(values, frequencyItems) {
  const sorted = [...values].sort((a, b) => a - b);

  return {
    title: "Tabela de frequência",
    formula: "fi = frequência absoluta",
    calculation: `Contagem em ${values.length} observações`,
    steps: [
      `Dados ordenados: ${sorted.map(formatNumber).join(", ")}`,
      "Contamos quantas vezes cada valor aparece.",
    ],
    finalResult: `Total: ${values.length} | Distintos: ${frequencyItems.length}`,
    tableItems: frequencyItems.map((i) => [
      formatNumber(i.value),
      String(i.count),
    ]),
    tableHeaders: ["Valor", "Frequência"],
  };
}

function buildUngroupedTableContent(values, data) {
  if (!data || data.length === 0) {
    return {
      title: "Tabela de frequência",
      formula: "Cada valor distinto forma uma classe",
      calculation: "Nenhuma observação disponível",
      steps: ["Sem dados para exibir"],
      finalResult: "Total: 0 | Classes: 0",
      tableItems: [],
      tableHeaders: ["Classe", "Limites", "fi", "xi", "fr", "Fi", "Fr"],
    };
  }

  const sorted = [...values].sort((a, b) => a - b);

  return {
    title: "Tabela de frequência",
    formula: "xi = valor, fi = frequência",
    calculation: `Classes formadas a partir de ${values.length} observações`,
    steps: [
      `Dados ordenados: ${sorted.map(formatNumber).join(", ")}`,
      "Cada valor distinto foi tratado como uma classe.",
      "Calculamos fi, fr, Fi e Fr.",
    ],
    finalResult: `Total: ${values.length} | Classes: ${data.length}`,
    tableItems: data.map((i) => [
      String(i.classe),
      formatNumber(i.limites),
      String(i.fi),
      formatNumber(i.xi),
      formatNumber(i.fr),
      String(i.Fi),
      formatNumber(i.Fr),
    ]),
    tableHeaders: ["Classe", "Limites", "fi", "xi", "fr", "Fi", "Fr"],
  };
}

function buildIntervalTableContent(intervalDetails) {
  return {
    title: "Intervalo de Classe",
    formula: "k = 1 + 3.3 log10(n)",
    calculation: `k = ${intervalDetails.classCount}`,
    steps: ["Cálculo baseado na fórmula de Sturges"],
    finalResult: `k = ${intervalDetails.classCount}`,
    tableItems: intervalDetails.intervals.map((i) => [
      String(i.classe),
      i.label,
      String(i.fi),
      formatNumber(i.xi),
      formatNumber(i.fr),
      String(i.Fi),
      formatNumber(i.Fr),
    ]),
    tableHeaders: ["Classe", "Limites", "fi", "xi", "fr", "Fi", "Fr"],
  };
}

function buildTableContent(
  values,
  frequencyItems,
  ungroupedTableData,
  intervalDetails,
  selectedDataType
) {
  if (selectedDataType === "nonGrouped") {
    return buildUngroupedTableContent(values, ungroupedTableData);
  }

  if (selectedDataType === "grouped") {
    const k = Math.max(1, Math.round(1 + 3.3 * Math.log10(values.length)));
    return gerarTabelaAgrupada(values, k);
  }

  if (selectedDataType === "interval") {
    return buildIntervalTableContent(intervalDetails);
  }

  return buildFrequencyTableContent(values, frequencyItems);
}

export function getPanelContents(
  selectedAction,
  selectedDataType,
  values,
  result,
  processedData
) {
  if (!result || !processedData) return [];

  const builders = {
    Media: () => buildMeanContent(values, result),
    Mediana: () => buildMedianContent(values, result),
    Moda: () => buildModeContent(result),
    Amplitude: () => buildAmplitudeContent(values, result),
    "Desvio Padrao": () => buildStdDevContent(values, result),
    Tabela: () =>
      buildTableContent(
        values,
        processedData.frequencyItems,
        processedData.ungroupedTableData,
        processedData.intervalData,
        selectedDataType
      ),
  };

  if (selectedAction === "geral") {
    return [
      builders.Media(),
      builders.Mediana(),
      builders.Moda(),
      builders.Amplitude(),
      builders["Desvio Padrao"](),
      builders.Tabela(),
    ];
  }

  const content = builders[selectedAction]?.();
  return content ? [content] : [];
}