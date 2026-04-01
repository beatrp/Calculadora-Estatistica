const DEFAULT_TIMEOUT_MS = 25000;
const DEFAULT_ATTEMPTS = 3;
const RETRY_DELAYS_MS = [0, 2000, 4000];
const NON_RETRYABLE_STATUS_CODES = new Set([400, 401, 403, 404, 422]);

function delay(ms) {
  if (!ms) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function createApiError({
  code,
  message,
  status = null,
  attemptCount,
  response = null,
}) {
  const error = new Error(message);
  error.code = code;
  error.status = status;
  error.attemptCount = attemptCount;
  error.response = response;
  return error;
}

function isRetryableStatus(status) {
  return status >= 500 && status <= 599;
}

function isRetryableError(error) {
  return error?.code === "REQUEST_TIMEOUT" || error?.code === "NETWORK_ERROR";
}

function normalizeHttpError(response, attemptCount, exhaustedRetries = false) {
  const { status, statusText } = response;

  if (isRetryableStatus(status)) {
    return createApiError({
      code: exhaustedRetries ? "BACKEND_COLD_START" : "SERVER_ERROR",
      message: exhaustedRetries
        ? "O backend demorou para responder e pode estar inicializando. Tente novamente em alguns instantes."
        : "O servidor encontrou um erro temporario. Tente novamente.",
      status,
      attemptCount,
      response,
    });
  }

  return createApiError({
    code: "HTTP_ERROR",
    message: statusText || "Nao foi possivel concluir a requisicao.",
    status,
    attemptCount,
    response,
  });
}

function normalizeRequestError(error, attemptCount, exhaustedRetries = false) {
  if (error?.name === "AbortError") {
    return createApiError({
      code: exhaustedRetries ? "BACKEND_COLD_START" : "REQUEST_TIMEOUT",
      message: exhaustedRetries
        ? "O backend demorou para responder e pode estar inicializando. Tente novamente em alguns instantes."
        : "A requisicao demorou demais para responder.",
      attemptCount,
    });
  }

  return createApiError({
    code: exhaustedRetries ? "BACKEND_COLD_START" : "NETWORK_ERROR",
    message: exhaustedRetries
      ? "Nao foi possivel conectar ao backend. Ele pode estar inicializando. Tente novamente em alguns instantes."
      : "Falha de rede ao tentar acessar o backend.",
    attemptCount,
  });
}

async function fetchWithTimeout(input, init, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function apiClient(input, init = {}) {
  const {
    attempts = DEFAULT_ATTEMPTS,
    retryDelays = RETRY_DELAYS_MS,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    ...fetchOptions
  } = init;

  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    await delay(retryDelays[attempt - 1] ?? 0);

    try {
      const response = await fetchWithTimeout(input, fetchOptions, timeoutMs);

      if (!response.ok) {
        const httpError = normalizeHttpError(response, attempt);

        if (
          NON_RETRYABLE_STATUS_CODES.has(response.status) ||
          !isRetryableStatus(response.status) ||
          attempt === attempts
        ) {
          throw normalizeHttpError(response, attempt, attempt === attempts);
        }

        lastError = httpError;
        continue;
      }

      return response;
    } catch (error) {
      const normalizedError =
        error?.code && error?.attemptCount
          ? error
          : normalizeRequestError(error, attempt, attempt === attempts);

      if (!isRetryableError(normalizedError) || attempt === attempts) {
        throw normalizedError;
      }

      lastError = normalizedError;
    }
  }

  throw (
    lastError ||
    createApiError({
      code: "SERVER_ERROR",
      message: "Nao foi possivel concluir a requisicao.",
      attemptCount: attempts,
    })
  );
}
