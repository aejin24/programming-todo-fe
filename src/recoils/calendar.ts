import { atom } from "recoil";
import { Now } from "types/state";

const today = new Date();

const nowState = atom<Now>({
    key: "now",
    default: {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
        day: today.getDay(),
    },
});

export { nowState };
