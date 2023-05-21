import { useMutation, useQuery } from "@tanstack/react-query";

import queryKey from "constants/queryKey";
import { checkRegister, githubLogin, githubUserInfo } from "services/auth";
import { getSessionStorage } from "utils/storage";

export default function useAuthFetch() {
  const token = getSessionStorage("token");

  // github token 발급
  const { mutate: githubMutate } = useMutation(githubLogin);

  // github 정보 가져오기
  const {
    data: userInfo,
    isError: isGetUserInfoError,
    error: getUserInfoError,
  } = useQuery([queryKey.GET_GITHUB_INFO], githubUserInfo, {
    enabled: !!token,
  });

  // 이력 확인
  const { mutate: checkHistoryMutate } = useMutation(checkRegister);

  return {
    githubMutate,
    checkHistoryMutate,
    userInfo,
    getUserInfoError,
    isGetUserInfoError,
  };
}
