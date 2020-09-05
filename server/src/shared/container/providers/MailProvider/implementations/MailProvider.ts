import fs from 'fs';
import path from 'path';

import IStorageProvider from '../models/IStorageProvider';

import uploadConfig from '@config/upload';

class DiskStorageProvider implements IStorageProvider {
  /**
   * saveFile
   */
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  /**
   * deleteFile
   */
  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch (error) {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
