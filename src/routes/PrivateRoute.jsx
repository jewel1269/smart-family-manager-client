// PrivateRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const email = Cookies.get("email");
  const location = useLocation();

  if (!email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
