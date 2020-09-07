import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, callback) => {
      // const match = ['image/png', 'image/jpeg'];

      // if (match.indexOf(file.mimetype) === -1) {
      //   const message = Error(
      //     `${file.originalname} is invalid. Accepted files are png/jpeg.`,
      //   );
      //   return callback(message, '');
      // }

      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
