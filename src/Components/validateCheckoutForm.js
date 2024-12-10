import * as yup from "yup";

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const validationSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(3, "The first name can not be less than 3 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(3, "The last name can not be less than 3 characters"),
  address: yup.string(),
  email: yup.string().email("Email is Not valid").required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
});
