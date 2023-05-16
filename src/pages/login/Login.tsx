import styles from "assets/scss/pages/login/login.module.scss";
import githubImage from "assets/images/github.png";

export default function Login() {
  const handleGithubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles["content-wrapper"]}>
        <p className={styles.title}>Sign In</p>

        <div className={styles["input-container"]}>
          <input type="text" id="email" required />
          <label className={styles["input-name"]} htmlFor="email">
            <span>Email</span>
          </label>
        </div>

        <div className={styles["input-container"]}>
          <input type="password" id="password" required />
          <label className={styles["input-name"]} htmlFor="password">
            <span>Password</span>
          </label>
        </div>

        <button type="submit">Login</button>

        <p className={styles.contour}>OR</p>

        <button type="button" className={styles["social-btn"]} onClick={handleGithubLogin}>
          <img src={githubImage} alt="github" />
        </button>

        <p className={styles.text}>회원이 아니신가요?</p>
        <button type="button" className={styles["register-btn"]}>
          회원가입
        </button>
      </div>
    </div>
  );
}
