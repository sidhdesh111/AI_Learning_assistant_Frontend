import { Navigate, Outlet } from "react-router";
import Skelton from "../Loader/Skelton";
import { useAuth } from "../../Context/AuthContext";

const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Skelton />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
