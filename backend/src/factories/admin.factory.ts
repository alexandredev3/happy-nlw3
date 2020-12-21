import { define } from "typeorm-seeding";

import User from '../app/models/User';

define(User, () => {
  const user = new User();

  user.name = 'Admin Happy';
  user.email = 'admin@happy.com.br';
  user.password_hash = '12345678';
  user.isAdmin = true;

  return user;
});