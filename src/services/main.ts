import { TAxiosReturn, TPlan } from "types/common";
import { Axios } from "./base";

export const getPlans = async (memberId: number, year: number, month: number): Promise<TPlan[]> => {
  const { data } = await Axios.get<TAxiosReturn<TPlan[]>>(`/api/plan/${memberId}?year=${year}&month=${month}`);

  return data.data;
};
