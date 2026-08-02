import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input, PasswordInput, Button, FormError } from "@/components/ui";

import AuthService from "@/services/auth.service";

import { loginSchema } from "@/schemas";
import type { LoginForm } from "@/schemas";

import { useApiRequest } from "@/hooks/useApiRequest";
import { useToast } from "@/context/ToastContext";
import { Checkbox } from "@/components/ui";

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
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginForm) => {
    const { rememberMe, ...loginRequest } = data;

    const success = await execute(async () => {
      await AuthService.login(loginRequest, rememberMe);

      showToast("Login successfully.", "success");

      navigate("/");
    });

    if (!success) return;
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* Brand panel — purely decorative, delete this whole div if you don't want it */}
      <div className="relative hidden w-[42%] flex-col justify-between overflow-hidden bg-linear-to-b from-navy-900 to-navy-950 p-10 lg:flex">
        {/* Ambient glow decorations */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brass-500/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-brass-400/10 blur-[110px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-linear-to-br from-brass-300 to-brass-500 shadow-[0_2px_8px_-1px_rgba(189,143,60,0.5)]">
            <svg
              viewBox="0 0 20 20"
              className="h-4.5 w-4.5"
              fill="none"
              stroke="#0b1220"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10.5l4 4 8-9" />
            </svg>
          </div>
          <span className="text-[19px] font-semibold tracking-tight text-white">
            Tally
          </span>
        </div>

        <div className="relative">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-brass-300">
            Task management
          </p>
          <h2 className="mb-3 max-w-[320px] text-[28px] font-semibold leading-[1.15] tracking-tight text-white">
            Every task has a place to land.
          </h2>
          <p className="max-w-75 text-[14.5px] leading-relaxed text-slate-400">
            Plan the week, assign the work, and close the loop without losing
            track of what matters.
          </p>
        </div>

        <p className="relative text-[12.5px] text-slate-500">
          &copy; {new Date().getFullYear()} Tally, Inc.
        </p>
      </div>

      {/* Form panel */}
      <div className="auth-aurora flex w-full flex-1 items-center justify-center px-6 py-12">
        <div className="animate-fade-up relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-9 shadow-(--shadow-card) transition-shadow duration-300 hover:shadow-(--shadow-card-hover)">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brass-300 via-brass-500 to-brass-300" />

          {/* Logo mark — mirrors the brand panel, shown here too since the panel is hidden below lg */}
          <div className="mb-7 flex items-center justify-center gap-2.5 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-linear-to-br from-brass-300 to-brass-500 shadow-[0_2px_8px_-1px_rgba(189,143,60,0.5)]">
              <svg
                viewBox="0 0 20 20"
                className="h-4.5 w-4.5"
                fill="none"
                stroke="#0b1220"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 10.5l4 4 8-9" />
              </svg>
            </div>
            <span className="text-navy-900 text-[18px] font-semibold tracking-tight">
              Tally
            </span>
          </div>

          <h1 className="text-navy-900 mb-1.5 text-center text-[26px] font-semibold tracking-tight">
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
              <Checkbox
                id="rememberMe"
                label="Remember Me"
                {...register("rememberMe")}
              />

              <a
                href="/forgot-password"
                className="font-medium text-brass-600 transition-colors hover:text-brass-700"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              loading={isSubmitting}
              className="w-full bg-linear-to-b from-navy-800 to-navy-900 py-3 font-medium text-white shadow-lg shadow-navy-900/15 transition-all duration-200 hover:cursor-pointer hover:from-navy-700 hover:to-navy-800 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-brass-400 focus-visible:ring-offset-2 active:scale-[0.99] disabled:from-slate-300 disabled:to-slate-300 disabled:text-slate-500 disabled:hover:cursor-not-allowed disabled:active:scale-100"
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
