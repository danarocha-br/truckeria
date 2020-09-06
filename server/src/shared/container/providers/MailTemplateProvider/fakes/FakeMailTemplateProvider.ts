import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  /**
   * parseTemplate
   */
  public async parseTemplate(): Promise<string> {
    return 'Mail Template';
  }
}

export default FakeMailTemplateProvider;
