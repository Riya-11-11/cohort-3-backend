import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProduct(req, res) {
  console.log(req.body);
  console.log(req.files);

  const filesUrls = [];

  for (let i = 0; i < req.files.length; i++) {
    const response = await uploadFile({
      buffer: req.files[i].buffer,
      fileName: req.files[i].originalname,
      folder: "snitch",
    });

    console.log(response);

    filesUrls.push(response.url);
  }

  console.log(filesUrls);

  const product = await productModel.create({
    title: req.body.title,
    description: req.body.description,
    price: {
      amount: req.body.price.amount,
      currency: req.body.price.currency,
    },
    sizes: req.body.sizes,
    images: filesUrls,
    seller: req.user.userId,
  });

  res.status(201).json({
    message: "Product created successfully",
    data: product,
  });
}

export async function listAllProducts(req, res) {
  const products = await productModel.find({ published: true });

  res.status(200).json({
    message: "Products data fetched successfully",
    data: {
      products,
    },
  });
}

export async function listAllProductsToSeller(req, res) {
  const products = await productModel.find({});

  return res.status(200).json({
    message: "All products fetched successfully",
    data: {
      products,
    },
  });
}

export async function unlistProduct(req, res) {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    res.status(404).json({
      message: "Products not found by id",
    });
  }
  //----------------make product unpublished----------------
  await productModel.findByIdAndUpdate(id, {
    published: false,
  });

  res.status(200).json({
    message: "Product unpublished successfully",
  });
}

export async function listProduct(req, res) {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    res.status(404).json({
      message: "Products not found by id",
    });
  }
  //----------------make product published------------------
  await productModel.findByIdAndUpdate(id, {
    published: true,
  });

  res.status(200).json({
    message: "Product published successfully",
  });
}
