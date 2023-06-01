import styles from "assets/scss/components/modal/dialog.module.scss";

type TProps = {
  type: "CONFIRM" | "SUBMIT";
  title: string;
  subtitle?: string;
  cancelText?: string;
  submitText: string;
  handleSubmitBtnClick: () => void;
  handleCancelBtnClick?: () => void;
};

export default function Dialog({
  type,
  title,
  subtitle,
  cancelText,
  submitText,
  handleSubmitBtnClick,
  handleCancelBtnClick,
}: TProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <p className={styles.title}>{title}</p>

        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        <div className={styles["btn-wrapper"]}>
          {type === "SUBMIT" && (
            <button type="button" className={styles.cancel} onClick={handleCancelBtnClick}>
              {cancelText}
            </button>
          )}
          <button type="button" className={styles.submit} onClick={handleSubmitBtnClick}>
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
}
