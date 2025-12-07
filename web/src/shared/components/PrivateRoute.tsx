import type React from "react";
import { useAppSelector } from "../../app/hooks";
import Loading from "./Loading";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (loading) return <Loading />;
  if (!isAuthenticated)
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  return <>{children}</>;
}
