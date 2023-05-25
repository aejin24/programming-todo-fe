export type TGithubLoginRes = {
  token: string;
  tokenType: string;
};

export type TCheckRegister = {
  id: number;
  email: string;
  name: string;
  repository: string;
  login: string;
};
