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
            <rect x="4" y="9" width="12" height="8" rx="1.5" />
            <path d="M6.5 9V6a3.5 3.5 0 0 1 7 0v3" />
            <circle cx="10" cy="13" r="1" fill="#0F172A" stroke="none" />
          </svg>
        </div>
      </div>

      <h1 className="mb-1.5 text-center text-2xl font-semibold tracking-tight text-slate-900">
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

        <div className="h-px bg-slate-100" />

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

        <p className="text-[12.5px] leading-relaxed text-slate-400">
          Use at least 8 characters, mixing letters, numbers, and symbols.
        </p>

        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full bg-slate-900 py-3 text-white hover:cursor-pointer hover:bg-slate-800 disabled:bg-slate-400 disabled:hover:cursor-not-allowed"
        >
          Change password
        </Button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
