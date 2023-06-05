import { BaseSyntheticEvent, useEffect, useRef } from "react";

/**
 * useOutsideClick 모달의 바깥 영역 클릭 시 취할 행위를 다룸
 * @param callback 바깥 영역 클릭 시 취할 행위
 * @returns ref
 */
export default function useOutsideClick(callback: () => void) {
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClick = (event: BaseSyntheticEvent | MouseEvent) => {
      if (!callback) return;

      // ref가 존재하고 ref 안에 클릭한 부분이 없을 때만 동작한다.
      if (ref && ref.current && ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [ref]);

  return ref;
}
