import { TCheckRegister } from "types/auth";
import { TAxiosReturn } from "types/common";
import { TGithubRepos } from "types/github";
import { TCreatePlan } from "types/write";
import { getSessionStorage } from "utils/storage";
import { Axios } from "./base";

export const getGithubRepos = async (): Promise<TGithubRepos> => {
  const { login }: TCheckRegister = JSON.parse(getSessionStorage("userInfo") || "");

  const { data } = await Axios.get<TGithubRepos>(`https://api.github.com/users/${login}/repos`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `token ${getSessionStorage("token")}`,
    },
  });

  return data;
};

export const createPlan = async ({
  content,
  member_id,
  register_date,
  repository,
}: TCreatePlan): Promise<{ result: boolean }> => {
  const { data } = await Axios.post<TAxiosReturn<{ result: boolean }>>("/api/plan/write", {
    content,
    member_id,
    register_date,
    repository,
  });

  return data.data;
};
