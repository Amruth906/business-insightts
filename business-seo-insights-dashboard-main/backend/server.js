import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// SEO headline templates for different business types and locations
const seoHeadlineTemplates = [
  "Why {name} is {location}'s Best Kept Secret in 2025",
  "{name}: The {location} Hotspot Everyone's Talking About",
  "Discover Why {name} Dominates {location}'s Local Scene",
  "From Local Favorite to {location} Legend: The {name} Story",
  "{name} Transforms {location}'s Dining Experience Forever",
  "Why {location} Locals Choose {name} Over Big Chains",
  "The {name} Revolution: Changing {location} One Customer at a Time",
  "{name}: Where {location} Meets Excellence in 2025",
  "How {name} Became {location}'s Most Reviewed Business",
  "The Secret Behind {name}'s Success in {location}",
  "{name}: Leading {location}'s New Business Renaissance",
  "Why {name} is {location}'s Rising Star This Year",
  "{name} - {location}'s Premier Destination for Quality Service",
  "The {name} Experience: Redefining {location}'s Business Standards",
  "Why {location} Residents Trust {name} for Their Needs",
  "{name}: Setting New Standards in {location}'s Business Landscape",
  "The {name} Phenomenon: How One Business Changed {location}",
  "{name}: Your {location} Partner for Success",
  "Discover the {name} Difference in {location}",
  "{name}: Where {location} Meets Innovation and Quality",
];

// Helper functions
const generateRating = () => {
  return Math.round((Math.random() * 1.1 + 3.8) * 10) / 10;
};

const generateReviewCount = () => {
  return Math.floor(Math.random() * 450) + 50;
};

const generateHeadline = (name, location) => {
  const template =
    seoHeadlineTemplates[
      Math.floor(Math.random() * seoHeadlineTemplates.length)
    ];
  return template.replace(/{name}/g, name).replace(/{location}/g, location);
};

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Routes

// POST /business-data
app.post("/business-data", async (req, res) => {
  try {
    const { name, location } = req.body;

    // Validate input
    if (!name || !location) {
      return res.status(400).json({
        error: "Business name and location are required",
      });
    }

    // Simulate processing delay
    await delay(1000 + Math.random() * 500);

    // Generate simulated data
    const rating = generateRating();
    const reviews = generateReviewCount();
    const headline = generateHeadline(name, location);

    res.json({
      rating,
      reviews,
      headline,
    });
  } catch (error) {
    console.error("Error in /business-data:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// GET /regenerate-headline
app.get("/regenerate-headline", async (req, res) => {
  try {
    const { name, location } = req.query;

    // Validate input
    if (!name || !location) {
      return res.status(400).json({
        error: "Business name and location are required",
      });
    }

    // Simulate processing delay
    await delay(500 + Math.random() * 300);

    // Generate new headline
    const headline = generateHeadline(name, location);

    res.json({
      headline,
    });
  } catch (error) {
    console.error("Error in /regenerate-headline:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "GrowthProAI Backend API is running",
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "GrowthProAI Business Dashboard API",
    version: "1.0.0",
    endpoints: {
      "POST /business-data": "Get business analytics and SEO headline",
      "GET /regenerate-headline": "Generate new SEO headline",
      "GET /health": "Health check",
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GrowthProAI Backend API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API documentation: http://localhost:${PORT}/`);
});
