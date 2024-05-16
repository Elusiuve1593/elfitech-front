import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createParticipantThunk } from "../../redux/events/operations";
import { RegistrationFormType } from "../../redux/interfaces";
import { AppDispatch } from "../../redux/store";
import { schema } from "./yup/yup";
import styles from "./Register.module.scss";

export const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormType>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<RegistrationFormType> = async (data) => {
    const participantInfo: RegistrationFormType = {
      ...data,
      participantId: id,
    };

    await dispatch(createParticipantThunk({ participantInfo }));
  };

  return (
    <>
      <form
        className={styles["registration-form"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Registration</h1>

        <span>Full name</span>
        <input
          {...register("fullName")}
          name="fullName"
          placeholder="Full name"
          type="text"
          defaultValue=""
        />

        {errors.fullName && (
          <p className={styles["error-message"]}>{errors.fullName.message}</p>
        )}

        <span>Email</span>
        <input
          {...register("email")}
          name="email"
          placeholder="Email"
          type={"text"}
          defaultValue=""
        />

        {errors.email && (
          <p className={styles["error-message"]}>{errors.email.message}</p>
        )}

        <span>Date of birth</span>
        <input
          {...register("dateOfBirth")}
          name="dateOfBirth"
          placeholder=""
          type={"date"}
          defaultValue=""
        />

        {errors.dateOfBirth && (
          <p className={styles["error-message"]}>
            {errors.dateOfBirth.message}
          </p>
        )}

        <div className={styles["radio-group"]}>
          <label>
            <input
              type="radio"
              {...register("eventSource")}
              value="Social media"
              name="eventSource"
            />
            Social media
          </label>
          <label>
            <input
              type="radio"
              {...register("eventSource")}
              value="Friends"
              name="eventSource"
            />
            Friends
          </label>
          <label>
            <input
              type="radio"
              {...register("eventSource")}
              value="Found myself"
              name="eventSource"
            />
            Found myself
          </label>
        </div>

        <button type="submit">Registration</button>
      </form>
    </>
  );
};
