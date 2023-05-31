import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line import/no-extraneous-dependencies
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

import { useQuery } from "@tanstack/react-query";

import styles from "assets/scss/pages/write/index.module.scss";

import { Dropdown } from "components/menu";
import queryKey from "constants/queryKey";
import { getGithubRepos } from "services/write";
import useGlobalModalContext from "hooks/useGlobalModalContext";
import { ModalType } from "utils/modal";

export default function Write() {
  const [active, setActive] = useState("-- 선택 --");
  const [isOpen, setIsOpen] = useState(false);

  const { show, hide } = useGlobalModalContext();

  const dateRef = useRef<HTMLInputElement>(null);
  const editerRef = useRef<any>(null);

  // TO-BE: error handling
  const { data, isError, error, isLoading, isFetching } = useQuery([queryKey.GET_GITHUB_REPOS], getGithubRepos);

  useEffect(() => {
    if (isLoading || isFetching) {
      show(ModalType.LOADING);
    } else {
      hide();
    }
  }, [isLoading, isFetching]);

  const handleSubmitBtn = async () => {
    if (active === "-- 선택 --") {
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
  };

  return (
    <>
      <div className={styles["input-wrapper"]}>
        <p className={styles.label}>대상 레포지토리</p>
        <div className={styles["dropdown-wrapper"]}>
          <Dropdown
            isOpen={isOpen}
            onChange={(activeText) => {
              setActive(activeText);
              setIsOpen(!isOpen);
            }}
          >
            <Dropdown.DropdownButton className={styles["dropdown-btn"]} onClick={() => setIsOpen(!isOpen)}>
              {active}
            </Dropdown.DropdownButton>
            <Dropdown.DropdownItems className={styles["dropdown-items"]}>
              {data?.map((repo) => (
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
