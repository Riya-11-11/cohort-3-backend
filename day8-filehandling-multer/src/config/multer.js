const multer = require("multer");

// Multer frontend s file file fetch krta h

//diskstorage for local
// const storage = multer.diskStorage({
//   //diskstorage btata h ki file ka destination and filename kya hoga
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); //error, destination(data)
//   },
//   //(kahan p rahoge)

//   filename: (req, file, cb) => {
//     console.log("In filename -->", file);
//     cb(null, Date.now() + "_" + file.originalname);
//   },
//   //unique name(kis name s rahoge)
// });

// for server
const storage = multer.memoryStorage();

//Multer ki saari powers ko upload ko de diya
const upload = multer({ storage });

module.exports = upload;
