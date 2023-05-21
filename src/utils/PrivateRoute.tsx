import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const accessToken = sessionStorage.getItem("token");

  return accessToken ? children : <Navigate to="/login" />;
}
