require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  //   cloud_name: process.env.CLOUDINARY_NAME,
  //   api_key: process.env.CLOUDINARY_API_KEY,
  //   api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: "amitshrestha",
  api_key: "645496568346862",
  api_secret: "P2jwgCDn0L0sxnI-nCj75-X3_oE",
});

module.exports = { cloudinary };
