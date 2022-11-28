const multer = require("multer");
const Path = require("path");

const storage = multer.diskStorage({
  // destination: function (res, file, cb) {
  //   cb(null, "../uploads/categories");
  // },
  // filename: function (res, file, cb) {
  //   // cb(null, Date.now + "-" + file.originalname);
  //   cb(null, file.originalname);
  // },
});

const fileFilter = (req, file, callback) => {
  const accepttableExt = [".jpg", ".jpeg", ".png"];
  if (!accepttableExt.includes(Path.extname(file.originalname))) {
    return callback(new Error("Only .png, .jpg,.jpeg format allowed!"));
  }

  const fileSize = parseInt(req.headers["content-length"]);
  if (fileSize > 1048576) {
    return callback(new Error("File Size Big"));
  }
  callback(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  fileSize: 1048576,
});

// module.exports = upload.single("categoryImage");
module.exports = upload.single("picture");
