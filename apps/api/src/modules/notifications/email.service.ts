import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { HtmlRenderService } from './html-render.service';
import { SendEmailArgs } from './types';

@Injectable()
export class EmailService {
  resend: Resend;
  constructor(
    private configService: ConfigService,
    private htmlRenderService: HtmlRenderService,
  ) {
    this.resend = new Resend(configService.get('RESEND_API_KEY'));
  }

  async sendEmail(args: SendEmailArgs): Promise<boolean> {
    const { recipients, template, data, subject } = args;
    if (this.configService.get('MOCK_EMAILS') === 'true') {
      console.log('MOCK_EMAILS');
      return Promise.resolve(true);
    }

    const content = await this.htmlRenderService.renderHtml(template, data);
    await this.resend.emails.send({
      // todo change to whizzle domain
      from: 'noreply@resend.dev',
      to: this.configService.get('MOCKED_EMAIL_RECIPIENT') ?? recipients,
      subject,
      html: content,
    });
    return true;
  }
}
