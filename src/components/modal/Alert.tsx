import styles from "assets/scss/components/modal/alert.module.scss";
import warningImg from "assets/images/warning.png";

import { Portal } from "components/other";

type TProps = {
  text: string;
};

export default function Alert({ text }: TProps) {
  return (
    <Portal>
      <div className={styles.wrapper}>
        <img src={warningImg} alt="warning" />
        {text}
      </div>
    </Portal>
  );
}
