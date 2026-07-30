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
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-2 text-center text-3xl font-bold">Forgot Password</h1>

      <p className="mb-8 text-center text-gray-500">
        Enter your email to receive a password reset link.
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
          className="w-full bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          Send Reset Link
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
