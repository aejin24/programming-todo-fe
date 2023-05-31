// eslint-disable-next-line import/no-extraneous-dependencies
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

import styles from "assets/scss/pages/write/index.module.scss";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { userInfoState } from "recoils/auth";
import { Dropdown } from "components/menu";
import { ModalType } from "utils/modal";
import useGlobalModalContext from "hooks/useGlobalModalContext";
import useDate from "hooks/useDate";
import useWriteApi from "./useWriteApi";

export default function Write() {
  const [repository, setRepository] = useState("-- 선택 --");
  const [isOpen, setIsOpen] = useState(false);

  const { show, hide } = useGlobalModalContext();

  const dateRef = useRef<HTMLInputElement>(null);
  const editerRef = useRef<any>(null);

  // TO-BE: error handling
  const { repositoryList, createPlanMutate, isError, error, isLoading } = useWriteApi();

  const { today } = useDate();

  const { id } = useRecoilValue(userInfoState);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      show(ModalType.LOADING);
    } else {
      hide();
    }
  }, [isLoading]);

  const handleSubmitBtn = async () => {
    if (repository === "-- 선택 --") {
      show(ModalType.ALERT, { text: "레포지토리를 선택해주세요!" });

      return;
    }

    if (!dateRef.current?.value) {
      show(ModalType.ALERT, { text: "날짜를 선택해주세요!" });

      return;
    }

    if (editerRef.current.getInstance().getHTML() === "<p><br></p>") {
      show(ModalType.ALERT, { text: "할 일을 입력해주세요!" });

      return;
    }

    createPlanMutate(
      {
        content: editerRef.current.getInstance().getHTML(),
        member_id: id,
        register_date: dateRef.current.value,
        repository,
      },
      {
        onSuccess: () => {
          hide();
          navigate("/");
        },
      }
    );
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
        <input
          min={today}
          type="date"
          name="date"
          data-placeholder="날짜 선택"
          className={styles.date}
          required
          ref={dateRef}
        />
      </div>

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
        <Link to="/" className={styles.cancel}>
          취소
        </Link>
        <button className={styles.register} onClick={handleSubmitBtn}>
          신규 등록
        </button>
      </div>
    </>
  );
}
