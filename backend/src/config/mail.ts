export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_POST as unknown as number,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  },
  default: 'Equipe Happy <noreply@happy.com>' as unknown as object
}