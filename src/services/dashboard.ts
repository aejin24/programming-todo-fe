import { TAxiosReturn } from "types/common";
import { TPlanCount } from "types/dashboard";
import { Axios } from "./base";

export const getCount = async (memberId: number): Promise<TPlanCount> => {
  const { data } = await Axios.get<TAxiosReturn<TPlanCount>>(`/api/dashboard/count/${memberId}`);

  return data.data;
};
