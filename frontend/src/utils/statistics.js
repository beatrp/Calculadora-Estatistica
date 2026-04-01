function validateData(values) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("A lista de dados nao pode estar vazia.");
  }

  const hasInvalidNumber = values.some(
    (value) => typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)
  );

  if (hasInvalidNumber) {
    throw new Error("A lista deve conter apenas numeros validos.");
  }
}

function calculateFrequency(sortedValues) {
  const counts = new Map();

  for (const value of sortedValues) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()].map(([value, count]) => ({ value, count }));
}

function calculateMedian(sortedValues) {
  const middleIndex = Math.floor(sortedValues.length / 2);

  if (sortedValues.length % 2 === 0) {
    return (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2;
  }

  return sortedValues[middleIndex];
}

function calculateMode(frequency) {
  const highestCount = Math.max(...frequency.map((item) => item.count));

  return frequency
    .filter((item) => item.count === highestCount)
    .map((item) => item.value);
}

export function calculateStatistics(values) {
  validateData(values);

  const sortedValues = [...values].sort((first, second) => first - second);
  const sum = sortedValues.reduce((total, value) => total + value, 0);
  const mean = sum / sortedValues.length;
  const frequency = calculateFrequency(sortedValues);
  const squaredDiffAverage =
    sortedValues.reduce((total, value) => total + (value - mean) ** 2, 0) /
    sortedValues.length;

  return {
    mean,
    median: calculateMedian(sortedValues),
    mode: calculateMode(frequency),
    amplitude: sortedValues[sortedValues.length - 1] - sortedValues[0],
    stdDev: Math.sqrt(squaredDiffAverage),
    frequency,
  };
}
