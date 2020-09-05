import { container } from 'tsyringe';

import ISchedulesRepository from '@modules/schedules/repositories/ISchedulesRepository';
import SchedulesRepository from '@modules/schedules/infra/typeorm/repositories/SchedulesRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<ISchedulesRepository>(
  'SchedulesRepository',
  SchedulesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
