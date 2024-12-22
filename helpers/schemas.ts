import { object, ref, string } from "yup";

export const LoginSchema = object().shape({
  email: string()
    .email("This field must be an email")
    .required("Email is required"),
  password: string().required("Password is required"),
});


export const RegisterSchema = object().shape({
  first_name: string().required("First name is required"),
  middle_name: string(),
  last_name: string(),
  email: string()
    .email("This field must be an email")
    .required("Email is required"),
  password: string().required("Password is required"),
  // signature: string().required("Signature is required"),
});

