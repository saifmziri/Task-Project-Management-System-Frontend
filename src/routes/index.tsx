import { createBrowserRouter } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage";
import ChangePasswordPage from "@/pages/auth/ChangePasswordPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import ProjectsPage from "@/pages/projects/ProjectsPage";
import ProjectDetailsPage from "@/pages/projects/ProjectDetailsPage";

import DashboardPage from "@/pages/dashboard/DashboardPage";

import NotFoundPage from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmailPage />,
      },
      {
        path: "/change-password",
        element: <ChangePasswordPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
  // noka hami shen bchna teda , pash dame user chekain de wale kainbas agar eki token habit bshet bchit
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/projects/:id",
        element: <ProjectDetailsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
