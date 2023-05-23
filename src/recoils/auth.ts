import { atom } from "recoil";
import { TCheckRegister } from "types/auth";
import { getSessionStorage, removeSessionStorage, setSessionStorage } from "utils/storage";

const userInfoState = atom<TCheckRegister>({
  key: "userInfoState",
  default: {
    id: 0,
    email: "",
    name: "",
    repository: "",
  },
  effects: [
    ({ setSelf, onSet }) => {
      const savedData = getSessionStorage("userInfo");
      if (savedData) {
        setSelf(JSON.parse(savedData));
      }

      onSet((newValue, _, isReset) => {
        isReset ? removeSessionStorage("userInfo") : setSessionStorage("userInfo", JSON.stringify(newValue));
      });
    },
  ],
});

export { userInfoState };
