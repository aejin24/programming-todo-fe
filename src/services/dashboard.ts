import { TAxiosReturn } from "types/common";
import { TCreateRepo, TPlanCount } from "types/dashboard";
import { getSessionStorage } from "utils/storage";
import { Axios } from "./base";

export const getCount = async (memberId: number): Promise<TPlanCount> => {
  const { data } = await Axios.get<TAxiosReturn<TPlanCount>>(`/api/dashboard/count/${memberId}`);

  return data.data;
};

export const createRepo = async ({ name, description }: TCreateRepo): Promise<any> => {
  const { data } = await Axios.post(
    "https://api.github.com/user/repos", // 404?
    {
      name,
      description,
    },
    {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: `token ${getSessionStorage("token")}`,
      },
    },
  );

  console.log(data);
};
