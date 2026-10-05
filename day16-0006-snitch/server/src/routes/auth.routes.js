import { Router } from "express";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import { login, register, refresh, getMe } from "../controllers/auth.controller.js";
import { authenticate } from "../Middleware/auth.middleware.js";

const router = Router();

/**
 * @Post /api/auth/register
 * @param req Express req
 * @param req.body={email,name,password}
 * @response res.status=201(if successfu)
 */

router.post("/register", registerValidator, register);

/**
 * @Post /api/auth/login
 * @param req
 * @param req.body={email,password}
 * @response res.status=200(if successfu)
 */

router.post("/login", loginValidator, login);

/**
 * @Post /api/auth/refresh
 */

router.post("/refresh", refresh);

/**
 * @Get /api/auth/me
 */

router.get("/me", authenticate, getMe)

export default router;
