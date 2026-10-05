import { Router } from "express";
import { addToCartValidator } from "../validators/cart.validator.js";
import { authenticate } from "../Middleware/auth.middleware.js";
import { addToCart } from "../controllers/cart.controller.js";

const router = Router();

/**
 * @method POST
 * @route /api/cart
 * @access protected
 * @description Add a product to the user's cart
 */

//req.body = {productId, quantity, size}
router.post("/", authenticate, addToCartValidator, addToCart);

export default router;
