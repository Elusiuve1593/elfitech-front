import * as yup from "yup";

export const schema = yup.object().shape({
  fullName: yup.string().required("Fill the field!").max(50),
  email: yup
    .string()
    .required("Fill the field!")
    .email("Wrong format of mail!")
    .max(50),
  dateOfBirth: yup.string().required("Fill the field!").max(50),
  eventSource: yup.string().required("Fill the field!").max(15),
});
