const multer = require("multer");
const path = require("path");
const { v4: uuid } = require("uuid");

///////MULTER/////////////
/////////////STORAGE//////////////////////

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(
      null,

      path.join(__dirname, "./../public/uploads")
    );
  },
  ///////////////////
  filename: (req, file, callback) => {
    callback(
      null,
      uuid() +
        //file.originalname
        path.extname(file.originalname)
    );
  },
});
//////////////UPLOAD////////////////////////////////
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: function (req, file, callback) {
    const fileTypes = /png|jpg|jpeg/;
    const extensionName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mime = fileTypes.test(file.mimetype);

    //console.log(file);
    if (mime && extensionName) {
      return callback(null, true);
    } else {
      callback("Error! Accepted image type: PNG/JPG/JPEG. Max size: 5MB");
    }
  },
}).single("image");
/////////////////////////////////////////////////

module.exports = upload;
