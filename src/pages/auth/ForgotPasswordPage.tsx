import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input, Button, FormError } from "@/components/ui";

import { useApiRequest } from "@/hooks/useApiRequest";
import { useToast } from "@/context/ToastContext";

import AuthService from "@/services/auth.service";

import { forgotPasswordSchema, type ForgotPasswordForm } from "@/schemas";

const ForgotPasswordPage = () => {
  const { showToast } = useToast();

  const { serverError, execute } = useApiRequest();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    await execute(async () => {
      await AuthService.forgotPassword(data.email);

      showToast("Password reset link has been sent to your email.", "success");

      reset();
    });
  };

  return (
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
            <rect x="3" y="5" width="14" height="10" rx="1.5" />
            <path d="M3.5 6l6.5 5 6.5-5" />
          </svg>
        </div>
      </div>

      <h1 className="text-navy-900 mb-1.5 text-center text-[26px] font-semibold tracking-tight">
        Forgot password?
      </h1>

      <p className="mb-8 text-center text-[14.5px] text-slate-500">
        Enter your email and we&apos;ll send you a reset link.
      </p>

      <FormError message={serverError} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full bg-linear-to-b from-navy-800 to-navy-900 py-3 font-medium text-white shadow-lg shadow-navy-900/15 transition-all duration-200 hover:cursor-pointer hover:from-navy-700 hover:to-navy-800 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-brass-400 focus-visible:ring-offset-2 active:scale-[0.99] disabled:from-slate-300 disabled:to-slate-300 disabled:text-slate-500 disabled:hover:cursor-not-allowed disabled:active:scale-100"
        >
          Send reset link
        </Button>
      </form>

      <p className="mt-8 text-center text-[14px] text-slate-500">
        Remembered your password?{" "}
        <a
          href="/login"
          className="font-medium text-brass-600 transition-colors hover:text-brass-700 hover:underline"
        >
          Back to sign in
        </a>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;