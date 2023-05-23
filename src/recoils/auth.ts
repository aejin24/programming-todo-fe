import { atom } from "recoil";
import { TCheckRegister } from "types/auth";

const userInfoState = atom<TCheckRegister>({
  key: "userInfoState",
  default: {
    id: 0,
    email: "",
    name: "",
    repository: "",
  },
});

export { userInfoState };
