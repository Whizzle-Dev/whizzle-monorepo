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
      return Promise.resolve(true);
    }

    const content = await this.htmlRenderService.renderHtml(template, data);
    const response = await this.resend.emails.send({
      from: 'noreply@api.whizzle.app',
      to: this.configService.get('MOCKED_EMAIL_RECIPIENT') || recipients,
      subject,
      html: content,
    });
    if (response.error) {
      console.error('Error sending email', response.error);
      return false;
    }
    return true;
  }
}
