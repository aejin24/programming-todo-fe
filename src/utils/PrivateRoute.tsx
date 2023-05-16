import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const accessToken = sessionStorage.getItem("access_token");

  return !accessToken || accessToken === "" ? <Navigate to="/login" /> : children;
}
