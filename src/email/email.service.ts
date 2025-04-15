// email.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  // Define a more specific return type
  async sendEmail(
    to: string,
    subject: string,
    text: string,
  ): Promise<{ success: boolean; message: string; error?: string }> {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        text,
      });

      return { success: true, message: 'Email sent successfully' };
    } catch (err: unknown) {
      let errorMessage = 'Unknown error occurred while sending email';

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
