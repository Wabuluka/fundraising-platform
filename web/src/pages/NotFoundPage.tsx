import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="text-2xl font-semibold mt-4">Page Not Found</p>
        <p className="text-base-content/70 mt-2 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary">
          <Home size={20} />
          Go Home
        </Link>
      </div>
    </div>
  );
}
