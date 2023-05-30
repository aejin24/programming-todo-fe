import { Loading } from "components/modal";

export enum ModalType {
  LOADING = 1,
}

export const modalList: any = {
  [ModalType.LOADING]: Loading,
};
