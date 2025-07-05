// Simple test script to verify backend API endpoints
const API_BASE_URL = "http://localhost:5000";

async function testBackend() {
  console.log("🧪 Testing GrowthProAI Backend API...\n");

  try {
    // Test health endpoint
    console.log("1. Testing health endpoint...");
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log("✅ Health check passed:", healthData);
    console.log("");

    // Test business-data endpoint
    console.log("2. Testing business-data endpoint...");
    const businessResponse = await fetch(`${API_BASE_URL}/business-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Cake & Co",
        location: "Mumbai",
      }),
    });
    const businessData = await businessResponse.json();
    console.log("✅ Business data received:", businessData);
    console.log("");

    // Test regenerate-headline endpoint
    console.log("3. Testing regenerate-headline endpoint...");
    const headlineResponse = await fetch(
      `${API_BASE_URL}/regenerate-headline?name=Cake%20%26%20Co&location=Mumbai`
    );
    const headlineData = await headlineResponse.json();
    console.log("✅ New headline generated:", headlineData);
    console.log("");

    console.log("🎉 All tests passed! Backend is working correctly.");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.log("\nMake sure the backend server is running on port 5000");
  }
}

// Run the test
testBackend();
