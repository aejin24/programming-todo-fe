import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Main } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="" element={<Main />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}
