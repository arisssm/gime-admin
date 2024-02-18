const multer = require('multer');
const path = require('path');//file bawaan express js

//konfirgurasi
const storage = multer.diskStorage({
    destination:'public/images',
    filename: function(req, file, cb){
    cb(null, Date.now() + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});

//validasi file yang masuk
function checkTypeFile(file, cb)
{
    const fileType = /jpg|jpeg|png|gif/;
    const extName = fileType.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileType.test(file.mimetype); //test = satu fungsi yang disediakan javascript pengganti regex(regular expression)
    if (extName == mimeType)
    {
        return cb(null, true);
    } else {
        cb('Invalid file type');
    }
}

const upload = multer({
    storage:storage,
    limits: {fileSize:400000},
    fileFilter: function(req, file, cb)
    {
        checkTypeFile(file, cb);
    }
}).single('image');

module.exports = {upload};