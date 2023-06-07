import styles from "assets/scss/pages/main/info.module.scss";

import { Viewer } from "@toast-ui/react-editor";

import { Portal } from "components/other";
import { Radio } from "components/input";
import { TPlan } from "types/common";
import { forwardRef } from "react";

type TProps = {
  plan: TPlan;
};

const Info = forwardRef<HTMLDivElement, TProps>(({ plan }, ref) => {
  return (
    <Portal>
      <div className={styles.wrapper} ref={ref}>
        <div className={styles["info-wrapper"]} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <p className={styles.repo}>{plan.repository}</p>
            <p className={styles.status}>{plan.register_date}</p>
          </div>

          <div className={styles["radio-wrapper"]}>
            <Radio
              name="status"
              id="progress"
              value={0}
              label="진행중"
              checked={plan.status === 0}
              readOnly
              className={styles.radio}
              handleChange={() => {}} // TO-BE: edite 모드일 때 내용 채우기
            />
            <Radio
              name="status"
              id="done"
              value={1}
              label="완료"
              checked={plan.status === 1}
              readOnly
              className={styles.radio}
              handleChange={() => {}} // TO-BE: edite 모드일 때 내용 채우기
            />
          </div>

          <Viewer initialValue={plan.content} />

          <div className={styles["btn-wrapper"]}>
            <button type="button" className={styles.delete}>
              삭제
            </button>
            <button type="button" className={styles.update}>
              수정
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
});

export default Info;
