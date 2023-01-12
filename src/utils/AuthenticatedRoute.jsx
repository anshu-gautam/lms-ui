import { Navigate, useLocation } from "react-router-dom";

function AuthenticatedRoute({ children }) {
  let location = useLocation();

  const isLoggedIn = () =>
    JSON.parse(localStorage.getItem("user-data"))?.token?.length > 0;

  if (!isLoggedIn()) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export default AuthenticatedRoute;
