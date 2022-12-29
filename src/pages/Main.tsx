import styles from "assets/scss/pages/main.module.scss";
import { Calendar } from "components/index";
import { dayString } from "constants/index";
import useDate from "hooks/useDate";
import { useRecoilValue } from "recoil";
import { nowState } from "recoils/calendar";
import { Now } from "types/state";

export default function Main() {
  const now = useRecoilValue<Now>(nowState);
  const { moveMonth, resetNowRecoilState } = useDate();

  return (
    <div className={styles.wrapper}>
      <div className={styles["month-wrapper"]}>
        <p>{`${now.month}' ${now.year}`}</p>

        <button type="button" onClick={() => moveMonth(now.month - 1)}>
          &lt;
        </button>
        <button type="button" onClick={resetNowRecoilState}>
          today
        </button>
        <button type="button" onClick={() => moveMonth(now.month + 1)}>
          &gt;
        </button>
      </div>

      <div className={styles["day-wrapper"]}>
        {dayString.map((day) => (
          <p key={day}>{day}</p>
        ))}
      </div>

      <Calendar now={now} />
    </div>
  );
}
