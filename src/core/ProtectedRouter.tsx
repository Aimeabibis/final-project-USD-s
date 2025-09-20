import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Pas connecté → redirige vers /login
    return <Navigate to="/login" replace />;
  }

  // Connecté afficher la page demandée
  return <>{children}</>;
};
