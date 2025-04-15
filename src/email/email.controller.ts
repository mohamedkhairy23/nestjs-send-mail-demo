// email.controller.ts
import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-one')
  @UseInterceptors(FilesInterceptor('attachments')) // this matches the form field name
  async sendToOne(
    @Body() body: { to: string; subject: string; text: string },
    @UploadedFiles() attachments: Express.Multer.File[],
  ) {
    const { to, subject, text } = body;
    return this.emailService.sendBeautifulEmail(to, subject, text, attachments);
  }

  @Post('send-many')
  @UseInterceptors(FilesInterceptor('attachments')) // still supports one field with multiple files
  async sendToMany(
    @Body()
    body: {
      recipients: string[];
      subject: string;
      text: string;
    },
    @UploadedFiles() attachments: Express.Multer.File[],
  ) {
    const { recipients, subject, text } = body;

    const results = await Promise.all(
      recipients.map((email) =>
        this.emailService.sendBeautifulEmail(email, subject, text, attachments),
      ),
    );

    return {
      success: true,
      message: `Emails sent to ${recipients.length} users.`,
      results,
    };
  }
}
