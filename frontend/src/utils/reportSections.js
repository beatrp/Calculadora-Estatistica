import { formatNumber } from "./formatters";

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
  const sortedValues = [...values].sort((first, second) => first - second);
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
  const highestFrequency = Math.max(...result.frequency.map((item) => item.count));
  const modalItems = result.frequency.filter((item) => item.count === highestFrequency);

  return {
    title: "Moda",
    formula: "Mo = valor(es) com maior frequência",
    calculation: `${modalItems.map((item) => formatNumber(item.value)).join(", ")} possuem frequência ${highestFrequency}`,
    steps: [
      `Frequências observadas: ${result.frequency
        .map((item) => `${formatNumber(item.value)} aparece ${item.count}x`)
        .join("; ")}`,
      `Maior frequência encontrada: ${highestFrequency}`,
      `Valor(es) modal(is): ${modalItems.map((item) => formatNumber(item.value)).join(", ")}`,
    ],
    finalResult: result.mode.map(formatNumber).join(", "),
  };
}

function buildAmplitudeContent(values, result) {
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  return {
    title: "Amplitude",
    formula: "A = xmax - xmin",
    calculation: `${formatNumber(maxValue)} - ${formatNumber(minValue)}`,
    steps: [
      `Menor valor: ${formatNumber(minValue)}`,
      `Maior valor: ${formatNumber(maxValue)}`,
      `Amplitude: ${formatNumber(maxValue)} - ${formatNumber(minValue)} = ${formatNumber(result.amplitude)}`,
    ],
    finalResult: formatNumber(result.amplitude),
  };
}

function buildStdDevContent(values, result) {
  const squaredDiffs = values.map((value) => (value - result.mean) ** 2);
  const variance = squaredDiffs.reduce((total, value) => total + value, 0) / values.length;
  const squaredTerms = values.map(
    (value, index) =>
      `(${formatNumber(value)} - ${formatNumber(result.mean)})^2 = ${formatNumber(
        squaredDiffs[index]
      )}`
  );

  return {
    title: "Desvio Padrão",
    formula: "sigma = sqrt(sum((x - media)^2) / n)",
    calculation: `sqrt(${formatNumber(variance)})`,
    steps: [
      `Média utilizada: ${formatNumber(result.mean)}`,
      `Desvios ao quadrado: ${squaredTerms.join("; ")}`,
      `Variância populacional: ${formatNumber(variance)}`,
      `Desvio padrão: sqrt(${formatNumber(variance)}) = ${formatNumber(result.stdDev)}`,
    ],
    finalResult: formatNumber(result.stdDev),
  };
}

function buildFrequencyTableContent(values, frequencyItems) {
  const sortedValues = [...values].sort((first, second) => first - second);

  return {
    title: "Tabela de frequência",
    formula: "fi = frequência absoluta de cada valor",
    calculation: `Contagem dos valores distintos em ${values.length} observações`,
    steps: [
      `Dados ordenados: ${sortedValues.map(formatNumber).join(", ")}`,
      "Contamos quantas vezes cada valor aparece no conjunto informado.",
    ],
    finalResult: `Total de valores: ${values.length} | Valores distintos: ${frequencyItems.length}`,
    tableItems: frequencyItems.map((item) => ({
      first: formatNumber(item.value),
      second: String(item.count),
    })),
    tableHeaders: ["Valor", "Frequência"],
  };
}

function buildIntervalTableContent(intervalDetails) {
  const roundedClassCount = formatNumber(intervalDetails.classCount);
  const explanation = [
    "Usando a fórmula de Sturges:",
    "k = 1 + 3.3 * log10(n)",
    `n = ${intervalDetails.totalCount} -> k ~= ${roundedClassCount}`,
    `Amplitude = max - min = ${formatNumber(intervalDetails.maxValue)} - ${formatNumber(
      intervalDetails.minValue
    )} = ${formatNumber(intervalDetails.amplitude)}`,
    `Largura da classe = ${formatNumber(intervalDetails.amplitude)} / ${roundedClassCount} ~= ${formatNumber(
      intervalDetails.classWidth
    )}`,
  ];

  return {
    title: "Intervalo de Classe",
    formula: "k = 1 + 3.3 * log10(n)",
    calculation: `k = ${roundedClassCount}, h = ${formatNumber(intervalDetails.classWidth)}`,
    steps: explanation,
    finalResult: `n = ${intervalDetails.totalCount} | k = ${intervalDetails.classCount} | amplitude = ${formatNumber(
      intervalDetails.amplitude
    )} | largura = ${formatNumber(intervalDetails.classWidth)}`,
    tableItems: intervalDetails.intervals.map((interval) => ({
      first: interval.label,
      second: String(interval.count),
    })),
    tableHeaders: ["Intervalo", "Frequência"],
  };
}

function buildTableContent(values, frequencyItems, intervalDetails, selectedDataType) {
  if (selectedDataType === "interval") {
    return buildIntervalTableContent(intervalDetails);
  }

  return buildFrequencyTableContent(values, frequencyItems);
}

function getPanelBuilders(values, result, processedData, selectedDataType) {
  return {
    Media: () => buildMeanContent(values, result),
    Mediana: () => buildMedianContent(values, result),
    Moda: () => buildModeContent(result),
    Amplitude: () => buildAmplitudeContent(values, result),
    "Desvio Padrao": () => buildStdDevContent(values, result),
    Tabela: () =>
      buildTableContent(
        values,
        processedData.frequencyItems,
        processedData.intervalData,
        selectedDataType
      ),
  };
}

export function getPanelContents(selectedAction, selectedDataType, values, result, processedData) {
  if (!result || !processedData) {
    return [];
  }

  const panelBuilders = getPanelBuilders(values, result, processedData, selectedDataType);

  if (selectedAction === "geral") {
    return [
      panelBuilders.Media(),
      panelBuilders.Mediana(),
      panelBuilders.Moda(),
      panelBuilders.Amplitude(),
      panelBuilders["Desvio Padrao"](),
      panelBuilders.Tabela(),
    ];
  }

  const content = panelBuilders[selectedAction]?.();
  return content ? [content] : [];
}
