import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  PasswordInput,
  Button,
  FormError

}from "@/components/ui";

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
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-2 text-center text-3xl font-bold">Change Password</h1>

      <p className="mb-8 text-center text-gray-500">
        Update your account password.
      </p>

      <FormError message={serverError} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <PasswordInput
          id="current_password"
          label="Current Password"
          placeholder="Enter current password"
          autoComplete="current-password"
          error={errors.current_password?.message}
          {...register("current_password")}
        />

        <PasswordInput
          id="new_password"
          label="New Password"
          placeholder="Enter new password"
          autoComplete="new-password"
          error={errors.new_password?.message}
          {...register("new_password")}
        />

        <PasswordInput
          id="new_password_confirmation"
          label="Confirm New Password"
          placeholder="Confirm new password"
          autoComplete="new-password"
          error={errors.new_password_confirmation?.message}
          {...register("new_password_confirmation")}
        />

        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
