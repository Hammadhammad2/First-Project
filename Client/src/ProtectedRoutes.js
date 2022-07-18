import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ loggedIn, children, type }) => {
  return loggedIn ? children : <Navigate to="/Login" replace />;
};

export const AuthRoutes = ({ loggedIn, children, page }) => {
  //const navigate = useNavigate();

  return loggedIn ? (
    <>
      {(page === "signin" || page === "signup") && (
        <Navigate to={"/City"} replace />
      )}
    </>
  ) : (
    children
  );
};
