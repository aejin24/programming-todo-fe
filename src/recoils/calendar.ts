import { atom } from "recoil";
import { TNow } from "types/common";

const today = new Date();

const nowState = atom<TNow>({
  key: "nowAtom",
  default: {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
    day: today.getDay(),
  },
});

export { nowState };
