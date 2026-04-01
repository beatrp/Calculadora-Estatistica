import { calculateStatistics as calculateLocalStatistics } from "../utils/statistics";

export async function calculateStatistics(values) {
  return calculateLocalStatistics(values);
}
