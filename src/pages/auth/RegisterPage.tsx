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
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="animate-fade-up relative w-full max-w-lg overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-9 shadow-(--shadow-card) transition-shadow duration-300 hover:shadow-(--shadow-card-hover)">
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
              <circle cx="10" cy="7" r="3.25" />
              <path d="M3.5 17c1-3.2 3.6-5 6.5-5s5.5 1.8 6.5 5" />
              <path d="M15.5 4.5l1.4 1.4M16.9 4.5l-1.4 1.4" />
            </svg>
          </div>
        </div>

        <h1 className="text-navy-900 mb-1.5 text-center text-[26px] font-semibold tracking-tight">
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
                value: 0,
                label: "Select role",
              },
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

          <div className="h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

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
            className="w-full bg-linear-to-b from-navy-800 to-navy-900 py-3 font-medium text-white shadow-lg shadow-navy-900/15 transition-all duration-200 hover:cursor-pointer hover:from-navy-700 hover:to-navy-800 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-brass-400 focus-visible:ring-offset-2 active:scale-[0.99] disabled:from-slate-300 disabled:to-slate-300 disabled:text-slate-500 disabled:hover:cursor-not-allowed disabled:active:scale-100"
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
