const express = require("express");
const { create } = require("../controllers/user.controller");
const upload = require("../config/multer.config");

const router = express.Router();

router.post("/create", upload.array("images", 5), create); //name, limit of images

module.exports = router;
