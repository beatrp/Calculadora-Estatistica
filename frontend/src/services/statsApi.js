import { API_BASE_URL } from "../config/api";

const STATS_API_URL = `${API_BASE_URL}/api/stats`;

export async function calculateStatistics(values) {
  const response = await fetch(STATS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: values }),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Não foi possível calcular as estatísticas.");
  }

  return payload;
}
