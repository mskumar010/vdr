import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "./loginContext";

export default function PrivateRoute({ children }) {
  const { isLoggedIn } = useContext(LoginContext);
  return isLoggedIn ? children : <Navigate to="/loginAndRegistrationPage" replace />;
}
