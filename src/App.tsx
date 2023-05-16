import { Route, Routes } from "react-router-dom";
import { Skeleton } from "./components/other";
import { Error, Login, Main, New } from "./pages";

export default function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route element={<Skeleton />}>
        <Route index element={<Main />} />
        <Route path="new" element={<New />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
}
