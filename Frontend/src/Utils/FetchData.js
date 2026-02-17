const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4500/";

export default async function FetchData(endpoint, options = {}) {
  try {
    const normalizedBase = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;
    const normalizedEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
    const response = await fetch(`${normalizedBase}${normalizedEndpoint}`, options);

    const contentType = response.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await response.json()
      : { message: "Unexpected server response" };

    if (!response.ok) {
      return {
        success: false,
        message: payload?.message || "Request failed",
        data: payload?.data || payload || null,
      };
    }

    return {
      success: payload?.success ?? true,
      message: payload?.message || "Request successful",
      data: payload?.data || null,
    };
  } catch (error) {
    return {
      success: false,
      message: "Unable to connect to server",
      data: null,
      error: String(error),
    };
  }
}
