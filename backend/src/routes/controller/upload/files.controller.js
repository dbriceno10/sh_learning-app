const path = require("path");
const multer = require("multer");
const mimetype = require("mime-types");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname + "_" + Date.now() + path.extname(file.originalname)
      // Date.now() + file.originalname + "." + mimeTypes.extension(file.mimetype)
    );
  },
});

const upload = multer({ storage: storage });

const homePage = (req, res) => {
  return res.send("this is de the home page");
};

// app.post("/files", upload.single("file"), (req, res) => {
//   console.log(`Storage location is ${req.hostname}/${req.file.path}`);
//   return res.send(req.file);
// });

const uploadFiles = (req, res) => {
  console.log(`Storage location is ${req.hostname}/${req.file.path}`);
  //   return res.send(req.file);
};

module.exports = {
  homePage,
  uploadFiles,
  upload,
};
