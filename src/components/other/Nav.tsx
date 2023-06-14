import styles from "assets/scss/components/other/nav.module.scss";
import { CalendarIcon, DashboardIcon, WriteIcon } from "assets/svgs";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className={styles.wrapper}>
      <NavLink to="/" className={({ isActive }) => (isActive ? styles.selected : undefined)}>
        <DashboardIcon />
        대시보드
      </NavLink>
      <NavLink to="/calendar" className={({ isActive }) => (isActive ? styles.selected : undefined)}>
        <CalendarIcon />
        일정
      </NavLink>
      <NavLink
        to="/write"
        className={({ isActive }) => (isActive ? styles.selected : undefined)}
        state={{ isEditMode: false, plan: {} }}
      >
        <WriteIcon />
        작성
      </NavLink>
    </nav>
  );
}
