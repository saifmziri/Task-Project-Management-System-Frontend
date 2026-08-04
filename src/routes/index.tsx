import { createBrowserRouter, Navigate } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import ProjectsPage from "@/pages/projects/ProjectsPage";
import ProjectDetailsPage from "@/pages/projects/ProjectDetailsPage";
import UsersPage from "@/pages/users/UsersPage";
import TasksPage from "@/pages/tasks/TasksPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProfilePage from "@/pages/profile/ProfilePage";

import { TokenService } from "@/services/token.service";

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
        path: "/dashboard",
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
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/tasks",
        element: <TasksPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/",
        element: (
          <Navigate
            to={TokenService.getToken() ? "/dashboard" : "/login"}
            replace
          />
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
