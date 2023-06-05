import styles from "assets/scss/pages/main/calendar.module.scss";
import useDate from "hooks/useDate";
import useOutsideClick from "hooks/useOutsideClick";
import { useState } from "react";
import { TNow, TPlan } from "types/common";
import Info from "./Info";

type TProps = {
  now: TNow;
  planList: TPlan[];
};

export default function Calendar({ now, planList }: TProps) {
  const { firstDay, lastDate, moveDate } = useDate();

  const [isOpen, setIsOpen] = useState(false);
  const [plan, setPlan] = useState<TPlan>({
    content: "",
    id: 0,
    member_id: 0,
    register_date: "",
    repository: "",
    status: 0,
  });

  const infoRef = useOutsideClick(() => setIsOpen(false));

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
                <li
                  className={styles.plan}
                  key={p.id + p.register_date}
                  data-icon={p.status === 0 ? "✓" : "⍻"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPlan(p);
                    setIsOpen(true);
                  }}
                >
                  {p.repository}
                </li>
              ))}
          </ul>
        </div>
      );
    }

    return dateArr;
  };

  return (
    <>
      <div className={styles.wrapper}>{createDate(firstDay, lastDate)}</div>

      {isOpen && <Info plan={plan} ref={infoRef} />}
    </>
  );
}
