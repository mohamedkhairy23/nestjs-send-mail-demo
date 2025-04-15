// email.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Express } from 'express'; // import the type

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendBeautifulEmail(
    to: string,
    subject: string,
    text: string,
    attachments?: Express.Multer.File[], // Add type here
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
        attachments: attachments?.map((file: Express.Multer.File) => ({
          filename: file.originalname,
          content: file.buffer,
          contentType: file.mimetype,
        })),
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
