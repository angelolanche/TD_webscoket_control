import multer, { diskStorage } from 'multer';

function multerMiddlewere() {
  const storage = diskStorage({
  destination: (req, file, cb) => {
    if(file.fieldname === 'music') {
      return cb(null, 'musics/');
    }

    cb(null, 'uploads/');
  },
    filename: (req, file, cb) => {
      if(file.fieldname === 'music') {
        return cb(null, 'music' + '.mp3');
      }

      if(!req.fileIndex) {
        req.fileIndex = 1;      
      }
      
      let uniqueSuffix = 'image' + req.fileIndex + '.jpeg';
      req.fileIndex ++;
      
      cb(null, uniqueSuffix);
    }
  });

  const upload = multer({ storage: storage });
  
  return upload;
}

export default { multerMiddlewere };