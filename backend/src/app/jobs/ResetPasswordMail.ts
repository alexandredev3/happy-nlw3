import Mail from '../../lib/Mail';

interface MailData {
  data: {
    name: string,
    email: string;
    token: string;
  }
}

export default {
  get key(): string {
    return 'ResetPasswordMail';
  },

  async handle({ data }: MailData) {
    const { name, email, token } = data;

    await Mail.sendMail({
      to: `${name} - ${email}`,
      from: 'happy@happy.com.br',
      subject: 'Happy - Redefinir Senha',
      template: 'recovery',
      ctx: {
        token,
        name: name
      }
    })
  }
}
