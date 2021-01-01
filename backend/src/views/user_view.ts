import User from '../app/models/User';

export default {
  render(user: User) {
    const {
      id,
      name,
      isAdmin
    } = user;

    return {
      id,
      name,
      isAdmin
    }
  }
}