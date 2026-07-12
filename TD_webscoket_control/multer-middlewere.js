import multer, { diskStorage } from 'multer';
import fs from 'fs';

function CleanFolderSync(folderPath) {
  try {
    // Delete folder and contents synchronously
    fs.rmSync(folderPath, { recursive: true, force: true });
    
    // Recreate it empty
    fs.mkdirSync(folderPath, { recursive: true });
    
    console.log('Folder cleaned successfully.');
  } catch (err) {
    console.error('Error cleaning folder:', err);
  }
}

function MulterMiddlewere() {
  const storage = diskStorage({
  destination: (req, file, cb) => {
    if(file.fieldname === 'music') {
      return cb(null, 'clientMusic/');
    }

    cb(null, 'clientImages/');
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

export { MulterMiddlewere, CleanFolderSync };