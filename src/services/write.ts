import { TCheckRegister } from "types/auth";
import { TGithubRepos } from "types/github";
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
