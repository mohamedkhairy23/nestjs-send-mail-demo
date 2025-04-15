// email.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-one')
  async sendToOne(@Body() body: { to: string; subject: string; text: string }) {
    const { to, subject, text } = body;
    return this.emailService.sendBeautifulEmail(to, subject, text); // Make sure this call is correct
  }

  @Post('send-many')
  async sendToMany(
    @Body() body: { recipients: string[]; subject: string; text: string },
  ) {
    const { recipients, subject, text } = body;

    const results = await Promise.all(
      recipients.map((email) =>
        this.emailService.sendBeautifulEmail(email, subject, text),
      ),
    );

    return {
      success: true,
      message: `Emails sent to ${recipients.length} users.`,
      results,
    };
  }
}
