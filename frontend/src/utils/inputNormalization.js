function parseNumber(value) {
  return Number(String(value).replace(",", "."));
}

function buildFrequencyItems(values) {
  const frequencyMap = new Map();

  values.forEach((value) => {
    frequencyMap.set(value, (frequencyMap.get(value) ?? 0) + 1);
  });

  return [...frequencyMap.entries()]
    .sort((first, second) => first[0] - second[0])
    .map(([value, count]) => ({ value, count }));
}

function buildIntervalData(values) {
  const sortedValues = [...values].sort((first, second) => first - second);
  const minValue = sortedValues[0];
  const maxValue = sortedValues[sortedValues.length - 1];
  const amplitude = maxValue - minValue;
  const totalCount = sortedValues.length;
  const classCount = Math.max(1, Math.round(1 + 3.3 * Math.log10(totalCount)));
  const rawClassWidth = amplitude === 0 ? 1 : amplitude / classCount;
  const classWidth = rawClassWidth === 0 ? 1 : rawClassWidth;

  const intervals = Array.from({ length: classCount }, (_, index) => {
    const start = minValue + index * classWidth;
    const end = index === classCount - 1 ? maxValue : start + classWidth;

    return {
      label: `${start.toFixed(2)} - ${end.toFixed(2)}`,
      start,
      end,
      count: 0,
    };
  });

  sortedValues.forEach((value) => {
    const intervalIndex = intervals.findIndex((interval, index) => {
      if (index === intervals.length - 1) {
        return value >= interval.start && value <= interval.end;
      }

      return value >= interval.start && value < interval.end;
    });

    if (intervalIndex >= 0) {
      intervals[intervalIndex].count += 1;
    }
  });

  return {
    totalCount,
    classCount,
    minValue,
    maxValue,
    amplitude,
    classWidth,
    intervals,
  };
}

export function normalizeInputData(rawInput) {
  if (!rawInput.trim()) {
    return {
      values: null,
      inputSummary: "",
      error: "Informe ao menos um número antes de calcular.",
    };
  }

  const values = rawInput
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map(parseNumber);

  if (!values.length || values.some((value) => Number.isNaN(value))) {
    return {
      values: null,
      inputSummary: "",
      error: "Entrada inválida. Use apenas números separados por vírgula.",
    };
  }

  return {
    values,
    inputSummary: rawInput,
    frequencyItems: buildFrequencyItems(values),
    intervalData: buildIntervalData(values),
    error: "",
  };
}
