import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { CheckCircle, LoaderCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui";

import AuthService from "../../services/auth.service";
import { handleApiError } from "../../utils/api-error";

type VerifyStatus = "loading" | "success" | "error";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [status, setStatus] = useState<VerifyStatus>("loading");
  const [message, setMessage] = useState("");

  const hasVerified = useRef(false);

  useEffect(() => {
    if (!token) return;
    const verifyEmail = async () => {
      if (hasVerified.current) return;

      hasVerified.current = true;
      try {
        await AuthService.verifyEmail({ token });

        setStatus("success");
        setMessage(
          "Your email has been verified successfully. Redirecting to login...",
        );

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        const apiError = handleApiError(error);

        setStatus("error");
        setMessage(apiError.message);
      }
    };

    verifyEmail();
  }, [navigate, token]);

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
          <XCircle size={60} className="mx-auto mb-6 text-red-600" />

          <h2 className="text-2xl font-bold text-red-600">
            Verification Failed
          </h2>

          <p className="mt-3 text-gray-500">Verification token is missing.</p>

          <Button
            className="mt-8 w-full bg-blue-600 py-3 text-white hover:bg-blue-700"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        {status === "loading" && (
          <>
            <LoaderCircle
              size={60}
              className="mx-auto mb-6 animate-spin text-blue-600"
            />

            <h2 className="text-2xl font-bold">Verifying Email</h2>

            <p className="mt-3 text-gray-500">
              Please wait while we verify your email...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle size={60} className="mx-auto mb-6 text-green-600" />

            <h2 className="text-2xl font-bold text-green-600">
              Email Verified
            </h2>

            <p className="mt-3 text-gray-500">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle size={60} className="mx-auto mb-6 text-red-600" />

            <h2 className="text-2xl font-bold text-red-600">
              Verification Failed
            </h2>

            <p className="mt-3 text-gray-500">{message}</p>

            <Button
              className="mt-8 w-full bg-blue-600 py-3 text-white hover:bg-blue-700"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
