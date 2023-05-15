import styles from "assets/scss/pages/main.module.scss";
import { Calendar } from "components/other";
import { dayString } from "constants/common";
import useDate from "hooks/useDate";
import { useRecoilValue } from "recoil";
import { nowState } from "recoils/calendar";
import { TNow } from "types/common";

export default function Main() {
  const now = useRecoilValue<TNow>(nowState);
  const { moveMonth, resetNowRecoilState } = useDate();

  return (
    <>
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
    </>
  );
}
