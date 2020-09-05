import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  /**
   * saveFile
   */
  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }

  /**
   * deleteFile
   */
  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    );

    this.storage.splice(findIndex, 1);
  }
}

export default FakeStorageProvider;
