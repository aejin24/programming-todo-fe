import { useState } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

import styles from "assets/scss/pages/write/index.module.scss";
import { Dropdown } from "components/menu";
import { Link } from "react-router-dom";

export default function New() {
  const [active, setActive] = useState("-- 선택 --");
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div className={styles["input-wrapper"]}>
        <p className={styles.label}>대상 레포지토리</p>
        <div className={styles["dropdown-wrapper"]}>
          <Dropdown
            isVisible={isVisible}
            onChange={(activeText) => {
              setActive(activeText);
              setIsVisible(!isVisible);
            }}
          >
            <Dropdown.DropdownButton className={styles["dropdown-btn"]} onClick={() => setIsVisible(!isVisible)}>
              {active}
            </Dropdown.DropdownButton>
            <Dropdown.DropdownItems className={styles["dropdown-items"]}>
              <Dropdown.DropdownItem>repo1</Dropdown.DropdownItem>
              <Dropdown.DropdownItem>repo2</Dropdown.DropdownItem>
              <Dropdown.DropdownItem>repo3</Dropdown.DropdownItem>
            </Dropdown.DropdownItems>
          </Dropdown>
        </div>
      </div>

      <div className={styles["input-wrapper"]}>
        <p className={styles.label}>날짜</p>
        <input type="date" name="date" data-placeholder="날짜 선택" className={styles.date} required />
      </div>

      <div className={styles["input-wrapper"]}>
        <p className={styles.label}>할 일</p>
        <Editor
          placeholder="내용을 입력해주세요."
          autofocus={false}
          previewStyle="vertical"
          hideModeSwitch
          useCommandShortcut={false}
        />
      </div>

      <div className={styles["btn-wrapper"]}>
        <Link to="/" className={styles.cancel}>
          취소
        </Link>
        <button className={styles.register}>신규 등록</button>
      </div>
    </>
  );
}
