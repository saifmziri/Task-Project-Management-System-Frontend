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
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(46rem_28rem_at_50%_-10%,rgba(225,29,72,0.08),transparent_60%)]" />

        <div className="animate-fade-up relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-10 text-center shadow-(--shadow-card)">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-rose-300 via-rose-500 to-rose-300" />

          <div className="animate-pop mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 shadow-[0_0_0_6px_rgba(225,29,72,0.06)]">
            <XCircle size={28} strokeWidth={1.75} className="text-rose-600" />
          </div>

          <h2 className="text-navy-900 text-[22px] font-semibold tracking-tight">
            Verification failed
          </h2>

          <p className="mt-2 text-[14.5px] leading-relaxed text-slate-500">
            Verification token is missing.
          </p>

          <div className="my-7 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

          <Button
            className="w-full bg-linear-to-b from-navy-800 to-navy-900 py-3 font-medium text-white shadow-lg shadow-navy-900/15 transition-all duration-200 hover:cursor-pointer hover:from-navy-700 hover:to-navy-800 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-brass-400 focus-visible:ring-offset-2 active:scale-[0.99]"
            onClick={() => navigate("/login")}
          >
            Back to login
          </Button>

          <p className="mt-5 text-[13px] text-slate-400">
            Need a new link?{" "}
            <a
              href="/forgot-password"
              className="font-medium text-brass-600 transition-colors hover:text-brass-700"
            >
              Request one here
            </a>
          </p>
        </div>
      </div>
    );
  }

  const statusGlow =
    status === "success"
      ? "bg-[radial-gradient(46rem_28rem_at_50%_-10%,rgba(16,185,129,0.10),transparent_60%)]"
      : status === "error"
        ? "bg-[radial-gradient(46rem_28rem_at_50%_-10%,rgba(225,29,72,0.08),transparent_60%)]"
        : "bg-[radial-gradient(46rem_28rem_at_50%_-10%,rgba(189,143,60,0.12),transparent_60%)]";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4">
      <div
        className={`pointer-events-none absolute inset-0 transition-colors duration-500 ${statusGlow}`}
      />

      <div className="animate-fade-up relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-10 text-center shadow-(--shadow-card)">
        <div
          className={
            status === "success"
              ? "absolute inset-x-0 top-0 h-1 bg-linear-to-r from-emerald-300 via-emerald-500 to-emerald-300"
              : status === "error"
                ? "absolute inset-x-0 top-0 h-1 bg-linear-to-r from-rose-300 via-rose-500 to-rose-300"
                : "absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brass-300 via-brass-500 to-brass-300"
          }
        />

        {status === "loading" && (
          <>
            <div className="brass-ring animate-pop mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl shadow-[0_0_0_6px_rgba(189,143,60,0.08)]">
              <LoaderCircle
                size={28}
                strokeWidth={1.75}
                className="text-navy-900 animate-spin"
              />
            </div>

            <h2 className="text-navy-900 text-[22px] font-semibold tracking-tight">
              Verifying your email
            </h2>

            <p className="mt-2 text-[14.5px] leading-relaxed text-slate-500">
              This will only take a moment. Please don&apos;t close this
              window.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="animate-pop mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 shadow-[0_0_0_6px_rgba(16,185,129,0.08)]">
              <CheckCircle
                size={28}
                strokeWidth={1.75}
                className="text-emerald-600"
              />
            </div>

            <h2 className="text-navy-900 text-[22px] font-semibold tracking-tight">
              Email verified
            </h2>

            <p className="mt-2 text-[14.5px] leading-relaxed text-slate-500">
              {message}
            </p>

            <div className="mx-auto mt-6 h-1 w-40 overflow-hidden rounded-full bg-emerald-100">
              <div className="animate-countdown h-full rounded-full bg-emerald-500" />
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <div className="animate-pop mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 shadow-[0_0_0_6px_rgba(225,29,72,0.06)]">
              <XCircle size={28} strokeWidth={1.75} className="text-rose-600" />
            </div>

            <h2 className="text-navy-900 text-[22px] font-semibold tracking-tight">
              Verification failed
            </h2>

            <p className="mt-2 text-[14.5px] leading-relaxed text-slate-500">
              {message}
            </p>

            <div className="my-7 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

            <Button
              className="w-full bg-linear-to-b from-navy-800 to-navy-900 py-3 font-medium text-white shadow-lg shadow-navy-900/15 transition-all duration-200 hover:cursor-pointer hover:from-navy-700 hover:to-navy-800 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-brass-400 focus-visible:ring-offset-2 active:scale-[0.99]"
              onClick={() => navigate("/login")}
            >
              Back to login
            </Button>

            <p className="mt-5 text-[13px] text-slate-400">
              Link expired?{" "}
              <a
                href="/forgot-password"
                className="font-medium text-brass-600 transition-colors hover:text-brass-700"
              >
                Request a new one
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;