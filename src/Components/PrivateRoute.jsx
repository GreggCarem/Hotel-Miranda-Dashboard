import { Navigate } from "react-router-dom";
import { useAuth } from "../Components/Redux/userContext";

const PrivateRoute = ({ children }) => {
  const { state } = useAuth();
  return state.isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
