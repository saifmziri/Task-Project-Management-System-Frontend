import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Input,
  PasswordInput,
  Button,
  FormError,
  Select,
} from "@/components/ui";

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
    <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-9 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-8px_rgba(15,23,42,0.10)]">
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
            <circle cx="10" cy="7" r="3.25" />
            <path d="M3.5 17c1-3.2 3.6-5 6.5-5s5.5 1.8 6.5 5" />
            <path d="M15.5 4.5l1.4 1.4M16.9 4.5l-1.4 1.4" />
          </svg>
        </div>
      </div>

      <h1 className="mb-1.5 text-center text-2xl font-semibold tracking-tight text-slate-900">
        Register user
      </h1>

      <p className="mb-8 text-center text-[14.5px] text-slate-500">
        Create a new account for a team member.
      </p>

      <FormError message={serverError} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            id="full_name"
            label="Full name"
            placeholder="Enter full name"
            error={errors.full_name?.message}
            {...register("full_name")}
          />

          <Input
            id="phone_number"
            type="tel"
            label="Phone number"
            placeholder="Enter phone number"
            error={errors.phone_number?.message}
            {...register("phone_number")}
          />
        </div>

        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="Enter email"
          error={errors.email?.message}
          {...register("email")}
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

        <div className="h-px bg-slate-100" />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <PasswordInput
            id="password"
            label="Password"
            placeholder="Enter password"
            error={errors.password?.message}
            {...register("password")}
          />

          <PasswordInput
            id="password_confirmation"
            label="Confirm password"
            placeholder="Confirm password"
            error={errors.password_confirmation?.message}
            {...register("password_confirmation")}
          />
        </div>

        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full bg-slate-900 py-3 text-white hover:cursor-pointer hover:bg-slate-800 disabled:bg-slate-400 disabled:hover:cursor-not-allowed"
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
