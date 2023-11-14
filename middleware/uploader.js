const multer = require("multer");
const { extname } = require("path");

const storage = multer.diskStorage({
  destination: "images/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.fieldname + "-" + uniqueSuffix);
  },
});
const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /\.(png|jpg)$/i;
    const extension = extname(file.originalname);

    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png/jpg image"));
    }
  },
  limits: {
    fileSize: 5000000,
  },
});

module.exports = uploader;
