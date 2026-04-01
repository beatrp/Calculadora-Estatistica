import { formatNumber } from "./formatters";

export function gerarTabelaAgrupada(dados, numClasses) {
  const sortedValues = [...dados].sort((first, second) => first - second);
  const totalCount = sortedValues.length;
  const minValue = sortedValues[0];
  const maxValue = sortedValues[sortedValues.length - 1];
  const classCount = Math.max(1, numClasses);
  const intervalMinValue = Math.floor(minValue);
  const classWidth = Math.max(
    1,
    Math.ceil((maxValue - intervalMinValue) / classCount)
  );

  const classes = Array.from({ length: classCount }, (_, index) => {
    const lower = intervalMinValue + index * classWidth;
    const upper = lower + classWidth;

    return {
      classe: index + 1,
      limites: `[${lower} - ${upper}]`,
      lower,
      upper,
      fi: 0,
      xi: (lower + upper) / 2,
      fr: 0,
      Fi: 0,
      Fr: 0,
    };
  });

  sortedValues.forEach((value) => {
    const classIndex = classes.findIndex((currentClass, index) => {
      if (index === classes.length - 1) {
        return value >= currentClass.lower && value <= currentClass.upper;
      }

      return value >= currentClass.lower && value < currentClass.upper;
    });

    if (classIndex >= 0) {
      classes[classIndex].fi += 1;
    }
  });

  let cumulativeFrequency = 0;

  classes.forEach((currentClass) => {
    cumulativeFrequency += currentClass.fi;
    currentClass.fr = currentClass.fi / totalCount;
    currentClass.Fi = cumulativeFrequency;
    currentClass.Fr = cumulativeFrequency / totalCount;
  });

  return {
    title: "Tabela de frequência",
    formula: "k = 1 + 3.3 * log10(n)",
    calculation: `k = ${classCount}, h = ${formatNumber(classWidth)}`,
    steps: [
      `Dados ordenados: ${sortedValues.map(formatNumber).join(", ")}`,
      `Limite inferior inicial = floor(${formatNumber(minValue)}) = ${formatNumber(intervalMinValue)}`,
      `Largura da classe = ceil((${formatNumber(maxValue)} - ${formatNumber(intervalMinValue)}) / ${formatNumber(classCount)}) = ${formatNumber(classWidth)}`,
      "As classes usam limites inteiros, e a última classe inclui o limite superior.",
    ],
    finalResult: `n = ${totalCount} | k = ${classCount} | largura = ${formatNumber(classWidth)}`,
    tableItems: classes.map((currentClass) => [
      String(currentClass.classe),
      currentClass.limites,
      String(currentClass.fi),
      formatNumber(currentClass.xi),
      formatNumber(currentClass.fr),
      String(currentClass.Fi),
      formatNumber(currentClass.Fr),
    ]),
    tableHeaders: ["Classe", "Limites", "fi", "xi", "fr", "Fi", "Fr"],
  };
}
