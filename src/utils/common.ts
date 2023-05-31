/**
 * 코드 실행 지연 시키는 메서드
 * @param ms
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
