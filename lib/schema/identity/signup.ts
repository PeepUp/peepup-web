import { z } from "zod";
import validator from "validator";
let strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);
let mediumPassword = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
);

export const username = z
    .string()
    .regex(new RegExp("^(?=.{5,255}$)(?![_.-])(?!.*[_.]{2})[a-z0-9._-]+(?<![_.])$"), {
        message: "Username is invalid",
    })
    .min(5, {
        message: "Email, username, or phone number must be at least 5 characters long",
    })
    .max(255, {
        message: "Email, username, or phone number must be at most 255 characters long",
    });

export const email = z
    .string()
    .email({
        message: "Email is invalid",
    })
    .max(255, {
        message: "Email must be at most 255 characters long",
    })
    .min(8, {
        message: "Email must be at least 5 characters long",
    })
    .refine(validator.isEmail, () => ({ message: "Email is invalid" }));

export const phone = z
    .string()
    .min(8, { message: "Phone number must be at least 8 characters long" })
    .max(13, { message: "Phone number must be at most 13 characters long" })
    .refine(validator.isMobilePhone, () => ({ message: "Phone number is invalid" }));

export const password = z
    .string()
    .regex(mediumPassword, {
        message: "Password is too weak",
    })
    .min(8, {
        message: "Password must be at least 8 characters long",
    })
    .max(64, {
        message: "Password must be at most 255 characters long",
    });

export const strongPwd = z
    .string()
    .regex(strongPassword, {
        message: "Please enter a strong password",
    })
    .min(8, {
        message: "Password must be at least 8 characters long",
    })
    .max(64, {
        message: "Password must be at most 255 characters long",
    });
