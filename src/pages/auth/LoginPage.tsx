import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input, PasswordInput, Button, FormError } from "@/components/ui";

import AuthService from "@/services/auth.service";

import { loginSchema } from "@/schemas";
import type { LoginForm } from "@/schemas";

import { useApiRequest } from "@/hooks/useApiRequest";
import { useToast } from "@/context/ToastContext";

const LoginPage = () => {
  const navigate = useNavigate();

  const { serverError, execute } = useApiRequest();

  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    const success = await execute(async () => {
      await AuthService.login(data);

      showToast("Login successfully.", "success");

      navigate("/");
    });

    if (!success) return;
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* Brand panel — purely decorative, delete this whole div if you don't want it */}
      <div className="relative hidden w-[42%] flex-col justify-between bg-slate-900 p-10 lg:flex">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-500">
            <svg
              viewBox="0 0 20 20"
              className="h-4.5 w-4.5"
              fill="none"
              stroke="#0F172A"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10.5l4 4 8-9" />
            </svg>
          </div>
          <span className="text-[19px] font-semibold text-white">Tally</span>
        </div>

        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-teal-400">
            Task management
          </p>
          <h2 className="mb-3 max-w-[320px] text-[28px] font-semibold leading-[1.15] text-white">
            Every task has a place to land.
          </h2>
          <p className="max-w-300px text-[14.5px] leading-relaxed text-slate-400">
            Plan the week, assign the work, and close the loop without losing
            track of what matters.
          </p>
        </div>

        <p className="text-[12.5px] text-slate-500">
          &copy; {new Date().getFullYear()} Tally, Inc.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-9 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-8px_rgba(15,23,42,0.10)]">
          {/* Logo mark — mirrors the brand panel, shown here too since the panel is hidden below lg */}
          <div className="mb-7 flex items-center justify-center gap-2.5 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-500">
              <svg
                viewBox="0 0 20 20"
                className="h-4.5 w-4.5"
                fill="none"
                stroke="#0F172A"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 10.5l4 4 8-9" />
              </svg>
            </div>
            <span className="text-[18px] font-semibold text-slate-900">
              Tally
            </span>
          </div>

          <h1 className="mb-1.5 text-center text-2xl font-semibold tracking-tight text-slate-900">
            Welcome back
          </h1>

          <p className="mb-8 text-center text-[14.5px] text-slate-500">
            Sign in to your account to continue
          </p>

          <FormError message={serverError} />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />

            <PasswordInput
              id="password"
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="flex items-center justify-between text-[13.5px]">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                Remember me
              </label>

              <a
                href="/forgot-password"
                className="font-medium text-slate-700 hover:text-slate-900"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              loading={isSubmitting}
              className="w-full bg-slate-900 py-3 text-white hover:bg-slate-800 hover:cursor-pointer disabled:bg-slate-400 disabled:hover:cursor-not-allowed"
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
