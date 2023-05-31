import { useMutation, useQuery } from "@tanstack/react-query";
import queryKey from "constants/queryKey";
import { createPlan, getGithubRepos } from "services/write";

export default function useWriteApi() {
  // TO-BE: error handling
  const {
    data: repositoryList,
    isError: isGetGithubRepoError,
    error: getGithubRepoError,
    isLoading: isGetGithubRepoLoading,
    isFetching: isGetGithubRepoFetching,
  } = useQuery([queryKey.GET_GITHUB_REPOS], getGithubRepos);

  const {
    mutate: createPlanMutate,
    isError: isCreateError,
    error: createError,
    isLoading: isCreateLoading,
  } = useMutation(createPlan);

  return {
    createPlanMutate,
    repositoryList,
    isError: isGetGithubRepoError || isCreateError,
    error: getGithubRepoError || createError,
    isLoading: isGetGithubRepoLoading || isGetGithubRepoFetching || isCreateLoading,
  };
}
