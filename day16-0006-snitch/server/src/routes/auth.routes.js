import { Router } from "express";
import { registerValidator } from "../validators/auth.validator.js";
import { register } from "../controllers/auth.controller.js";


const router = Router();

/**
 * @Post /api/auth/register
 * @param req Express req
 * @param req.body={email,name,password}
 * @response res.status=201(if successfu)
 */


router.post("/register", registerValidator, register)
export default router;
