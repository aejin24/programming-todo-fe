import styles from "assets/scss/pages/main/index.module.scss";

import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";

import { Calendar } from "components/other";
import { dayString } from "constants/common";
import queryKey from "constants/queryKey";
import useDate from "hooks/useDate";
import { userInfoState } from "recoils/auth";
import { getHistories } from "services/main";
import { ModalType } from "utils/modal";
import useGlobalModalContext from "hooks/useGlobalModalContext";

export default function Main() {
  const { now, moveMonth, resetNowRecoilState } = useDate();

  const { id } = useRecoilValue(userInfoState);

  // TO-BE: error handling
  const { data, isLoading, isFetching, isError, error } = useQuery([queryKey.GET_HISTORIES, now.year, now.month], () =>
    getHistories(id, now.year, now.month)
  );

  const { show, hide } = useGlobalModalContext();

  useEffect(() => {
    if (isLoading || isFetching) {
      show(ModalType.LOADING);
    } else {
      hide();
    }
  }, [isLoading, isFetching]);

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

      <Calendar now={now} planList={data || []} />
    </>
  );
}
