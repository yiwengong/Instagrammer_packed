const multer = require('multer');
const fs = require('fs');

var createFolder = function(folder) {
  try{
    fs.accessSync(folder);
  }catch(e) {
    fs.mkdirSync(folder);
  }
}

var storage = multer.diskStorage({
  destination:function(req,file, cb){
    if(file.fieldname === 'avatar'){
      uploadFolder = `../public/avatar/${req.user._id}`;
    }else{
      uploadFolder = `../public/images/${req.user._id}`;
    }
    createFolder(uploadFolder);
    cb(null,uploadFolder);
  },
  filename:function(req,file,cb) {
    var fileFormat = file.originalname.split('.');
    cb(null, file.fieldname + '-'  + "." + Date.now());
  }
});

var upload = multer({
  storage:storage
})

module.exports = upload;
