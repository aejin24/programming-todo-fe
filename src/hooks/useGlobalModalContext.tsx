import { useContext } from "react";

import GlobalModalContext from "context/globalModal";

export default function useGlobalModalContext() {
  return useContext(GlobalModalContext);
}
