import { Navigate, Outlet } from "react-router-dom";

import { TokenService } from "@/services/token.service";
import { ROUTES } from "./routes";

const PublicRoute = () => {
  if (TokenService.hasToken()) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
