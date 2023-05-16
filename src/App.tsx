import { Route, Routes } from "react-router-dom";

import { Skeleton } from "components/other";
import { Error, Login, Main, New } from "./pages";
import PrivateRoute from "utils/PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route
        element={
          <PrivateRoute>
            <Skeleton />
          </PrivateRoute>
        }
      >
        <Route index element={<Main />} />
        <Route path="new" element={<New />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
}
