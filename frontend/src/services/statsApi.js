import { API_BASE_URL } from "../config/api";

const STATS_API_URL = `${API_BASE_URL}/api/stats`;
const DEFAULT_ERROR_MESSAGE =
  "Nao foi possivel calcular as estatisticas. Tente novamente.";

export async function calculateStatistics(values) {
  try {
    const response = await fetch(STATS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: values }),
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(payload?.message || DEFAULT_ERROR_MESSAGE);
    }

    return payload;
  } catch (error) {
    console.error("Stats API request failed:", error);
    throw new Error(error.message || DEFAULT_ERROR_MESSAGE);
  }
}
