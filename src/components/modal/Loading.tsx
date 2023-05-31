import styles from "assets/scss/components/modal/loading.module.scss";
import loadingImg from "assets/images/loading.png";
import Portal from "components/other/Portal";

export default function Loading() {
  return (
    <Portal>
      <div className={styles.wrapper}>
        <img src={loadingImg} alt="loading image" />
      </div>
    </Portal>
  );
}
