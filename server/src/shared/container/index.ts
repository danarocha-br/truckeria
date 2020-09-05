import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import SchedulesRepository from '@modules/schedules/infra/typeorm/repositories/SchedulesRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
// import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

container.registerSingleton<ISchedulesRepository>(
  'SchedulesRepository',
  SchedulesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
