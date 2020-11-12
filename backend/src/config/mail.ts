import { fromUnixTime } from "date-fns"
import {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASSWORD
} from '../utils/environment';

export default {
  host: MAIL_HOST,
  port: MAIL_PORT as unknown as number,
  secure: false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD
  },
  default: 'Equipe Happy <noreply@happy.com>' as unknown as object
}