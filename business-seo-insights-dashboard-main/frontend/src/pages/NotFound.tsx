import { Home, Search } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-card shadow-medium border-0 rounded-lg p-6">
        <div className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Page Not Found</h1>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-6">
              Error 404 - The requested resource could not be found.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="w-full bg-gradient-primary hover:opacity-90 transition-smooth text-white font-medium py-2 px-4 rounded-md shadow-soft flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Link>

            <Link
              to="/"
              className="w-full border border-gray-300 hover:bg-gray-50 transition-colors text-sm font-medium py-2 px-4 rounded-md text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
