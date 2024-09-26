const API_URL = "http://localhost:3018";

export const apiRequest = async (
  endpoint: string,
  method: string = "GET",
  body?: any
) => {
  const token = localStorage.getItem("authToken");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Forbidden");
      }
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
