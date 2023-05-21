export interface TNow {
  year: number;
  month: number;
  date: number;
  day: number;
}

export type TAxiosReturn<T> = {
  status: number;
  data: T;
};
