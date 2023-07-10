import styles from "assets/scss/pages/dashboard/createRepo.module.scss";

import { Popup } from "components/other";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { createRepo } from "services/dashboard";
import { TCreateRepo } from "types/dashboard";

const CreateRepo = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const { register, handleSubmit } = useForm<TCreateRepo>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleFormSubmit = (data: TCreateRepo) => {
    console.log(data);
    // createRepo({ ...data });
  };

  return (
    <Popup ref={ref}>
      <form onClick={(e) => e.stopPropagation()} className={styles.wrapper} onSubmit={handleSubmit(handleFormSubmit)}>
        <p className={styles.top}>Add New Repository</p>
        <hr className={styles.hr} />

        <div className={styles["input-container"]}>
          <input type="text" required {...register("name")} />
          <label className={styles["input-name"]} htmlFor="name">
            <span>Name</span>
          </label>
        </div>
        <div className={styles["input-container"]}>
          <input type="text" required {...register("description")} />
          <label className={styles["input-name"]} htmlFor="description">
            <span>Description</span>
          </label>
        </div>

        <button>Add</button>
      </form>
    </Popup>
  );
});

export default CreateRepo;
