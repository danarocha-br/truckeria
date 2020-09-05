import { compare, hash } from 'bcryptjs';

import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  /**
   * generateHash
   */
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  /**
   * compareHash
   */
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BCryptHashProvider;
