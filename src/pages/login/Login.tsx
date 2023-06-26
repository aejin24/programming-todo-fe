import styles from "assets/scss/pages/login/login.module.scss";
import githubImage from "assets/images/github.png";

export default function Login() {
  const handleGithubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles["content-wrapper"]}>
        <p className={styles.title}>PT</p>

        <button type="button" className={styles["social-btn"]} onClick={handleGithubLogin}>
          <img src={githubImage} alt="github" />
          깃허브 로그인
        </button>
      </div>
    </div>
  );
}
