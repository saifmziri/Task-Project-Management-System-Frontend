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
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-9 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-8px_rgba(15,23,42,0.10)]">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <XCircle size={28} strokeWidth={1.75} className="text-red-600" />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Verification failed
          </h2>

          <p className="mt-2 text-[14.5px] text-slate-500">
            Verification token is missing.
          </p>

          <Button
            className="mt-8 w-full bg-slate-900 py-3 text-white hover:cursor-pointer hover:bg-slate-800"
            onClick={() => navigate("/login")}
          >
            Back to login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-9 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-8px_rgba(15,23,42,0.10)]">
        {status === "loading" && (
          <>
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <LoaderCircle
                size={28}
                strokeWidth={1.75}
                className="animate-spin text-slate-900"
              />
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Verifying email
            </h2>

            <p className="mt-2 text-[14.5px] text-slate-500">
              Please wait while we verify your email...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50">
              <CheckCircle
                size={28}
                strokeWidth={1.75}
                className="text-teal-600"
              />
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Email verified
            </h2>

            <p className="mt-2 text-[14.5px] text-slate-500">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <XCircle size={28} strokeWidth={1.75} className="text-red-600" />
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Verification failed
            </h2>

            <p className="mt-2 text-[14.5px] text-slate-500">{message}</p>

            <Button
              className="mt-8 w-full bg-slate-900 py-3 text-white hover:cursor-pointer hover:bg-slate-800"
              onClick={() => navigate("/login")}
            >
              Back to login
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
