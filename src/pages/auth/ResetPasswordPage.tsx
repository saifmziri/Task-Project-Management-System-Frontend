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
    return <div className="text-center">Invalid or expired reset link.</div>;
  }

  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-2 text-center text-3xl font-bold">Reset Password</h1>

      <p className="mb-8 text-center text-gray-500">Enter your new password.</p>

      <FormError message={serverError} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <PasswordInput
          id="password"
          label="New Password"
          placeholder="Enter new password"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordInput
          id="password_confirmation"
          label="Confirm Password"
          placeholder="Confirm new password"
          error={errors.password_confirmation?.message}
          {...register("password_confirmation")}
        />

        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
