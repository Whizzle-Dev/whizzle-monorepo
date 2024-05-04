import { Injectable } from '@nestjs/common';
import { Liquid } from 'liquidjs';
import * as fs from 'fs';
import * as path from 'path';

import { Templates } from './types';

@Injectable()
export class HtmlRenderService {
  engine: Liquid;
  constructor() {
    this.engine = new Liquid();
  }
  async renderHtml(
    template: Templates,
    data: Record<string, string>,
  ): Promise<string> {
    const emailTemplatePath = path.join(
      process.cwd(),
      `./assets/email-templates/${template}.html`,
    );

    const content = fs.readFileSync(emailTemplatePath, 'utf8');
    return this.engine.parseAndRender(content, data);
  }
}
