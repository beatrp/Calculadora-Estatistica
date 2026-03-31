export async function calculateStatistics(values) {
  const response = await fetch("/api/stats", {
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
