import img from "assets/images/404.png";
import styles from "assets/scss/pages/error.module.scss";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <img src={img} alt="404" />
      <Link to="/">GO MAIN</Link>
    </div>
  );
}
