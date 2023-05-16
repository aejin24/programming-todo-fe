import styles from "assets/scss/pages/login/auth.module.scss";

export default function Auth() {
  return (
    <div className={styles.wrapper}>
      <div className={styles["dot-falling"]} />
      <p className={styles.text}>로그인 진행 중</p>
      <p className={styles.subtext}>이 화면이 지속되면 F5를 눌러주세요.</p>
    </div>
  );
}
