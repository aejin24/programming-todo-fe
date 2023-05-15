import { useRecoilState, useResetRecoilState } from "recoil";
import { nowState } from "recoils/calendar";
import { TNow } from "types/common";

export default function useDate() {
    const [now, setNow] = useRecoilState<TNow>(nowState);

    // 1일이 무슨 요일인지
    const firstDay = new Date(now.year, now.month - 1, 1).getDay();

    // 마지막 날은 몇 일인지
    const lastDate = new Date(now.year, now.month, 0).getDate();

    // 날짜 이동
    const moveDate = (date: number, day: number) => {
        setNow({ ...now, date, day });
    };

    // 월 이동
    const moveMonth = (month: number) => {
        if (month > 11) {
            setNow({ ...now, year: now.year + 1, month: 1 });
        } else if (month < 2) {
            setNow({ ...now, year: now.year - 1, month: 12 });
        } else {
            setNow({ ...now, month });
        }
    };

    // 오늘 날짜 이동하기 위한 상태값 초기화
    const resetNowRecoilState = useResetRecoilState(nowState);

    return { firstDay, lastDate, moveDate, moveMonth, resetNowRecoilState };
}
