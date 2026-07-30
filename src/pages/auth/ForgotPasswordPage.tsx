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
            <rect x="3" y="5" width="14" height="10" rx="1.5" />
            <path d="M3.5 6l6.5 5 6.5-5" />
          </svg>
        </div>
      </div>

      <h1 className="mb-1.5 text-center text-2xl font-semibold tracking-tight text-slate-900">
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
          className="w-full bg-slate-900 py-3 text-white hover:cursor-pointer hover:bg-slate-800 disabled:bg-slate-400 disabled:hover:cursor-not-allowed"
        >
          Send reset link
        </Button>
      </form>

      <p className="mt-8 text-center text-[14px] text-slate-500">
        Remembered your password?{" "}
        <a href="/login" className="font-medium text-slate-900 hover:underline">
          Back to sign in
        </a>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
