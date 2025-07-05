import { useState } from "react";
import { Building2, MapPin, Loader2 } from "lucide-react";

interface BusinessFormProps {
  onSubmit: (data: { name: string; location: string }) => void;
  isLoading?: boolean;
}

export function BusinessForm({
  onSubmit,
  isLoading = false,
}: BusinessFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });
  const [errors, setErrors] = useState<{ name?: string; location?: string }>(
    {}
  );

  const validateForm = () => {
    const newErrors: { name?: string; location?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Business name is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-card shadow-medium border-0 rounded-lg p-6">
      <div className="text-center pb-4">
        <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Business Dashboard
        </h2>
        <p className="text-muted-foreground">
          Enter your business details to view your local presence analytics
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="businessName"
            className="text-sm font-medium text-foreground"
          >
            Business Name
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              id="businessName"
              type="text"
              placeholder="e.g., Cake & Co"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`w-full pl-10 pr-3 py-2 border rounded-md transition-colors ${
                errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              disabled={isLoading}
            />
          </div>
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="location"
            className="text-sm font-medium text-foreground"
          >
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              id="location"
              type="text"
              placeholder="e.g., Mumbai"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className={`w-full pl-10 pr-3 py-2 border rounded-md transition-colors ${
                errors.location
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              disabled={isLoading}
            />
          </div>
          {errors.location && (
            <p className="text-sm text-red-500">{errors.location}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-primary hover:opacity-90 transition-smooth text-white font-medium py-2 px-4 rounded-md shadow-soft disabled:opacity-50 disabled:pointer-events-none"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
              Analyzing Business...
            </>
          ) : (
            "Get Business Insights"
          )}
        </button>
      </form>
    </div>
  );
}
