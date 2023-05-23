import styles from "assets/scss/pages/login/auth.module.scss";
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "recoils/auth";

import { setSessionStorage } from "utils/storage";
import useAuthFetch from "./useAuthFetch";

export default function Auth() {
  const navigate = useNavigate();

  const location = useLocation();
  const hasHistoryPath = /history/gi.test(location.pathname);

  const [searchParam] = useSearchParams();
  const code = searchParam.get("code") || "";

  const setUserInfo = useSetRecoilState(userInfoState);

  // TO-BE: error handling
  const { githubMutate, checkHistoryMutate, userInfo, getUserInfoError, isGetUserInfoError } = useAuthFetch();

  useEffect(() => {
    if (!hasHistoryPath) {
      githubMutate(
        { code },
        {
          onSuccess: (res) => {
            setSessionStorage("token", res.token);
            navigate("/auth/history");
          },
          onError: () => {
            // TO-BE
            navigate(-1);
          },
        }
      );
    }
  }, [code, githubMutate, navigate, hasHistoryPath]);

  useEffect(() => {
    if (userInfo) {
      checkHistoryMutate(
        {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          repository: userInfo.html_url,
        },
        {
          onSuccess: () => {
            setUserInfo({
              id: userInfo.id,
              email: userInfo.email,
              name: userInfo.name,
              repository: userInfo.html_url,
            });

            navigate("/");
          },
          // TO-BE: error handling
          onError: () => {
            navigate(-1);
          },
        }
      );
    }
  }, [userInfo, checkHistoryMutate, navigate]);

  return (
    <div className={styles.wrapper}>
      <div className={styles["dot-falling"]} />
      <p className={styles.text}>{hasHistoryPath ? "정보를 가져오고 있습니다" : "로그인 진행 중"}</p>
      <p className={styles.subtext}>이 화면이 지속되면 F5를 눌러주세요.</p>
    </div>
  );
}
