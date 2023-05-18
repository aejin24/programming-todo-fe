import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const accessToken = sessionStorage.getItem("token");
  const isRegister = sessionStorage.getItem("isRegister");

  const isValid = accessToken && isRegister;

  return isValid ? children : <Navigate to="/login" />;
}
