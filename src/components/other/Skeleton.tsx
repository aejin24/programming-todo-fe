import { Outlet } from "react-router-dom";
import Nav from "./Nav";

export default function Skeleton() {
  return (
    <div style={{ display: "flex" }}>
      <Nav />
      <Outlet />
    </div>
  );
}
