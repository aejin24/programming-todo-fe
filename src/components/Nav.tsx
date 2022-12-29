import styles from "assets/scss/components/nav.module.scss";
import { navArr } from "constants/index";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className={styles.wrapper}>
      {navArr.map((nav) => (
        <NavLink
          key={nav.to}
          to={nav.to}
          className={({ isActive }) =>
            isActive ? `${styles[`selected-${nav.label}`]} ${styles[nav.label]}` : styles[nav.label]
          }
        >
          {nav.label}
        </NavLink>
      ))}
    </nav>
  );
}
