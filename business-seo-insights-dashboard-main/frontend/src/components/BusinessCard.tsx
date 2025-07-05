import { useState } from "react";
import {
  Star,
  MessageSquare,
  Sparkles,
  Loader2,
  TrendingUp,
} from "lucide-react";

interface BusinessData {
  name: string;
  location: string;
  rating: number;
  reviews: number;
  headline: string;
}

interface BusinessCardProps {
  businessData: BusinessData;
  onRegenerateHeadline: () => void;
  isRegenerating?: boolean;
}

export function BusinessCard({
  businessData,
  onRegenerateHeadline,
  isRegenerating = false,
}: BusinessCardProps) {
  const [headlineAnimation, setHeadlineAnimation] = useState("");

  const handleRegenerateClick = () => {
    setHeadlineAnimation("animate-pulse");
    onRegenerateHeadline();

    // Remove animation after regeneration completes
    setTimeout(() => {
      setHeadlineAnimation("");
    }, 1500);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <Star
            className="w-4 h-4 fill-yellow-400 text-yellow-400 absolute top-0 left-0"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>
      );
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Business Header Card */}
      <div className="bg-gradient-card shadow-medium border-0 rounded-lg p-6">
        <div className="pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-foreground">
                {businessData.name}
              </h2>
              <p className="text-muted-foreground flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                {businessData.location}
              </p>
            </div>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Active
            </span>
          </div>
        </div>

        <div className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Google Rating Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                Google Rating
              </h3>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    {businessData.rating}
                  </span>
                  <div className="flex items-center gap-1">
                    {renderStars(businessData.rating)}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare className="w-4 h-4" />
                  <span>{businessData.reviews.toLocaleString()} reviews</span>
                </div>
              </div>
            </div>

            {/* SEO Headline Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                AI-Generated SEO Headline
              </h3>

              <div className="space-y-3">
                <div
                  className={`p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 transition-all ${headlineAnimation}`}
                >
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    "{businessData.headline}"
                  </p>
                </div>

                <button
                  onClick={handleRegenerateClick}
                  className="w-full border border-gray-300 hover:bg-blue-50 hover:border-blue-500 transition-colors text-sm font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:pointer-events-none"
                  disabled={isRegenerating}
                >
                  {isRegenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 inline" />
                      Regenerate SEO Headline
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Card */}
      <div className="bg-gradient-subtle shadow-soft border-0 rounded-lg p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-blue-600">
              {businessData.rating}
            </p>
            <p className="text-xs text-muted-foreground">Rating</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-blue-600">
              {businessData.reviews}
            </p>
            <p className="text-xs text-muted-foreground">Reviews</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-green-600">85%</p>
            <p className="text-xs text-muted-foreground">SEO Score</p>
          </div>
        </div>
      </div>
    </div>
  );
}
