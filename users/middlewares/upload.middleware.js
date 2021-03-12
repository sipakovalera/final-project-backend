const multer = require('multer');
const uuid = require('uuid');
const path = require('path');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../upload'));
  },
  filename: (req, file, cb) => {
    const fileArr = file.originalname.split('.');
      cb(null, uuid.v4() + '.' + fileArr[fileArr.length - 1]);
  }
});


module.exports = multer({storage: fileStorage}).single('avatar');
