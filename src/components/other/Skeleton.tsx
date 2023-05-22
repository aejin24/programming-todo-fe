import { Link, Outlet, useNavigate } from "react-router-dom";

import styles from "assets/scss/components/other/skeleton.module.scss";
import { LogoutIcon, MyPageIcon } from "assets/svgs";
import { removeSessionStorage } from "utils/storage";
import Nav from "./Nav";

export default function Skeleton() {
  const navigate = useNavigate();

  const handleLogoutBtnClick = () => {
    removeSessionStorage("token");
    navigate("/login");
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link to="/" className={styles.title}>
          프로젝트 명..
        </Link>

        <div className={styles["btn-wrapper"]}>
          <button type="button" className={styles.button} onClick={() => navigate("/mypage")}>
            <MyPageIcon />
            마이페이지
          </button>
          <button type="button" className={styles.button} onClick={handleLogoutBtnClick}>
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
