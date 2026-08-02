import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PasswordInput, Button, FormError } from "@/components/ui";

import { useApiRequest } from "@/hooks/useApiRequest";
import { useToast } from "@/context/ToastContext";

import AuthService from "@/services/auth.service";

import { resetPasswordSchema, type ResetPasswordForm } from "@/schemas";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token") ?? "";

  const { showToast } = useToast();
  const { serverError, execute } = useApiRequest();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    setValue("token", token);
  }, [token, setValue]);

  const onSubmit = async (data: ResetPasswordForm) => {
    await execute(async () => {
      await AuthService.resetPassword(data);

      showToast("Password reset successfully.", "success");

      navigate("/login");
    });
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="animate-fade-up relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-9 text-center shadow-(--shadow-card)">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-rose-300 via-rose-500 to-rose-300" />

          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50">
              <svg
                viewBox="0 0 20 20"
                className="h-5.5 w-5.5"
                fill="none"
                stroke="#DC2626"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="10" cy="10" r="7" />
                <path d="M10 6.5v4M10 13.2v.1" />
              </svg>
            </div>
          </div>

          <h1 className="text-navy-900 mb-1.5 text-2xl font-semibold tracking-tight">
            Invalid or expired link
          </h1>

          <p className="text-[14.5px] text-slate-500">
            This password reset link is no longer valid. Request a new one to
            continue.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="animate-fade-up relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-9 shadow-(--shadow-card) transition-shadow duration-300 hover:shadow-(--shadow-card-hover)">
        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brass-300 via-brass-500 to-brass-300" />

        <div className="mb-6 flex items-center justify-center">
          <div className="brass-ring flex h-14 w-14 items-center justify-center rounded-2xl shadow-[0_2px_10px_-2px_rgba(189,143,60,0.35)]">
            <svg
              viewBox="0 0 20 20"
              className="h-5.5 w-5.5"
              fill="none"
              stroke="#0b1220"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="8" r="4" />
              <path d="M11 11l6 6M14.5 14.5l1.8-1.8" />
            </svg>
          </div>
        </div>

        <h1 className="text-navy-900 mb-1.5 text-center text-[26px] font-semibold tracking-tight">
          Reset password
        </h1>

        <p className="mb-8 text-center text-[14.5px] text-slate-500">
          Enter a new password for your account.
        </p>

        <FormError message={serverError} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <PasswordInput
            id="password"
            label="New password"
            placeholder="Enter new password"
            error={errors.password?.message}
            {...register("password")}
          />

          <PasswordInput
            id="password_confirmation"
            label="Confirm password"
            placeholder="Confirm new password"
            error={errors.password_confirmation?.message}
            {...register("password_confirmation")}
          />

          <Button
            type="submit"
            loading={isSubmitting}
            className="w-full bg-linear-to-b from-navy-800 to-navy-900 py-3 font-medium text-white shadow-lg shadow-navy-900/15 transition-all duration-200 hover:cursor-pointer hover:from-navy-700 hover:to-navy-800 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-brass-400 focus-visible:ring-offset-2 active:scale-[0.99] disabled:from-slate-300 disabled:to-slate-300 disabled:text-slate-500 disabled:hover:cursor-not-allowed disabled:active:scale-100"
          >
            Reset password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
