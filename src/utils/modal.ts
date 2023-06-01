import { Alert, Dialog, Loading } from "components/modal";

export enum ModalType {
  LOADING = 1,
  ALERT = 2,
  DIALOG = 3,
}

export const modalList: any = {
  [ModalType.LOADING]: Loading,
  [ModalType.ALERT]: Alert,
  [ModalType.DIALOG]: Dialog,
};
