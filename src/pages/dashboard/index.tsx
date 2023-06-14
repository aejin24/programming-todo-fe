import styles from "assets/scss/pages/dashboard/index.module.scss";

import GitHubCalendar from "react-github-calendar";
import { useRecoilValue } from "recoil";
import { userInfoState } from "recoils/auth";

export default function Dashboard() {
  const { login } = useRecoilValue(userInfoState);

  return (
    <>
      <div className={styles.top}>
        <div>
          <p className={styles.title}>Overview</p>
          <p>할 일 등록 개수: n개</p>
        </div>
        <button className={styles["create-btn"]}>Add New Repository</button>
      </div>

      <div className={styles["summary-wrapper"]}>
        <div className={styles.summary}>
          <p>25</p>
          <p>Upcoming</p>
        </div>
        <div className={styles.summary}>
          <p>30</p>
          <p>In-Progress</p>
        </div>
        <div className={styles.summary}>
          <p>30</p>
          <p>Completed</p>
        </div>
      </div>

      <p className={styles.title}>Project Statistics</p>
      <div className={styles.chart}>차트 (프로젝트별 필터 가능하도록 구현 - 진행중, 예정, 완료 상태 확인)</div>

      <p className={styles.title}>Github Commit Status</p>
      <GitHubCalendar username={login} blockSize={18} blockMargin={5} />
    </>
  );
}
