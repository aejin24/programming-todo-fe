import { Alert, Loading } from "components/modal";

export enum ModalType {
  LOADING = 1,
  ALERT = 2,
}

export const modalList: any = {
  [ModalType.LOADING]: Loading,
  [ModalType.ALERT]: Alert,
};
