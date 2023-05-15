import styles from "assets/scss/components/other/skeleton.module.scss";
import { LogoutIcon, MyPageIcon } from "assets/svgs";
import { Link, Outlet } from "react-router-dom";
import Nav from "./Nav";

export default function Skeleton() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link to="/" className={styles.title}>
          프로젝트 명..
        </Link>

        <div className={styles["btn-wrapper"]}>
          <button type="button" className={styles.button}>
            <MyPageIcon />
            마이페이지
          </button>
          <button type="button" className={styles.button}>
            <LogoutIcon />
            로그아웃
          </button>
        </div>
      </header>

      <div className={styles.bottom}>
        <Nav />
        <div className={styles.pannel}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
