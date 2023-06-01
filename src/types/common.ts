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

export type TPlan = {
  id: number;
  content: string;
  repository: string;
  register_date: string;
  member_id: string;
};
