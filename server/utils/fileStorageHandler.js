import multer from "multer";

export const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "public/assets");
  // },
  destination: "./uploadedImages",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage });
