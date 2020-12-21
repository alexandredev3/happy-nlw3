import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../utils/environment';

interface IAdmin {
  email: string;
  password: string;
}

export default {
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD
} as IAdmin;