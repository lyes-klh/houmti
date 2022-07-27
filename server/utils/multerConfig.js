const multer = require('multer');
const AppError = require('./AppError');

const multerConfig = (folder, fileSize) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public/img/${folder}`);
    },
    filename: function (req, file, cb) {
      const extension = '.' + file.mimetype.split('/').at(-1);
      const uniqueSuffix = req.user._id + '-' + Date.now();
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
  });

  const limits = { fileSize };

  fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['jpg', 'jpeg', 'png'];
    const fileType = file.mimetype.split('/')[1];
    if (allowedFileTypes.includes(fileType)) cb(null, true);
    else cb(new AppError('File extension must be .png .jpeg .jpg', 400));
  };

  return multer({ storage, limits, fileFilter });
};

module.exports = multerConfig;
