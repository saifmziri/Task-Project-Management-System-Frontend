import { Navigate, Outlet } from "react-router-dom";

import { CurrentUserService } from "@/services/current-user.service";
import { TokenService } from "@/services/token.service";

import { ROUTES } from "./routes";

const AdminRoute = () => {
  if (!TokenService.hasToken()) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!CurrentUserService.isAdmin()) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
