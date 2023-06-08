import { useMutation, useQuery } from "@tanstack/react-query";
import queryKey from "constants/queryKey";
import { createPlan, getGithubRepos, updatePlan } from "services/write";

export default function useWriteFetch() {
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

  const {
    mutate: updatePlanMutate,
    isError: isUpdateError,
    error: updateError,
    isLoading: isUpdateLoading,
  } = useMutation(updatePlan);

  return {
    createPlanMutate,
    updatePlanMutate,
    repositoryList,
    isError: isGetGithubRepoError || isCreateError || isUpdateError,
    error: getGithubRepoError || createError || updateError,
    isLoading: isGetGithubRepoLoading || isGetGithubRepoFetching || isCreateLoading || isUpdateLoading,
  };
}
