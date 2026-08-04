import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, FormError, PasswordInput } from "@/components/ui";
import { useNavigate } from "react-router-dom";

import AuthService from "@/services/auth.service";

import {
  changePasswordSchema,
  type ChangePasswordForm as ChangePasswordFormData,
} from "@/schemas";

import { useApiRequest } from "@/hooks/useApiRequest";
import { useToast } from "@/context/ToastContext";

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const { execute, serverError } = useApiRequest();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    const success = await execute(async () => {
      await AuthService.changePassword(data);

      showToast("Password changed successfully.", "success");
      navigate("/login");
      reset();
    });

    if (!success) return;
  };

  return (
    <>
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
          className="w-full bg-linear-to-b from-navy-800 to-navy-900 text-white shadow-lg shadow-navy-900/15 transition-all duration-200 hover:from-navy-700 hover:to-navy-800 hover:shadow-xl"
        >
          Change Password
        </Button>
      </form>
    </>
  );
};

export default ChangePasswordForm;