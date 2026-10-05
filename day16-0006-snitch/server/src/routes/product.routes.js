import { Router } from "express";
import { createProductValidator } from "../validators/product.validator";
import { authenticate } from "../Middleware/auth.middleware.js";
import {
  createProduct,
  listAllProducts,
} from "../controllers/product.controller.js";

import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5,
    fileSize: 1 * 1024 * 1024, //1MB
  },

  //fileFilter :- to accept files of specific type like image, audio, video, pdf, etc.
});

const router = Router();

/**
 * @method POST
 * @route /api/products/
 * @description creates the product and save its data into the DB, images will be store on imageKit
 * @access seller
 * req.body=>{title, description, price:{amount, currency}, sizes:[{size, stock},{size, stock}]}
 */

router.post(
  "/",
  authenticate,
  (req, res, next) => {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        message: "User is not authorize to create products",
      });
    }
    next();
  },
  upload.array("images"),
  (req, res, next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price));
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes));

    next();
  },
  createProductValidator,
  createProduct,
);

/**
 * @method GET
 * @route /api/product
 * @description Read all the products from the DB
 * @access user
 */

router.get("/", authenticate, listAllProducts);

export default router;
