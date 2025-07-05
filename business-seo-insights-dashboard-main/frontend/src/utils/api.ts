// Real API functions to connect with the backend server

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface BusinessRequest {
  name: string;
  location: string;
}

interface BusinessResponse {
  rating: number;
  reviews: number;
  headline: string;
}

interface HeadlineResponse {
  headline: string;
}

// Helper function to handle API errors
const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `HTTP error! status: ${response.status}`
    );
  }
  return response;
};

// POST /business-data endpoint
export const fetchBusinessData = async (
  request: BusinessRequest
): Promise<BusinessResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/business-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Error fetching business data:", error);
    throw error;
  }
};

// GET /regenerate-headline endpoint
export const regenerateHeadline = async (
  name: string,
  location: string
): Promise<string> => {
  try {
    const params = new URLSearchParams({ name, location });
    const response = await fetch(
      `${API_BASE_URL}/regenerate-headline?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    await handleApiError(response);
    const data: HeadlineResponse = await response.json();
    return data.headline;
  } catch (error) {
    console.error("Error regenerating headline:", error);
    throw error;
  }
};

// Health check endpoint
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error("API health check failed:", error);
    return false;
  }
};
