import styles from "assets/scss/pages/main/info.module.scss";

import { Viewer } from "@toast-ui/react-editor";

import { forwardRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Portal } from "components/other";
import { Radio } from "components/input";
import { TPlan } from "types/common";
import useGlobalModalContext from "hooks/useGlobalModalContext";
import { ModalType } from "utils/modal";
import useDate from "hooks/useDate";
import queryKey from "constants/queryKey";
import { deletePlan } from "services/main";

type TProps = {
  plan: TPlan;
};

const Info = forwardRef<HTMLDivElement, TProps>(({ plan }, ref) => {
  const { mutate, isLoading } = useMutation(deletePlan);

  const { show, hide } = useGlobalModalContext();

  const { now } = useDate();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleDeleteBtnClick = () => {
    show(ModalType.DIALOG, {
      type: "SUBMIT",
      title: "삭제하시겠습니까?",
      cancelText: "취소",
      submitText: "삭제",
      handleCancelBtnClick: () => hide(),
      handleSubmitBtnClick: () => {
        mutate(plan.id, {
          onSuccess: () => {
            hide();
            queryClient.resetQueries([queryKey.GET_PLANS, now.year, now.month]);

            if (typeof ref !== "function") {
              ref?.current?.click();
            }
          },
          onError: (error) => {}, // TO-BE
        });
      },
    });
  };

  useEffect(() => {
    if (isLoading) {
      show(ModalType.LOADING);
    } else {
      hide();
    }
  }, [isLoading]);

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
            <button type="button" className={styles.delete} onClick={handleDeleteBtnClick}>
              삭제
            </button>
            <button type="button" className={styles.update} onClick={() => navigate(`/write?id=${plan.id}`)}>
              수정
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
});

export default Info;
