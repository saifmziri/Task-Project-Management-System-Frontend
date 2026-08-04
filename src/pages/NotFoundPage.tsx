import { Link } from "react-router-dom";

import { TriangleAlert, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui";

const NotFoundPage = () => {
  return (
    <div className="auth-aurora flex min-h-[calc(100vh-80px)] items-center justify-center px-6">
      <div className="animate-fade-up max-w-md text-center">
        <div className="brass-ring animate-pop mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl shadow-[0_2px_10px_-2px_rgba(189,143,60,0.35)]">
          <TriangleAlert
            size={28}
            strokeWidth={1.75}
            className="text-navy-900"
          />
        </div>

        <p className="text-brass-600 text-sm font-semibold tracking-[0.2em] uppercase">
          Error 404
        </p>

        <h1 className="text-navy-900 mt-2 text-4xl font-bold tracking-tight">
          Page Not Found
        </h1>

        <p className="mt-4 text-[15px] leading-7 text-slate-500">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <Link to="/dashboard">
          <Button className="mt-8 bg-linear-to-b from-navy-800 to-navy-900 px-6 py-3 font-medium text-white shadow-lg shadow-navy-900/15 transition-all duration-200 hover:from-navy-700 hover:to-navy-800">
            <ArrowLeft size={18} />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
