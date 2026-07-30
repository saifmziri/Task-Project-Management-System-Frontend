import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PasswordInput, Button, FormError } from "@/components/ui";

import { useApiRequest } from "../../hooks/useApiRequest";
import { useToast } from "../../context/ToastContext";

import AuthService from "../../services/auth.service";

import { resetPasswordSchema, type ResetPasswordForm } from "../../schemas";

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
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-9 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-8px_rgba(15,23,42,0.10)]">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <svg
              viewBox="0 0 20 20"
              className="h-5 w-5"
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

        <h1 className="mb-1.5 text-2xl font-semibold tracking-tight text-slate-900">
          Invalid or expired link
        </h1>

        <p className="text-[14.5px] text-slate-500">
          This password reset link is no longer valid. Request a new one to
          continue.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-9 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-8px_rgba(15,23,42,0.10)]">
      <div className="mb-6 flex items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <svg
            viewBox="0 0 20 20"
            className="h-5 w-5"
            fill="none"
            stroke="#0F172A"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="8" cy="8" r="4" />
            <path d="M11 11l6 6M14.5 14.5l1.8-1.8" />
          </svg>
        </div>
      </div>

      <h1 className="mb-1.5 text-center text-2xl font-semibold tracking-tight text-slate-900">
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
          className="w-full bg-slate-900 py-3 text-white hover:cursor-pointer hover:bg-slate-800 disabled:bg-slate-400 disabled:hover:cursor-not-allowed"
        >
          Reset password
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
