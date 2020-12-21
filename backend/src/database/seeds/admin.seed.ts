import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import User from '../../app/models/User';

export default class CreateAdminUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(User)().create();
  }
}