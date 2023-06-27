import styles from "assets/scss/pages/dashboard/createRepo.module.scss";

import { Popup } from "components/other";
import { forwardRef } from "react";

const CreateRepo = forwardRef<HTMLDivElement, {}>((_, ref) => {
  return (
    <Popup ref={ref}>
      <div onClick={(e) => e.stopPropagation()} className={styles.wrapper}>
        <p className={styles.top}>Add New Repository</p>
        <hr className={styles.hr} />

        <div className={styles["input-container"]}>
          <input type="text" id="name" required />
          <label className={styles["input-name"]} htmlFor="name">
            <span>Name</span>
          </label>
        </div>
        <div className={styles["input-container"]}>
          <input type="text" id="description" required />
          <label className={styles["input-name"]} htmlFor="description">
            <span>Description</span>
          </label>
        </div>

        <button type="button">Add</button>
      </div>
    </Popup>
  );
});

export default CreateRepo;
