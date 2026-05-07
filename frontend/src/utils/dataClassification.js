export const DATA_TYPES = {
  nonGrouped: "nonGrouped",
  groupedWithoutInterval: "grouped",
  groupedWithInterval: "interval",
};

export function classifyDataType(values) {
  const n = Array.isArray(values) ? values.length : Number(values) || 0;

  if (n <= 10) {
    return DATA_TYPES.nonGrouped;
  }

  if (n <= 25) {
    return DATA_TYPES.groupedWithoutInterval;
  }

  return DATA_TYPES.groupedWithInterval;
}
