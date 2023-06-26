import styles from "assets/scss/pages/dashboard/index.module.scss";

import GitHubCalendar from "react-github-calendar";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";

import { userInfoState } from "recoils/auth";
import queryKey from "constants/queryKey";
import { getCount } from "services/dashboard";

export default function Dashboard() {
  const { login, id } = useRecoilValue(userInfoState);

  const { data } = useQuery([queryKey.GET_PLAN_COUNT, id], () => getCount(id), { enabled: !!login });

  return (
    <>
      <div className={styles.top}>
        <div>
          <p className={styles.title}>Overview</p>
          <p>총 등록 개수: {data?.all || 0}개</p>
        </div>
        <button className={styles["create-btn"]}>Add New Repository</button>
      </div>

      <div className={styles["summary-wrapper"]}>
        <div className={styles.summary}>
          <p>{data?.upcoming || 0}</p>
          <p>Upcoming</p>
        </div>
        <div className={styles.summary}>
          <p>{data?.progressing || 0}</p>
          <p>In-Progress</p>
        </div>
        <div className={styles.summary}>
          <p>{data?.completed || 0}</p>
          <p>Completed</p>
        </div>
      </div>

      <p className={styles.title}>Github Commit Status</p>
      <GitHubCalendar username={login} blockSize={18} blockMargin={5} />
    </>
  );
}
