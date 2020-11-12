import { REDIS_HOST, REDIS_PORT } from '../utils/environment';

export default {
  host: REDIS_HOST,
  port: REDIS_PORT as unknown as number
}