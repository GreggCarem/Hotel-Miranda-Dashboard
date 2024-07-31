import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("loggedInUsername");
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
