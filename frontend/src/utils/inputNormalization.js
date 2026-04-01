function parseNumber(value) {
  return Number(String(value).replace(",", "."));
}

function buildFrequencyItems(values) {
  const frequencyMap = new Map();

  for (const value of values) {
    frequencyMap.set(value, (frequencyMap.get(value) ?? 0) + 1);
  }

  return [...frequencyMap.entries()]
    .sort((first, second) => first[0] - second[0])
    .map(([value, count]) => ({ value, count }));
}

function buildUngroupedTableData(values, frequencyItems) {
  const totalCount = values.length;
  let cumulativeFrequency = 0;

  const classes = frequencyItems.map((item, index) => {
    cumulativeFrequency += item.count;

    return {
      classe: index + 1,
      limites: String(item.value),
      fi: item.count,
      xi: item.value,
      fr: item.count / totalCount,
      Fi: cumulativeFrequency,
      Fr: cumulativeFrequency / totalCount,
    };
  });

  return {
    totalCount,
    classes,
  };
}

function buildIntervalData(values) {
  const sortedValues = [...values].sort((first, second) => first - second);
  const minValue = sortedValues[0];
  const maxValue = sortedValues[sortedValues.length - 1];
  const amplitude = maxValue - minValue;
  const totalCount = sortedValues.length;
  const classCount = Math.max(1, Math.round(1 + 3.3 * Math.log10(totalCount)));
  const intervalMinValue = Math.floor(minValue);
  const classWidth = Math.max(
    1,
    Math.ceil((maxValue - intervalMinValue) / classCount)
  );

  const intervals = Array.from({ length: classCount }, (_, index) => {
    const start = intervalMinValue + index * classWidth;
    const end = start + classWidth;

    return {
      classe: index + 1,
      label: `[${start} - ${end}]`,
      limites: `${start} | ${end}`,
      start,
      end,
      fi: 0,
      xi: (start + end) / 2,
      fr: 0,
      Fi: 0,
      Fr: 0,
    };
  });

  sortedValues.forEach((value) => {
    const rawIndex = Math.floor((value - intervalMinValue) / classWidth);
    const intervalIndex = Math.min(Math.max(rawIndex, 0), intervals.length - 1);
    intervals[intervalIndex].fi += 1;
  });

  let cumulativeFrequency = 0;

  intervals.forEach((interval) => {
    cumulativeFrequency += interval.fi;
    interval.count = interval.fi;
    interval.fr = interval.fi / totalCount;
    interval.Fi = cumulativeFrequency;
    interval.Fr = cumulativeFrequency / totalCount;
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

  const frequencyItems = buildFrequencyItems(values);

  return {
    values,
    inputSummary: rawInput,
    frequencyItems,
    ungroupedTableData: buildUngroupedTableData(values, frequencyItems),
    intervalData: buildIntervalData(values),
    error: "",
  };
}
