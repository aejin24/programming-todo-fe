import { Outlet } from "react-router-dom";

import styles from "assets/scss/components/other/skeleton.module.scss";

import Nav from "./Nav";

export default function NavSkeleton() {
  return (
    <>
      <Nav />

      <div className={styles.pannel}>
        <Outlet />
      </div>
    </>
  );
}
