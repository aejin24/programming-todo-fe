import { TCheckHistory, TGithubLoginRes, TGithubUserInfo } from "types/auth";
import { TAxiosReturn } from "types/common";
import { getSessionStorage } from "utils/storage";
import { Axios } from "./base";

export const githubLogin = async ({ code }: { code: string }): Promise<TGithubLoginRes> => {
  const { data } = await Axios.post<TAxiosReturn<TGithubLoginRes>>("/api/auth/github", { code });

  return data.data;
};

export const githubUserInfo = async (): Promise<TGithubUserInfo> => {
  const { data } = await Axios.get<TGithubUserInfo>("https://api.github.com/user", {
    headers: {
      Authorization: `token ${getSessionStorage("token")}`,
    },
  });

  return data;
};

export const checkHistory = async ({ id, email, name, repository }: TCheckHistory): Promise<{ list: [] }> => {
  const { data } = await Axios.post<TAxiosReturn<{ list: [] }>>("/api/auth/history", { id, email, name, repository });

  return data.data;
};
