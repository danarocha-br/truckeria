import handlebars from 'handlebars';
import fs from 'fs';

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

class HandlebarsMailTemplateProvider {
  constructor() {}
  /**
   * parseTemplate
   */
  public async parseTemplate({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parsedTemplate = handlebars.compile(templateFileContent);

    return parsedTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
