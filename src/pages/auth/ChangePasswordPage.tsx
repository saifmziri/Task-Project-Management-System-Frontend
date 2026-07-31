import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PasswordInput, Button, FormError } from "@/components/ui";

import AuthService from "@/services/auth.service";

import { changePasswordSchema, type ChangePasswordForm } from "@/schemas";

import { useToast } from "@/context/ToastContext";
import { useApiRequest } from "@/hooks/useApiRequest";

const ChangePasswordPage = () => {
  const { serverError, execute } = useApiRequest();

  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    const success = await execute(async () => {
      await AuthService.changePassword(data);

      showToast("Password changed successfully.", "success");

      reset();
    });

    if (!success) return;
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
            <rect x="4" y="9" width="12" height="8" rx="1.5" />
            <path d="M6.5 9V6a3.5 3.5 0 0 1 7 0v3" />
            <circle cx="10" cy="13" r="1" fill="#0b1220" stroke="none" />
          </svg>
        </div>
      </div>

      <h1 className="text-navy-900 mb-1.5 text-center text-[26px] font-semibold tracking-tight">
        Change password
      </h1>

      <p className="mb-8 text-center text-[14.5px] text-slate-500">
        Choose a strong password you don&apos;t use elsewhere.
      </p>

      <FormError message={serverError} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <PasswordInput
          id="current_password"
          label="Current password"
          placeholder="Enter current password"
          autoComplete="current-password"
          error={errors.current_password?.message}
          {...register("current_password")}
        />

        <div className="h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

        <PasswordInput
          id="new_password"
          label="New password"
          placeholder="Enter new password"
          autoComplete="new-password"
          error={errors.new_password?.message}
          {...register("new_password")}
        />

        <PasswordInput
          id="new_password_confirmation"
          label="Confirm new password"
          placeholder="Confirm new password"
          autoComplete="new-password"
          error={errors.new_password_confirmation?.message}
          {...register("new_password_confirmation")}
        />

        <p className="rounded-lg bg-slate-50 px-3 py-2.5 text-[12.5px] leading-relaxed text-slate-500">
          Use at least 8 characters, mixing letters, numbers, and symbols.
        </p>

        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full bg-linear-to-b from-navy-800 to-navy-900 py-3 font-medium text-white shadow-lg shadow-navy-900/15 transition-all duration-200 hover:cursor-pointer hover:from-navy-700 hover:to-navy-800 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-brass-400 focus-visible:ring-offset-2 active:scale-[0.99] disabled:from-slate-300 disabled:to-slate-300 disabled:text-slate-500 disabled:hover:cursor-not-allowed disabled:active:scale-100"
        >
          Change password
        </Button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;