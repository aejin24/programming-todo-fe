import { useMutation } from "@tanstack/react-query";
import { deletePlan } from "services/main";

export default function useMainFetch() {
  // 할 일  삭제
  const { mutate: deleteMutate, isLoading: isDeleteLoading } = useMutation(deletePlan);

  return { deleteMutate, isLoading: isDeleteLoading };
}
