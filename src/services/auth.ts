import { TGithubLoginRes } from "types/auth";
import { Axios } from "./base";

export const githubLogin = async ({ code }: { code: string }): Promise<TGithubLoginRes> => {
    const { data } = await Axios.post<TGithubLoginRes>("/api/auth/github", { code });

    return data;
};
