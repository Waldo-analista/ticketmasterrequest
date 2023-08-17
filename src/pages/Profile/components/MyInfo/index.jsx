import { useForm } from "react-hook-form";
import { useEffect } from "react";
import styles from "./MyInfo.module.css";
import { USER_DATA } from "../../../../utils/constants";

const Myinfo = () => {
  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem(USER_DATA)) || {};
      setValue("name", userData.name);
      setValue("age", userData.age);
      setValue("email", userData.email);
    } catch (error) {
      console.log(error);
    }
  }, [setValue]);

  const handleFormSubmit = (data) => {
    try {
      localStorage.setItem(USER_DATA, JSON.stringify(data));
      alert("Usuario Actualizado Exitosamente");
    } catch (err) {
      alert("Ha ocurrido un error");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        <label htmlFor="SignUpForm__name" className={styles.label}>
          Nombre
        </label>
        <input
          id="SignUpForm__name"
          {...register("name", { required: true, min: 1, max: 120 })}
          className={styles.input}
        />
        <br />
        <label htmlFor="SignUpForm__email" className={styles.label}>
          Email
        </label>
        <input
          id="SignUpForm__email"
          {...register("email", { required: true })}
          className={styles.input}
        />
        <br />
        <label htmlFor="SignUpForm__age" className={styles.label}>
          Edad
        </label>
        <input
          id="SignUpForm__age"
          {...register("age", {
            required: true,
            min: 1,
            max: 120,
            valueAsNumber: true,
          })}
          className={styles.input}
          type="number"
        />
        <br />
        <button type="submit" className={styles.submitButton}>
          Guardar
        </button>
      </form>
    </>
  );
};

export default Myinfo;
