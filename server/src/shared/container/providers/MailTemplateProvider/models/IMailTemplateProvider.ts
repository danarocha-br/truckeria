import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface MailTemplateProvider {
  parseTemplate(data: IParseMailTemplateDTO): Promise<string>;
}
