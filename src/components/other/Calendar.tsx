import styles from "assets/scss/components/other/calendar.module.scss";
import useDate from "hooks/useDate";
import { TNow, TPlan } from "types/common";

type TProps = {
  now: TNow;
  planList: TPlan[];
};

export default function Calendar({ now, planList }: TProps) {
  const { firstDay, lastDate, moveDate } = useDate();

  const createDate = (_firstDay: number, _lastDate: number) => {
    const dateArr = [];

    for (let i = 0, max = _firstDay; i < max; i++) {
      dateArr.push(<div className={styles.date} style={{ cursor: "default" }} key={`null${i}`} />);
    }

    for (let i = 1, max = _lastDate; i <= max; i++) {
      const nowDate = new Date(now.year, now.month, i).getDay();
      dateArr.push(
        <div
          className={`${styles.date} ${i === now.date ? styles.now : ""}`}
          key={i}
          onClick={() => moveDate(i, nowDate)}
        >
          <p className={styles.number}>{i}</p>
          <ul>
            {planList
              .filter((plan) => new Date(plan.register_date).getDate() === i)
              .map((p) => (
                <li className={styles.plan} key={p.id + p.register_date}>
                  {p.repository}
                </li>
              ))}
          </ul>
        </div>
      );
    }

    return dateArr;
  };

  return <div className={styles.wrapper}>{createDate(firstDay, lastDate)}</div>;
}
