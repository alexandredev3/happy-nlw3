import User from '../app/models/User';

export default {
  render(user: User) {
    const {
      name,
      email,
    } = user;

    return {
      name,
      email
    }
  }
}