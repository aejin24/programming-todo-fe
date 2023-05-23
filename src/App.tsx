import { Route, Routes } from "react-router-dom";

import { Skeleton } from "components/other";
import Main from "pages/main";
import New from "pages/write";
import NotFound from "pages/notFound";
import { Auth, Login } from "pages/login";
import PrivateRoute from "utils/PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/auth/*" element={<Auth />} />

      <Route
        element={
          <PrivateRoute>
            <Skeleton />
          </PrivateRoute>
        }
      >
        <Route index element={<Main />} />
        <Route path="/write" element={<New />} />
      </Route>

      <Route
        path="/mypage"
        element={
          <PrivateRoute>
            <div>mypage</div>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
