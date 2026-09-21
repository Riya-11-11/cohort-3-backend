import { body, validationResult } from "express-validator"; //package for valoidation

export const registerValidation = [
    body("email")
      .exists()
      .withMessage("Email is Required")
      .isEmail()
      .withMessage("Invalid Email Address"),

    body("phone")
      .exists()
      .withMessage("Phone Number is Required")
      .isMobilePhone("en-IN")
      .withMessage("Invalid Phone Number"),

    body("password")
      .exists()
      .withMessage("Password is Required")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password should be atleast of 6 digits"),

    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Invalid Request",
          errors: errors.array(),
        });
      }
      next();
    },
  ]