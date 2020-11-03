import nodemailer from 'nodemailer';
import { resolve } from 'path';
import { pugEngine } from 'nodemailer-pug-engine';

import mailConfig from '../config/mail';

interface MailMessage {
  to: string;
  from: string;
  subject: string;
  template: string;
  ctx: {};
}

class Mail {
  transporter = nodemailer.createTransport({});

  constructor() {
    const { host, port, secure, auth } = mailConfig;
    
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails')

    this.transporter.use(
      'compile',
      pugEngine({
        templateDir: viewPath,
        pretty: true
      })
    )
  }

  sendMail(mailMessage: MailMessage) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...mailMessage,
    })
  }
}

export default new Mail();