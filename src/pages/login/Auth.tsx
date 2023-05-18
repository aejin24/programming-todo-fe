import styles from "assets/scss/pages/login/auth.module.scss";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { githubLogin } from "services/auth";

export default function Auth() {
  const { mutate } = useMutation(githubLogin);

  const navigate = useNavigate();

  const [searchParam] = useSearchParams();
  const code = searchParam.get("code") || "";

  useEffect(() => {
    mutate(
      { code },
      {
        onSuccess: (res) => {
          sessionStorage.setItem("token", res.token);
          navigate("/");
        },
        onError: (error) => {
          // TO-BE
          // eslint-disable-next-line no-console
          console.log(error);
          navigate(-1);
        },
      }
    );
  }, [code, mutate, navigate]);

  return (
    <div className={styles.wrapper}>
      <div className={styles["dot-falling"]} />
      <p className={styles.text}>로그인 진행 중</p>
      <p className={styles.subtext}>이 화면이 지속되면 F5를 눌러주세요.</p>
    </div>
  );
}
