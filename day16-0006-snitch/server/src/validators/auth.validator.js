import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("email")
    .exists()
    .withMessage("Email is required").bail()
    .trim()
    .isEmail()
    .withMessage("Enter valid email address"),

  body("name")
    .exists()
    .withMessage("Name is required").bail()
    .isString()
    .withMessage("Name must be in string")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Nmae length must be between 2 to 50 characters"),

  body("password")
    .exists()
    .withMessage("Password is required").bail()
    .isString()
    .withMessage("Password must be a string")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be atleast of 6 characters"),

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
];


