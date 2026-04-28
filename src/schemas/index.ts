import * as Yup from "yup";
import { string } from "yup";
const LIMIT = {
  MAX_NAME_LENGTH: 50,
  MIN_NAME_LENGTH: 2,
  MAX_EMAIL_LENGTH: 100,
  MAX_LOCATION_LENGTH: 200,
  MAX_MOBILE_LENGTH: 10,
  MAX_URL_LENGTH: 200,
};

const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  ONLY_NUMBER: /^[0-9]+$/,
  ALPHABET_WITH_DIGITS: /^[a-zA-Z0-9\s]+$/,
  URL: /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.*)?$/,
};
// export const signUpSchema = Yup.object({
//   name: Yup.string().min(2).max(25).required("Name is required"),
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   password: string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Please enter password"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), ""], "Passwords must match")
//     .required("Confirm Password is required"),
// });

export const addUpdateOrganizationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(LIMIT.MIN_NAME_LENGTH)
    .max(LIMIT.MAX_NAME_LENGTH),
  email: Yup.string()
    .required("Email is required")
    .matches(REGEX.EMAIL)
    .max(LIMIT.MAX_EMAIL_LENGTH),
  address: Yup.string()
    .required("Address is required")
    .max(LIMIT.MAX_LOCATION_LENGTH),

  apt: Yup.string().max(LIMIT.MAX_NAME_LENGTH),

  city: Yup.string()
    .matches(REGEX.ALPHABET_WITH_DIGITS)
    .required("City required"),

  state: Yup.string()
    .matches(REGEX.ALPHABET_WITH_DIGITS)
    .required("State required"),

  zipcode: Yup.string()
    .matches(REGEX.ONLY_NUMBER)
    .required("Zipcode required")
    .max(LIMIT.MAX_MOBILE_LENGTH),

  website: Yup.object({
    name: Yup.string(),
    link: Yup.string().matches(REGEX.URL, "Invalid URL"),
  }),

  socialLink: Yup.array().of(
    Yup.object({
      name: Yup.string(),
      link: Yup.string().matches(REGEX.URL, "Invalid URL"),
    }),
  ),
});

export const userValidationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(3, "Minimum 3 characters required")
    .max(15, "Maximum 15 characters allowed")
    .required("Full name is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  roleId: Yup.string().required("Role is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .required("Phone number is required"),

  branchId: Yup.string().nullable(),
});