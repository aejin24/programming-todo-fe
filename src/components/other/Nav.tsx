import styles from "assets/scss/components/other/nav.module.scss";
import { AllIcon, NewIcon } from "assets/svgs";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className={styles.wrapper}>
      <NavLink to="/" className={({ isActive }) => (isActive ? styles.selected : undefined)}>
        <AllIcon />
        전체
      </NavLink>
      <NavLink to="/new" className={({ isActive }) => (isActive ? styles.selected : undefined)}>
        <NewIcon />
        작성
      </NavLink>
    </nav>
  );
}
