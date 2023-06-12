import { Route, Routes } from "react-router-dom";

import { NavSkeleton, Skeleton } from "components/other";
import Main from "pages/main";
import Write from "pages/write";
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
        <Route element={<NavSkeleton />}>
          <Route index element={<Main />} />
          <Route path="/write" element={<Write />} />
        </Route>

        <Route path="/mypage" element={<div>mypage</div>} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
