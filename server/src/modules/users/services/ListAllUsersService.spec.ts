import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ListAllUsersService from './ListAllUsersService';

let fakeUsersRepository: FakeUsersRepository;

let listAllUsersService: ListAllUsersService;

describe('ShowUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listAllUsersService = new ListAllUsersService(fakeUsersRepository);
  });

  it('should be able to list all users', async () => {
    const superadmin = await fakeUsersRepository.create({
      name: 'Doe',
      email: 'superadmin@doe.com',
      password: '123456',
      roles: ['superadmin'],
    });

    const user1 = await fakeUsersRepository.create({
      name: 'Joe Doe',
      email: 'joe@doe.com',
      password: '123456',
      roles: ['admin', 'user'],
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Mary Doe',
      email: 'mary@doe.com',
      password: '123456',
      roles: ['user'],
    });

    const users = await listAllUsersService.execute({
      user_id: superadmin.id,
    });

    expect(users).toEqual([user1, user2]);
  });

  it('should not be able to users list from non superuser id', async () => {
    const notSuperadmin = await fakeUsersRepository.create({
      name: 'Doe',
      email: 'superadmin@doe.com',
      password: '123456',
      roles: ['admin'],
    });

    await expect(
      listAllUsersService.execute({
        user_id: notSuperadmin.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
