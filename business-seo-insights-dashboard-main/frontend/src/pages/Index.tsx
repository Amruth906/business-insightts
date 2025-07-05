import { useState } from "react";
import { BusinessForm } from "../components/BusinessForm";
import { BusinessCard } from "../components/BusinessCard";
import { fetchBusinessData, regenerateHeadline } from "../utils/api";

interface BusinessData {
  name: string;
  location: string;
  rating: number;
  reviews: number;
  headline: string;
}

export default function Index() {
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: { name: string; location: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchBusinessData(data);
      setBusinessData({
        name: data.name,
        location: data.location,
        ...response,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch business data"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateHeadline = async () => {
    if (!businessData) return;

    setIsRegenerating(true);
    setError(null);

    try {
      const newHeadline = await regenerateHeadline(
        businessData.name,
        businessData.location
      );
      setBusinessData((prev) =>
        prev ? { ...prev, headline: newHeadline } : null
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to regenerate headline"
      );
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            GrowthProAI Business Dashboard
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Analyze your business's local presence and get AI-powered SEO
            insights to improve your online visibility
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {!businessData ? (
            <BusinessForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          ) : (
            <div className="space-y-6">
              <BusinessCard
                businessData={businessData}
                onRegenerateHeadline={handleRegenerateHeadline}
                isRegenerating={isRegenerating}
              />

              <div className="text-center">
                <button
                  onClick={() => setBusinessData(null)}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  ← Analyze Another Business
                </button>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
