import { PRIVATE_SECRET, PUBLIC_SECRET } from '../utils/environment';

interface IAuth {
  private_secret: string;
  public_secret: string;
  expiresIn: string;
}

export default {
  private_secret: PRIVATE_SECRET,
  public_secret: PUBLIC_SECRET,
  expiresIn: '3d',
} as IAuth;