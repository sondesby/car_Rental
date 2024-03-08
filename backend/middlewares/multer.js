require('dotenv').config();
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, process.env.IMAGES_DESTINATION);
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})

exports.upload = multer({storage});