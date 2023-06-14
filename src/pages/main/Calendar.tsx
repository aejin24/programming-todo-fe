import { useState } from "react";

import cx from "classnames";

import styles from "assets/scss/pages/main/calendar.module.scss";
import useDate from "hooks/useDate";
import useOutsideClick from "hooks/useOutsideClick";
import { TNow, TPlan } from "types/common";
import Info from "./Info";

type TProps = {
  now: TNow;
  planList: TPlan[];
};

export default function Calendar({ now, planList }: TProps) {
  const { firstDay, lastDate, moveDate } = useDate();

  const [hide, setHide] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [plan, setPlan] = useState<TPlan>({
    content: "",
    id: 0,
    member_id: 0,
    register_date: "",
    repository: "",
    status: 0,
  });

  const infoRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const createDate = (_firstDay: number, _lastDate: number) => {
    const dateArr = [];

    for (let i = 0, max = _firstDay; i < max; i++) {
      dateArr.push(<div className={styles.date} style={{ cursor: "default" }} key={`null${i}`} />);
    }

    for (let i = 1, max = _lastDate; i <= max; i++) {
      const nowDate = new Date(now.year, now.month, i).getDay();
      const filterPlan = planList.filter((plan) => new Date(plan.register_date).getDate() === i);

      dateArr.push(
        <div className={cx(styles.date, i === now.date && styles.now)} key={i} onClick={() => moveDate(i, nowDate)}>
          <p className={styles.number}>{i}</p>
          <ul>
            {filterPlan.slice(0, hide ? 3 : filterPlan.length).map((p) => (
              <li
                className={cx(styles.plan, p.status === 1 && styles.underline)}
                key={p.id + p.register_date}
                onClick={() => {
                  setPlan(p);
                  setIsOpen(true);
                }}
              >
                {p.repository}
              </li>
            ))}
          </ul>

          {filterPlan.length > 3 && (
            <button className={styles.more} onClick={() => setHide(!hide)}>
              {hide ? `\u002B MORE` : "\u002D HIDE"}
            </button>
          )}
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
