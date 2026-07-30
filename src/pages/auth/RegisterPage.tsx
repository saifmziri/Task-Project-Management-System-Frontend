import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import FormError from "../../components/ui/FormError";

import AuthService from "../../services/auth.service";

import { registerSchema, type RegisterForm } from "../../schemas";

import { useApiRequest } from "../../hooks/useApiRequest";
import { useToast } from "../../context/ToastContext";

const RegisterPage = () => {
  const { showToast } = useToast();
  const { serverError, execute } = useApiRequest();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    await execute(async () => {
      await AuthService.register(data);

      showToast(
        "User registered successfully. Please verify the email.",
        "success",
      );

      reset();
    });
  };

  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-2 text-center text-3xl font-bold">Register User</h1>

      <p className="mb-8 text-center text-gray-500">
        Create a new user account.
      </p>

      <FormError message={serverError} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          id="full_name"
          label="Full Name"
          placeholder="Enter full name"
          error={errors.full_name?.message}
          {...register("full_name")}
        />

        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="Enter email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          id="phone_number"
          type="tel"
          label="Phone Number"
          placeholder="Enter phone number"
          error={errors.phone_number?.message}
          {...register("phone_number")}
        />

        <Select
          id="role_id"
          label="Role"
          error={errors.role_id?.message}
          {...register("role_id", {
            valueAsNumber: true,
          })}
          options={[
            {
              value: 1,
              label: "Admin",
            },
            {
              value: 2,
              label: "Employee",
            },
          ]}
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter password"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordInput
          id="password_confirmation"
          label="Confirm Password"
          placeholder="Confirm password"
          error={errors.password_confirmation?.message}
          {...register("password_confirmation")}
        />

        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
