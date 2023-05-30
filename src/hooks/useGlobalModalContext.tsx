import { useContext } from "react";
import { GlobalModalContext } from "components/modal/GlobalModal";

export default function useGlobalModalContext() {
  return useContext(GlobalModalContext);
}
