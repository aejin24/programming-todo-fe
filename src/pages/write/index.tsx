// eslint-disable-next-line import/no-extraneous-dependencies
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

import styles from "assets/scss/pages/write/index.module.scss";

import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useQueryClient } from "@tanstack/react-query";

import { userInfoState } from "recoils/auth";
import { Dropdown } from "components/menu";
import { ModalType } from "utils/modal";
import useGlobalModalContext from "hooks/useGlobalModalContext";
import useWriteFetch from "./useWriteFetch";
import queryKey from "constants/queryKey";
import { TPlan } from "types/common";
import { Radio } from "components/input";

type TProps = {
  isEditMode: boolean;
  plan: TPlan;
};

export default function Write() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isEditMode, plan } = (location?.state || {}) as TProps;

  const [repository, setRepository] = useState(isEditMode ? plan!.repository : "-- 선택 --");
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(plan.status);

  const dateRef = useRef<HTMLInputElement>(null);
  const editerRef = useRef<any>(null);

  const queryClient = useQueryClient();

  const { id } = useRecoilValue(userInfoState);

  // TO-BE: error handling
  const { repositoryList, updatePlanMutate, createPlanMutate, isError, error, isLoading } = useWriteFetch();

  const { show, hide } = useGlobalModalContext();

  useEffect(() => {
    if (isLoading) {
      show(ModalType.LOADING);
    } else {
      hide();
    }
  }, [isLoading]);

  useEffect(() => {
    if (dateRef.current && editerRef.current) {
      if (isEditMode) {
        dateRef.current.value = plan.register_date;
        editerRef.current.getInstance().setMarkdown(plan.content);
      } else {
        setRepository("-- 선택 --");
        dateRef.current.value = "";
        editerRef.current.getInstance().reset();
      }
    }
  }, [isEditMode]);

  const mutateSuccessHandler = () => {
    hide();

    queryClient.resetQueries([
      queryKey.GET_PLANS,
      new Date(dateRef.current!.value).getFullYear(),
      new Date(dateRef.current!.value).getMonth() + 1,
    ]);
    queryClient.resetQueries([
      queryKey.GET_PLANS,
      new Date(plan.register_date).getFullYear(),
      new Date(plan.register_date).getMonth() + 1,
    ]);
    queryClient.resetQueries([queryKey.GET_PLAN_COUNT, id]);

    navigate("/calendar");
  };

  const handleSubmitBtn = async () => {
    if (repository === "-- 선택 --") {
      show(ModalType.ALERT, { text: "레포지토리를 선택해주세요!" });

      return;
    }

    if (!dateRef.current?.value) {
      show(ModalType.ALERT, { text: "날짜를 선택해주세요!" });

      return;
    }

    if (!editerRef.current.getInstance().getMarkdown()) {
      show(ModalType.ALERT, { text: "할 일을 입력해주세요!" });

      return;
    }

    show(ModalType.DIALOG, {
      type: "SUBMIT",
      title: isEditMode ? "수정하시겠습니까?" : "신규 등록을 하시겠습니까?",
      cancelText: "취소",
      submitText: isEditMode ? "수정" : "등록",
      handleCancelBtnClick: () => hide(),
      handleSubmitBtnClick: () => {
        if (isEditMode) {
          updatePlanMutate(
            {
              content: editerRef.current.getInstance().getMarkdown(),
              member_id: id,
              register_date: dateRef.current!.value,
              repository,
              id: plan.id,
              status,
            },
            { onSuccess: mutateSuccessHandler }
          );
        } else {
          createPlanMutate(
            {
              content: editerRef.current.getInstance().getMarkdown(),
              member_id: id,
              register_date: dateRef.current!.value,
              repository,
            },
            { onSuccess: mutateSuccessHandler }
          );
        }
      },
    });
  };

  return (
    <>
      <div className={styles["input-wrapper"]}>
        <p className={styles.label}>대상 레포지토리</p>
        <div className={styles["dropdown-wrapper"]}>
          <Dropdown
            isOpen={isOpen}
            onChange={(activeText) => {
              setRepository(activeText);
              setIsOpen(!isOpen);
            }}
          >
            <Dropdown.DropdownButton className={styles["dropdown-btn"]} onClick={() => setIsOpen(!isOpen)}>
              {repository}
            </Dropdown.DropdownButton>
            <Dropdown.DropdownItems className={styles["dropdown-items"]}>
              {repositoryList?.map((repo) => (
                <Dropdown.DropdownItem key={repo.id}>{repo.name}</Dropdown.DropdownItem>
              ))}
            </Dropdown.DropdownItems>
          </Dropdown>
        </div>
      </div>

      <div className={styles["input-wrapper"]}>
        <p className={styles.label}>날짜</p>
        <input type="date" name="date" data-placeholder="날짜 선택" className={styles.date} required ref={dateRef} />
      </div>

      {isEditMode && (
        <div className={styles["input-wrapper"]}>
          <p className={styles.label}>진행 상태</p>
          <div className={styles["radio-wrapper"]}>
            <Radio
              name="status"
              id="progress"
              value={0}
              label="진행중"
              checked={status.toString() === "0"}
              readOnly
              className={styles.radio}
              handleChange={({ value }) => setStatus(value)}
            />
            <Radio
              name="status"
              id="done"
              value={1}
              label="완료"
              checked={status.toString() === "1"}
              readOnly
              className={styles.radio}
              handleChange={({ value }) => setStatus(value)}
            />
          </div>
        </div>
      )}

      <div className={styles["input-wrapper"]}>
        <p className={styles.label}>할 일</p>
        <Editor
          placeholder="할 일을 입력해주세요."
          autofocus={false}
          previewStyle="vertical"
          hideModeSwitch
          useCommandShortcut={false}
          ref={editerRef}
        />
      </div>

      <div className={styles["btn-wrapper"]}>
        <Link to="/calendar" className={styles.cancel}>
          취소
        </Link>
        <button className={styles.register} onClick={handleSubmitBtn}>
          {isEditMode ? "수정" : "신규 등록"}
        </button>
      </div>
    </>
  );
}
