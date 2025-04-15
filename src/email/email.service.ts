// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendBeautifulEmail(
    to: string,
    subject: string,
    text: string,
  ): Promise<{ success: boolean; message: string; error?: string }> {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template: 'welcome',
        context: {
          subject,
          text,
        },
      });

      return { success: true, message: 'Email sent successfully' };
    } catch (err: unknown) {
      let errorMessage = 'Unknown error occurred';
      if (err instanceof Error) {
        errorMessage = err.message;
      }

      return {
        success: false,
        message: 'Failed to send email',
        error: errorMessage,
      };
    }
  }
}
