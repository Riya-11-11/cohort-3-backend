import { Router } from "express";
import {
  createProductValidator,
  unlistProductValidator,
  listProductValidator,
} from "../validators/product.validator.js";
import {
  authenticate,
  authenticateSeller,
} from "../Middleware/auth.middleware.js";
import {
  createProduct,
  listAllProducts,
  unlistProduct,
  listProduct,
  listAllProductsToSeller,
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
  authenticateSeller,
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
 * @description Read all the published products from the DB
 * @access user
 */

router.get("/", authenticate, listAllProducts);

/**
 * @method GET
 * @route /api/product/seller
 * @description Read all the products from the DB
 * @access seller
 */

router.get(
  "/seller",
  authenticate,
  authenticateSeller,
  listAllProductsToSeller,
);

/**
 * @method PATCH
 * @route /api/products/unlist/:id
 * @access seller
 * @description Unlist a product by id
 */

router.patch(
  "/unlist/:id",
  authenticate,
  authenticateSeller,
  unlistProductValidator,
  unlistProduct,
);

/**
 * @method PATCH
 * @route /api/products/list/:id
 * @access seller
 * @description list a product by id
 */

router.patch(
  "/list/:id",
  authenticate,
  authenticateSeller,
  listProductValidator,
  listProduct,
);

export default router;
