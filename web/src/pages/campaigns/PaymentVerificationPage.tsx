import { CheckCircle, Loader, XCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentVerificationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [message, setMessage] = useState("To be implemented");
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow">
        <div className="card-body text-center">
          {status === "loading" && (
            <>
              <Loader className="mx-auto animate-spin text-primary" size={64} />
              <h2 className="text-2xl font-bold mt-4">Verifying Payment...</h2>
              <p className="text-base-content/70">
                Please wait while we confirm your donation
              </p>
            </>
          )}
          {status === "success" && (
            <>
              <CheckCircle className="mx-auto text-success" size={64} />
              <h2 className="text-2xl font-bold mt-4 text-success">
                Payment Successful!
              </h2>
              <p className="text-base-content/70">{message}</p>
              <div className="card-actions justify-center mt-6">
                <Link to="/dashboard" className="btn btn-primary">
                  Go to Dashboard
                </Link>
                <Link to="/campaigns" className="btn btn-outline">
                  Browse Campaigns
                </Link>
              </div>
            </>
          )}
          {status === "failed" && (
            <>
              <XCircle className="mx-auto text-error" size={64} />
              <h2 className="text-2xl font-bold mt-4 text-error">
                Payment Failed
              </h2>
              <p className="text-base-content/70">{message}</p>
              <div className="card-actions justify-center mt-6">
                <Link to="/campaigns" className="btn btn-primary">
                  Browse Campaigns
                </Link>
                <button
                  onClick={() => navigate(-1)}
                  className="btn btn-outline"
                >
                  Go Back
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
