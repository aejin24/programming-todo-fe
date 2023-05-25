export type TGithubLoginRes = {
  token: string;
  tokenType: string;
};

export type TGithubUserInfo = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  html_url: string;
  starred_url: string;
  repos_url: string;
  name: string;
  blog: string;
  email: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export type TCheckRegister = {
  id: number;
  email: string;
  name: string;
  repository: string;
  login: string;
};
