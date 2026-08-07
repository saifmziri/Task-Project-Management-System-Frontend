import { Navigate, Outlet } from "react-router-dom";

import { TokenService } from "@/services/token.service";
import { ROUTES } from "./routes";

const ProtectedRoute = () => {
  if (!TokenService.hasToken()) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
