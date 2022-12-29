import styles from "assets/scss/skeleton.module.scss";
import { Route, Routes } from "react-router-dom";
import { Nav } from "./components";
import { Main, New } from "./pages";

export default function App() {
  return (
    <div className={styles.wrapper}>
      <Nav />

      <div className={styles.routes}>
        <Routes>
          <Route path="" element={<Main />} />
          <Route path="new" element={<New />} />
        </Routes>
      </div>
    </div>
  );
}
